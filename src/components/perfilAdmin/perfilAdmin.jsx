import React, { useState, useEffect } from "react";
import "./PerfilAdmin.css";

// Lista de deudas predefinidas para los alumnos
const itemsDeudas = [
  "computador #26180", "calculadora #11234", "set de lápices #52334",
  "cuaderno #98342", "tablet #12890", "material escolar #82314"
];

// Función para generar una lista de alumnos aleatorios con bloqueos predefinidos
const generarAlumnos = (curso) => {
  // Listas de nombres y apellidos para crear nombres aleatorios
  const nombres = [
    "Juan Pérez", "María González", "Pedro Jiménez", "Ana Martínez",
    "Carlos Hernández", "Lucía Rojas", "Sofía Castillo", "Manuel Soto"
  ];
  const apellidos = ["López", "Rodríguez", "Vega", "Morales", "Díaz", "Campos", "Fuentes", "Navarro"];
  
  // Inicializa un array para almacenar los alumnos generados
  const alumnos = [];

  // Bucle para crear 35 alumnos
  for (let i = 1; i <= 35; i++) {
    // Seleccionar un nombre y apellido aleatorio de las listas
    const nombreAleatorio = nombres[Math.floor(Math.random() * nombres.length)];
    const apellidoAleatorio = apellidos[Math.floor(Math.random() * apellidos.length)];
    
    // Asignar una deuda aleatoria de la lista predefinida
    const deuda = itemsDeudas[Math.floor(Math.random() * itemsDeudas.length)];
    
    // Generar un booleano para determinar si el alumno está bloqueado (30% de probabilidad)
    const bloqueado = Math.random() < 0.3; 
    
    // Agregar un objeto alumno al array
    alumnos.push({
      id: i,
      nombre: `${nombreAleatorio} ${apellidoAleatorio}`, // Nombre completo del alumno
      correo: `${nombreAleatorio.charAt(0).toLowerCase()}.${apellidoAleatorio.toLowerCase()}@pañol.cl`, // Correo del alumno
      bloqueado, // Estado de bloqueo
      deuda: deuda, // Deuda asignada
      razonBloqueo: bloqueado ? `Deuda: Pendiente de entrega ${deuda}` : "", // Razón de bloqueo si está bloqueado
    });
  }
  return alumnos; // Retornar la lista de alumnos generados
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
  // Estados locales para manejar el estado del componente
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
  }, [cursoSeleccionado]); // Ejecutar efecto cuando cambia el curso seleccionado

  // Función para seleccionar un alumno y mostrar su correo
  const seleccionarAlumno = (alumno) => {
    setAlumnoSeleccionado(alumno); // Establecer el alumno seleccionado
  };

  // Función para bloquear o desbloquear un alumno
  const toggleBloqueo = (id) => {
    // Actualiza la lista de alumnos
    setAlumnos((prevAlumnos) =>
      prevAlumnos.map((alumno) =>
        alumno.id === id ? { ...alumno, bloqueado: !alumno.bloqueado } : alumno // Cambiar estado de bloqueo del alumno
      )
    );
  };

  // Función para enviar correo y mostrar mensaje de éxito
  const enviarCorreo = () => {
    setMensajeExito("Mensaje enviado con éxito al correo del estudiante."); // Mensaje de éxito
    setTimeout(() => setMensajeExito(""), 3000); // Ocultar mensaje después de 3 segundos
  };

  // Función para contraer la lista de alumnos
  const contraerAlumnos = () => {
    setCursoSeleccionado(null); // Limpiar el curso seleccionado
  };

  // Función para mostrar notificaciones
  const mostrarNotificaciones = () => {
    // Establecer el mensaje de notificación
    setNotificacion("¡Atención! Hay falta de stock en los sets de lápices de colores y las calculadoras científicas.");
    // Ocultar la notificación después de 5 segundos
    setTimeout(() => setNotificacion(""), 5000); 
  };

  return (
    <div className="perfil-admin">
      {/* Contenedor para la info del profesor */}
      <div className="info-container">
        <div className="admin-info">
          {/* Imagen del coordinador */}
          <img src="https://canvas.unab.cl/images/thumbnails/1036067/56fdApL7yz17ZQHZI2hlXvzBXkFi5e4pjMl52vI1" alt="Coordinador" className="profile-pic" />
          <h2>Jerry Jesus Peña Morales</h2> {/* Nombre del coordinador */}
        </div> 
        
        {/* Botón de Notificaciones */}
        <button className="notificaciones-button" onClick={mostrarNotificaciones}>
          Notificaciones Pendientes - 1 {/* Contador de notificaciones */}
        </button>
      </div>

      {/* Mostrar notificación si existe */}
      {notificacion && <div className="notificacion">{notificacion}</div>} {/* Notificación visible */}

      {/* Contenedor para los cursos */}
      <div className="cursos-container">
        <h3>Cursos Disponibles</h3>
        <div className="cursos-list">
          {/* Mapa a través de la lista de cursos */}
          {cursos.map((curso, index) => (
            <button
              key={index} 
              className={`curso-button ${cursoSeleccionado === curso ? "active" : ""}`} // Clase activa si el curso está seleccionado
              onClick={() => setCursoSeleccionado(curso)} // Cambiar curso seleccionado al hacer clic
            >
              {curso.nombre} {/* Nombre del curso */}
            </button>
          ))}
        </div>
      </div>

      {cursoSeleccionado && ( // Mostrar lista de alumnos solo si hay un curso seleccionado
        <div className="alumnos-list">
          <h3>{cursoSeleccionado.nombre} - Lista de Alumnos</h3>
          <button className="contraer-button" onClick={contraerAlumnos}>
            Contraer Alumnos {/* Botón para contraer la lista */}
          </button>
          <ul>
            {/* Mapa a través de la lista de alumnos */}
            {alumnos.map((alumno) => (
              <li key={alumno.id} className="alumno-item">
                <span className="alumno-correo" onClick={() => seleccionarAlumno(alumno)}>
                  {alumno.nombre} ({alumno.correo}) {/* Nombre y correo del alumno */}
                </span>
                <button className="toggle-button" onClick={() => toggleBloqueo(alumno.id)}>
                  {alumno.bloqueado ? "Desbloquear" : "Bloquear"} {/* Botón para bloquear/desbloquear alumno */}
                </button>
                {alumno.bloqueado && <span className="deuda">(Deuda: {alumno.deuda})</span>} {/* Mostrar deuda si está bloqueado */}
              </li>
            ))}
          </ul>
        </div>
      )}

      {alumnoSeleccionado && ( // Mostrar sección de mensajería si hay un alumno seleccionado
        <div className="mensajeria">
          <h4>Redactar correo para {alumnoSeleccionado.nombre}</h4> {/* Nombre del alumno seleccionado */}
          <textarea placeholder="Escriba el mensaje aquí..." rows="5" className="correo-textarea" /> {/* Área de texto para redactar el mensaje */}
          <button className="enviar-button" onClick={enviarCorreo}>
            Enviar
          </button>
          {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>} {/* Mensaje de éxito si se envía el correo */}
        </div>
      )}
    </div>
  );
};

export default PerfilAdmin; // Exportar el componente para su uso en otros módulos
