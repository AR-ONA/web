"use client";

import { useState } from 'react';

const updatesData = [
  {
    date: '2025-07-22',
    content: 'Kick-off for our new AI-powered code analysis project.'
  },
  {
    date: '2025-07-15',
    content: 'Our Community Platform just hit 1,000 active users!'
  },
  {
    date: '2025-07-10',
    content: 'Weekly tech talk on "The Future of WebAssembly".'
  },
  {
    date: '2025-07-01',
    content: 'Recruiting new members for the Fall semester. Applications are open!'
  },
  {
    date: '2025-06-25',
    content: 'Successfully deployed version 2.0 of our main project.'
  },
  {
    date: '2025-06-18',
    content: 'Internal workshop on advanced TypeScript techniques.'
  }
];

const UpdatesSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const itemsToShow = isExpanded ? updatesData : updatesData.slice(0, 4);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section id="updates">
      <h2>RECENT UPDATES</h2>
      <ul className="updates-list">
        {itemsToShow.map((item, index) => (
          <li key={index}>
            <strong>{item.date}</strong>
            <span>{item.content}</span>
          </li>
        ))}
      </ul>
      {updatesData.length > 4 && (
        <div className="updates-toggle" onClick={toggleExpansion}>
          {isExpanded ? '...Less' : '...More'}
        </div>
      )}
    </section>
  );
};

export default UpdatesSection;
