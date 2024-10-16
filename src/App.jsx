import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
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

    // Cambiar el título de la página según la ruta
    const location = useLocation();
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


    return (
        <>
            {/* No renderizar navbar si es la página de autenticación o inicio*/}
            {location.pathname === '/autenticacion' || location.pathname === '/' ? null : <NavBarPanol/>}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/administrarItems" element={<AdministrarItems/>}/>
                <Route path="/autenticacion" element={<Autenticacion/>}/>
                <Route path="/administrarPrestamos" element={<AdministrarPrestamos/>}/>
                <Route path="/administrarUsuarios" element={<AdministrarUsuarios/>}/>
                <Route path="/administrar-prestamos" element={<AdministrarPrestamos/>}/>
                <Route path="/administrar-solicitudes" element={<AdministrarSolicitudes/>}/>
                <Route path="/historial-de-prestamos" element={<HistorialDePrestamos/>}/>
                <Route path="/perfil-admin" element={<PerfilAdmin/>}/>
                <Route path="/perfil-alumno" element={<PerfilUsuario/>}/>
                <Route path="/crear-solicitud" element={<CrearSolicitud/>}/>
                <Route path="/materiales" element={<Materiales/>}/>
            </Routes>
        </>
    );
}

export default App;

