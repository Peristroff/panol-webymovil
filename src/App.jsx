import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
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
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this line is present
import './App.css';

function App() {
    const [count, setCount] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    // Cambiar el título de la página según la ruta
    useEffect(() => {
        const titles = {
            '/': 'Inicio - Administración de Items',
            '/autenticacion': 'Autenticación',
            '/administrar-prestamos': 'Administración de Préstamos',
            '/administrar-solicitudes': 'Administración de Solicitudes',
            '/historial-de-prestamos': 'Historial de Préstamos',
            '/perfil-admin': 'Perfil de Coordinador',
            '/crear-solicitud': 'Crear Solicitud',
            '/materiales': 'Materiales',
            '/perfil-alumno': 'Perfil de Alumno',
        };
        // Nombre por defecto si no se encuentra la ruta
        document.title = titles[location.pathname] || 'Pañol';
    }, [location]);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            navigate('/autenticacion');
        }
    }, []);

    return (
        <>
            {/* No renderizar navbar si es la página de autenticación o inicio*/}
            {location.pathname === '/autenticacion' || location.pathname === '/' ? null : <NavBarPanol/>}
            <Routes>
                <Route path="/autenticacion" element={<Autenticacion />} />
                <Route
                    path="/administrar-items"
                    element={<AdministrarItems />}/>
                <Route
                    path="/administrar-solicitudes"
                    element={<AdministrarSolicitudes />}
                />
                <Route
                    path="/administrar-prestamos"
                    element={<AdministrarPrestamos />}
                />
                <Route
                    path="/administrar-usuarios"
                    element={<AdministrarUsuarios />}
                />
                <Route
                    path="/historial-prestamos"
                    element={<HistorialDePrestamos />}
                />
                <Route
                    path="/perfil-usuario"
                    element={<PerfilUsuario />}
                />
                <Route
                    path="/perfil-admin"
                    element={<PerfilAdmin />}
                />
                <Route
                    path="/crear-solicitud"
                    element={<CrearSolicitud />}
                />
                <Route
                    path="/materiales"
                    element={<Materiales />}
                />
                <Route 
                    path="/" 
                    element={<Home/>}
                />
            </Routes>
        </>
    );
}

export default App;
