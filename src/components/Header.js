import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(location.pathname);

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
      <Nav className="me-auto" activeKey={activeKey} onSelect={handleSelect}>
        <Nav.Link as={Link} to="/home" eventKey="/home" className={activeKey === '/home' ? 'bg-primary' : ''}>Home</Nav.Link>
        <Nav.Link as={Link} to="/user" eventKey="/user" className={activeKey === '/user' ? 'bg-primary' : ''}>User</Nav.Link>
        <Nav.Link as={Link} to="/myprojects" eventKey="/myprojects" className={activeKey === '/myprojects' ? 'bg-primary' : ''}>Mis Proyectos</Nav.Link>
        <Nav.Link as={Link} to="/requests" eventKey="/requests" className={activeKey === '/requests' ? 'bg-primary' : ''}>Solicitudes</Nav.Link>
        <Nav.Link as={Link} to="/" eventKey="/" className={activeKey === '/' ? 'bg-primary' : ''}>Salir</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
