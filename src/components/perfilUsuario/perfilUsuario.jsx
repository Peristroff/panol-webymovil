import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PerfilUsuario.css";

const PerfilUsuario = ({ userType, userId }) => {
  const [isMoroso, setIsMoroso] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [notificaciones, setNotificaciones] = useState([]);
  const [historialPrestamos, setHistorialPrestamos] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [estadoAlumno, setEstadoAlumno] = useState("Habilitado");
  const [_id, set_id] = useState("");
  const [fechaCreacion, setFechaCreacion] = useState("");
  const [correoContacto, setCorreoContacto] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [diasRetraso, setDiasRetraso] = useState(0); // Nuevo estado para días de retraso

  const navigate = useNavigate();

  // Obtener datos del perfil desde el backend
  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await fetch(`http://localhost:3000/profile/${userId}`);
        if (!response.ok) throw new Error("Error al obtener datos del perfil");
        const data = await response.json();

        // Actualizar estados con los datos recibidos
        setNombreUsuario(data.nombreUsuario);
        setNotificaciones(data.notificaciones || []);
        setHistorialPrestamos(data.historialPrestamos || "Sin historial");
        setFotoPerfil(data.imagenPerfil || null);
        setEstadoAlumno(data.moroso ? "Moroso" : "Al día");
        set_id(data._id);
        setFechaCreacion(data.createdAt);
        setCorreoContacto(data.correo);
        setIsMoroso(data.moroso || false);

        // Calcular días de retraso si es moroso
        if (data.moroso && data.fechaUltimoPrestamo) {
          const fechaPrestamo = new Date(data.fechaUltimoPrestamo);
          const hoy = new Date();
          const dias = Math.ceil(
            (hoy - fechaPrestamo) / (1000 * 60 * 60 * 24) // Convertir diferencia en días
          );
          setDiasRetraso(dias);
        }
      } catch (error) {
        console.error("Error al obtener datos del perfil:", error);
      }
    };

    fetchPerfil();
  }, [userId]);

  // Manejar cambio de imagen de perfil
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg")
    ) {
      const formData = new FormData();
      formData.append("imagenPerfil", file);

      try {
        const response = await fetch(`http://localhost:3000/profile/${userId}`, {
          method: "PUT",
          body: formData,
        });

        if (!response.ok) throw new Error("Error al actualizar la imagen de perfil");
        const data = await response.json();
        setFotoPerfil(data.imagenPerfil); // Actualizar la foto en el estado
        alert("Foto de perfil actualizada correctamente");
      } catch (error) {
        console.error("Error al actualizar la imagen de perfil:", error);
        alert("Error al actualizar la foto de perfil");
      }
    } else {
      alert("Por favor, sube una imagen en formato PNG, JPEG o JPG.");
    }
  };

  // Manejar guardar cambios en el perfil
  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombreUsuario,
          correo: correoContacto,
          moroso: isMoroso,
        }),
      });

      if (!response.ok) throw new Error("Error al actualizar el perfil");
      const data = await response.json();
      setIsEditing(false);
      alert("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      alert("Error al guardar los cambios del perfil");
    }
  };

  return (
    <div className="perfil-usuario-container">
      <div className="header-perfil">
        <h1>
          {nombreUsuario} (
          {userType === "coordinador" ? "Coordinador" : "Alumno"})
        </h1>
        <div className="notificaciones-icon">
          <span className="contador-notificaciones">{notificaciones.length}</span>
          <button
            className="ver-notificaciones-btn"
            onClick={() =>
              alert(
                isMoroso
                  ? `Tienes un retraso de aproximadamente ${diasRetraso} días en tus devoluciones.\n\nNotificaciones:\n${notificaciones.join(
                      "\n"
                    )}`
                  : `Notificaciones:\n${notificaciones.join("\n")}`
              )
            }
          >
            Ver Notificaciones
          </button>
        </div>
      </div>
      <div className="perfil-content">
        <div className="perfil-foto">
          <img
            src={
              fotoPerfil ||
              "https://i.pinimg.com/736x/a4/8a/45/a48a45b038991a7bb43fa803d9a9e601.jpg"
            }
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
            />
          </label>
        </div>
        <div className="info-usuario">
          <div className="datos-usuario">
            {isEditing ? (
              <>
                <p>
                  <strong>_id: </strong>
                  {_id}
                </p>
                <p>
                  <strong>Nombre del Alumno: </strong>
                  <input
                    type="text"
                    value={nombreUsuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
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
                    <option value="Habilitado">Al día</option>
                    <option value="Moroso">Moroso</option>
                  </select>
                </p>
                <button className="guardar-btn" onClick={handleSave}>
                  Guardar Cambios
                </button>
              </>
            ) : (
              <>
                <p>
                  <strong>_id: </strong>
                  {_id}
                </p>
                <p>
                  <strong>Fecha de creación: </strong>
                  {new Date(fechaCreacion).toLocaleDateString()}
                </p>
                <p>
                  <strong>Correo de contacto: </strong>
                  {correoContacto}
                </p>
                <p>
                  <strong>Estado: </strong>
                  {isMoroso ? "Moroso" : "Al día"}
                </p>
                <button className="editar-btn" onClick={() => setIsEditing(true)}>
                  Editar Perfil
                </button>
              </>
            )}
          </div>
          {isMoroso && (
            <div className="bloqueado-por-mora">
              <p>⚠️ No puedes crear solicitudes porque estás moroso. Devuelve los pendientes para habilitar esta función.</p>
            </div>
          )}
          <div className="historial-prestamos">
            <h3>Historial de Préstamos:</h3>
            <p>{historialPrestamos}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
