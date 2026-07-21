import { Scale } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function AdvocateHome() {
  const { signOut } = useAuth()
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 bg-[#1e3a5f] rounded-xl flex items-center justify-center">
        <Scale className="text-[#c9a84c] w-6 h-6" />
      </div>
      <h1 className="text-2xl font-bold text-[#1e3a5f]">Advocate Home</h1>
      <p className="text-gray-400 text-sm">Coming soon.</p>
      <button
        onClick={signOut}
        className="mt-4 text-sm text-gray-400 hover:text-[#1e3a5f] underline transition-colors"
      >
        Sign out
      </button>
    </div>
  )
}
