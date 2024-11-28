import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AdministrarItems from "./components/administrarItems/administrarItems.jsx";
import Autenticacion from './components/autenticación/autenticacion.jsx';
import AdministrarSolicitudes from './components/administrarSolicitudes/administrarSolicitudes.jsx';
import AdministrarPrestamos from './components/administrarPrestamos/administrarPrestamos.jsx';
import NavBarPanol from "./components/navbar/navbar.jsx";
import AdministrarUsuarios from "./components/administrarUsuarios/administrarUsuarios.jsx";
import HistorialDePrestamos from "./components/historialDePrestamos/historialDePrestamos.jsx";
import PerfilUsuario from './components/perfilUsuario/perfilUsuario.jsx';
import PerfilAdmin from './components/perfilAdmin/perfilAdmin.jsx';
import Home from "./components/home/home.jsx";
import CrearSolicitud from "./components/crearSolicitud/crearSolicitud.jsx";
import Materiales from "./components/catalogo/materiales.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const location = useLocation();

    useEffect(() => {
        // Verificar si el usuario está autenticado al cargar la aplicación
        const user = JSON.parse(localStorage.getItem('userData'));
        if (user) {
            setIsLoggedIn(true);
            setUserData(user);
        } else {
            setIsLoggedIn(false);
            setUserData(null);
        }
    }, []);

    // Cambiar el título de la página según la ruta actual
    useEffect(() => {
        const titles = {
            '/': 'Inicio - Administración de Items',
            '/autenticacion': 'Autenticación',
            '/administrar-items': 'Administración de Items',
            '/administrar-solicitudes': 'Administración de Solicitudes',
            '/administrar-prestamos': 'Administración de Préstamos',
            '/administrar-usuarios': 'Administración de Usuarios',
            '/historial-prestamos': 'Historial de Préstamos',
            '/perfil-admin': 'Perfil de Administrador',
            '/perfil-usuario': 'Perfil de Usuario',
            '/crear-solicitud': 'Crear Solicitud',
            '/materiales': 'Materiales',
            '/home': 'Inicio',
        };
        document.title = titles[location.pathname] || 'Pañol';
    }, [location]);

    // Condicional para mostrar la barra de navegación
    const showNavBar = location.pathname !== '/autenticacion';

    return (
        <div className="App">
            {showNavBar && <NavBarPanol />}
            <Routes>
                <Route path="/autenticacion" element={<Autenticacion />} />

                {/* Rutas para administradores */}
                <Route path="/home" element={<Home />} />
                <Route path="/administrar-items" element={<AdministrarItems />} />
                <Route path="/administrar-solicitudes" element={<AdministrarSolicitudes />} />
                <Route path="/administrar-prestamos" element={<AdministrarPrestamos />} />
                <Route path="/administrar-usuarios" element={<AdministrarUsuarios />} />
                <Route path="/historial-prestamos" element={<HistorialDePrestamos />} />
                <Route path="/perfil-admin" element={<PerfilAdmin />} />

                {/* Rutas para usuarios */}
                <Route path="/perfil-usuario" element={<PerfilUsuario />} />
                <Route path="/crear-solicitud" element={<CrearSolicitud />} />
                <Route path="/materiales" element={<Materiales />} />

                {/* Ruta predeterminada */}
                <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
        </div>
    );
}

export default App;
