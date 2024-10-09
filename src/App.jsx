import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import AdministrarItems from "./components/administrarItems/administrarItems.jsx";
import Autenticacion from './components/autenticación/autenticacion.jsx';
import NavBarPanol from "./components/navbar/navbar.jsx";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <NavBarPanol />

        <Routes>
            <Route path="/" element={<AdministrarItems />}/>
            <Route path="/autenticacion" element={<Autenticacion />}/>
        </Routes>
    </>
  )
}

export default App
