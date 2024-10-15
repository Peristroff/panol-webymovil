import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AdministrarItems from "./components/administrarItems/administrarItems.jsx";
import Autenticacion from './components/autenticación/autenticacion.jsx';
import AdministrarSolicitudes from './components/administrarSolicitudes/administrarSolicitudes.jsx';
import AdministrarPrestamos from './components/administrarPrestamos/administrarPrestamos.jsx';
import NavBarPanol from "./components/navbar/navbar.jsx";
import AdministrarUsuarios from "./components/administrarUsuarios/administrarUsuarios.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import HistorialDePrestamos from "./components/historialDePrestamos/historialDePrestamos.jsx";
import PerfilUsuario from './components/PerfilUsuario/PerfilUsuario.jsx';  // Agrega la importación de PerfilUsuario
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
            <Route path="/" element={<AdministrarItems />}/>
            <Route path="/autenticacion" element={<Autenticacion />}/>
            <Route path="/administrarPrestamos" element={<AdministrarPrestamos />}/>
            <Route path="/administrarUsuarios" element={<AdministrarUsuarios />}/>
        </Routes>
      <Routes>
        <Route path="/" element={<AdministrarItems />} />
        <Route path="/autenticacion" element={<Autenticacion />} />
        <Route path="/administrar-prestamos" element={<AdministrarPrestamos />} />
        <Route path="/administrar-solicitudes" element={<AdministrarSolicitudes />} />
        <Route path="/historial-de-prestamos" element={<HistorialDePrestamos />} />

        {/* Nueva ruta para mostrar el perfil de usuario */}
        <Route path="/Perfil" element={<PerfilUsuario user={exampleUser} />} />
      </Routes>
    </>
  );
}

export default App;

