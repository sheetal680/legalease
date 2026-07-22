import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { user, role, loading, signInWithEmail, signInWithGoogle } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" /></div>
  if (user && role === 'admin') return <Navigate to="/admin" replace />

  async function handleEmail(e) {
    e.preventDefault()
    setErr('')
    setBusy(true)
    try { await signInWithEmail(email, password) }
    catch (e) { setErr(e.message); setBusy(false) }
  }

  async function handleGoogle() {
    setBusy(true)
    try { await signInWithGoogle() }
    catch (e) { setErr(e.message); setBusy(false) }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-1">LegalEase Admin</h1>
        <p className="text-gray-400 text-sm mb-6">Sign in to continue</p>
        {err && <p className="text-red-600 text-sm mb-4 bg-red-50 px-3 py-2 rounded-lg">{err}</p>}
        <form onSubmit={handleEmail} className="space-y-3 mb-4">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required disabled={busy}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-blue-900 transition-colors" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required disabled={busy}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-blue-900 transition-colors" />
          <button type="submit" disabled={busy}
            className="w-full bg-blue-900 text-white font-semibold py-3 rounded-xl text-sm disabled:opacity-60">
            {busy ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        <button onClick={handleGoogle} disabled={busy}
          className="w-full border-2 border-gray-200 text-blue-900 font-semibold py-3 rounded-xl text-sm disabled:opacity-60">
          Continue with Google
        </button>
      </div>
    </div>
  )
}
