import { prisma } from '../lib/prisma';
import type { Updates } from '../../src/generated/prisma';
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
      orderBy: { datetime: 'desc' },
      take: 10,
    });
  } catch (error) {
    console.error('Error fetching updates:', error);
    return [];
  }
}

export default async function Home() {
  const projects = await getProjects();
  const updates = await getUpdates();

  return <HomePageView projects={projects} updates={updates} />;
}

