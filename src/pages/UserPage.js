import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Header from '../components/Header';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import usuarioImg from '../images/usuario.png';  // Importa la imagen

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
    <Container className="mt-4">
      <Header />
      <Card className="bg-dark text-white" style={{ border: 'none' }}>
        <Card.Body>
          <Row className="align-items-center">
            <Col md={3} className="text-center">
              <Image src={usuarioImg} roundedCircle fluid style={{ width: '150px', height: '150px' }} /> {/* Ajusta el tamaño de la imagen */}
              <Card.Title className="mt-3" style={{ fontSize: '1.5rem' }}>¡BIENVENIDO {user.nombre}!</Card.Title>
            </Col>
            <Col md={9}>
              <Card.Text style={{ fontSize: '1.2rem' }}>
                <strong>ID:</strong> {user.id_usuario}
              </Card.Text>
              <Card.Text style={{ fontSize: '1.2rem' }}>
                <strong>Código:</strong> {user.codigo}
              </Card.Text>
              <Card.Text style={{ fontSize: '1.2rem' }}>
                <strong>Email:</strong> {user.email}
              </Card.Text>
              <Card.Text style={{ fontSize: '1.2rem' }}>
                <strong>Contraseña:</strong> {showPassword ? user.contrasena : "********"}
              </Card.Text>
              <Button variant="primary" onClick={toggleShowPassword} className="me-2">
                {showPassword ? 'Ocultar' : 'Mostrar'} Contraseña
              </Button>
              <Button variant="secondary" onClick={() => editarUsuario(user.id_usuario)}>
                Editar
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserPage;
