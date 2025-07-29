import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '../../../lib/prisma';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { formatDateTime } from '../../../lib/utils';

interface UpdateDetailPageProps {
  params: {
    id: string;
  };
}

// Fetch a single update by ID
async function getUpdate(id: number) {
  try {
    return await prisma.updates.findUnique({ where: { id } });
  } catch (error) {
    console.error(`Error fetching update with id ${id}:`, error);
    return null;
  }
}

// Fetch all updates, sorted by date
async function getAllUpdates() {
  try {
    return await prisma.updates.findMany({
      orderBy: { datetime: 'desc' },
      select: { id: true, title: true }, // Select only necessary fields for the list
    });
  } catch (error) {
    console.error('Error fetching all updates:', error);
    return [];
  }
}

export default async function UpdateDetailPage({ params }: UpdateDetailPageProps) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    notFound();
  }

  // Fetch current update and the list of all updates in parallel
  const [update, allUpdates] = await Promise.all([
    getUpdate(id),
    getAllUpdates(),
  ]);

  if (!update) {
    notFound();
  }

  return (
    <>
      <Header mainPageLinks={true} />
      <div className="page-update-layout" style={{ display: 'flex', gap: '40px', padding: '0 20px' }}>
        <aside className="page-update-sidebar">
          <h2>All Updates</h2>
          <ul>
            {allUpdates.map((item) => (
              <li key={item.id} className={item.id === id ? 'active' : ''}>
                <Link href={`/updates/${item.id}`}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <main className="update-detail-main" style={{ maxWidth: '640px' }}>
          <section className="update-detail-content">
            <h1>{update.title}</h1>
            <p className="update-meta">
              Posted on {formatDateTime(update.datetime)}
            </p>
            <div className="update-body" dangerouslySetInnerHTML={{ __html: update.content || '' }} />
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}