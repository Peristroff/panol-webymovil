import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import Img from 'src/img/logo.jpg';
import './navbar.css';

function NavBarPanol() {
    return (
        <Navbar  expand="lg" className="mb-4 custom-navbar">
            <Navbar.Brand as={Link} to="/">
                <img
                    // src="https://w7.pngwing.com/pngs/1013/651/png-transparent-national-secondary-school-computer-icons-escuela-school-angle-building-logo-thumbnail.png"
                    src="src/components/img/logo.jpg"
                    alt="Pañol"
                    width="40"
                    height="40"
                    className="d-inline-block align-top"
                />
                {' Pañol'}
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