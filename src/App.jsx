import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import AdministrarItems from "./components/administrarItems/administrarItems.jsx";
import Autenticacion from './components/autenticación/autenticacion.jsx';
import AdministrarPrestamos from './components/administrarPrestamos/administrarPrestamos.jsx';
import NavBarPanol from "./components/navbar/navbar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this line is present
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <NavBarPanol />

        <Routes>
            <Route path="/" element={<AdministrarItems />}/>
            <Route path="/autenticacion" element={<Autenticacion />}/>
            <Route path="/administrarPrestamos" element={<AdministrarPrestamos />}/>
        </Routes>
    </>
  )
}

export default App
