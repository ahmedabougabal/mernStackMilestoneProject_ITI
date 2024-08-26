import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes

const ProtectedRoute = ({ role, children }) => {
  const userRole = localStorage.getItem('userRole'); // *Get the user role from local storage

  if (userRole !== role) {
    //! If the user role doesn't match the required role, redirect to login
    return <Navigate to="/login" />;
  }

  return children; //! If roles match, render the children
};

//***  PropTypes validation
ProtectedRoute.propTypes = {
  role: PropTypes.string.isRequired, // Validate that `role` is a required string
  children: PropTypes.node.isRequired, // Validate that `children` is required and can be any renderable React node
};

export default ProtectedRoute;
