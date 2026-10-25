import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Pages that need a signed-in user. Others are sent to /login and returned afterwards.
export default function ProtectedRoute() {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return <Outlet />
}
