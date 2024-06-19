import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function DetailsFuentePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [fuente, setFuente] = useState({
        NombreFuente: '',
        URLFuente: '',
        FechaPublicacion: ''
    });

    useEffect(() => {
        const fetchFuente = async () => {
            try {
                const response = await axios.get(`https://server-tad-g4.azurewebsites.net/api/fuente/${id}`);
                if (response.status === 200) {
                    setFuente(response.data);
                } else {
                    console.error('Error al obtener los detalles de la fuente');
                }
            } catch (error) {
                console.error('Error al obtener los detalles de la fuente:', error);
            }
        };
        fetchFuente();
        document.body.style.backgroundColor = '#343a40';

        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFuente(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://server-tad-g4.azurewebsites.net/api/fuente/${id}`, fuente);
            alert('Fuente actualizada correctamente');
            navigate(`/project-details/${fuente.id_proyecto}`);
        } catch (error) {
            console.error('Error al actualizar la fuente:', error);
            alert('Error al actualizar la fuente');
        }
    };

    const handleBack = () => {
        navigate(`/project-details/${fuente.id_proyecto}`);
    };

    return (
        <Container className="mt-4 bg-dark text-white">
            <Card className="mb-3 bg-dark border-0">
                <Card.Header className="text-white">Detalles de la Fuente</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-white">Nombre de la Fuente:</Form.Label>
                            <Form.Control
                                type="text"
                                name="NombreFuente"
                                value={fuente.NombreFuente}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-white">URL de la Fuente:</Form.Label>
                            <Form.Control
                                type="url"
                                name="URLFuente"
                                value={fuente.URLFuente}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-white">Fecha de Publicación:</Form.Label>
                            <Form.Control
                                type="date"
                                name="FechaPublicacion"
                                value={fuente.FechaPublicacion}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Actualizar</Button>
                        <Button variant="secondary" onClick={handleBack} className="ms-2">Regresar</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default DetailsFuentePage;