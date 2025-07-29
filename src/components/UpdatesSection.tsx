"use client";

import { useState, useEffect } from 'react';
import type { Updates } from '.prisma/client';
import { formatDate } from '../lib/utils';

interface UpdatesSectionProps {
  updates: Updates[];
}

const UpdatesSection = ({ updates }: UpdatesSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [clientTimeZone, setClientTimeZone] = useState<string | undefined>(undefined);

  useEffect(() => {
    setClientTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  const itemsToShow = isExpanded ? updates : updates.slice(0, 4);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section id="updates">
      <h2>RECENT UPDATES</h2>
      <ul className="updates-list">
        {itemsToShow.length > 0 ? (
          itemsToShow.map((item) => (
            <li key={item.id}>
              <strong>{clientTimeZone ? formatDate(item.datetime, clientTimeZone) : '...'}</strong>
              <a href={`#update-${item.id}`} className="update-title-link">
                <span>{item.title}</span>
              </a>
            </li>
          ))
        ) : (
          <li>
            <span>No recent updates found.</span>
          </li>
        )}
      </ul>
      {updates.length > 4 && (
        <div className="updates-toggle" onClick={toggleExpansion}>
          {isExpanded ? '...Less' : '...More'}
        </div>
      )}
    </section>
  );
};

export default UpdatesSection;
