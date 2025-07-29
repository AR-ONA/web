import { prisma } from '../lib/prisma';
import type { Updates, About } from '.prisma/client';
import HomePageView from '../components/HomePageView';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

async function getProjects(): Promise<Repo[]> {
  try {
    const res = await fetch('https://api.github.com/users/AR-ONA/repos?sort=updated&per_page=6', {
      next: { revalidate: 3600 }
    });
    if (!res.ok) {
        console.error('Failed to fetch GitHub repos');
        return [];
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

async function getUpdates(): Promise<Updates[]> {
  try {
    return await prisma.updates.findMany({
      where: { public: true },
      orderBy: { datetime: 'desc' },
      take: 10,
    });
  } catch (error) {
    console.error('Error fetching updates:', error);
    return [];
  }
}

async function getAbout(): Promise<About | null> {
  try {
    return await prisma.about.findFirst();
  } catch (error) {
    console.error('Error fetching about content:', error);
    return null;
  }
}

export default async function Home() {
  const projects = await getProjects();
  const updates = await getUpdates();
  const about = await getAbout();

  return <HomePageView projects={projects} updates={updates} aboutContent={about?.content || ''} />;
}

