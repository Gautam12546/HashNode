import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../common/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner label="Checking your session..." />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
