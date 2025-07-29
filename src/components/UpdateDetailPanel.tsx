"use client";

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { formatDate } from '../lib/utils';
import type { Updates } from '../../src/generated/prisma';
import { getAllUpdateTitles, getUpdateDetails } from '../app/actions';

interface UpdateDetailPanelProps {
  updateId: number;
  onClose: () => void;
}

export default function UpdateDetailPanel({ updateId, onClose }: UpdateDetailPanelProps) {
  const [update, setUpdate] = useState<Updates | null>(null);
  const [allUpdates, setAllUpdates] = useState<{ id: number; title: string }[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    startTransition(async () => {
      const [updateData, allUpdatesData] = await Promise.all([
        getUpdateDetails(updateId),
        getAllUpdateTitles(),
      ]);

      if (!updateData) {
        onClose(); // Close the panel if update is not found or not public
        return;
      }

      setUpdate(updateData);
      setAllUpdates(allUpdatesData);
    });

    const timer = setTimeout(() => setIsPanelVisible(true), 10);

    return () => clearTimeout(timer);
  }, [updateId, onClose]);

  const handleClose = () => {
    setIsPanelVisible(false);
    // Wait for animation to finish before calling parent onClose
    setTimeout(onClose, 400);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, itemId: number) => {
    if (itemId === updateId) {
      e.preventDefault(); // Prevent default hash navigation
      router.push(`/updates/${itemId}`); // Navigate to the full page
    }
    // For other items, the default href="#update-..." will work as intended.
  };

  return (
    <>
      <div
        className={`update-detail-overlay ${isPanelVisible ? 'visible' : ''}`}
        onClick={handleClose}
      />
      <div
        className={`update-detail-panel ${isPanelVisible ? 'visible' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {isPending || !update ? (
          <div className="update-detail-panel-body"><p>Loading...</p></div>
        ) : (
          <div className="update-detail-layout">
            <aside className="update-list-sidebar">
              <h2>All Updates</h2>
              <ul>
                {allUpdates.map((item) => (
                  <li key={item.id} className={item.id === update.id ? 'active' : ''}>
                    <a
                      href={`#update-${item.id}`}
                      onClick={(e) => handleLinkClick(e, item.id)}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
            <main className="update-detail-main">
              <div className="update-detail-panel-header">
                <button onClick={handleClose} className="close-button">&times;</button>
              </div>
              <div className="update-detail-panel-body">
                <h1>{update.title}</h1>
                <p className="update-meta">
                  Posted on {formatDate(update.datetime)}
                </p>
                <div className="update-body" dangerouslySetInnerHTML={{ __html: update.content || '' }} />
              </div>
            </main>
          </div>
        )}
      </div>
    </>
  );
}
