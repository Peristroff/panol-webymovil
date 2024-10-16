import React, { useState } from 'react';
import { Table, Button, Form, Container, Row, Col, InputGroup } from 'react-bootstrap';
import './historialDePrestamos.css'; // Archivo CSS para personalización

function HistorialDePrestamos() {
    const [items, setItems] = useState([
        { id: 1, name: 'Notebook 1', user: 'Juan', date: '01/10/24', returnDate:'13/10/24', category: 'Categoría 1', userAsk: 1, userReceived:1, stock: 21,  price: '15000' },
        { id: 2, name: 'Pantalla', user: 'Jerry', date: '10/09/24', returnDate:'13/10/24', category: 'Categoría 2', userAsk: 2, userReceived:1, stock: 11, price: '25000' },
        { id: 3, name: 'Cargador', user: 'Pablo', date: '15/08/24', returnDate:'13/10/24', category: 'Categoría 3', userAsk: 5, userReceived:5, stock: 69, price: '30000' },
        { id: 4, name: 'Notebook', user: 'Isaac', date: '15/08/24', returnDate:'13/10/24', category: 'Categoría 3', userAsk: 1, userReceived:1, stock: 69, price: '30000' },
        { id: 5, name: 'Cable USB', user: 'Gema', date: '15/08/24', returnDate:'13/10/24', category: 'Categoría 3', userAsk: 5, userReceived:1, stock: 69, price: '30000' },
    ]);

    const handleAccept = (id) => {
        console.log(`El item ${id}, fue aceptado`);
        // Lógica para aceptar el ítem
    };

    const handleReject = (id) => {
        console.log(`Eliminando ítem con ID: ${id}`);
        // Lógica para eliminar el ítem
    };

    const handleCreateNewItem = () => {
        console.log('Creando un nuevo ítem');
        // Lógica para crear un nuevo ítem
    };

    return (
        <Container className="items-admin-container">
            <Row>
                <Col>
                    <h2 className="text-center">Historial de Préstamos</h2>

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre de producto</th>
                            <th>Usuario que lo pidió</th>
                            <th>Fecha de petición</th>
                            <th>Fecha de devolución</th>
                            <th>Categoría</th>
                            <th>Cantidad pedida</th>
                            <th>Stock</th>
                            <th>Cantidad a entregar</th>
                            <th>Precio por unidad</th>
                            <th>Comprobante de préstamo</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.user}</td>
                                <td>{item.date}</td>
                                <td>{item.returnDate}</td>
                                <td>{item.category}</td>
                                <td>{item.userAsk}</td>
                                <td>{item.stock}</td>
                                <td>{item.userReceived}</td>
                                <td>{item.price}</td>
                                <td><Button variant="outline-primary" onClick={() => handleReject(item.id)} className="mb-2">
                                        Descargar
                                    </Button></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default HistorialDePrestamos;