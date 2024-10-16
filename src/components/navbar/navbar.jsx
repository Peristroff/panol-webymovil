import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navbar.css';

function NavBarPanol() {
    var userType = 'admin'; // Cambiar por 'student' o 'admin' para ver los cambios en la barra de navegación
    if(userType === 'student') {
        return (
            <Navbar expand="lg" className="mb-4 custom-navbar shadow-lg">
                <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
                    <img
                        // src="https://w7.pngwing.com/pngs/1013/651/png-transparent-national-secondary-school-computer-icons-escuela-school-angle-building-logo-thumbnail.png"
                        src="src/components/img/logo.jpg"
                        alt="Pañol"
                        width="40"
                        height="40"
                        className="d-inline-block align-top logo"
                    />
                    <span className="logo-text">INICIO</span>
                </Navbar.Brand>
    
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/crear-solicitud" className="nav-item-custom">
                            <i className="fas fa-shopping-cart"></i> Crear Solicitud
                        </Nav.Link>
                        <Nav.Link as={Link} to="/perfil-alumno" className="nav-item-custom">
                            Perfil de Alumno
                        </Nav.Link>
                    </Nav>
                    <Button variant="outline-light" as={Link} to="/autenticacion" className="ml-3 logout-button">
                        Cerrar Sesión
                    </Button>
                </Navbar.Collapse>
            </Navbar>
        );
    }
    else if(userType === 'admin') {
        return (
            <Navbar expand="lg" className="mb-4 custom-navbar shadow-lg">
                <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
                    <img
                        src="src/components/img/logo.jpg"
                        alt="Pañol"
                        width="40"
                        height="40"
                        className="d-inline-block align-top logo"
                    />
                    <span className="logo-text">INICIO</span>
                </Navbar.Brand>
    
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/administrar-prestamos" className="nav-item-custom">
                            Administración de Préstamos
                        </Nav.Link>
                        <Nav.Link as={Link} to="/historial-de-prestamos" className="nav-item-custom">
                            Historial de préstamos
                        </Nav.Link>
                        <Nav.Link as={Link} to="/inventario" className="nav-item-custom">
                            Inventario
                        </Nav.Link>
                        <Nav.Link as={Link} to="/perfil-admin" className="nav-item-custom">
                            Perfil de Coordinador
                        </Nav.Link>
                    </Nav>
                    <Button variant="outline-light" as={Link} to="/login" className="ml-3 logout-button">
                        Cerrar Sesión
                    </Button>
                </Navbar.Collapse>
            </Navbar>
        );
    }
    else
    {
        return (
            <Navbar expand="lg" className="mb-4 custom-navbar shadow-lg">
                <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
                    <img
                        src="src/components/img/logo.jpg"
                        alt="Pañol"
                        width="40"
                        height="40"
                        className="d-inline-block align-top logo"
                    />
                    <span className="logo-text">INICIO</span>
                </Navbar.Brand>
    
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/inventario" className="nav-item-custom">
                            Inventario
                        </Nav.Link>
                        {/* Si el usuario no esta logeado, mandar a la pagina de login */}
                        <Nav.Link as={Link} to="/login" className="nav-item-custom">
                            <i className="fas fa-shopping-cart"></i> Crear Solicitud
                        </Nav.Link>
                        <Nav.Link as={Link} to="/perfil-alumno" className="nav-item-custom">
                            Perfil de Alumno
                        </Nav.Link>
                    </Nav>
                    <Button variant="outline-light" as={Link} to="/login" className="ml-3 logout-button">
                        Iniciar Sesión
                    </Button>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavBarPanol;
