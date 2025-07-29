"use server";

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { prisma } from '../lib/prisma';
import type { About, Updates } from '../generated/prisma';

// --- Original Actions ---

export async function getUpdateDetails(id: number): Promise<Updates | null> {
  try {
    const update = await prisma.updates.findUnique({
      where: { id, public: true },
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
            where: { public: true },
            select: { id: true, title: true },
            orderBy: { datetime: 'desc' },
        });
        return updates;
    } catch (error) {
        console.error('Error fetching update titles:', error);
        return [];
    }
}


// --- Admin Actions ---

interface SessionData {
  isLoggedIn: boolean;
}

const sessionPassword = process.env.SESSION_PASSWORD;
if (!sessionPassword || sessionPassword.length < 32) {
  throw new Error('SESSION_PASSWORD must be set in .env.local and be at least 32 characters long.');
}

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), {
    password: sessionPassword,
    cookieName: 'arona-admin-session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });
  return session;
}

export async function login(formData: FormData) {
  const password = formData.get('password');
  if (password === process.env.ADMIN_PASSWORD) {
    const session = await getSession();
    session.isLoggedIn = true;
    await session.save();
    redirect('/admin');
  } else {
    redirect('/admin/login?error=Invalid%20password');
  }
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect('/admin/login');
}

async function requireAdmin() {
    const session = await getSession();
    if (!session.isLoggedIn) {
        redirect('/admin/login');
    }
}

export async function getAboutContent(): Promise<About | null> {
    await requireAdmin();
    return prisma.about.findFirst();
}

export async function updateAbout(formData: FormData) {
    await requireAdmin();
    const content = formData.get('content') as string;
    const about = await prisma.about.findFirst();
    if (about) {
        await prisma.about.update({
            where: { id: about.id },
            data: { content },
        });
    } else {
        await prisma.about.create({
            data: { content },
        });
    }
    revalidatePath('/');
    revalidatePath('/admin');
    redirect('/admin');
}

export async function getAllUpdates(): Promise<Updates[]> {
    await requireAdmin();
    return prisma.updates.findMany({
        orderBy: { datetime: 'desc' },
    });
}

export async function createUpdate(formData: FormData) {
    await requireAdmin();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const isPublic = formData.get('public') === 'on';

    await prisma.updates.create({
        data: {
            title,
            content,
            public: isPublic,
            datetime: new Date().toISOString(),
        },
    });
    revalidatePath('/');
    revalidatePath('/admin');
    redirect('/admin');
}

export async function updateUpdate(formData: FormData) {
    await requireAdmin();
    const id = Number(formData.get('id'));
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const isPublic = formData.get('public') === 'on';

    await prisma.updates.update({
        where: { id },
        data: { title, content, public: isPublic },
    });
    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath(`/updates/${id}`);
    redirect('/admin');
}

export async function deleteUpdate(formData: FormData) {
    await requireAdmin();
    const id = Number(formData.get('id'));
    await prisma.updates.delete({ where: { id } });
    revalidatePath('/');
    revalidatePath('/admin');
    redirect('/admin');
}