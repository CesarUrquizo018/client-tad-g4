import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link,useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerProyecto = async () => {
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
        };

        const obtenerFuentes = async () => {
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
        };

        const obtenerAnotaciones = async () => {
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
        };

        const obtenerOtros = async () => {
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

    const crearFuente = (id) => {
        navigate(`/create-fuente/${id}`);
      };

    
    const eliminarFuente = async (idFuente) => {
        try {
            const response = await axios.delete(`https://server-tad-g4.azurewebsites.net/api/fuente/${idFuente}`);
            if (response.status === 200) {
                // Actualizar la lista de fuentes después de eliminar
                const updatedFuentes = fuentes.filter(fuente => fuente.id_fuente !== idFuente);
                setFuentes(updatedFuentes);
            } else {
                console.error('Error al eliminar la fuente');
            }
        } catch (error) {
            console.error('Error al eliminar la fuente:', error);
        }
    };

    const navigarDetalleFuente = (idFuente) => {
        navigate(`/details-fuente/${idFuente}`);
    };

    const crearAnotacion = (id) => {
        navigate(`/create-anotacion/${id}`);
      };

    
    const eliminarAnotacion = async (idAnotacion) => {
        try {
            const response = await axios.delete(`https://server-tad-g4.azurewebsites.net/api/anotacion/${idAnotacion}`);
            if (response.status === 200) {
                // Actualizar la lista de anotaciones después de eliminar
                const updatedAnotaciones = anotaciones.filter(anotacion => anotacion.id_anotacion !== idAnotacion);
                setAnotaciones(updatedAnotaciones);
            } else {
                console.error('Error al eliminar la anotacion');
            }
        } catch (error) {
            console.error('Error al eliminar la anotacion:', error);
        }
    };

    const navigarDetalleAnotacion = (idAnotacion) => {
        navigate(`/details-anotacion/${idAnotacion}`);
    };

    const crearOtro = (id) => {
        navigate(`/create-otro/${id}`);
      };

    
    const eliminarOtro = async (idOtro) => {
        try {
            const response = await axios.delete(`https://server-tad-g4.azurewebsites.net/api/otro/${idOtro}`);
            if (response.status === 200) {
                // Actualizar la lista de Otros después de eliminar
                const updatedOtros = otros.filter(otro => otro.id_otro !== idOtro);
                setOtros(updatedOtros);
            } else {
                console.error('Error al eliminar otros');
            }
        } catch (error) {
            console.error('Error al eliminar la otros:', error);
        }
    };

    const navigarDetalleOtro = (idOtro) => {
        navigate(`/details-otro/${idOtro}`);
    };

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
                    <Button variant="primary" className="mb-3" onClick={() => crearFuente(proyecto.id_proyecto)} style={{ width: 150, marginLeft: 10 }}>
                    Crear Fuente 
                    </Button>
                <ListGroup variant="flush" className="bg-dark text-white border-0">
                    {fuentes.map(fuente => (
                        <ListGroup.Item key={fuente.id_fuente} className="bg-dark text-white border-0 d-flex justify-content-between align-items-center">
                        <div>
                            {fuente.NombreFuente} - {fuente.URLFuente} - {formatDate(fuente.FechaPublicacion)}
                        </div>
                        <div>
                            <Button variant="primary" onClick={() => navigarDetalleFuente(fuente.id_fuente)}>
                                Ver Detalles
                            </Button>
                            <Button variant="danger" className="ml-3" onClick={() => eliminarFuente(fuente.id_fuente)}>
                                Eliminar
                            </Button>
                        </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
            <Card className="mt-3 bg-dark text-white border-0">
                <Card.Header as="h2">Anotaciones</Card.Header>
                <Button variant="primary" className="mb-3" onClick={() => crearAnotacion(proyecto.id_proyecto)} style={{ width: 150, marginLeft: 10 }}>
                    Crear Anotacion 
                </Button>
                <ListGroup variant="flush" className="bg-dark text-white border-0">
                    {anotaciones.map(anotacion => (
                        <ListGroup.Item key={anotacion.id_anotacion} className="bg-dark text-white border-0 d-flex justify-content-between align-items-center">
                        <div>
                            {anotacion.ContenidoAnotacion} - {user.nombre}
                        </div>
                        <div>
                            <Button variant="primary" onClick={() => navigarDetalleAnotacion(anotacion.id_anotacion)}>
                                Ver Detalles
                            </Button>
                            <Button variant="danger" className="ml-3" onClick={() => eliminarAnotacion(anotacion.id_anotacion)}>
                                Eliminar
                            </Button>
                        </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
            <Card className="mt-3 bg-dark text-white border-0">
                <Card.Header as="h2">Otros Recursos</Card.Header>
                <Button variant="primary" className="mb-3" onClick={() => crearOtro(proyecto.id_proyecto)} style={{ width: 200, marginLeft: 10 }}>
                    Crear Otro Recurso 
                </Button>
                <ListGroup variant="flush" className="bg-dark text-white border-0">
                    {otros.map(otro => (
                        <ListGroup.Item key={otro.id_otro} className="bg-dark text-white border-0 d-flex justify-content-between align-items-center">
                        <div>
                            {otro.NombreOtro} - {otro.DescripcionOtro}
                        </div>
                        <div>
                            <Button variant="primary" onClick={() => navigarDetalleOtro(otro.id_otro)}>
                                Ver Detalles
                            </Button>
                            <Button variant="danger" className="ml-3" onClick={() => eliminarOtro(otro.id_otro)}>
                                Eliminar
                            </Button>
                        </div>
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