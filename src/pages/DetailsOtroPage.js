import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function DetailsOtroPage() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const { user } = useUser();
    const [otros, setOtros] = useState([]);
    const [selectedOtro, setSelectedOtro] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newOtro, setNewOtro] = useState({
        NombreOtro: '',
        DescripcionOtro: ''
    });

    useEffect(() => {
        const fetchOtros = async () => {
            try {
                const response = await axios.get(`https://server-tad-g4.azurewebsites.net/api/otro/proyecto/${id}`);
                if (response.status === 200) {
                    setOtros(response.data);
                } else {
                    console.error('Error al obtener los otros');
                }
            } catch (error) {
                console.error('Error al obtener los otros:', error);
            }
        };
        fetchOtros();
        document.body.style.backgroundColor = '#343a40';

        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [id]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedOtro(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleNewOtroChange = (e) => {
        const { name, value } = e.target;
        setNewOtro(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://server-tad-g4.azurewebsites.net/api/otro/${selectedOtro.id_otro}`, selectedOtro);
            alert('Recurso actualizado correctamente');
            setShowEditModal(false);
            setSelectedOtro(null);
            const response = await axios.get(`https://server-tad-g4.azurewebsites.net/api/otro/proyecto/${id}`);
            setOtros(response.data);
        } catch (error) {
            console.error('Error al actualizar el recurso:', error);
            alert('Error al actualizar el recurso');
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const newOtroObj = {
                ...newOtro,
                id_usuario: user.id_usuario,
                id_proyecto: id
            };
            await axios.post(`https://server-tad-g4.azurewebsites.net/api/otro`, newOtroObj);
            alert('Recurso añadido correctamente');
            setShowAddModal(false);
            setNewOtro({
                NombreOtro: '',
                DescripcionOtro: ''
            });
            const response = await axios.get(`https://server-tad-g4.azurewebsites.net/api/otro/proyecto/${id}`);
            setOtros(response.data);
        } catch (error) {
            console.error('Error al añadir el recurso:', error);
            alert('Error al añadir el recurso');
        }
    };

    const handleEditModalOpen = (otro) => {
        setSelectedOtro(otro);
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
                <Card.Header className="text-white">Detalles de Otros Recursos</Card.Header>
                <Card.Body>
                    {otros.map(otro => (
                        <Card key={otro.id_otro} className="mb-3 bg-dark text-white">
                            <Card.Body>
                                <Card.Title>{otro.NombreOtro}</Card.Title>
                                <Card.Text>{otro.DescripcionOtro}</Card.Text>
                                <Button variant="info" onClick={() => handleEditModalOpen(otro)}>Editar</Button>
                            </Card.Body>
                        </Card>
                    ))}
                    <Button variant="primary" onClick={handleAddModalOpen}>Añadir Recurso</Button>
                    <Button variant="secondary" onClick={handleBack} className="ms-2">Regresar</Button>
                </Card.Body>
            </Card>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Recurso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del Recurso:</Form.Label>
                            <Form.Control
                                type="text"
                                name="NombreOtro"
                                value={selectedOtro?.NombreOtro || ''}
                                onChange={handleEditChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripción del Recurso:</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="DescripcionOtro"
                                value={selectedOtro?.DescripcionOtro || ''}
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
                    <Modal.Title>Añadir Recurso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del Recurso:</Form.Label>
                            <Form.Control
                                type="text"
                                name="NombreOtro"
                                value={newOtro.NombreOtro}
                                onChange={handleNewOtroChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripción del Recurso:</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="DescripcionOtro"
                                value={newOtro.DescripcionOtro}
                                onChange={handleNewOtroChange}
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

export default DetailsOtroPage;
