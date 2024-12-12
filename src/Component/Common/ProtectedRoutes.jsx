import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  const { accessToken ,user } = useSelector((state) => state.auth);


  if (!accessToken || !user) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;