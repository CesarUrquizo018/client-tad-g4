// src/components/Loading.js

import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <Spinner animation="border" role="status">
      <span className="sr-only">Cargando...</span>
    </Spinner>
  </div>
);

export default Loading;
