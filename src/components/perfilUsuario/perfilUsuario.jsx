import React, { useState, useEffect } from "react";
import "./PerfilUsuario.css"; // Importamos el archivo CSS para estilos

// Componente PerfilUsuario que recibe la prop 'userType' (tipo de usuario)
const PerfilUsuario = ({ userType }) => {
  // Estado para indicar si el usuario está moroso
  const [isMoroso, setIsMoroso] = useState(true);

  // Estado para el nombre del usuario
  const [nombreUsuario, setNombreUsuario] = useState("Gema Rojas");

  // Estado para las notificaciones del usuario
  const [notificaciones, setNotificaciones] = useState([
    // Lista de notificaciones iniciales
    "1. Entregaste con éxito la laptop.",
    "2. Debes devolver el libro antes del lunes.",
  ]);

  // Estado para el historial de préstamos del usuario
  const [historialPrestamos, setHistorialPrestamos] = useState([
    { item: "Laptop", fecha: "2024-10-01", status: "Entregado" },
    { item: "Libro de Cálculo", fecha: "2024-09-28", status: "Pendiente" },
  ]);

  //foto de perfil del usuario
  const [fotoPerfil, setFotoPerfil] = useState(null);

  //cantidad de notificaciones
  const [numNotificaciones, setNumNotificaciones] = useState(
    notificaciones.length
  );

  //estado del alumno (habilitado o no)
  const [estadoAlumno, setEstadoAlumno] = useState("Habilitado");

  //ID del usuario
  const [idUsuario, setIdUsuario] = useState("12345");

  //fecha de creación del perfil
  const [fechaCreacion, setFechaCreacion] = useState("2024-10-16");

  //correo de contacto del usuario
  const [correoContacto, setCorreoContacto] = useState(
    "g.rojasfabre@pañol.cl"
  );

  // Estado para controlar si el perfil está en modo edición
  const [isEditing, setIsEditing] = useState(false);

  // Función que maneja el cambio de la imagen de perfil
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Obtenemos el archivo seleccionado
    if (
      file &&
      (file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg")
    ) {
      // Validamos que el archivo sea PNG, JPEG o JPG
      setFotoPerfil(URL.createObjectURL(file)); // Actualizamos la foto de perfil con la URL del archivo
    } else {
      alert("Por favor, sube una imagen en formato PNG, JPEG o JPG."); // Alerta si el archivo no es válido
    }
  };

  // Función que guarda los cambios cuando se actualiza el perfil
  const handleSave = () => {
    setIsEditing(false); // Cambiamos el estado para salir del modo de edición
    alert("Perfil Actualizado"); // Mostramos una alerta de perfil actualizado
  };

  // Renderizado del componente
  return (
    <div className="perfil-usuario-container">
      {/* Contenedor principal del perfil */}
      <div className="header-perfil">
        {/* Encabezado del perfil con el nombre del usuario y su rol */}
        <h1>
          {nombreUsuario} ({userType === "coordinador" ? "Coordinador" : "Alumno"})
        </h1>
        {/* Icono de notificaciones con un contador de notificaciones */}
        <div className="notificaciones-icon">
          <span className="contador-notificaciones">{numNotificaciones}</span>
          <button
            className="ver-notificaciones-btn"
            onClick={() => alert(notificaciones.join("\n"))}
          >
            Ver Notificaciones
          </button>
        </div>
      </div>
      <div className="perfil-content">
        {/* Contenido del perfil */}
        <div className="perfil-foto">
          {/* Imagen de perfil del usuario */}
          <img
            src={
              fotoPerfil ||
              "https://i.pinimg.com/736x/a4/8a/45/a48a45b038991a7bb43fa803d9a9e601.jpg"
            }
            alt="Foto de perfil"
            className="foto-perfil"
          />
          {/* Botón para cambiar la foto de perfil */}
          <label className="file-label">
            Cambiar Foto de Perfil
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleImageChange}
              className="file-input"
            />
          </label>
        </div>
        {/* Información del usuario */}
        <div className="info-usuario">
          <div className="datos-usuario">
            {isEditing ? (
              // Si está en modo edición, muestra los campos editables
              <>
                <p>
                  <strong>ID: </strong>
                  <input
                    type="text"
                    value={idUsuario}
                    onChange={(e) => setIdUsuario(e.target.value)}
                  />
                </p>
                <p>
                  <strong>Fecha de creación: </strong>
                  <input
                    type="date"
                    value={fechaCreacion}
                    onChange={(e) => setFechaCreacion(e.target.value)}
                  />
                </p>
                <p>
                  <strong>Correo de contacto: </strong>
                  <input
                    type="email"
                    value={correoContacto}
                    onChange={(e) => setCorreoContacto(e.target.value)}
                  />
                </p>
                <p>
                  <strong>Estado: </strong>
                  <select
                    value={estadoAlumno}
                    onChange={(e) => setEstadoAlumno(e.target.value)}
                  >
                    <option value="Habilitado">Habilitado</option>
                    <option value="No habilitado">No habilitado</option>
                  </select>
                </p>
                <button className="guardar-btn" onClick={handleSave}>
                  Guardar cambios
                </button>
              </>
            ) : (
              // Si no está en modo edición, muestra los datos en formato de solo lectura
              <>
                <p>
                  <strong>ID: </strong>
                  {idUsuario}
                </p>
                <p>
                  <strong>Fecha de creación: </strong>
                  {fechaCreacion}
                </p>
                <p>
                  <strong>Correo de contacto: </strong>
                  {correoContacto}
                </p>
                <p>
                  <strong>Estado: </strong>
                  {isMoroso ? "Moroso" : "Al día"}
                </p>
                <button
                  className="editar-btn"
                  onClick={() => setIsEditing(true)}
                >
                  Editar Perfil
                </button>
              </>
            )}
          </div>
          {/* Nuevo contenedor que muestra si el usuario está bloqueado por mora */}
          {isMoroso && (
            <div className="bloqueado-por-mora">
              <p>⚠️ El usuario está bloqueado por mora.</p>
            </div>
          )}
          {/* Historial de préstamos del usuario */}
          <div className="historial-prestamos">
            <h3>Historial de Préstamos:</h3>
            <ul>
              {historialPrestamos.map((prestamo, index) => (
                <li key={index}>
                  {prestamo.item} - {prestamo.fecha} - {prestamo.status}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;

