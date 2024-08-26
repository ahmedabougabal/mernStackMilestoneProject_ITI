import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Spinner } from 'flowbite-react';

const ProtectedRoute = ({ role, children }) => {
  const userRole = localStorage.getItem('userRole');
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!userRole) {
    return <Spinner aria-label="Loading..." />;
  }

  if (userRole !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  role: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;