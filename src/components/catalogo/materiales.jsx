import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Container, Row, Col, InputGroup } from 'react-bootstrap';
import './materiales.css'; // Archivo CSS para personalización

function Materiales() {
    const [items, setItems] = useState([
        { id: 1, name: 'Regla', user: 'Juan', date: '2024-9-20', returnDate: '2024-10-20', daysRemaining: 4, category: 'Categoría 1', userRecieved: 1, stock: 21,  price: '150000'},
        { id: 2, name: 'Tijeras', user: 'Jerry', date: '2024-9-20', returnDate: '2024-10-20', daysRemaining: 4, category: 'Categoría 2', userRecieved: 2, stock: 11, price: '25000'},
        { id: 3, name: 'Calculadora', user: 'Pablo', date: '2024-9-20', returnDate: '2024-10-20', daysRemaining: 4, category: 'Categoría 3', userRecieved: 5, stock: 69, price: '30000'},
        { id: 4, name: 'Lápices de colores', user: 'Isaac', date: '2024-9-20', returnDate: '2024-10-20', daysRemaining: 4, category: 'Categoría 3', userRecieved: 1, stock: 69, price: '30000'},
        { id: 5, name: 'Post-it', user: 'Gema', date: '2024-9-20', returnDate: '2023-09-05', daysRemaining: "Vencido", category: 'Categoría 3', userRecieved: 1, stock: 69, price: '30000'},
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
                    <h2 className="text-center">Materiales</h2>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Acciones</th>
                            <th>Nombre de producto</th>
                            <th>Categoría</th>
                            <th>Stock</th>
                            <th>Precio por unidad</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <Button variant="outline-primary" onClick={() => dateCalculation(item.returnDate)} className="mb-2">
                                        Pedir solicitud
                                    </Button>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.stock}</td>
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

export default Materiales;