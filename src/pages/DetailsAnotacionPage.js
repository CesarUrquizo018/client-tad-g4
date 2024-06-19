import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function DetailsAnotacionPage() {
    const { id } = useParams(); // ID de la anotación
    const navigate = useNavigate();
    const [anotacion, setAnotacion] = useState({
        ContenidoAnotacion: '',
        id_usuario: '',
        id_proyecto: ''
    });

    useEffect(() => {
        const fetchAnotacion = async () => {
            try {
                const response = await axios.get(`https://server-tad-g4.azurewebsites.net/api/anotacion/${id}`);
                if (response.status === 200) {
                    setAnotacion(response.data);
                } else {
                    console.error('Error al obtener los detalles de la anotación');
                }
            } catch (error) {
                console.error('Error al obtener los detalles de la anotación:', error);
            }
        };
        fetchAnotacion();
        document.body.style.backgroundColor = '#343a40';

        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnotacion(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://server-tad-g4.azurewebsites.net/api/anotacion/${id}`, anotacion);
            alert('Anotación actualizada correctamente');
            navigate(`/project-details/${anotacion.id_proyecto}`);
        } catch (error) {
            console.error('Error al actualizar la anotación:', error);
            alert('Error al actualizar la anotación');
        }
    };

    const handleBack = () => {
        navigate(`/project-details/${anotacion.id_proyecto}`);
    };

    return (
        <Container className="mt-4 bg-dark text-white">
            <Card className="mb-3 bg-dark border-0">
                <Card.Header className="text-white">Detalles de la Anotación</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-white">Contenido de la Anotación:</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="ContenidoAnotacion"
                                value={anotacion.ContenidoAnotacion}
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

export default DetailsAnotacionPage;