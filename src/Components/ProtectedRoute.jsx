import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Adjust path as needed

const ProtectedRoute = ({ element, ...rest }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return user ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
