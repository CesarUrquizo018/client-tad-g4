import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CreateOtroPage() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    const [nombreOtro, setNombreOtro] = useState('');
    const [descripcionOtro, setDescripcionOtro] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const otroData = {
                NombreOtro: nombreOtro,
                DescripcionOtro: descripcionOtro,
                id_proyecto: id
            };
            await axios.post(`https://server-tad-g4.azurewebsites.net/api/otro`, otroData);
            navigate(`/project-details/${id}`); 
        } catch (error) {
            console.error('Error al crear el recurso Otro:', error);
            alert('Error al crear el recurso Otro');
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
            <h1>Añadir Otro Recurso</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre del Recurso:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre del recurso"
                        value={nombreOtro}
                        onChange={e => setNombreOtro(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Descripción del Recurso:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Ingrese la descripción del recurso"
                        value={descripcionOtro}
                        onChange={e => setDescripcionOtro(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Guardar Recurso</Button>
                <Button variant="secondary" onClick={Regresar} className="ms-2">Regresar</Button>
            </Form>
        </Container>
    );
}

export default CreateOtroPage;