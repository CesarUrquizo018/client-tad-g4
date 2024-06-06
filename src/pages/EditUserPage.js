import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
//import '../assets/styles/edit_user.css';
 
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
                const response = await axios.get(`http://localhost:8080/api/usuarios/${id}`);
                setUsuarioContexto(response.data);
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
            }
        };
        fetchUsuario();
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
            await axios.put(`http://localhost:8080/api/usuarios/${id}`, usuarioContexto);
            loginUser(usuarioContexto);  // Actualizar el estado global del usuario
            navigate('/user');
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
        }
    };

    return (
        <div className="form-container">
            <h1>Editar Usuario</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre" className="label">Nombre del Usuario:</label>
                    <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        className="input"
                        value={usuarioContexto.nombre}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="codigo" className="label">Código:</label>
                    <textarea
                        id="codigo"
                        name="codigo"
                        className="textarea"
                        value={usuarioContexto.codigo}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="label">Email:</label>
                    <input
                        id="email"
                        type="text"
                        name="email"
                        className="input"
                        value={usuarioContexto.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="contrasena" className="label">Contraseña:</label>
                    <input
                        id="contrasena"
                        type="text"
                        name="contrasena"
                        className="input"
                        value={usuarioContexto.contrasena}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="button">Actualizar Usuario</button>
            </form>
        </div>
    );
}

export default EditUserPage;
