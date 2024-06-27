import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { formatDate } from '../utils/DateUtils';
import { useUser } from '../context/UserContext';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

function HomePage() {
  const { user } = useUser();
  const [proyectos, setProyectos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(true);

  const obtenerProyectos = useCallback(async () => {
    try {
      const response = await axios.get('https://server-tad-g4.azurewebsites.net/api/proyectos');
      if (response.status === 200) {
        const proyectosFiltrados = response.data.filter(proyecto => proyecto.id_usuario !== user.id_usuario);
        setProyectos(proyectosFiltrados);
      } else {
        console.error('Error al obtener los proyectos');
      }
    } catch (error) {
      console.error('Error al obtener los proyectos:', error);
    } finally {
      setLoading(false);
    }
  }, [user.id_usuario]);

  useEffect(() => {
    obtenerProyectos();
    document.body.style.backgroundColor = '#343a40';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [obtenerProyectos]);

  const enviarSolicitud = async () => {
    try {
      const nuevaSolicitud = {
        id_remitente: user.id_usuario,
        id_proyecto: currentProject.id_proyecto,
        id_estado: 1,
        fecha_solicitud: new Date().toISOString().slice(0, 10),
        mensaje
      };

      const response = await axios.post('https://server-tad-g4.azurewebsites.net/api/solicitudes', nuevaSolicitud);
      if (response.status === 201) {
        alert('Solicitud enviada exitosamente');
        setShowModal(false);
      } else {
        console.error('Error al enviar la solicitud');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  const handleOpenModal = (project) => {
    setCurrentProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setMensaje('');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container className="mt-4 bg-dark text-white">
      <Header />
      <h1 className="mb-4 text-white">Proyectos</h1>
      {proyectos.map(proyecto => (
        <Card key={proyecto.id_proyecto} className="mb-3">
          <Card.Body>
            <Card.Title>{proyecto.titulo}</Card.Title>
            <Card.Text>{proyecto.descripcion}</Card.Text>
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
                <tr>
                  <td>Creador</td>
                  <td>{proyecto.creador?.nombre}</td>
                </tr>
              </tbody>
            </Table>
            <Button variant="primary" onClick={() => handleOpenModal(proyecto)}>ENVIAR SOLICITUD</Button>
          </Card.Body>
        </Card>
      ))}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enviar Solicitud</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="mensaje">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={enviarSolicitud}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default HomePage;
