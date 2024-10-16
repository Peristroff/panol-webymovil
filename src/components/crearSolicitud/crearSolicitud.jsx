import React, { useState } from 'react';
import { Table, Button, Form, Container, Row, Col, Card, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './crearSolicitud.css'; // Archivo CSS para personalización

function CrearSolicitud() {

    const cardData = [
        {
            title: 'Materiales',
            text: 'Encuentra aquí materiales para realizar proyectos de manualidades.',
            img: "src/components/img/4.jpg",
            path: '/administrarPrestamos'
        },
        {
            title: 'Electrónica',
            text: 'Encuentra aquí computadores, datas y similares.',
            img: "src/components/img/2.jpg",
            path: '/administrarItems'
        },
        {
            title: 'Equipo deportivo',
            text: 'Encuentra equipo para hacer deportes, distintos tipos de pelotas y similares.',
            img: "src/components/img/1.jpg",
            path: '/perfil-alumno'
        },
        {
            title: 'Periféricos',
            text: 'Encuentra cables, cargadores, pantallas y otros.',
            img: "src/components/img/3.jpg",
            path: '/administrar-solicitudes'
        },
    ];

    return (
        <div>
            <div id="bienvenida">
                <h2>Crear Solicitud</h2>
            </div>
            <div className="home-div">
                <Row xs={1} md={2} className="g-4" id="cards">
                    {cardData.map((card, idx) => (
                        <Col key={idx}>
                            <Link to={card.path} style={{ textDecoration: 'none' }}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{card.title}</Card.Title>
                                        <img src={card.img} width="100" />
                                        <Card.Text>
                                            {card.text}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default CrearSolicitud;