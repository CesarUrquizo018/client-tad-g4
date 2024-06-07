// src/pages/RequestPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { formatDate } from '../utils/DateUtils';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';

function RequestPage() {
  const { user } = useUser();
  const [solicitudes, setSolicitudes] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);

  const obtenerSolicitudes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/solicitudes');
      if (response.status === 200) {
        const userSolicitudes = response.data.filter(solicitud => solicitud.id_usuario === user.id_usuario);
        setSolicitudes(userSolicitudes.filter(solicitud => solicitud.id_estado === 1));
        setAcceptedRequests(userSolicitudes.filter(solicitud => solicitud.id_estado === 2));
        setRejectedRequests(userSolicitudes.filter(solicitud => solicitud.id_estado === 3));
      } else {
        console.error('Error al obtener las solicitudes');
      }
    } catch (error) {
      console.error('Error al obtener las solicitudes:', error);
    }
  };

  useEffect(() => {
    obtenerSolicitudes();
    document.body.style.backgroundColor = '#343a40';  // Aplica el fondo oscuro

    return () => {
      document.body.style.backgroundColor = '';  // Restablece al estilo predeterminado al salir
    };
  }, [user,obtenerSolicitudes]);

  const handleAccept = async (id) => {
    try {
      await axios.post(`http://localhost:8080/api/solicitudes/${id}/accept`);
      obtenerSolicitudes(); // Update requests
    } catch (error) {
      console.error('Error accepting request', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:8080/api/solicitudes/${id}/reject`);
      obtenerSolicitudes(); // Update requests
    } catch (error) {
      console.error('Error rejecting request', error);
    }
  };

  return (
    <Container className="mt-4 bg-dark text-white">
      <Header />

      <h1 className="mb-4">Solicitudes Pendientes</h1>
      {solicitudes.length === 0 ? (
        <p>No se registran solicitudes pendientes</p>
      ) : (
        solicitudes.map(solicitud => (
          <Card key={solicitud.id_solicitud} className="mb-3">
            <Card.Body>
              <Card.Title>Solicitud ID: {solicitud.id_solicitud}</Card.Title>
              <Card.Text>
                <strong>Mensaje:</strong> {solicitud.mensaje}
              </Card.Text>
              <Card.Text>
                <strong>Fecha de Solicitud:</strong> {formatDate(solicitud.fecha_solicitud)}
              </Card.Text>
              <Card.Text>
                <strong>Estado:</strong> {solicitud.id_estado === 2 ? 'Aceptado' : solicitud.id_estado === 3 ? 'Rechazado' : 'En espera'}
              </Card.Text>
              <div className="d-flex justify-content-end">
                <Button variant="success" size="sm" className="me-2" onClick={() => handleAccept(solicitud.id_solicitud)}>Aceptar</Button>
                <Button variant="danger" size="sm" onClick={() => handleReject(solicitud.id_solicitud)}>Rechazar</Button>
              </div>
            </Card.Body>
          </Card>
        ))
      )}

      <h1 className="mb-4">Solicitudes Aceptadas</h1>
      {acceptedRequests.length === 0 ? (
        <p>No se registran solicitudes aceptadas</p>
      ) : (
        acceptedRequests.map(solicitud => (
          <Card key={solicitud.id_solicitud} className="mb-3">
            <Card.Body>
              <Card.Title>Solicitud ID: {solicitud.id_solicitud}</Card.Title>
              <Card.Text>
                <strong>Mensaje:</strong> {solicitud.mensaje}
              </Card.Text>
              <Card.Text>
                <strong>Fecha de Solicitud:</strong> {formatDate(solicitud.fecha_solicitud)}
              </Card.Text>
              <Card.Text>
                <strong>Estado:</strong> Aceptado
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      )}

      <h1 className="mb-4">Solicitudes Rechazadas</h1>
      {rejectedRequests.length === 0 ? (
        <p>No se registran solicitudes rechazadas</p>
      ) : (
        rejectedRequests.map(solicitud => (
          <Card key={solicitud.id_solicitud} className="mb-3">
            <Card.Body>
              <Card.Title>Solicitud ID: {solicitud.id_solicitud}</Card.Title>
              <Card.Text>
                <strong>Mensaje:</strong> {solicitud.mensaje}
              </Card.Text>
              <Card.Text>
                <strong>Fecha de Solicitud:</strong> {formatDate(solicitud.fecha_solicitud)}
              </Card.Text>
              <Card.Text>
                <strong>Estado:</strong> Rechazado
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}

export default RequestPage;
