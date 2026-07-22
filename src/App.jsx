import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/admin/Dashboard'
import AddAdvocate from './pages/admin/AddAdvocate'
import AddTemplate from './pages/admin/AddTemplate'

function Protected({ children }) {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Protected><Dashboard /></Protected>} />
          <Route path="/admin/add-advocate" element={<Protected><AddAdvocate /></Protected>} />
          <Route path="/admin/add-template" element={<Protected><AddTemplate /></Protected>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
