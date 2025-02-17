import React from 'react'
import ReactDOM from "react-dom/client"
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import HomePage from './components/home/HomePage.jsx'
import RegisterPage from './components/auth/RegisterPage.jsx'
import LogInPage from './components/auth/LogInPage.jsx'
import { AuthProvider } from './components/auth/AuthProvider.jsx'
import UserProfilePage from './components/userProfile/UserProfilePage.jsx'
import OAuthRedirectPage from './components/auth/OAuthRedirectPage.jsx'

const router = createBrowserRouter([
  {
    path: '/auth/login',
    element: <LogInPage />,
  },
  {
    path: '/auth/register',
    element: <RegisterPage />,
  },
  {
    path: '/auth/redirect',
    element: <OAuthRedirectPage />,
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/user/profile/:username',
    element: (
      <ProtectedRoute>
        <UserProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
  </React.StrictMode>
);