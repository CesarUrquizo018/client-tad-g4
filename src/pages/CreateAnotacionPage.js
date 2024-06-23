import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CreateAnotacionPage() {
    const { id } = useParams(); 
    const { user } = useUser(); 
    const navigate = useNavigate();

    const [contenidoAnotacion, setContenidoAnotacion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const anotacionData = {
                ContenidoAnotacion: contenidoAnotacion,
                id_usuario: user.id_usuario, 
                id_proyecto: id
            };
            await axios.post(`https://server-tad-g4.azurewebsites.net/api/anotacion`, anotacionData);
            navigate(`/project-details/${id}`); 
        } catch (error) {
            console.error('Error al crear la anotación:', error);
            alert('Error al crear la anotación');
        }
    };

    useEffect(() => {
        document.body.style.backgroundColor = '#343a40';

        return () => {
            document.body.style.backgroundColor = '';
        };
    },);

    const Regresar = () => {
        navigate(`/project-details/${id}`);
    };

    return (
        <Container className="mt-4 bg-dark text-white">
            <h1>Añadir Anotación</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Contenido de la Anotación:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Ingrese el contenido de la anotación"
                        value={contenidoAnotacion}
                        onChange={e => setContenidoAnotacion(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Guardar Anotación</Button>
                <Button variant="secondary" onClick={Regresar} className="ms-2">Regresar</Button>
            </Form>
        </Container>
    );
}

export default CreateAnotacionPage;