import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AdministrarItems from "./components/administrarItems/administrarItems.jsx";
import Autenticacion from './components/autenticación/autenticacion.jsx';
import AdministrarSolicitudes from './components/administrarSolicitudes/administrarSolicitudes.jsx';
import AdministrarPrestamos from './components/administrarPrestamos/administrarPrestamos.jsx';
import NavBarPanol from "./components/navbar/navbar.jsx";
import PerfilUsuario from './components/PerfilUsuario/PerfilUsuario.jsx';  // Agrega la importación de PerfilUsuario
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this line is present
import './App.css';

function App() {
  const [count, setCount] = useState(0);

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
        <Route path="/administrarPrestamos" element={<AdministrarPrestamos />} />
        
        {/* Nueva ruta para mostrar el perfil de usuario */}
        <Route path="/Perfil" element={<PerfilUsuario user={exampleUser} />} />
      </Routes>
    </>
  );
}

export default App;

