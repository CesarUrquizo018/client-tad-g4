import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useUser } from '../context/UserContext'; // Asegúrate de importar el contexto del usuario

const Header = () => {
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(location.pathname);
  const { user, logout } = useUser(); // Obtén el usuario y la función de cierre de sesión del contexto

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
      <Nav className="me-auto" activeKey={activeKey} onSelect={handleSelect}>
        <Nav.Link as={Link} to="/home" eventKey="/home" className={activeKey === '/home' ? 'bg-primary' : ''}>Página Principal</Nav.Link>
        <Nav.Link as={Link} to="/myprojects" eventKey="/myprojects" className={activeKey === '/myprojects' ? 'bg-primary' : ''}>Mis Proyectos</Nav.Link>
        <Nav.Link as={Link} to="/requests" eventKey="/requests" className={activeKey === '/requests' ? 'bg-primary' : ''}>Solicitudes</Nav.Link>
      </Nav>
      <DropdownButton
        id="dropdown-basic-button"
        title={user ? user.nombre : "Usuario"}
        alignRight
        variant="secondary"
      >
        <Dropdown.Item as={Link} to="/user">Usuario</Dropdown.Item>
        <Dropdown.Item onClick={logout}>Cerrar Sesión</Dropdown.Item>
      </DropdownButton>
    </Navbar>
  );
};

export default Header;
