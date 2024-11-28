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
import 'bootstrap/dist/css/bootstrap.min.css';
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

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            window.location.href = '/autenticacion';
            }
    }, []);

    return (
        <div className="App">
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
        </div>
    );
}

export default App;
