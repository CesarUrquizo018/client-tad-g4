import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/DateUtils';
import { useUser } from '../context/UserContext';
import agregarProyectoImg from '../images/agregarProyecto.png';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';

function MyProjectsPage() {
  const { user } = useUser();
  const [proyectos, setProyectos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      obtenerProyectos();
    }
    document.body.style.backgroundColor = '#343a40';  // Aplica el fondo oscuro

    return () => {
        document.body.style.backgroundColor = '';  // Restablece al estilo predeterminado al salir
    };
  }, [user]);

  const obtenerProyectos = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/proyectos/mis-proyectos/${user.id_usuario}`);
      if (response.status === 200) {
        setProyectos(response.data);
      } else {
        console.error('Error al obtener los proyectos');
      }
    } catch (error) {
      console.error('Error al obtener los proyectos:', error);
    }
  };

  const confirmarYBorrarProyecto = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      borrarProyecto(id);
    }
  };

  const borrarProyecto = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/proyectos/${id}`);
      if (response.status === 200) {
        setProyectos(proyectos.filter(proyecto => proyecto.id_proyecto !== id)); // Actualizar la lista de proyectos
        alert('Proyecto eliminado exitosamente.');
      } else {
        console.error('Error al borrar el proyecto');
      }
    } catch (error) {
      console.error('Error al borrar el proyecto:', error);
    }
  };

  const verDetallesProyecto = (id) => {
    navigate(`/project-details/${id}`); // Navegar a la página de detalles del proyecto
  };

  return (
    <Container className="mt-4 bg-dark text-white">
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/home">Home</Nav.Link>
          <Nav.Link as={Link} to="/user">User</Nav.Link>
          <Nav.Link as={Link} to="/myprojects" className="bg-primary">Mis Proyectos</Nav.Link>
          <Nav.Link as={Link} to="/myprojects">Mis mensajes</Nav.Link>
          <Nav.Link as={Link} to="/">Salir</Nav.Link>
        </Nav>
      </Navbar>

      <h1 className="mb-4">Mis Proyectos</h1>
      <Link to="/create-project">
        <Button variant="primary" className="mb-3">
          Crear Proyecto <img src={agregarProyectoImg} alt="Agregar Proyecto" style={{ width: 30, marginLeft: 10 }}/>
        </Button>
      </Link>
      
      {proyectos.map(proyecto => (
        <Card key={proyecto.id_proyecto} className="mb-3 bg-dark text-white" style={{ border: 'none' }}>
          <Card.Body>
            <Card.Title>{proyecto.titulo}</Card.Title>
            <Table striped bordered hover variant="secondary" size="sm" onClick={() => verDetallesProyecto(proyecto.id_proyecto)} style={{ cursor: 'pointer' }}>
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>{proyecto.id_proyecto}</td>
                </tr>
                <tr>
                  <td>Descripción</td>
                  <td>{proyecto.descripcion}</td>
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
            <Button variant="info" onClick={() => navigate(`/edit-project/${proyecto.id_proyecto}`)}>Editar</Button>
            <Button variant="danger" onClick={() => confirmarYBorrarProyecto(proyecto.id_proyecto)} className="ms-2">Borrar</Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default MyProjectsPage;
