import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function CreateFuentePage() {
    const { id } = useParams(); // ID del proyecto al que se añadirá la fuente
    const navigate = useNavigate();

    const [nombreFuente, setNombreFuente] = useState('');
    const [urlFuente, setUrlFuente] = useState('');
    const [fechaPublicacion, setFechaPublicacion] = useState('');

    useEffect(() => {
        document.body.style.backgroundColor = '#343a40';

        return () => {
            document.body.style.backgroundColor = '';
        };
    },);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const fuenteData = {
                NombreFuente: nombreFuente,
                URLFuente: urlFuente,
                FechaPublicacion: fechaPublicacion,
                id_proyecto: id // Asumiendo que tienes el ID del proyecto desde los parámetros
            };
            await axios.post(`https://server-tad-g4.azurewebsites.net/api/fuente`, fuenteData);
            navigate(`/project-details/${id}`); // Redirigir al detalle del proyecto después de crear la fuente
        } catch (error) {
            console.error('Error al crear la fuente:', error);
        }
    };

    const Regresar = () => {
        navigate(`/project-details/${id}`);
    };

    return (
        <Container className="mt-4 bg-dark text-white">
            <h1>Añadir Fuente</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre de la Fuente:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre de la fuente"
                        value={nombreFuente}
                        onChange={e => setNombreFuente(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>URL de la Fuente:</Form.Label>
                    <Form.Control
                        type="url"
                        placeholder="Ingrese la URL de la fuente"
                        value={urlFuente}
                        onChange={e => setUrlFuente(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Fecha de Publicación:</Form.Label>
                    <Form.Control
                        type="date"
                        value={fechaPublicacion}
                        onChange={e => setFechaPublicacion(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Guardar Fuente</Button>
                <Button variant="secondary" onClick={Regresar} className="ms-2">Regresar</Button>
            </Form>
        </Container>
    );
}
export default CreateFuentePage;