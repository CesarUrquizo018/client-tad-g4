import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function DetailsAnotacionPage() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const { user } = useUser();
    const [anotaciones, setAnotaciones] = useState([]);
    const [selectedAnotacion, setSelectedAnotacion] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newAnotacion, setNewAnotacion] = useState({
        ContenidoAnotacion: '',
        id_usuario: '',
        id_proyecto: id
    });

    useEffect(() => {
        const fetchAnotaciones = async () => {
            try {
                const response = await axios.get(`https://server-tad-g4.azurewebsites.net/api/anotacion/proyecto/${id}`);
                if (response.status === 200) {
                    setAnotaciones(response.data);
                } else {
                    console.error('Error al obtener las anotaciones');
                }
            } catch (error) {
                console.error('Error al obtener las anotaciones:', error);
            }
        };
        fetchAnotaciones();
        document.body.style.backgroundColor = '#343a40';

        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [id]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedAnotacion(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleNewAnotacionChange = (e) => {
        const { name, value } = e.target;
        setNewAnotacion(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://server-tad-g4.azurewebsites.net/api/anotacion/${selectedAnotacion.id_anotacion}`, selectedAnotacion);
            alert('Anotación actualizada correctamente');
            setShowEditModal(false);
            setSelectedAnotacion(null);
            const response = await axios.get(`https://server-tad-g4.azurewebsites.net/api/anotacion/proyecto/${id}`);
            setAnotaciones(response.data);
        } catch (error) {
            console.error('Error al actualizar la anotación:', error);
            alert('Error al actualizar la anotación');
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const newAnotacionObj = {
                ...newAnotacion,
                id_usuario: user.id_usuario,
                id_proyecto: id
            };
            await axios.post(`https://server-tad-g4.azurewebsites.net/api/anotacion`, newAnotacionObj);
            alert('Anotación añadida correctamente');
            setShowAddModal(false);
            setNewAnotacion({
                ContenidoAnotacion: '',
                id_usuario: '',
                id_proyecto: id
            });
            const response = await axios.get(`https://server-tad-g4.azurewebsites.net/api/anotacion/proyecto/${id}`);
            setAnotaciones(response.data);
        } catch (error) {
            console.error('Error al añadir la anotación:', error);
            alert('Error al añadir la anotación');
        }
    };

    const handleEditModalOpen = (anotacion) => {
        setSelectedAnotacion(anotacion);
        setShowEditModal(true);
    };

    const handleAddModalOpen = () => {
        setShowAddModal(true);
    };

    const handleBack = () => {
        navigate(`/project-details/${id}`);
    };

    return (
        <Container className="mt-4 bg-dark text-white">
            <Card className="mb-3 bg-dark border-0">
                <Card.Header className="text-white">Detalles de las Anotaciones</Card.Header>
                <Card.Body>
                    {anotaciones.map(anotacion => (
                        <Card key={anotacion.id_anotacion} className="mb-3 bg-dark text-white">
                            <Card.Body>
                                <Card.Text>{anotacion.ContenidoAnotacion}</Card.Text>
                                <Button variant="info" onClick={() => handleEditModalOpen(anotacion)}>Editar</Button>
                            </Card.Body>
                        </Card>
                    ))}
                    <Button variant="primary" onClick={handleAddModalOpen}>Añadir Anotación</Button>
                    <Button variant="secondary" onClick={handleBack} className="ms-2">Regresar</Button>
                </Card.Body>
            </Card>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Anotación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Contenido de la Anotación:</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="ContenidoAnotacion"
                                value={selectedAnotacion?.ContenidoAnotacion || ''}
                                onChange={handleEditChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Actualizar</Button>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)} className="ms-2">Cancelar</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir Anotación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Contenido de la Anotación:</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="ContenidoAnotacion"
                                value={newAnotacion.ContenidoAnotacion}
                                onChange={handleNewAnotacionChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Añadir</Button>
                        <Button variant="secondary" onClick={() => setShowAddModal(false)} className="ms-2">Cancelar</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default DetailsAnotacionPage;
