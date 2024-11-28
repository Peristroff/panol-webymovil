import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './autenticacion.css';

function Autenticacion() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', {
                correo: correo,
                contrasena: contrasena
            });
            // Autenticación exitosa
            console.log('Usuario autenticado:', response.data);
            // Guarda los datos en el local storage
            localStorage.setItem('userData', JSON.stringify(response.data.user));
            localStorage.setItem('isLoggedIn', true);
            // Redirige según el tipo de usuario
            if (response.data.user.tipoUsuario === 'admin') {
                window.location.href = 'http://localhost:5173';
            } else {
                window.location.href = 'http://localhost:5173/crear-solicitud';
            }
        } catch (error) {
            if (error.response) {
                // El servidor respondió con un código de estado fuera del rango 2xx
                console.error('Error de autenticación:', error.response.data.message);
            } else if (error.request) {
                // La solicitud fue hecha pero no se recibió respuesta
                console.error('Sin respuesta del servidor:', error.request);
            } else {
                // Error al configurar la solicitud
                console.error('Error en la solicitud:', error.message);
            }
        }
    };

    return (
        <Container className="login-container">
            <Row className="justify-content-md-center">
                <Col md="4" className="d-flex justify-content-center">
                    <div className="login-box">
                        <h2 className="text-center">Iniciar Sesión</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control
                                    type="email"
                                    placeholder="Ingresar Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="rounded-input"
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control
                                    type="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="rounded-input"
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100 rounded-button">
                                Acceder
                            </Button>
                        </Form>
                        <p className="mt-3">
                            ¿Aún no tienes una cuenta? <a href="/registro" className="link-info">Regístrate aquí</a>
                        </p>
                    </div>
                </Col>
            </Row>

        </Container>
    );
}

export default Autenticacion;