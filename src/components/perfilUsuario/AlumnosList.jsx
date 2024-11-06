import React, { useState, useEffect } from "react";

// Simulamos la obtención de datos de alumnos y la actualización de su estado.
// En un proyecto real, estos serían llamados a una API con fetch o Axios.
const getAlumnos = () => {
  return [
    { id: 1, nombre: "Juan Pérez", bloqueado: false },
    { id: 2, nombre: "Ana González", bloqueado: false },
    { id: 3, nombre: "Carlos Ruiz", bloqueado: true },
  ];
};

const updateAlumnoEstado = (id, nuevoEstado) => {
  console.log(`Alumno con id ${id} ha sido ${nuevoEstado ? "bloqueado" : "desbloqueado"}`);
  // Aquí iría una actualización real en la base de datos/API.
};

const AlumnosList = () => {
  const [alumnos, setAlumnos] = useState([]);

  // useEffect para obtener la lista de alumnos al cargar el componente
  useEffect(() => {
    const alumnosData = getAlumnos(); // Simular llamada a API
    setAlumnos(alumnosData);
  }, []);

  // Función para alternar el estado de bloqueo de un alumno
  const toggleBloqueo = (id) => {
    setAlumnos((prevAlumnos) =>
      prevAlumnos.map((alumno) =>
        alumno.id === id ? { ...alumno, bloqueado: !alumno.bloqueado } : alumno
      )
    );
    
    // Encontramos el alumno que está siendo actualizado
    const alumnoActual = alumnos.find((alumno) => alumno.id === id);
    
    // Simular actualización del estado de bloqueo en la API
    updateAlumnoEstado(id, !alumnoActual.bloqueado);
  };

  return (
    <div className="alumnos-list">
      <h3>Gestión de Alumnos</h3>
      <ul>
        {/* Renderizamos la lista de alumnos */}
        {alumnos.map((alumno) => (
          <li key={alumno.id}>
            {alumno.nombre} - {alumno.bloqueado ? "Bloqueado" : "Habilitado"}
            {/* Botón para alternar entre bloquear y desbloquear */}
            <button onClick={() => toggleBloqueo(alumno.id)}>
              {alumno.bloqueado ? "Desbloquear" : "Bloquear"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlumnosList;
