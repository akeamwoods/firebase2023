import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjust path as necessary

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth(); // Include the loading state
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Or show a spinner/loading indicator
  }

  if (!currentUser) {
    // Redirect them to the /login page, but save the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
