import { useNavigate } from 'react-router-dom'
import { UserPlus, FileText } from 'lucide-react'
import AdminLayout from './AdminLayout'
import { useAuth } from '../../context/AuthContext'

const QUICK_ACTIONS = [
  {
    label: 'Add Advocate',
    description: 'Create a new advocate account with email and password login.',
    icon: UserPlus,
    to: '/admin/add-advocate',
  },
  {
    label: 'Add Template',
    description: 'Upload or create a new document template for advocates to use.',
    icon: FileText,
    to: '/admin/add-template',
  },
]

export default function AdminDashboard() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const adminName = profile?.full_name || 'Admin'

  return (
    <AdminLayout>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Welcome, {adminName}</h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage advocates and templates from the sidebar.
        </p>
      </div>

      {/* Quick action cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
        {QUICK_ACTIONS.map(({ label, description, icon: Icon, to }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            className="text-left border-2 border-[#1e3a5f]/20 hover:border-[#1e3a5f] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group bg-white"
          >
            <div className="w-10 h-10 bg-[#c9a84c]/10 group-hover:bg-[#c9a84c]/20 rounded-xl flex items-center justify-center mb-4 transition-colors">
              <Icon className="w-5 h-5 text-[#c9a84c]" />
            </div>
            <p className="text-[#1e3a5f] font-bold text-base mb-1">{label}</p>
            <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
          </button>
        ))}
      </div>
    </AdminLayout>
  )
}
