// src/pages/HomePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDate } from '../utils/DateUtils';
import { useUser } from '../context/UserContext';
import Header from '../components/Header';
import Modal from 'react-bootstrap/Modal';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function HomePage() {
  const { user } = useUser();
  const [proyectos, setProyectos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    obtenerProyectos();
    document.body.style.backgroundColor = '#343a40';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const obtenerProyectos = async () => {
    try {
      const response = await axios.get(`https://server-tad-g4.azurewebsites.net/api/proyectos`);
      if (response.status === 200) {
        setProyectos(response.data);
      } else {
        console.error('Error al obtener los proyectos');
      }
    } catch (error) {
      console.error('Error al obtener los proyectos:', error);
    }
  };

  const enviarSolicitud = async () => {
    try {
      const nuevaSolicitud = {
        id_usuario: user.id_usuario,
        id_proyecto: selectedProject,
        mensaje
      };

      const response = await axios.post(`https://server-tad-g4.azurewebsites.net/api/solicitudes`, nuevaSolicitud);
      if (response.status === 201) {
        alert('Solicitud enviada exitosamente');
        setShowModal(false);
        setMensaje('');
      } else {
        console.error('Error al enviar la solicitud');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  const handleSendRequest = (projectId) => {
    setSelectedProject(projectId);
    setShowModal(true);
  };

  return (
    <Container className="mt-4 bg-dark text-white">
      <Header />
      <h1 className="mb-4 text-white">Proyectos</h1>
      {proyectos.map(proyecto => (
        <Card key={proyecto.id_proyecto} className="mb-3" >
          <Card.Body >
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
            <Button variant="primary" onClick={() => handleSendRequest(proyecto.id_proyecto)}>ENVIAR SOLICITUD</Button>
          </Card.Body>
        </Card>
      ))}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enviar Solicitud</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formMensaje">
              <Form.Label>Mensaje:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Escribe un mensaje para el propietario del proyecto"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={enviarSolicitud}>Enviar Solicitud</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default HomePage;
