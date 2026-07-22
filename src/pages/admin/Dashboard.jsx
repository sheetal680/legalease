import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Dashboard() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-blue-900">Admin Dashboard</h1>
          <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-blue-900">Sign out</button>
        </div>
        <div className="space-y-4">
          <button onClick={() => navigate('/admin/add-advocate')}
            className="w-full bg-white border-2 border-gray-100 hover:border-blue-900 rounded-2xl p-6 text-left transition-all shadow-sm">
            <p className="font-bold text-blue-900 text-lg">Add Advocate</p>
            <p className="text-gray-400 text-sm mt-1">Register a new advocate account</p>
          </button>
          <button onClick={() => navigate('/admin/add-template')}
            className="w-full bg-white border-2 border-gray-100 hover:border-blue-900 rounded-2xl p-6 text-left transition-all shadow-sm">
            <p className="font-bold text-blue-900 text-lg">Add Template</p>
            <p className="text-gray-400 text-sm mt-1">Create a document template for advocates</p>
          </button>
        </div>
      </div>
    </div>
  )
}
