import React, { useState, useEffect } from "react";
import "./PerfilAdmin.css";

// Lista de deudas predefinidas
const itemsDeudas = [
  "computador #26180", "calculadora #11234", "set de lápices #52334",
  "cuaderno #98342", "tablet #12890", "material escolar #82314"
];

// Generar alumnos aleatorios con bloqueos predefinidos
const generarAlumnos = (curso) => {
  const nombres = [
    "Juan Pérez", "María González", "Pedro Jiménez", "Ana Martínez",
    "Carlos Hernández", "Lucía Rojas", "Sofía Castillo", "Manuel Soto"
  ];
  const apellidos = ["López", "Rodríguez", "Vega", "Morales", "Díaz", "Campos", "Fuentes", "Navarro"];
  const alumnos = [];

  for (let i = 1; i <= 35; i++) {
    const nombreAleatorio = nombres[Math.floor(Math.random() * nombres.length)];
    const apellidoAleatorio = apellidos[Math.floor(Math.random() * apellidos.length)];
    const deuda = itemsDeudas[Math.floor(Math.random() * itemsDeudas.length)];
    const bloqueado = Math.random() < 0.3; // 30% de probabilidad de ser bloqueado
    alumnos.push({
      id: i,
      nombre: `${nombreAleatorio} ${apellidoAleatorio}`,
      correo: `${nombreAleatorio.charAt(0).toLowerCase()}.${apellidoAleatorio.toLowerCase()}@pañol.cl`,
      bloqueado,
      deuda: deuda,
      razonBloqueo: bloqueado ? `Deuda: Pendiente de entrega ${deuda}` : "",
    });
  }
  return alumnos;
};

// Lista de cursos
const cursos = [
  { nombre: "Primero Medio A", alumnos: generarAlumnos("Primero Medio A") },
  { nombre: "Primero Medio B", alumnos: generarAlumnos("Primero Medio B") },
  { nombre: "Segundo Medio A", alumnos: generarAlumnos("Segundo Medio A") },
  { nombre: "Segundo Medio B", alumnos: generarAlumnos("Segundo Medio B") },
  { nombre: "Tercero Medio A", alumnos: generarAlumnos("Tercero Medio A") },
  { nombre: "Tercero Medio B", alumnos: generarAlumnos("Tercero Medio B") },
  
];

// Componente principal
const PerfilAdmin = () => {
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [mensajeExito, setMensajeExito] = useState("");

  // Cargar alumnos al seleccionar un curso
  useEffect(() => {
    if (cursoSeleccionado) {
      setAlumnos(cursoSeleccionado.alumnos);
    }
  }, [cursoSeleccionado]);

  // Función para seleccionar un alumno y mostrar su correo
  const seleccionarAlumno = (alumno) => {
    setAlumnoSeleccionado(alumno);
  };

  // Función para bloquear o desbloquear un alumno
  const toggleBloqueo = (id) => {
    setAlumnos((prevAlumnos) =>
      prevAlumnos.map((alumno) =>
        alumno.id === id ? { ...alumno, bloqueado: !alumno.bloqueado } : alumno
      )
    );
  };

  // Función para enviar correo y mostrar mensaje de éxito
  const enviarCorreo = () => {
    setMensajeExito("Mensaje enviado con éxito al correo del estudiante.");
    setTimeout(() => setMensajeExito(""), 3000);
  };

  // Función para contraer la lista de alumnos
  const contraerAlumnos = () => {
    setCursoSeleccionado(null);
  };

  return (
    <div className="perfil-admin">
      <div className="admin-info">
        <img src="https://media.licdn.com/dms/image/v2/D4E03AQGdJqNcaDZV3w/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1667067288437?e=1734566400&v=beta&t=bU8o5dj0d1lpBcUOHxl7fZeL2SduXpsRPGLExiVWK3k" alt="Coordinador" className="profile-pic" />
        <h2>Jerry Peña</h2>
      </div>

      <h3>Cursos Disponibles</h3>
      <div className="cursos-list">
        {cursos.map((curso, index) => (
          <button
            key={index}
            className={`curso-button ${cursoSeleccionado === curso ? "active" : ""}`}
            onClick={() => setCursoSeleccionado(curso)}
          >
            {curso.nombre}
          </button>
        ))}
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
                <span className="alumno-correo" onClick={() => seleccionarAlumno(alumno)}>
                  {alumno.nombre} ({alumno.correo})
                </span>
                <button className="toggle-button" onClick={() => toggleBloqueo(alumno.id)}>
                  {alumno.bloqueado ? "Desbloquear" : "Bloquear"}
                </button>
                {alumno.bloqueado && <span className="deuda">(Deuda: {alumno.deuda})</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {alumnoSeleccionado && (
        <div className="mensajeria">
          <h4>Redactar correo para {alumnoSeleccionado.nombre}</h4>
          <textarea placeholder="Escriba el mensaje aquí..." rows="5" className="correo-textarea" />
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
