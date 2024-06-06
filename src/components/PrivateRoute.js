// src/components/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { user } = useUser();  // Obtener el estado de autenticación del usuario desde el contexto

  return user ? <Element {...rest} /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

