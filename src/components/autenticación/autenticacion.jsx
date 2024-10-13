import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './autenticacion.css';

function Autenticacion() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle authentication logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <Container className="login-container">
            <Row className="justify-content-md-center">
                <Col md="4" className="d-flex justify-content-center">
                    <div className="login-box">
                        <h2 className="text-center">Login</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="rounded-input"
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="rounded-input"
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100 rounded-button">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Autenticacion;