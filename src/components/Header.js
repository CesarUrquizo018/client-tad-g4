// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/home">Home</Nav.Link>
        <Nav.Link as={Link} to="/user">User</Nav.Link>
        <Nav.Link as={Link} to="/myprojects">Mis Proyectos</Nav.Link>
        <Nav.Link as={Link} to="/requests" active className="bg-primary">Mis mensajes</Nav.Link>
        <Nav.Link as={Link} to="/">Salir</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
