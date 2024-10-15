import React, { useState, useEffect } from "react";
import "./PerfilUsuario.css";

const PerfilUsuario = ({ userType }) => {
  const [isMoroso, setIsMoroso] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState("Gema Rojas");
  const [notificaciones, setNotificaciones] = useState([
    //notificaciones
    "1. Entregaste con éxito la laptop.",
    "2. Debes devolver el libro antes del lunes.",
  ]);

  //historial de pretamos del estudiante
  const [historialPrestamos, setHistorialPrestamos] = useState([
    { item: "Laptop", fecha: "2024-10-01", status: "Entregado" },
    { item: "Libro de Cálculo", fecha: "2024-09-28", status: "Pendiente" },
  ]);
  //
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [numNotificaciones, setNumNotificaciones] = useState(
    notificaciones.length
  );

  //variables a editar
  const [estadoAlumno, setEstadoAlumno] = useState("Habilitado");
  const [idUsuario, setIdUsuario] = useState("12345");
  const [fechaCreacion, setFechaCreacion] = useState("2024-10-16");
  const [correoContacto, setCorreoContacto] = useState(
    "GemitaLaTortuguita@example.com"
  );
  const [isEditing, setIsEditing] = useState(false);

  //boton de agregar archivo de foto de usuario ( admite jpeg - jpg y png )
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg")
    ) {
      setFotoPerfil(URL.createObjectURL(file));
    } else {
      alert("Por favor, sube una imagen en formato PNG, JPEG o JPG.");
    }
  };
  useEffect(() => {
    // Simulación de alertas automáticas por déficit de stock o morosidad
    if (historialPrestamos.some((p) => p.status === "Pendiente")) {
      setIsMoroso(true);
    } else {
      setIsMoroso(false);
    }
  }, [historialPrestamos]);
  //notificación en la parte superior actualziación de datos de perfil
  const handleSave = () => {
    setIsEditing(false);
    alert("Perfil Actualizado");
  };
  return (
    <div className="perfil-usuario-container">
      <div className="header-perfil">
        <h1>
          {nombreUsuario} (
          {userType === "coordinador" ? "Coordinador" : "Alumno"})
        </h1>
        {/*aca identifica si es alumno o coordinador*/}
        <div className="notificaciones-icon">
          <span className="contador-notificaciones">{numNotificaciones}</span>
          <button
            className="ver-notificaciones-btn"
            onClick={() => alert(notificaciones.join("\n"))}
          >
            Ver Notificaciones
            {/*boton de notificaciones y el contador de arriba*/}
          </button>
        </div>
      </div>
      <div className="perfil-content">
        <div className="perfil-foto">
          <img
            src={
              fotoPerfil ||
              "https://i.pinimg.com/736x/a4/8a/45/a48a45b038991a7bb43fa803d9a9e601.jpg"
            } //foto perfil usuario
            alt="Foto de perfil"
            className="foto-perfil"
          />
          <label className="file-label">
            Cambiar Foto de Perfil
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleImageChange}
              className="file-input"
            />{" "}
            {/*formato que acepta el boton*/}
          </label>
        </div>
        {/*Datos del usuario*/}
        <div className="info-usuario">
          <div className="datos-usuario">
            {isEditing ? (
              <>
                <p>
                  <strong>ID: </strong> {/*ID  DE USUARIO*/}
                  <input
                    type="text"
                    value={idUsuario}
                    onChange={(e) => setIdUsuario(e.target.value)}
                  />
                </p>
                <p>
                  <strong>Fecha de creación: </strong> {/*FECHA DE CREACIÓN*/}
                  <input
                    type="date"
                    value={fechaCreacion}
                    onChange={(e) => setFechaCreacion(e.target.value)}
                  />
                </p>
                <p>
                  <strong>Correo de contacto: </strong> {/*CORREO DE CONTACTO*/}
                  <input
                    type="email"
                    value={correoContacto}
                    onChange={(e) => setCorreoContacto(e.target.value)}
                  />
                </p>
                <p>
                  <strong>Estado: </strong>{" "}
                  {/*ESTADO DEL ALUMNO - HABILITADO (S/N) - MOROSO */}
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
                </button>{" "}
                {/*BOTON DE GUARDAR CAMBIOS*/}
              </>
            ) : (
              <>
                {" "}
                {/*Datos del usuario*/}
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
          {/*CONTAINER DE HISTORIAL DE PRESTAMOS*/}
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
