"use client";

import { useState } from 'react';
import type { Updates } from '../../src/generated/prisma';
import Link from 'next/link';

interface UpdatesSectionProps {
  updates: Updates[];
}

// Unix 타임스탬프 문자열을 YYYY-MM-DD 형식으로 변환하는 함수
function formatDate(unixTimestampString: string): string {
  const date = new Date(parseInt(unixTimestampString, 10) * 1000);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

const UpdatesSection = ({ updates }: UpdatesSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // 표시할 아이템: 펼치면 전체(최대 10개), 아니면 4개
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
              <strong>{formatDate(item.datetime)}</strong>
              <Link href={`/updates/${item.id}`} className="update-title-link">
                <span>{item.title}</span>
              </Link>
            </li>
          ))
        ) : (
          <li>
            <span>No recent updates found.</span>
          </li>
        )}
      </ul>
      {/* 업데이트가 4개보다 많을 때만 접기/펼치기 버튼 표시 */}
      {updates.length > 4 && (
        <div className="updates-toggle" onClick={toggleExpansion}>
          {isExpanded ? '...Less' : '...More'}
        </div>
      )}
    </section>
  );
};

export default UpdatesSection;
