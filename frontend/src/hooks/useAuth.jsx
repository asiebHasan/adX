import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom'
import { logout, refreshToken } from '../features/auth/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth || {});

  // Decode JWT safely
  const isTokenValid = useMemo(() => {
    if (!token) return false;
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      console.error("Invalid token format", error);
      return false;
    }
  }, [token]);

  useEffect(() => {
    if (!isTokenValid) {
      console.log("Token expired or invalid, logging out...");

      // Dispatch refresh Token]
      try {
        dispatch(refreshToken());
      } catch (error) {
        console.error("Failed to refresh token", error);
        dispatch(logout()); // Logout if refresh token fails
      }
    }
  }, [isTokenValid, dispatch]);

  return { isAuthenticated: isTokenValid };
};

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