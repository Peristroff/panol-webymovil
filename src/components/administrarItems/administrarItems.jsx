import React, { useState } from 'react';
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';
import './administrarItems.css';

function AdministrarItems() {
    const [items, setItems] = useState([
        { id: 1, name: 'Producto Juan', date: '01/10/23', category: 'Categoría 1', stock: 21, price: '15000' },
        { id: 2, name: 'Producto El', date: '10/09/23', category: 'Categoría 2', stock: 11, price: '25000' },
        { id: 3, name: 'Producto Sucio', date: '15/08/23', category: 'Categoría 3', stock: 69, price: '30000' },
        { id: 4, name: 'Producto Cochino', date: '15/08/23', category: 'Categoría 3', stock: 69, price: '30000' },
        { id: 5, name: 'Producto Puerco', date: '15/08/23', category: 'Categoría 3', stock: 69, price: '30000' },
    ]);

    const handleEdit = (id) => {
        console.log(`Editando ítem con ID: ${id}`);
        // Lógica para editar el ítem
    };

    const handleDelete = (id) => {
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
                    <h2 className="text-center">Administración de Ítems</h2>
                    <Button variant="primary" id="addButton" onClick={handleCreateNewItem} className="mb-3">
                        Crear Nuevo Ítem
                    </Button>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Acciones</th>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Fecha Creación</th>
                            <th>Categoría</th>
                            <th>Stock</th>
                            <th>Precio</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <Button variant="outline-warning" onClick={() => handleEdit(item.id)} className="mr-2">
                                        Editar
                                    </Button>
                                    <Button variant="outline-danger" onClick={() => handleDelete(item.id)}>
                                        Eliminar
                                    </Button>
                                </td>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.date}</td>
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

export default AdministrarItems;
