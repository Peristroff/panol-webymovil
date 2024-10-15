import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AdministrarItems from "./components/administrarItems/administrarItems.jsx";
import Autenticacion from './components/autenticación/autenticacion.jsx';
import AdministrarSolicitudes from './components/administrarSolicitudes/administrarSolicitudes.jsx';
import AdministrarPrestamos from './components/administrarPrestamos/administrarPrestamos.jsx';
import NavBarPanol from "./components/navbar/navbar.jsx";
import HistorialDePrestamos from "./components/historialDePrestamos/historialDePrestamos.jsx";
import PerfilUsuario from './components/PerfilUsuario/PerfilUsuario.jsx';
import PerfilAdmin from './components/PerfilAdmin/PerfilAdmin.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this line is present
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const location = useLocation();
  useEffect(() => {
    const titles = {
      '/': 'Inicio - Administración de Items',
      '/autenticacion': 'Autenticación',
      '/administrar-prestamos': 'Administración de Préstamos',
      '/administrar-solicitudes': 'Administración de Solicitudes',
      '/historial-de-prestamos': 'Historial de Préstamos',
    };
    // Nombre por defecto si no se encuentra la ruta
    document.title = titles[location.pathname] || 'Pañol';
  }, [location]);

  // Ejemplo de datos del usuario
  const exampleUser = {
    name: 'Ana Gómez',
    profileImage: 'https://www.example.com/foto-de-perfil.jpg',
    isEnabled: true,
    loanHistory: [
      { item: 'Laptop', loanDate: '01/10/2024', returnDate: '10/10/2024' },
      { item: 'Cámara', loanDate: '05/10/2024', returnDate: null },
    ],
    requestHistory: [
      { item: 'Proyector', requestDate: '02/10/2024', status: 'Aprobado' },
    ],
    isBlocked: false,
  };

  return (
    <>
      <NavBarPanol />

      <Routes>
        <Route path="/" element={<AdministrarItems />} />
        <Route path="/autenticacion" element={<Autenticacion />} />
        <Route path="/administrar-prestamos" element={<AdministrarPrestamos />} />
        <Route path="/administrar-solicitudes" element={<AdministrarSolicitudes />} />
        <Route path="/historial-de-prestamos" element={<HistorialDePrestamos />} />
        <Route path="/Perfil-Alumno" element={<PerfilUsuario />} />
        <Route path="/Perfil-Coordinador" element={<PerfilAdmin />} />
      </Routes>
    </>
  );
}

export default App;

