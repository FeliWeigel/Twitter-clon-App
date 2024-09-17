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
    path: '/home',
    element: (
      <ProtectedRoute>
        <HomePage />
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