import { useNavigate } from 'react-router-dom'
import { UserPlus, FileText } from 'lucide-react'
import AdminLayout from './AdminLayout'

export default function AdminDashboard() {
  const navigate = useNavigate()

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4 max-w-lg">

        <button
          onClick={() => navigate('/admin/add-advocate')}
          className="w-full flex items-center gap-4 px-6 py-5 bg-white border-2 border-[#1e3a5f]/15 hover:border-[#1e3a5f] rounded-2xl text-left transition-all group shadow-sm hover:shadow-md"
        >
          <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 group-hover:bg-[#c9a84c]/20 flex items-center justify-center shrink-0 transition-colors">
            <UserPlus className="w-5 h-5 text-[#c9a84c]" />
          </div>
          <div>
            <p className="text-[#1e3a5f] font-bold text-base tracking-wide uppercase">Add Advocate</p>
            <p className="text-gray-400 text-sm mt-0.5">Register a new lawyer on the platform</p>
          </div>
        </button>

        <button
          onClick={() => navigate('/admin/add-template')}
          className="w-full flex items-center gap-4 px-6 py-5 bg-white border-2 border-[#1e3a5f]/15 hover:border-[#1e3a5f] rounded-2xl text-left transition-all group shadow-sm hover:shadow-md"
        >
          <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 group-hover:bg-[#c9a84c]/20 flex items-center justify-center shrink-0 transition-colors">
            <FileText className="w-5 h-5 text-[#c9a84c]" />
          </div>
          <div>
            <p className="text-[#1e3a5f] font-bold text-base tracking-wide uppercase">Add Templates</p>
            <p className="text-gray-400 text-sm mt-0.5">Create document templates for advocates</p>
          </div>
        </button>

      </div>
    </AdminLayout>
  )
}
