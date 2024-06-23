import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from '../components/Header';

function EditUserPage() {
    const navigate = useNavigate();
    const { loginUser } = useUser();
    const { id } = useParams();
    const [usuarioContexto, setUsuarioContexto] = useState({
        nombre: '',
        codigo: '',
        email: '',
        contrasena: '',
        foto_perfil: ''
    });

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await axios.get(`https://server-tad-g4.azurewebsites.net/api/usuarios/${id}`);
                setUsuarioContexto(response.data);
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
            }
        };
        fetchUsuario();
        document.body.style.backgroundColor = '#343a40';

        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUsuarioContexto(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://server-tad-g4.azurewebsites.net/api/usuarios/${id}`, usuarioContexto);
            loginUser(usuarioContexto);  
            navigate('/user');
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
        }
    };

    return (
        <Container className="mt-4 bg-dark text-white">
            <Header />
            <Container className="py-5">
                <h1 className="mb-4">Editar Usuario</h1>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="nombre">
                                <Form.Label>Nombre del Usuario</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    value={usuarioContexto.nombre}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="codigo">
                                <Form.Label>Código</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="codigo"
                                    value={usuarioContexto.codigo}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col md={6}>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={usuarioContexto.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="contrasena">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="contrasena"
                                    value={usuarioContexto.contrasena}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mt-4 justify-content-center">
                        <Col xs="auto">
                            <Button variant="primary" type="submit">Actualizar Usuario</Button>
                        </Col>
                        <Col xs="auto">
                            <Button variant="secondary" onClick={() => navigate('/user')}>Cancelar</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Container>
    );
}

export default EditUserPage;
