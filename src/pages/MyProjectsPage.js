import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/DateUtils';
import { useUser } from '../context/UserContext';
import agregarProyectoImg from '../images/agregarProyecto.png';
import Header from '../components/Header';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function MyProjectsPage() {
  const { user } = useUser();
  const [proyectos, setProyectos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log('User object:', user);  // Debugging
      obtenerProyectos();
    }
    document.body.style.backgroundColor = '#343a40';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [user]);

  const obtenerProyectos = async () => {
    try {
      const response = await axios.get(`https://server-tad-g4.azurewebsites.net/api/proyectos/mis-proyectos/${user.id_usuario}`);
      console.log('API response:', response.data);  // Debugging
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
      const response = await axios.delete(`https://server-tad-g4.azurewebsites.net/api/proyectos/${id}`);
      if (response.status === 200) {
        setProyectos(proyectos.filter(proyecto => proyecto.id_proyecto !== id));
        alert('Proyecto eliminado exitosamente.');
      } else {
        console.error('Error al borrar el proyecto');
      }
    } catch (error) {
      console.error('Error al borrar el proyecto:', error);
    }
  };

  const verDetallesProyecto = (id) => {
    navigate(`/project-details/${id}`);
  };

  return (
    <Container className="mt-4 bg-dark text-white">
      <Header />
      <h1 className="mb-4">Mis Proyectos</h1>
      <Link to="/create-project">
        <Button variant="primary" className="mb-3">
          Crear Proyecto <img src={agregarProyectoImg} alt="Agregar Proyecto" style={{ width: 30, marginLeft: 10 }} />
        </Button>
      </Link>
      
      {proyectos.map(proyecto => (
        <Card key={proyecto.id_proyecto} className="mb-3 bg-dark text-white" style={{ border: 'none' }}>
          <Card.Body>
            <Card.Title align-items-center>{proyecto.titulo}</Card.Title>
            <Table striped bordered hover variant="secondary" size="sm" d-flex flex-column>
              <tbody onClick={() => verDetallesProyecto(proyecto.id_proyecto)} style={{ cursor: 'pointer' }}>
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
