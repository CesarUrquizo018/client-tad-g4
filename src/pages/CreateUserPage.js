import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import userImage from '../images/agregar-usuario.png';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

function CreateUserPage() {
    const [username, setUsername] = useState('');
    const [codigo, setCodigo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const defaultProfilePhoto = `${username}.jpg`;

    useEffect(() => {
        document.body.style.backgroundColor = '#343a40';  // Aplica el fondo oscuro

        return () => {
            document.body.style.backgroundColor = '';  // Restablece al estilo predeterminado al salir
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://server-tad-g4.azurewebsites.net/api/auth/register`, {
                nombre: username,
                codigo: codigo,
                email: email,
                contrasena: password,
                foto_perfil: defaultProfilePhoto
            });
            setMessage(response.data.message);
            navigate('/home');
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'Error de conexión');
        }
    };

    const handleCreateClick = () => {
        navigate('/login');
    };

    return (
        <div className="bg-dark text-white min-vh-100">
            <Container className="py-5 d-flex flex-column align-items-center bg-dark text-white">
                <h1 className="mb-3">Crear Usuario</h1>
                <Image src={userImage} roundedCircle style={{ width: "150px", height: "auto" }}/>
                <Form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: "320px" }}>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Nombre de usuario:</Form.Label>
                        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formCodigo">
                        <Form.Label>Código:</Form.Label>
                        <Form.Control type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Contraseña:</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>

                    <Row className="mb-3 justify-content-center">
                        <Col xs="auto">
                            <Button variant="primary" type="submit">Crear Usuario</Button>
                        </Col>
                        <Col xs="auto">
                            <Button variant="primary" onClick={handleCreateClick}>Regresar</Button>
                        </Col>
                    </Row>
                </Form>
                {message && <p className="message">{message}</p>}
            </Container>
        </div>
    );
}

export default CreateUserPage;
