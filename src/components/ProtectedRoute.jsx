import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ redirectPath = '/signup' }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    // Optionally, render a loading spinner or skeleton here
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="ml-4 text-lg text-gray-700">Loading user data...</p>
      </div>
    );
  }

  if (!currentUser) {
    // If no current user, redirect to the signup page
    return <Navigate to={redirectPath} replace />;
  }

  // If authenticated, render the child routes/components
  return <Outlet />;
};

export default ProtectedRoute;