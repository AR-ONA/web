"use client";

import { useState, useEffect } from 'react';
import type { Updates } from '../../src/generated/prisma'; // A bit of a misnomer, but we need the type structure. Let's assume a project has a similar structure for now.

// Let's define a proper type for a project to avoid confusion.
interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

interface ProjectGridProps {
  projects: Repo[];
}

const ProjectGrid = ({ projects }: ProjectGridProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on initial mount
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const projectsToShow = isMobile ? projects.slice(0, 2) : projects;

  return (
    <div className="project-grid">
      {projectsToShow.map((repo) => (
        <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="project-link">
          <div className="project-card">
            <h3>{repo.name}</h3>
            <p>{repo.description || 'No description provided.'}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ProjectGrid;
