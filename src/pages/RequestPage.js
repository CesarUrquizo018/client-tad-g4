import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { formatDate } from '../utils/DateUtils';
import Header from '../components/Header';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Alert from 'react-bootstrap/Alert';

function RequestPage() {
  const { user } = useUser();
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  const obtenerSolicitudes = useCallback(async () => {
    try {
      const response = await axios.get('https://server-tad-g4.azurewebsites.net/api/solicitudes');
      if (response.status === 200) {
        const userReceivedRequests = response.data.filter(solicitud => solicitud.id_receptor === user.id_usuario);
        const userSentRequests = response.data.filter(solicitud => solicitud.id_remitente === user.id_usuario);

        setReceivedRequests(userReceivedRequests);
        setSentRequests(userSentRequests);
      } else {
        console.error('Error al obtener las solicitudes');
      }
    } catch (error) {
      console.error('Error al obtener las solicitudes:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      obtenerSolicitudes();
    }

    document.body.style.backgroundColor = '#343a40';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [user, obtenerSolicitudes]);

  const handleAccept = async (id) => {
    try {
      await axios.post(`https://server-tad-g4.azurewebsites.net/api/solicitudes/${id}/accept`);
      setSuccessMessage('Solicitud aceptada exitosamente.');
      obtenerSolicitudes();
    } catch (error) {
      console.error('Error al aceptar la solicitud', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`https://server-tad-g4.azurewebsites.net/api/solicitudes/${id}/reject`);
      setSuccessMessage('Solicitud rechazada exitosamente.');
      obtenerSolicitudes();
    } catch (error) {
      console.error('Error al rechazar la solicitud', error);
    }
  };

  return (
    <Container className="mt-4 bg-dark text-white">
      <Header />
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {successMessage && <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>{successMessage}</Alert>}
          <Tabs defaultActiveKey="received" className="mb-3">
            <Tab eventKey="received" title="Recibidas">
              <h1 className="mb-4">Solicitudes Recibidas</h1>
              {receivedRequests.length === 0 ? (
                <p>No tienes solicitudes pendientes</p>
              ) : (
                receivedRequests.map(solicitud => (
                  <Card key={solicitud.id_solicitud} className="mb-3">
                    <Card.Body>
                      <Card.Title>Solicitud ID: {solicitud.id_solicitud}</Card.Title>
                      <Card.Text><strong>Proyecto:</strong> {solicitud.proyecto_titulo}</Card.Text>
                      <Card.Text><strong>Mensaje:</strong> {solicitud.mensaje}</Card.Text>
                      <Card.Text><strong>Fecha de Solicitud:</strong> {formatDate(solicitud.fecha_solicitud)}</Card.Text>
                      <Card.Text><strong>Estado:</strong> {solicitud.id_estado === 2 ? 'Aceptado' : solicitud.id_estado === 3 ? 'Rechazado' : 'En espera'}</Card.Text>
                      {solicitud.id_estado === 1 && (
                        <div className="d-flex justify-content-end">
                          <Button variant="success" size="sm" className="me-2" onClick={() => handleAccept(solicitud.id_solicitud)}>Aceptar</Button>
                          <Button variant="danger" size="sm" onClick={() => handleReject(solicitud.id_solicitud)}>Rechazar</Button>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                ))
              )}
            </Tab>
            <Tab eventKey="sent" title="Enviadas">
              <h1 className="mb-4">Mis Solicitudes Enviadas</h1>
              {sentRequests.length === 0 ? (
                <p>No has enviado ninguna solicitud</p>
              ) : (
                sentRequests.map(solicitud => (
                  <Card key={solicitud.id_solicitud} className="mb-3">
                    <Card.Body>
                      <Card.Title>Solicitud ID: {solicitud.id_solicitud}</Card.Title>
                      <Card.Text><strong>Proyecto:</strong> {solicitud.proyecto_titulo}</Card.Text>
                      <Card.Text><strong>Mensaje:</strong> {solicitud.mensaje}</Card.Text>
                      <Card.Text><strong>Fecha de Solicitud:</strong> {formatDate(solicitud.fecha_solicitud)}</Card.Text>
                      <Card.Text><strong>Estado:</strong> {solicitud.id_estado === 2 ? 'Aceptado' : solicitud.id_estado === 3 ? 'Rechazado' : 'En espera'}</Card.Text>
                    </Card.Body>
                  </Card>
                ))
              )}
            </Tab>
            <Tab eventKey="history" title="Historial">
              <h1 className="mb-4">Historial de Solicitudes</h1>
              {receivedRequests.concat(sentRequests).filter(solicitud => solicitud.id_estado !== 1).length === 0 ? (
                <p>No hay historial de solicitudes</p>
              ) : (
                receivedRequests.concat(sentRequests).filter(solicitud => solicitud.id_estado !== 1).map(solicitud => (
                  <Card key={solicitud.id_solicitud} className="mb-3">
                    <Card.Body>
                      <Card.Title>Solicitud ID: {solicitud.id_solicitud}</Card.Title>
                      <Card.Text><strong>Proyecto:</strong> {solicitud.proyecto_titulo}</Card.Text>
                      <Card.Text><strong>Mensaje:</strong> {solicitud.mensaje}</Card.Text>
                      <Card.Text><strong>Fecha de Solicitud:</strong> {formatDate(solicitud.fecha_solicitud)}</Card.Text>
                      <Card.Text><strong>Estado:</strong> {solicitud.id_estado === 2 ? 'Aceptado' : 'Rechazado'}</Card.Text>
                    </Card.Body>
                  </Card>
                ))
              )}
            </Tab>
          </Tabs>
        </>
      )}
    </Container>
  );
}

export default RequestPage;
