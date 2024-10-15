import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import AdministrarItems from "./components/administrarItems/administrarItems.jsx";
import Autenticacion from './components/autenticación/autenticacion.jsx';
import AdministrarPrestamos from './components/administrarPrestamos/administrarPrestamos.jsx';
import NavBarPanol from "./components/navbar/navbar.jsx";
import AdministrarUsuarios from "./components/administrarUsuarios/administrarUsuarios.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {

  return (
    <>
        <NavBarPanol />

        <Routes>
            <Route path="/" element={<AdministrarItems />}/>
            <Route path="/autenticacion" element={<Autenticacion />}/>
            <Route path="/administrarPrestamos" element={<AdministrarPrestamos />}/>
            <Route path="/administrarUsuarios" element={<AdministrarUsuarios />}/>
        </Routes>
    </>
  )
}

export default App
