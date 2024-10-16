import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Container, Row, Col, InputGroup } from 'react-bootstrap';
import './administrarPrestamos.css'; // Archivo CSS para personalización

function AdministrarPrestamos() {
    const [items, setItems] = useState([
        { id: 1, name: 'Notebook 1', user: 'Juan', date: '2024-9-20', returnDate: '2024-10-20', daysRemaining: 1, category: 'Categoría 1', userRecieved: 1, stock: 21,  price: '150000'},
        { id: 2, name: 'Pantalla', user: 'Jerry', date: '2024-9-20', returnDate: '2024-10-20', daysRemaining: 1, category: 'Categoría 2', userRecieved: 2, stock: 11, price: '25000'},
        { id: 3, name: 'Cargador', user: 'Pablo', date: '2024-9-20', returnDate: '2024-10-20', daysRemaining: 1, category: 'Categoría 3', userRecieved: 5, stock: 69, price: '30000'},
        { id: 4, name: 'Notebook', user: 'Isaac', date: '2024-9-20', returnDate: '2024-10-20', daysRemaining: 1, category: 'Categoría 3', userRecieved: 1, stock: 69, price: '30000'},
        { id: 5, name: 'Cable USB', user: 'Gema', date: '2024-9-20', returnDate: '2024-10-20', daysRemaining: 1, category: 'Categoría 3', userRecieved: 1, stock: 69, price: '30000'},
    ]);

    const hoy = new Date();
    const hoyText = hoy.toISOString().split('T')[0];

    const handleAccept = (id) => {
        console.log(`El item ${id}, fue aceptado`);
        // Lógica para aceptar el ítem
    };

    const handleReject = (id) => {
        console.log(`Eliminando ítem con ID: ${id}`);
        // Lógica para eliminar el ítem
    };

    const dateCalculation = (date) => {
        const dateParts = date.split('-');
        const dateObject = new Date(+dateParts[0], dateParts[1] - 1, +dateParts[2]);
        const difference = dateObject.getTime() - hoy.getTime();
        const deltaDays = Math.ceil(difference / (1000 * 3600 * 24));
        console.log(deltaDays);
        return deltaDays;
    };

    return (
        <Container className="items-admin-container">
            <Row>
                <Col>
                    <h2 className="text-center">Administración de préstamos - Fecha de hoy: {hoyText}</h2>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Acciones</th>
                            <th>ID</th>
                            <th>Nombre de producto</th>
                            <th>Usuario que lo pidió</th>
                            <th>Fecha de petición</th>
                            <th>Fecha de devolución</th>
                            <th>Cantidad de días antes del vencimiento</th>
                            <th>Categoría</th>
                            <th>Stock</th>
                            <th>Cantidad a devolver</th>
                            <th>Precio por unidad</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <Button variant="outline-primary" onClick={() => dateCalculation(item.returnDate)} className="mb-2">
                                        Objeto devuelto
                                    </Button>
                                </td>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.user}</td>
                                <td>{item.date}</td>
                                <td>{item.returnDate}</td>
                                <td>{item.daysRemaining}</td>
                                <td>{item.category}</td>
                                <td>{item.stock}</td>
                                <td>{item.userRecieved}</td>
                                <td>{item.price}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default AdministrarPrestamos;