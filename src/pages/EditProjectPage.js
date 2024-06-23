import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function EditProjectPage() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ciclo, setCiclo] = useState('');
  const [curso, setCurso] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProyecto = async () => {
      try {
        const response = await axios.get(`https://server-tad-g4.azurewebsites.net/api/proyectos/${id}`);
        const { titulo, descripcion, ciclo, curso } = response.data;
        setTitulo(titulo);
        setDescripcion(descripcion);
        setCiclo(ciclo);
        setCurso(curso);
      } catch (error) {
        console.error('Error al obtener el proyecto:', error);
      }
    };
    fetchProyecto();
    document.body.style.backgroundColor = '#343a40'; 

    return () => {
        document.body.style.backgroundColor = ''; 
    };
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const proyecto = { titulo, descripcion, ciclo, curso };
      await axios.put(`https://server-tad-g4.azurewebsites.net/api/proyectos/${id}`, proyecto);
      navigate('/myprojects'); 
    } catch (error) {
      console.error('Error al actualizar el proyecto:', error);
    }
  };

  return (
    <Container className="mt-4 bg-dark text-white d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: "500px" }}>
        <Row>
          <Col md={12}>
            <h1 className="text-center mb-4">Editar Proyecto</h1>
            <Form.Group>
              <Form.Label>Título del Proyecto:</Form.Label>
              <Form.Control
                type="text"
                value={titulo}
                onChange={e => setTitulo(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción:</Form.Label>
              <Form.Control
                as="textarea"
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ciclo:</Form.Label>
              <Form.Control
                type="number"
                value={ciclo}
                onChange={e => setCiclo(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Curso:</Form.Label>
              <Form.Control
                type="text"
                value={curso}
                onChange={e => setCurso(e.target.value)}
                required
              />
            </Form.Group>
            <div className="text-center mt-3">
              <Button variant="primary" type="submit">Actualizar Proyecto</Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default EditProjectPage;
