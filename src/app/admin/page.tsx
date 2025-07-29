// src/app/admin/page.tsx
import {
  getSession,
  logout,
  getAboutContent,
  getAllUpdates,
  updateAbout,
  createUpdate,
  deleteUpdate,
  updateUpdate
} from '../actions';
import type { Updates } from '../../generated/prisma';

export default async function AdminPage() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    // This check is redundant due to actions redirecting, but good for safety.
    const { redirect } = await import('next/navigation');
    redirect('/admin/login');
  }

  const aboutContent = await getAboutContent();
  const updates = await getAllUpdates();

  const containerStyle: React.CSSProperties = {
    fontFamily: 'sans-serif',
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  };
  const h1Style: React.CSSProperties = { color: '#333', borderBottom: '2px solid #eee', paddingBottom: '0.5rem' };
  const h2Style: React.CSSProperties = { color: '#555', marginTop: '2rem' };
  const formStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' };
  const textareaStyle: React.CSSProperties = { padding: '0.5rem', minHeight: '150px', border: '1px solid #ccc', borderRadius: '4px' };
  const inputStyle: React.CSSProperties = { padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' };
  const buttonStyle: React.CSSProperties = { padding: '0.75rem', border: 'none', borderRadius: '4px', backgroundColor: '#0070f3', color: 'white', cursor: 'pointer', alignSelf: 'flex-start' };
  const logoutButtonStyle: React.CSSProperties = { ...buttonStyle, backgroundColor: '#888', position: 'absolute', top: '2rem', right: '2rem' };
  const updateItemStyle: React.CSSProperties = { border: '1px solid #ddd', padding: '1rem', borderRadius: '4px', marginTop: '1rem' };

  return (
    <div style={containerStyle}>
      <form action={logout}>
        <button type="submit" style={logoutButtonStyle}>Logout</button>
      </form>

      <h1 style={h1Style}>Admin Dashboard</h1>

      {/* About Section Form */}
      <section>
        <h2 style={h2Style}>Manage "About" Section</h2>
        <form action={updateAbout} style={formStyle}>
          <textarea
            name="content"
            defaultValue={aboutContent?.content || ''}
            required
            style={textareaStyle}
          />
          <button type="submit" style={buttonStyle}>Save About</button>
        </form>
      </section>

      {/* Updates Section */}
      <section>
        <h2 style={h2Style}>Manage "Updates"</h2>

        {/* Create New Update Form */}
        <details style={{ marginTop: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Create New Update</summary>
          <form action={createUpdate} style={formStyle}>
            <input name="title" placeholder="Title" required style={inputStyle} />
            <textarea name="content" placeholder="Content (optional)" style={textareaStyle} />
            <label>
              <input type="checkbox" name="public" defaultChecked /> Public
            </label>
            <button type="submit" style={buttonStyle}>Create Update</button>
          </form>
        </details>

        {/* Existing Updates List */}
        <div style={{ marginTop: '2rem' }}>
          {updates.map((update: Updates) => (
            <div key={update.id} style={updateItemStyle}>
              <details>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>{update.title} <span style={{ color: update.public ? 'green' : 'gray' }}>({update.public ? 'Public' : 'Draft'})</span></summary>
                <form id={`update-form-${update.id}`} action={updateUpdate} style={{...formStyle, marginTop: '1rem'}}>
                  <input type="hidden" name="id" value={String(update.id)} />
                  <input name="title" defaultValue={update.title} required style={inputStyle} />
                  <textarea name="content" defaultValue={update.content || ''} style={textareaStyle} />
                  <label>
                    <input type="checkbox" name="public" defaultChecked={update.public} /> Public
                  </label>
                </form>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="submit" form={`update-form-${update.id}`} style={buttonStyle}>Update</button>
                    <form action={deleteUpdate} style={{ margin: 0 }}>
                        <input type="hidden" name="id" value={String(update.id)} />
                        <button type="submit" style={{...buttonStyle, backgroundColor: '#dc3545'}}>Delete</button>
                    </form>
                </div>
              </details>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
