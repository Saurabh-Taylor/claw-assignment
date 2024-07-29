import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuth, message, children }) => {
  if (isAuth) {
    return <Navigate to="/" />;
  }else{
    <Navigate to="login" />
  }
  return children;
};

export default ProtectedRoute;
