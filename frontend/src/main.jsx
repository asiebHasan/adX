import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import store from './app/store'
import Layout from './components/Layout.jsx'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register.jsx'
import PasswordChange from './pages/PasswordChange.jsx'
import PasswordReset from './pages/PasswordReset.jsx'
import { ProtectedRoute, AuthRoute } from './hooks/useAuth'

import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={ <AuthRoute><Login /></AuthRoute>} />
          <Route path='/register' element={<AuthRoute><Register /></AuthRoute>} />
          <Route path='/password-reset' element={<AuthRoute><PasswordReset /></AuthRoute>} />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                <PasswordChange />
              </ProtectedRoute>
            }
          />
          <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          <Route path="/" element={<Navigate to="/dashboard" />} />

        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)