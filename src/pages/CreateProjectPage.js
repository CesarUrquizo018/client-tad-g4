import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CreateProjectPage() {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [ciclo, setCiclo] = useState('');
    const [curso, setCurso] = useState('');
    const navigate = useNavigate();
    const { user } = useUser();

    useEffect(() => {
        document.body.style.backgroundColor = '#343a40';  // Aplica el fondo oscuro
    
        return () => {
            document.body.style.backgroundColor = '';  // Restablece al estilo predeterminado al salir
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const proyecto = {
                titulo,
                descripcion,
                fecha_creacion: new Date().toISOString().slice(0, 10),
                ciclo,
                curso,
                id_usuario: user.id_usuario
            };

            const response = await axios.post(`https://server-tad-g4.azurewebsites.net/api/proyectos`, proyecto);
            if (response.status === 201) {
                navigate('/myprojects');
            } else {
                console.error('Error al crear el proyecto');
            }
        } catch (error) {
            console.error('Error al crear el proyecto:', error);
        }
    };

    return (
        <Container className="mt-5 bg-dark text-white">
            <h1>Crear Nuevo Proyecto</h1>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formTitulo mb-3">
                            <Form.Label className='mb-3'>Título del Proyecto</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Título del proyecto" className='mb-3'
                                value={titulo}
                                onChange={e => setTitulo(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formDescripcion mb-3">
                            <Form.Label className='mb-3'>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Descripción del proyecto" className='mb-3'
                                value={descripcion}
                                onChange={e => setDescripcion(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formCiclo mb-3">
                            <Form.Label className='mb-3'>Ciclo Académico</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ciclo académico" className='mb-3'
                                value={ciclo}
                                onChange={e => setCiclo(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formCurso mb-3">
                            <Form.Label className='mb-3'>Curso Relacionado</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Curso relacionado" className='mb-3'
                                value={curso}
                                onChange={e => setCurso(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-3">
                    <Col xs="auto">
                        <Button variant="primary" type="submit" className="me-2">Crear Proyecto</Button>
                    </Col>
                    <Col xs="auto">
                        <Button variant="primary" onClick={() => navigate('/myprojects')}>Regresar</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default CreateProjectPage;
