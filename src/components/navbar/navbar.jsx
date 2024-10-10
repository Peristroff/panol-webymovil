import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navbar.css';

function NavBarPanol() {
    return (
        <Navbar bg="light" expand="lg" className="mb-4 custom-navbar">
            <Navbar.Brand as={Link} to="/">
                <img
                    src="../img/logo.jpg"
                    alt="Logo Pañol"
                    width="40"
                    height="40"
                    className="d-inline-block align-top"
                />
                {' LogoPañol'}
            </Navbar.Brand>

             <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/inventario">Inventario</Nav.Link>
                    <Nav.Link as={Link} to="/crear-solicitud">
                        <i className="fas fa-shopping-cart"></i> Crear Solicitud
                    </Nav.Link>
                    <Nav.Link as={Link} to="/perfil">Perfil</Nav.Link>
                </Nav>
                <Button variant="outline-primary" as={Link} to="/login" className="ml-3">
                    Logout
                </Button>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBarPanol;