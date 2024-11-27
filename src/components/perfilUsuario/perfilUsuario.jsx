import React, { useState } from "react";
import "./PerfilUsuario.css";

const PerfilUsuario = ({ userType }) => {
  const [isMoroso, setIsMoroso] = useState(true);
  const [nombreUsuario, setNombreUsuario] = useState("Gema Rojas");
  const [notificaciones, setNotificaciones] = useState([
    "1. Entregaste con éxito la laptop.",
    "2. Debes devolver el libro antes del lunes.",
  ]);
  const [historialPrestamos, setHistorialPrestamos] = useState([
    { item: "Laptop", fecha: "2024-10-01", status: "Entregado" },
    { item: "Libro de Cálculo", fecha: "2024-09-28", status: "Pendiente" },
  ]);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [numNotificaciones, setNumNotificaciones] = useState(
    notificaciones.length
  );
  const [estadoAlumno, setEstadoAlumno] = useState("Habilitado");
  const [idUsuario, setIdUsuario] = useState("12345");
  const [fechaCreacion, setFechaCreacion] = useState("2024-10-16");
  const [correoContacto, setCorreoContacto] = useState("g.rojasfabre@pañol.cl");
  const [isEditing, setIsEditing] = useState(false);

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
          {isMoroso && (
            <div className="bloqueado-por-mora">
              <p>⚠️ El usuario está bloqueado por mora y no puede realizar solicitudes.</p>
            </div>
          )}
          {!isMoroso && (
            <button
              className="solicitud-btn"
              onClick={() => alert("Solicitud realizada con éxito.")}
            >
              Realizar Solicitud
            </button>
          )}
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

// useEffect(() => {
//   fetchData();
// }, []);
// const fetchData = async () => {
// try {
// const response = await axios.get(
//   'http:localhost:3000/profile/6744a4f315a2c8f880db3e8a'
// );
// console.log(response);

// } catch (error) {
// console.error("Error fetching data:", error);
//  Manejo del error
// }
// };
// return (
// <div>
// <h1>Conexión Backend y Frontend</h1>
// <p>{'el juanito se la come'}</p>
// </div>
// );
