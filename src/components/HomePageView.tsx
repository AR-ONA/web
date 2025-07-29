"use client";

import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ProjectGrid from './ProjectGrid';
import UpdatesSection from './UpdatesSection';
import UpdateDetailPanel from './UpdateDetailPanel';
import type { Updates } from '.prisma/client';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

interface HomePageViewProps {
  projects: Repo[];
  updates: Updates[];
  aboutContent: string;
}

export default function HomePageView({ projects, updates, aboutContent }: HomePageViewProps) {
  const [selectedUpdateId, setSelectedUpdateId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#update-')) {
        const id = parseInt(hash.replace('#update-', ''), 10);
        setSelectedUpdateId(id);
      } else {
        setSelectedUpdateId(null);
      }
    };

    handleHashChange(); // Check hash on initial load

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleClosePanel = () => {
    const { pathname, search } = window.location;
    // Pass an empty object {} as the state, not an empty string.
    // This prevents the error and avoids scrolling to the top.
    history.pushState({}, '', pathname + search);
    // Manually update the state because pushState does not trigger a hashchange event.
    setSelectedUpdateId(null);
  };

  return (
    <>
      <Header />
      <main id="home">
        <section className="hero">
          <div className="hero-content">
            <h1>ARONA</h1>
            <p>All Roads, One New Answer</p>
          </div>
        </section>

        <div className="container">
          <section id="about">
            <h2>ABOUT</h2>
            <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}
               dangerouslySetInnerHTML={{ __html: aboutContent.replace(/\n/g, '<br/>') }}
            />
          </section>

          <section id="projects">
            <h2>PROJECTS</h2>
            <ProjectGrid projects={projects} />
            <div className="more-button-container">
              <a href="https://github.com/orgs/AR-ONA/repositories" target="_blank" rel="noopener noreferrer" className="more-button">
                + More
              </a>
            </div>
          </section>

          <UpdatesSection updates={updates} />

          <section id="contact" className="contact">
            <h2>CONTACT</h2>
            <p>We are always looking for new members and collaborators.<br />Feel free to reach out to us!</p>
            <a href="mailto:arona.devs@gmail.com" className="cta-button">Email Us</a>
          </section>
        </div>
      </main>
      <Footer />

      {selectedUpdateId && (
        <UpdateDetailPanel
          updateId={selectedUpdateId}
          onClose={handleClosePanel}
        />
      )}
    </>
  );
}
