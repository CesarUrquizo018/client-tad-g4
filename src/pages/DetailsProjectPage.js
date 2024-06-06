import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { formatDate } from '../utils/DateUtils';
import { useUser } from '../context/UserContext';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function DetailsProjectPage() {
    const { user } = useUser();
    const { id } = useParams();
    const [proyecto, setProyecto] = useState(null);
    const [fuentes, setFuentes] = useState([]);
    const [anotaciones, setAnotaciones] = useState([]);
    const [otros, setOtros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerProyecto = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/proyectos/${id}`);
                if (response.status === 200) {
                    setProyecto(response.data);
                } else {
                    console.error('Error al obtener los detalles del proyecto');
                }
            } catch (error) {
                console.error('Error al obtener los detalles del proyecto:', error);
            }
        };

        const obtenerFuentes = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/fuente/proyecto/${id}`);
                if (response.status === 200) {
                    setFuentes(response.data);
                } else {
                    console.error('Error al obtener las fuentes');
                }
            } catch (error) {
                console.error('Error al obtener las fuentes:', error);
            }
        };

        const obtenerAnotaciones = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/anotacion/proyecto/${id}`);
                if (response.status === 200) {
                    setAnotaciones(response.data);
                } else {
                    console.error('Error al obtener las anotaciones');
                }
            } catch (error) {
                console.error('Error al obtener las anotaciones:', error);
            }
        };

        const obtenerOtros = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/otro/proyecto/${id}`);
                if (response.status === 200) {
                    setOtros(response.data);
                } else {
                    console.error('Error al obtener los otros');
                }
            } catch (error) {
                console.error('Error al obtener los otros:', error);
            }
        };

        const fetchData = async () => {
            await obtenerProyecto();
            await obtenerFuentes();
            await obtenerAnotaciones();
            await obtenerOtros();
            setLoading(false);
        };

        fetchData();
        document.body.style.backgroundColor = '#343a40';

        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [id]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!proyecto) {
        return <div>Proyecto no encontrado</div>;
    }

    return (
        <Container className="mt-4 bg-dark text-white">
            <Card className="bg-dark text-white border-0">
                <Card.Header as="h1">{proyecto.titulo}</Card.Header>
                <Card.Body>
                    <Card.Text>{proyecto.descripcion}</Card.Text>
                    <ListGroup variant="flush" className="bg-dark text-white border-0">
                        <ListGroup.Item className="bg-dark text-white border-0">Creado por: {user.nombre} ({user.email})</ListGroup.Item>
                        <ListGroup.Item className="bg-dark text-white border-0">Fecha de creación: {formatDate(proyecto.fecha_creacion)}</ListGroup.Item>
                        <ListGroup.Item className="bg-dark text-white border-0">Ciclo: {proyecto.ciclo}</ListGroup.Item>
                        <ListGroup.Item className="bg-dark text-white border-0">Curso: {proyecto.curso}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
            <Card className="mt-3 bg-dark text-white border-0">
                <Card.Header as="h2">Fuentes</Card.Header>
                <ListGroup variant="flush" className="bg-dark text-white border-0">
                    {fuentes.map(fuente => (
                        <ListGroup.Item key={fuente.id_fuente} className="bg-dark text-white border-0">
                            {fuente.NombreFuente} - {fuente.URLFuente} - {formatDate(fuente.FechaPublicacion)}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
            <Card className="mt-3 bg-dark text-white border-0">
                <Card.Header as="h2">Anotaciones</Card.Header>
                <ListGroup variant="flush" className="bg-dark text-white border-0">
                    {anotaciones.map(anotacion => (
                        <ListGroup.Item key={anotacion.id_anotacion} className="bg-dark text-white border-0">
                            {anotacion.ContenidoAnotacion} - {user.nombre}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
            <Card className="mt-3 bg-dark text-white border-0">
                <Card.Header as="h2">Otros Recursos</Card.Header>
                <ListGroup variant="flush" className="bg-dark text-white border-0">
                    {otros.map(otro => (
                        <ListGroup.Item key={otro.id_otro} className="bg-dark text-white border-0">
                            {otro.NombreOtro}: {otro.DescripcionOtro}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
            <div className="mt-3">
                <Button variant="primary" as={Link} to="/myprojects">Volver a mis proyectos</Button>
            </div>
        </Container>
    );
}

export default DetailsProjectPage;
