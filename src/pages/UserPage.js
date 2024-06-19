import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Header from '../components/Header';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function UserPage() {
  const { user } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = '#343a40';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (!user) {
    return (
      <Container className="mt-4">
        <p>No se ha iniciado sesión. Por favor, vuelve a la página de inicio de sesión.</p>
        <Link to="/login">Ir a Iniciar Sesión</Link>
      </Container>
    );
  }

  const editarUsuario = (id) => {
    navigate(`/edit-usuario/${id}`);
  };

  return (
    <Container className="mt-4 bg-dark text-white">
      <Header />
      <Card className="bg-dark text-white align-items-center" style={{ border: 'none' }}>
        <Card.Body>
          <Card.Title>!BIENVENIDO {user.nombre} ¡</Card.Title>
          <Table striped bordered hover size="sm" variant="secondary">
            <tbody>
              <tr>
                <td>ID</td>
                <td>{user.id_usuario}</td>
              </tr>
              <tr>
                <td>Código</td>
                <td>{user.codigo}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>Contraseña</td>
                <td>{showPassword ? user.contrasena : "********"}</td>
              </tr>
            </tbody>
          </Table>
          <Button variant="primary" onClick={toggleShowPassword}>
            {showPassword ? 'Ocultar' : 'Mostrar'} Contraseña
          </Button>
          <Button variant="primary" onClick={() => editarUsuario(user.id_usuario)} className="ms-2">
            Editar
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserPage;
