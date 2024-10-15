import React, { useState } from 'react';
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';
import './administrarUsuarios.css';
import Dropdown from 'react-bootstrap/Dropdown';

function AdministrarUsuarios() {
    const [users, setUsers] = useState([
        { img: "Logo", id: 1, name: 'Producto Juan', date: '01/10/23', state: 'Habilitado' },
        { img: "Logo", id: 2, name: 'Producto El', date: '10/09/23', state: 'Deshabilitado' },
        { img: "Logo", id: 3, name: 'Producto Sucio', date: '15/08/23', state: 'Deshabilitado' },
        { img: "Logo", id: 4, name: 'Producto Cochino', date: '15/08/23', state: 'Deshabilitado' },
        { img: "Logo", id: 5, name: 'Producto Puerco', date: '15/08/23', state: 'Deshabilitado' },

    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTerm, setFilterTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilter = (event) => {
        setFilterTerm(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        user.state.toLowerCase().includes(filterTerm.toLowerCase())
    );

    const handleEdit = (id) => {
        console.log(`Editando usuario con ID: ${id}`);
        // Lógica para editar el usuario
    };

    const handleDelete = (id) => {
        console.log(`Eliminando usuario con ID: ${id}`);
        // Lógica para eliminar el usuario
    };

    const handleCreateNewUser = () => {
        console.log('Creando un nuevo usuario');
        // Lógica para crear un nuevo usuario
    };

    const checkColor = (state) => {
        switch (state) {
            case "Deshabilitado":
                return "red";
            case "Habilitado":
                return "green";
        }};

    return (
        <Container className="items-admin-container">
            <Row>
                <Col>
                    <h2 className="text-center">Administración de Usuario</h2>
                    <Form inline className="mb-3">
                        <Button variant="primary" id="addButton" onClick={handleCreateNewUser} className="mr-2">
                            Crear Nuevo Usuario
                        </Button>
                        <Form.Control
                            type="text"
                            placeholder="Buscar usuario"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="search-filter-control"
                        />
                        <Dropdown onSelect={handleFilter}>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="search-filter-control">
                                {filterTerm ? filterTerm.charAt(0).toUpperCase() + filterTerm.slice(1) : 'Todos'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="">Todos</Dropdown.Item>
                                <Dropdown.Item eventKey="habilitado">Habilitado</Dropdown.Item>
                                <Dropdown.Item eventKey="deshabilitado">Deshabilitado</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </Form>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Acciones</th>
                            <th>Foto</th>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Fecha Creación</th>
                            <th>Estado</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <Button variant="outline-warning" onClick={() => handleEdit(user.id)} className="mr-2">
                                        Editar
                                    </Button>
                                    <Button variant="outline-danger" onClick={() => handleDelete(user.id)}>
                                        Eliminar
                                    </Button>
                                </td>
                                <td>{user.img}</td>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.date}</td>
                                <td style={{ color: `${checkColor(user.state)}` }}>{user.state}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default AdministrarUsuarios;
