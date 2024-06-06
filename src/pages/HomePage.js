import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/DateUtils';
import { useUser } from '../context/UserContext';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function HomePage() {
  const { user } = useUser();
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    obtenerProyectos();
    document.body.style.backgroundColor = '#343a40';  // Aplica el fondo oscuro

    return () => {
      document.body.style.backgroundColor = '';  // Restablece al estilo predeterminado al salir
    };
  }, []); // La dependencia vacía asegura que este efecto se ejecute solo una vez cuando el componente se monta

  const obtenerProyectos = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/proyectos`);
      if (response.status === 200) {
        setProyectos(response.data);
      } else {
        console.error('Error al obtener los proyectos');
      }
    } catch (error) {
      console.error('Error al obtener los proyectos:', error);
    }
  };

  const enviarSolicitud = async (id_proyecto) => {
    try {
      const nuevaSolicitud = {
        id_usuario: user.id_usuario,
        id_proyecto: id_proyecto,
        id_estado: 1,  // Estado "En espera"
        fecha_solicitud: new Date().toISOString().slice(0, 10),
        mensaje: "Solicitud enviada"
      };

      const response = await axios.post('http://localhost:8080/api/solicitudes', nuevaSolicitud);
      if (response.status === 201) {
        alert('Solicitud enviada exitosamente');
      } else {
        console.error('Error al enviar la solicitud');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <Container className="mt-4 bg-dark text-white">
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/home" active className="bg-primary">Home</Nav.Link>
          <Nav.Link as={Link} to="/user">User</Nav.Link>
          <Nav.Link as={Link} to="/myprojects">Mis Proyectos</Nav.Link>
          <Nav.Link as={Link} to="/requests">Mis mensajes</Nav.Link> {/* Update this link */}
          <Nav.Link as={Link} to="/">Salir</Nav.Link>
        </Nav>
      </Navbar>

      <h1 className="mb-4">Proyectos</h1>
      {proyectos.map(proyecto => (
        <Card key={proyecto.id_proyecto} className="mb-3">
          <Card.Body>
            <Card.Title>{proyecto.titulo}</Card.Title>
            <Card.Text>
              {proyecto.descripcion}
            </Card.Text>
            <Table striped bordered hover size="sm" variant="secondary">
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>{proyecto.id_proyecto}</td>
                </tr>
                <tr>
                  <td>Fecha de creación</td>
                  <td>{formatDate(proyecto.fecha_creacion)}</td>
                </tr>
                <tr>
                  <td>Ciclo</td>
                  <td>{proyecto.ciclo}</td>
                </tr>
                <tr>
                  <td>Curso</td>
                  <td>{proyecto.curso}</td>
                </tr>
              </tbody>
            </Table>
            <Button variant="primary" onClick={() => enviarSolicitud(proyecto.id_proyecto)}>ENVIAR SOLICITUD</Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default HomePage;