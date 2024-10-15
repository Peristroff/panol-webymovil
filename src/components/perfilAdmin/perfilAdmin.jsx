import React, { useState } from "react";
import "./PerfilAdmin.css";

const cursosData = {
  "Primero Medio A": generarAlumnos(35),
  "Primero Medio B": generarAlumnos(35),
  "Segundo Medio A": generarAlumnos(35),
  "Segundo Medio B": generarAlumnos(35),
  "Tercero Medio A": generarAlumnos(35),
  "Tercero Medio B": generarAlumnos(35),
  "Cuarto Medio A": generarAlumnos(35),
  "Cuarto Medio B": generarAlumnos(35),
};

// Función para generar nombres de alumnos
function generarAlumnos(cantidad) {
  const nombres = [
    "Juan", "Ana", "Carlos", "María", "Pedro", "Lucía", "José", "Carla",
    "Miguel", "Elena", "Raúl", "Sofía", "Jorge", "Natalia", "David", "Julia",
    "Felipe", "Verónica", "Oscar", "Carmen", "Martín", "Gabriela", "Tomás", "Sara",
    "Diego", "Marta", "Andrés", "Clara", "Francisco", "Victoria", "Pablo", "Isabel",
    "Rodrigo", "Daniela", "Manuel"
  ];

  return Array.from({ length: cantidad }, (v, i) => ({
    id: i + 1,
    nombre: `${nombres[Math.floor(Math.random() * nombres.length)]} ${nombres[Math.floor(Math.random() * nombres.length)]}`,
    bloqueado: Math.random() < 0.2, // 20% probabilidad de ser bloqueado
  }));
}

const PerfilAdmin = () => {
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [alumnos, setAlumnos] = useState([]);

  // Manejar la selección del curso
  const seleccionarCurso = (curso) => {
    setCursoSeleccionado(curso);
    setAlumnos(cursosData[curso]);
  };

  // Bloquear o desbloquear un alumno por morosidad
  const toggleMorosidad = (id) => {
    setAlumnos((prevAlumnos) =>
      prevAlumnos.map((alumno) =>
        alumno.id === id ? { ...alumno, bloqueado: !alumno.bloqueado } : alumno
      )
    );
  };

  return (
    <div className="perfil-admin">
      {/* Foto y nombre del coordinador */}
      <div className="admin-info">
        <img src="/ruta/a/foto-del-coordinador.jpg" alt="Foto del Coordinador" className="admin-foto" />
        <h2>Coordinador: Alejandro Pérez</h2>
      </div>

      {/* Lista de cursos */}
      <div className="cursos-lista">
        <h3>Cursos</h3>
        {Object.keys(cursosData).map((curso) => (
          <button key={curso} onClick={() => seleccionarCurso(curso)} className="curso-boton">
            {curso}
          </button>
        ))}
      </div>

      {/* Lista de alumnos por curso seleccionado */}
      {cursoSeleccionado && (
        <div className="alumnos-lista">
          <h3>Alumnos en {cursoSeleccionado}</h3>
          <ul>
            {alumnos.map((alumno) => (
              <li key={alumno.id}>
                {alumno.nombre} - {alumno.bloqueado ? "Bloqueado por morosidad" : "Habilitado"}
                <button
                  className="bloquear-boton"
                  onClick={() => toggleMorosidad(alumno.id)}
                >
                  {alumno.bloqueado ? "Desbloquear" : "Bloquear"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PerfilAdmin;
