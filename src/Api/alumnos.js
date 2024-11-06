// src/api/alumnos.js

// Simulación de obtener datos de alumnos
export const getAlumnos = () => {
    return [
      { id: 1, nombre: "Juan Pérez", bloqueado: false },
      { id: 2, nombre: "Ana Martínez", bloqueado: true },
      { id: 3, nombre: "Luis Torres", bloqueado: false },
    ];
  };
  
  // Simulación de actualizar el estado de bloqueo de un alumno
  export const updateAlumnoEstado = (id, bloqueado) => {
    console.log(`Alumno con ID ${id} ahora está ${bloqueado ? "bloqueado" : "habilitado"}`);
  };
  