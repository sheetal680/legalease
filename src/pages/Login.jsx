import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (isLoggedIn) {
    navigate('/admin', { replace: true })
    return null
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    const ok = login(username, password)
    if (ok) {
      navigate('/admin', { replace: true })
    } else {
      setError('Invalid username or password')
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-1">LegalEase Admin</h1>
        <p className="text-gray-400 text-sm mb-6">Sign in to continue</p>
        {error && <p className="text-red-600 text-sm mb-4 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            disabled={busy}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-blue-900 transition-colors"
          />
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={busy}
              className="w-full px-4 py-3 pr-16 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-blue-900 transition-colors"
            />
            <button type="button" onClick={() => setShowPw(p => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-blue-900">
              {showPw ? 'Hide' : 'Show'}
            </button>
          </div>
          <button type="submit" disabled={busy}
            className="w-full bg-blue-900 text-white font-semibold py-3 rounded-xl text-sm disabled:opacity-60">
            {busy ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
