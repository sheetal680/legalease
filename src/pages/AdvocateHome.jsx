import { useAuth } from '../context/AuthContext'

export default function AdvocateHome() {
  const { signOut } = useAuth()

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#1e3a5f', marginBottom: '0.5rem' }}>
          Welcome, Advocate
        </h1>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>
          Your advocate dashboard is coming soon.
        </p>
        <button
          onClick={signOut}
          style={{
            padding: '0.5rem 1.5rem',
            background: '#1e3a5f',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  )
}
