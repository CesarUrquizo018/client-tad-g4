import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { formatDate } from '../utils/DateUtils';
import { useUser } from '../context/UserContext';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function DetailsProjectPage() {
    const { user } = useUser();
    const { id } = useParams();
    const [proyecto, setProyecto] = useState(null);
    const [fuentes, setFuentes] = useState([]);
    const [anotaciones, setAnotaciones] = useState([]);
    const [otros, setOtros] = useState([]);
    const [miembros, setMiembros] = useState([]);
    const [loading, setLoading] = useState(true);

    const obtenerProyecto = useCallback(async () => {
        try {
            const response = await axios.get(`https://server-tad-g4.azurewebsites.net/api/proyectos/${id}`);
            if (response.status === 200) {
                setProyecto(response.data);
            } else {
                console.error('Error al obtener los detalles del proyecto');
            }
        } catch (error) {
            console.error('Error al obtener los detalles del proyecto:', error);
        }
    }, [id]);

    const obtenerFuentes = useCallback(async () => {
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
    }, [id]);

    const obtenerAnotaciones = useCallback(async () => {
        try {
            const response = await axios.get(`https://server-tad-g4.azurewebsites.net/api/anotacion/proyecto/${id}`);
            if (response.status === 200) {
                setAnotaciones(response.data);
            } else {
                console.error('Error al obtener las anotaciones');
            }
        } catch (error) {
            console.error('Error al obtener las anotaciones:', error);
        }
    }, [id]);

    const obtenerOtros = useCallback(async () => {
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
    }, [id]);

    const obtenerMiembros = useCallback(async () => {
        try {
            const response = await axios.get(`https://server-tad-g4.azurewebsites.net/api/miembros_proyecto/${id}`);
            if (response.status === 200) {
                setMiembros(response.data);
            } else {
                console.error('Error al obtener los miembros del proyecto');
            }
        } catch (error) {
            console.error('Error al obtener los miembros del proyecto:', error);
        }
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            await obtenerProyecto();
            await obtenerFuentes();
            await obtenerAnotaciones();
            await obtenerOtros();
            await obtenerMiembros();
            setLoading(false);
        };

        fetchData();
        document.body.style.backgroundColor = '#343a40';

        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [id, obtenerProyecto, obtenerFuentes, obtenerAnotaciones, obtenerOtros, obtenerMiembros]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!proyecto) {
        return <div>Proyecto no encontrado</div>;
    }

    return (
        <Container className="mt-4 bg-dark text-white">
            <Card className="bg-dark text-white border-0">
                <Card.Header as="h1" className="text-center">
                    {proyecto.titulo}
                </Card.Header>
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
                <Card.Header as="h2" className="text-center">Miembros del Proyecto</Card.Header>
                <ListGroup variant="flush" className="bg-dark text-white border-0">
                    {miembros.map(miembro => (
                        <ListGroup.Item key={miembro.id_usuario} className="bg-dark text-white border-0">
                            {miembro.usuario.nombre} ({miembro.usuario.email})
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
            <Card className="mt-3 bg-dark text-white border-0">
                <Card.Header as="h2" style={{ display: 'flex', justifyContent: 'space-between' }}>Fuentes
                    <Button variant="info" as={Link} to={`/project-details/${id}/fuente`} className="ms-2">Agregar / Editar</Button>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>URL</th>
                                <th>Fecha de Publicación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fuentes.map(fuente => (
                                <tr key={fuente.id_fuente}>
                                    <td>{fuente.NombreFuente}</td>
                                    <td><a href={fuente.URLFuente} target="_blank" rel="noopener noreferrer">{fuente.URLFuente}</a></td>
                                    <td>{formatDate(fuente.FechaPublicacion)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <Card className="mt-3 bg-dark text-white border-0">
                <Card.Header as="h2" style={{ display: 'flex', justifyContent: 'space-between' }}> Anotaciones
                    <Button variant="info" as={Link} to={`/project-details/${id}/anotacion`} className="ms-2"> Agregar / Editar </Button>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Contenido</th>
                            </tr>
                        </thead>
                        <tbody>
                            {anotaciones.map(anotacion => (
                                <tr key={anotacion.id_anotacion}>
                                    <td>{user.nombre}</td>
                                    <td>{anotacion.ContenidoAnotacion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <Card className="mt-3 bg-dark text-white border-0">
                <Card.Header as="h2" style={{ display: 'flex', justifyContent: 'space-between' }}> Otros Recursos
                    <Button variant="info" as={Link} to={`/project-details/${id}/otro`} className="ms-2">Agregar / Editar</Button>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {otros.map(otro => (
                        <tr key={otro.id_otro}>
                            <td>{otro.NombreOtro}</td>
                            <td>{otro.DescripcionOtro}</td>
                        </tr>
                        ))}
                    </tbody>
                    </Table>
                </Card.Body>
                </Card>
            <div className="mt-3">
                <Button variant="primary" as={Link} to="/myprojects">Volver a mis proyectos</Button>
            </div>
        </Container>
    );
}

export default DetailsProjectPage;
