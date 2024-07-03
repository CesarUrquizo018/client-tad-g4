import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function DetailsFuentePage() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const { user } = useUser();
    const [fuentes, setFuentes] = useState([]);
    const [selectedFuente, setSelectedFuente] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newFuente, setNewFuente] = useState({
        NombreFuente: '',
        URLFuente: '',
        FechaPublicacion: ''
    });

    useEffect(() => {
        const fetchFuentes = async () => {
            try {
                const response = await axios.get(`https://server-tad-g4.azurewebsites.net/api/fuente/proyecto/${id}`);
                if (response.status === 200) {
                    setFuentes(response.data);
                } else {
                    console.error('Error al obtener las fuentes');
                }
            } catch (error) {
                console.error('Error al obtener las fuentes:', error);
            }
        };
        fetchFuentes();
        document.body.style.backgroundColor = '#343a40';

        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [id]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedFuente(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleNewFuenteChange = (e) => {
        const { name, value } = e.target;
        setNewFuente(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://server-tad-g4.azurewebsites.net/api/fuente/${selectedFuente.id_fuente}`, selectedFuente);
            alert('Fuente actualizada correctamente');
            setShowEditModal(false);
            setSelectedFuente(null);
            const response = await axios.get(`https://server-tad-g4.azurewebsites.net/api/fuente/proyecto/${id}`);
            setFuentes(response.data);
        } catch (error) {
            console.error('Error al actualizar la fuente:', error);
            alert('Error al actualizar la fuente');
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const newFuenteObj = {
                ...newFuente,
                id_usuario: user.id_usuario,
                id_proyecto: id
            };
            await axios.post(`https://server-tad-g4.azurewebsites.net/api/fuente`, newFuenteObj);
            alert('Fuente añadida correctamente');
            setShowAddModal(false);
            setNewFuente({
                NombreFuente: '',
                URLFuente: '',
                FechaPublicacion: ''
            });
            const response = await axios.get(`https://server-tad-g4.azurewebsites.net/api/fuente/proyecto/${id}`);
            setFuentes(response.data);
        } catch (error) {
            console.error('Error al añadir la fuente:', error);
            alert('Error al añadir la fuente');
        }
    };

    const handleEditModalOpen = (fuente) => {
        setSelectedFuente(fuente);
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
                <Card.Header className="text-white">Detalles de las Fuentes</Card.Header>
                <Card.Body>
                    {fuentes.map(fuente => (
                        <Card key={fuente.id_fuente} className="mb-3 bg-dark text-white">
                            <Card.Body>
                                <Card.Title>{fuente.NombreFuente}</Card.Title>
                                <Card.Text>
                                    <a href={fuente.URLFuente} target="_blank" rel="noopener noreferrer">{fuente.URLFuente}</a><br />
                                    Fecha de Publicación: {fuente.FechaPublicacion}
                                </Card.Text>
                                <Button variant="info" onClick={() => handleEditModalOpen(fuente)}>Editar</Button>
                            </Card.Body>
                        </Card>
                    ))}
                    <Button variant="primary" onClick={handleAddModalOpen}>Añadir Fuente</Button>
                    <Button variant="secondary" onClick={handleBack} className="ms-2">Regresar</Button>
                </Card.Body>
            </Card>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Fuente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre de la Fuente:</Form.Label>
                            <Form.Control
                                type="text"
                                name="NombreFuente"
                                value={selectedFuente?.NombreFuente || ''}
                                onChange={handleEditChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>URL de la Fuente:</Form.Label>
                            <Form.Control
                                type="text"
                                name="URLFuente"
                                value={selectedFuente?.URLFuente || ''}
                                onChange={handleEditChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha de Publicación:</Form.Label>
                            <Form.Control
                                type="date"
                                name="FechaPublicacion"
                                value={selectedFuente?.FechaPublicacion || ''}
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
                    <Modal.Title>Añadir Fuente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre de la Fuente:</Form.Label>
                            <Form.Control
                                type="text"
                                name="NombreFuente"
                                value={newFuente.NombreFuente}
                                onChange={handleNewFuenteChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>URL de la Fuente:</Form.Label>
                            <Form.Control
                                type="text"
                                name="URLFuente"
                                value={newFuente.URLFuente}
                                onChange={handleNewFuenteChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha de Publicación:</Form.Label>
                            <Form.Control
                                type="date"
                                name="FechaPublicacion"
                                value={newFuente.FechaPublicacion}
                                onChange={handleNewFuenteChange}
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

export default DetailsFuentePage;
