import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import userImage from '../images/imagenes-de-usuario.png';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { loginUser } = useUser();

    useEffect(() => {
        document.body.style.backgroundColor = '#343a40';  // Aplica el fondo oscuro

        return () => {
            document.body.style.backgroundColor = '';  // Restablece al estilo predeterminado al salir
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { email, contrasena });
            const { usuario, token } = response.data;

            loginUser(usuario, token);
            setMessage(response.data.message);
            navigate('/home');
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'Error de conexión');
        }
    };

    const handleCreateClick = () => {
        navigate('/register');
    };

    return (
        <div className="bg-dark text-white min-vh-100 d-flex align-items-center justify-content-center">
            <Container className="py-5 d-flex flex-column align-items-center">
                <h1 className="mb-3">INICIAR SESIÓN</h1>
                <Image src={userImage} roundedCircle style={{ width: "150px", height: "auto" }} className="mb-4" />
                <Form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: "320px" }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Correo electrónico:</Form.Label>
                        <Form.Control type="email" placeholder="Colocar correo" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contraseña:</Form.Label>
                        <Form.Control type="password" placeholder="Colocar contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                    </Form.Group>

                    <Row className="mb-3 d-flex justify-content-center">
                        <Col xs="auto">
                            <Button variant="primary" type="submit" className="me-2">LOGIN</Button>
                        </Col>
                        <Col xs="auto">
                            <Button variant="primary" onClick={handleCreateClick}>CREAR CUENTA</Button> 
                        </Col>
                    </Row>
                </Form>
                {message && <p className="message">{message}</p>}
            </Container>
        </div>
    );
}

export default LoginPage;
