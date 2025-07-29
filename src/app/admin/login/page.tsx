// src/app/admin/login/page.tsx
import { login } from '../../actions';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      backgroundColor: '#f0f2f5'
    }}>
      <h1>Admin Login</h1>
      <form action={login} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          required
          style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button type="submit" style={{ padding: '0.75rem', border: 'none', borderRadius: '4px', backgroundColor: '#0070f3', color: 'white', cursor: 'pointer' }}>
          Login
        </button>
      </form>
    </div>
  );
}
