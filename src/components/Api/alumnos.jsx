// src/Api/alumnos.jsx
const alumnosData = [
    { id: 1, nombre: "Benjamin Carreno", bloqueado: false, correo: "b.carreno@panol.cl" },
    { id: 2, nombre: "Ana Gómez", bloqueado: true, correo: "a.gomez@panol.cl" },
    // Agrega más alumnos según sea necesario...
];

// Función para obtener la lista de alumnos
export const getAlumnos = () => {
    return alumnosData; // Simular llamada a API
};

// Función para actualizar el estado de un alumno
export const updateAlumnoEstado = (id, estado) => {
    const alumno = alumnosData.find(a => a.id === id);
    if (alumno) {
        alumno.bloqueado = estado; // Actualizar estado
    }
};

// Función para obtener solicitudes del día (simuladas)
export const getSolicitudesDelDia = () => {
    return [
        { id: 1, alumno: "Benjamin Carreno", solicitud: "Computadora", fecha: new Date().toLocaleDateString() },
        { id: 2, alumno: "Ana Gómez", solicitud: "Calculadora", fecha: new Date().toLocaleDateString() },
        // Agrega más solicitudes aleatorias...
    ];
};

// Función para obtener solicitudes pendientes (simuladas)
export const getSolicitudesPendientes = () => {
    return [
        { id: 1, alumno: "Benjamin Carreno", solicitud: "Set de lápices", fecha: new Date().toLocaleDateString(), estado: "Pendiente" },
        { id: 2, alumno: "Ana Gómez", solicitud: "Libro de matemáticas", fecha: new Date().toLocaleDateString(), estado: "Pendiente" },
        // Agrega más solicitudes pendientes...
    ];
};
