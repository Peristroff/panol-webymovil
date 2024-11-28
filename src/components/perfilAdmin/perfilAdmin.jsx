import React, { useState, useEffect } from "react";
import "./PerfilAdmin.css";

// Lista de deudas predefinidas para los alumnos
const itemsDeudas = [
  "computador #26180",
  "calculadora #11234",
  "set de lápices #52334",
  "cuaderno #98342",
  "tablet #12890",
  "material escolar #82314",
];

// Función para generar una lista de alumnos aleatorios con bloqueos predefinidos
const generarAlumnos = (curso) => {
  const nombres = [
    "Juan Pérez",
    "María González",
    "Pedro Jiménez",
    "Ana Martínez",
    "Carlos Hernández",
    "Lucía Rojas",
    "Sofía Castillo",
    "Manuel Soto",
  ];
  const apellidos = [
    "López",
    "Rodríguez",
    "Vega",
    "Morales",
    "Díaz",
    "Campos",
    "Fuentes",
    "Navarro",
  ];

  const alumnos = [];
  for (let i = 1; i <= 35; i++) {
    const nombreAleatorio = nombres[Math.floor(Math.random() * nombres.length)];
    const apellidoAleatorio =
      apellidos[Math.floor(Math.random() * apellidos.length)];
    const deuda = itemsDeudas[Math.floor(Math.random() * itemsDeudas.length)];
    const bloqueado = Math.random() < 0.3;

    alumnos.push({
      id: i,
      nombre: `${nombreAleatorio} ${apellidoAleatorio}`,
      correo: `${nombreAleatorio.charAt(0).toLowerCase()}.${apellidoAleatorio.toLowerCase()}@pañol.cl`,
      bloqueado,
      deuda,
    });
  }
  return alumnos;
};

// Lista de cursos con sus respectivos alumnos generados aleatoriamente
const cursos = [
  { nombre: "Primero Medio A", alumnos: generarAlumnos("Primero Medio A") },
  { nombre: "Primero Medio B", alumnos: generarAlumnos("Primero Medio B") },
  { nombre: "Segundo Medio A", alumnos: generarAlumnos("Segundo Medio A") },
  { nombre: "Segundo Medio B", alumnos: generarAlumnos("Segundo Medio B") },
  { nombre: "Tercero Medio A", alumnos: generarAlumnos("Tercero Medio A") },
  { nombre: "Tercero Medio B", alumnos: generarAlumnos("Tercero Medio B") },
];

// Componente principal de perfil del administrador
const PerfilAdmin = () => {
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null); // Curso seleccionado por el admin
  const [alumnos, setAlumnos] = useState([]); // Lista de alumnos del curso seleccionado
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null); // Alumno seleccionado para enviar correo
  const [mensajeExito, setMensajeExito] = useState(""); // Mensaje de éxito al enviar correo
  const [notificacion, setNotificacion] = useState(""); // Estado para la notificación

  // Efecto para cargar los alumnos al seleccionar un curso
  useEffect(() => {
    if (cursoSeleccionado) {
      setAlumnos(cursoSeleccionado.alumnos); // Cargar alumnos del curso seleccionado
    }
  }, [cursoSeleccionado]);

  const seleccionarAlumno = (alumno) => {
    setAlumnoSeleccionado(alumno);
  };

  const toggleBloqueo = (id) => {
    setAlumnos((prevAlumnos) =>
      prevAlumnos.map((alumno) =>
        alumno.id === id ? { ...alumno, bloqueado: !alumno.bloqueado } : alumno
      )
    );
  };

  const enviarCorreo = () => {
    setMensajeExito("Mensaje enviado con éxito al correo del estudiante.");
    setTimeout(() => setMensajeExito(""), 3000);
  };

  const contraerAlumnos = () => {
    setCursoSeleccionado(null);
  };

  const mostrarNotificaciones = () => {
    setNotificacion(
      "¡Atención! Hay falta de stock en los sets de lápices de colores y las calculadoras científicas."
    );
    setTimeout(() => setNotificacion(""), 5000);
  };

  return (
    <div className="perfil-admin">
      {/* Contenedor para la info del profesor */}
      <div className="info-container">
        <div className="admin-info">
          <img
            src="https://canvas.unab.cl/images/thumbnails/1036067/56fdApL7yz17ZQHZI2hlXvzBXkFi5e4pjMl52vI1"
            alt="Coordinador"
            className="profile-pic"
          />
          <h2>Jerry Jesus Peña Morales</h2>
        </div>

        <button className="notificaciones-button" onClick={mostrarNotificaciones}>
          Notificaciones Pendientes - 1
        </button>
      </div>

      {notificacion && <div className="notificacion">{notificacion}</div>}

      {/* Contenedor para los cursos */}
      <div className="cursos-container">
        <h3>Cursos Disponibles</h3>
        <div className="cursos-list">
          {cursos.map((curso, index) => (
            <button
              key={index}
              className={`curso-button ${
                cursoSeleccionado === curso ? "active" : ""
              }`}
              onClick={() => setCursoSeleccionado(curso)}
            >
              {curso.nombre}
            </button>
          ))}
        </div>
      </div>

      {cursoSeleccionado && (
        <div className="alumnos-list">
          <h3>{cursoSeleccionado.nombre} - Lista de Alumnos</h3>
          <button className="contraer-button" onClick={contraerAlumnos}>
            Contraer Alumnos
          </button>
          <ul>
            {alumnos.map((alumno) => (
              <li key={alumno.id} className="alumno-item">
                <span
                  className="alumno-correo"
                  onClick={() => seleccionarAlumno(alumno)}
                >
                  {alumno.nombre} ({alumno.correo})
                </span>
                <button
                  className="toggle-button"
                  onClick={() => toggleBloqueo(alumno.id)}
                >
                  {alumno.bloqueado ? "Desbloquear" : "Bloquear"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {alumnoSeleccionado && (
        <div className="mensajeria">
          <h4>Redactar correo para {alumnoSeleccionado.nombre}</h4>
          <textarea
            placeholder="Escriba el mensaje aquí..."
            rows="5"
            className="correo-textarea"
          />
          <button className="enviar-button" onClick={enviarCorreo}>
            Enviar
          </button>
          {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>}
        </div>
      )}
    </div>
  );
};

export default PerfilAdmin;
