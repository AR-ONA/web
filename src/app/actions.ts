"use server";

import { prisma } from '../lib/prisma';
import type { Updates } from '../../src/generated/prisma';

export async function getUpdateDetails(id: number): Promise<Updates | null> {
  try {
    const update = await prisma.updates.findUnique({
      where: { id },
    });
    return update;
  } catch (error) {
    console.error(`Error fetching update with id ${id}:`, error);
    return null;
  }
}

export async function getAllUpdateTitles(): Promise<{ id: number; title: string }[]> {
    try {
        const updates = await prisma.updates.findMany({
            select: { id: true, title: true },
            orderBy: { datetime: 'desc' },
        });
        return updates;
    } catch (error) {
        console.error('Error fetching update titles:', error);
        return [];
    }
}
