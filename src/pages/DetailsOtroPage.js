import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button } from 'react-bootstrap';

function DetailsOtroPage() {
    const { id } = useParams(); // ID del recurso 'Otro'
    const navigate = useNavigate();
    const [otro, setOtro] = useState({
        NombreOtro: '',
        DescripcionOtro: '',
        id_proyecto: ''
    });

    useEffect(() => {
        const fetchOtro = async () => {
            try {
                const response = await axios.get(`https://server-tad-g4.azurewebsites.net/api/otro/${id}`);
                if (response.status === 200) {
                    setOtro(response.data);
                } else {
                    console.error('Error al obtener los detalles del recurso');
                }
            } catch (error) {
                console.error('Error al obtener los detalles del recurso:', error);
            }
        };
        fetchOtro();
        document.body.style.backgroundColor = '#343a40';

        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOtro(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://server-tad-g4.azurewebsites.net/api/otro/${id}`, otro);
            alert('Recurso Otro actualizado correctamente');
            navigate(`/project-details/${otro.id_proyecto}`);
        } catch (error) {
            console.error('Error al actualizar el recurso:', error);
            alert('Error al actualizar el recurso');
        }
    };

    const handleBack = () => {
        navigate(`/project-details/${otro.id_proyecto}`);
    };

    return (
        <Container className="mt-4 bg-dark text-white">
            <Card className="mb-3 bg-dark border-0">
                <Card.Header className="text-white">Detalles del Recurso Otro</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-white">Nombre del Recurso:</Form.Label>
                            <Form.Control
                                type="text"
                                name="NombreOtro"
                                value={otro.NombreOtro}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-white">Descripción del Recurso:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="DescripcionOtro"
                                value={otro.DescripcionOtro}
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

export default DetailsOtroPage;