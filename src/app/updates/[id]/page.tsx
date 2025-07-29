import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ClientFormattedDateTime from '../../../components/ClientFormattedDateTime';
import { getAllUpdateTitles, getUpdateDetails } from '../../actions';

export default async function UpdateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const id = parseInt((await params).id, 10);
  if (isNaN(id)) {
    notFound();
  }

  // Fetch current update and the list of all updates in parallel
  const [update, allUpdates] = await Promise.all([
    getUpdateDetails(id),
    getAllUpdateTitles(),
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
                Posted on <ClientFormattedDateTime timestamp={update.datetime} />
              </p>
            <div className="update-body" dangerouslySetInnerHTML={{ __html: update.content || '' }} />
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
