import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

export const useAuth = () => {
  const { token } = useSelector((state) => state.auth)
  return { isAuthenticated: !!token }
}

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  return children
}

export const AuthRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />
  }
  
  return children
}