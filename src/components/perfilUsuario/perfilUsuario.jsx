import React, { useState, useEffect } from "react";
import "./PerfilUsuario.css";

const PerfilUsuario = ({ userType }) => {
  const [isMoroso, setIsMoroso] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState("Gemita la Tortuguita");
  const [notificaciones, setNotificaciones] = useState([
    "Entregaste con éxito la laptop.",
    "Debes devolver el libro antes del lunes.",
  ]);
  const [historialPrestamos, setHistorialPrestamos] = useState([
    { item: "Laptop", fecha: "2024-10-01", status: "Entregado" },
    { item: "Libro de Cálculo", fecha: "2024-09-28", status: "Pendiente" },
  ]);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [numNotificaciones, setNumNotificaciones] = useState(notificaciones.length);
  
  // Nuevas variables para la edición
  const [estadoAlumno, setEstadoAlumno] = useState("Habilitado");
  const [idUsuario, setIdUsuario] = useState("12345");
  const [fechaCreacion, setFechaCreacion] = useState("2024-01-01");
  const [correoContacto, setCorreoContacto] = useState("gemita@example.com");
  const [isEditing, setIsEditing] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg")) {
      setFotoPerfil(URL.createObjectURL(file));
    } else {
      alert("Por favor, sube una imagen en formato PNG, JPEG o JPG.");
    }
  };

  useEffect(() => {
    // Simulación de alertas automáticas por déficit de stock o morosidad
    if (historialPrestamos.some(p => p.status === "Pendiente")) {
      setIsMoroso(true);
    } else {
      setIsMoroso(false);
    }
  }, [historialPrestamos]);

  const handleSave = () => {
    // Aquí podrías agregar la lógica para guardar los cambios
    setIsEditing(false);
    alert("Perfil actualizado");
  };

  return (
    <div className="perfil-usuario-container">
      <div className="header-perfil">
        <h1>{nombreUsuario} ({userType === "coordinador" ? "Coordinador" : "Alumno"})</h1>
        <div className="notificaciones-icon">
          <span className="contador-notificaciones">{numNotificaciones}</span>
          <button className="ver-notificaciones-btn" onClick={() => alert(notificaciones.join("\n"))}>
            Ver notificaciones
          </button>
        </div>
      </div>
      <div className="perfil-content">
        <div className="perfil-foto">
          <img
            src={fotoPerfil || "/default-profile.png"}
            alt="Foto de perfil"
            className="foto-perfil"
          />
          <label className="file-label">
            Elegir archivo
            <input type="file" accept=".png, .jpg, .jpeg" onChange={handleImageChange} className="file-input" />
          </label>
        </div>
        <div className="info-usuario">
          <div className="datos-usuario">
            {isEditing ? (
              <>
                <p><strong>ID: </strong>
                  <input
                    type="text"
                    value={idUsuario}
                    onChange={(e) => setIdUsuario(e.target.value)}
                  />
                </p>
                <p><strong>Fecha de creación: </strong>
                  <input
                    type="date"
                    value={fechaCreacion}
                    onChange={(e) => setFechaCreacion(e.target.value)}
                  />
                </p>
                <p><strong>Correo de contacto: </strong>
                  <input
                    type="email"
                    value={correoContacto}
                    onChange={(e) => setCorreoContacto(e.target.value)}
                  />
                </p>
                <p><strong>Estado: </strong>
                  <select value={estadoAlumno} onChange={(e) => setEstadoAlumno(e.target.value)}>
                    <option value="Habilitado">Habilitado</option>
                    <option value="No habilitado">No habilitado</option>
                  </select>
                </p>
                <button className="guardar-btn" onClick={handleSave}>Guardar cambios</button>
              </>
            ) : (
              <>
                <p><strong>ID: </strong>{idUsuario}</p>
                <p><strong>Fecha de creación: </strong>{fechaCreacion}</p>
                <p><strong>Correo de contacto: </strong>{correoContacto}</p>
                <p><strong>Estado: </strong>{isMoroso ? "Moroso" : "Al día"}</p>
                <button className="editar-btn" onClick={() => setIsEditing(true)}>Editar perfil</button>
              </>
            )}
          </div>
          <div className="historial-prestamos">
            <h3>Historial de préstamos:</h3>
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
