import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Form,
} from 'react-bootstrap';
import axios from 'axios';
import './administrarUsuarios.css';

function AdministrarUsuarios() {
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    nombreUsuario: '',
    contrasena: '',
    correo: '',
    tipoUsuario: '',
    moroso: false,
    prestamoActivo: false,
    imagenPerfil: '',
  });

  // Obtener la lista de usuarios
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/profile/');
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Manejar cambios en los formularios
  const handleChange = (e, isEditing = false) => {
    const { name, value, type, checked } = e.target;
    if (isEditing) {
      setCurrentUser({
        ...currentUser,
        [name]: type === 'checkbox' ? checked : value,
      });
    } else {
      setNewUser({
        ...newUser,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  // Crear un nuevo usuario
  const handleCreate = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/create-profile/',
        newUser,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 201) {
        setUsers([...users, response.data]);
        setShowCreateModal(false);
        setNewUser({
          nombreUsuario: '',
          contrasena: '',
          correo: '',
          tipoUsuario: '',
          moroso: false,
          prestamoActivo: false,
          imagenPerfil: '',
        });
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Editar un usuario existente
  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowEditModal(true);
  };

  // Guardar los cambios de edición
  const handleSave = async () => {
    try {
      const { _id, ...data } = currentUser;
      const response = await axios.put(
        `http://localhost:3000/profile/${_id}`,
        data,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 200) {
        setUsers(users.map((user) => (user._id === _id ? currentUser : user)));
        setShowEditModal(false);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Eliminar un usuario
  const handleDelete = async (_id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/profile/${_id}`);
      if (response.status === 200) {
        setUsers(users.filter((user) => user._id !== _id));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="text-center">Administrar Usuarios</h2>
          <Button
            variant="primary"
            onClick={() => setShowCreateModal(true)}
            className="mb-3"
          >
            Crear Usuario
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Acciones</th>
                <th>ID</th>
                <th>Nombre de Usuario</th>
                <th>Correo</th>
                <th>Tipo de Usuario</th>
                <th>Moroso</th>
                <th>Préstamo Activo</th>
                <th>Creado</th>
                <th>Actualizado</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(user)}
                      className="mr-2"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                  <td>{user._id}</td>
                  <td>{user.nombreUsuario}</td>
                  <td>{user.correo}</td>
                  <td>{user.tipoUsuario}</td>
                  <td>{user.moroso ? 'Sí' : 'No'}</td>
                  <td>{user.prestamoActivo ? 'Sí' : 'No'}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td>{new Date(user.updatedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modal para crear usuario */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombreUsuario">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                name="nombreUsuario"
                value={newUser.nombreUsuario}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="formContrasena">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="contrasena"
                value={newUser.contrasena}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="formCorreo">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={newUser.correo}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="formTipoUsuario">
              <Form.Label>Tipo de Usuario</Form.Label>
              <Form.Control
                type="text"
                name="tipoUsuario"
                value={newUser.tipoUsuario}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="formMoroso">
              <Form.Check
                type="checkbox"
                label="Moroso"
                name="moroso"
                checked={newUser.moroso}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="formPrestamoActivo">
              <Form.Check
                type="checkbox"
                label="Préstamo Activo"
                name="prestamoActivo"
                checked={newUser.prestamoActivo}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="formImagenPerfil">
              <Form.Label>Imagen de Perfil (URL)</Form.Label>
              <Form.Control
                type="text"
                name="imagenPerfil"
                value={newUser.imagenPerfil}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para editar usuario */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentUser && (
            <Form>
              <Form.Group controlId="formNombreUsuario">
                <Form.Label>Nombre de Usuario</Form.Label>
                <Form.Control
                  type="text"
                  name="nombreUsuario"
                  value={currentUser.nombreUsuario}
                  onChange={(e) => handleChange(e, true)}
                />
              </Form.Group>
              <Form.Group controlId="formContrasena">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="contrasena"
                  value={currentUser.contrasena}
                  onChange={(e) => handleChange(e, true)}
                />
              </Form.Group>
              <Form.Group controlId="formCorreo">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  name="correo"
                  value={currentUser.correo}
                  onChange={(e) => handleChange(e, true)}
                />
              </Form.Group>
              <Form.Group controlId="formTipoUsuario">
                <Form.Label>Tipo de Usuario</Form.Label>
                <Form.Control
                  type="text"
                  name="tipoUsuario"
                  value={currentUser.tipoUsuario}
                  onChange={(e) => handleChange(e, true)}
                />
              </Form.Group>
              <Form.Group controlId="formMoroso">
                <Form.Check
                  type="checkbox"
                  label="Moroso"
                  name="moroso"
                  checked={currentUser.moroso}
                  onChange={(e) => handleChange(e, true)}
                />
              </Form.Group>
              <Form.Group controlId="formPrestamoActivo">
                <Form.Check
                  type="checkbox"
                  label="Préstamo Activo"
                  name="prestamoActivo"
                  checked={currentUser.prestamoActivo}
                  onChange={(e) => handleChange(e, true)}
                />
              </Form.Group>
              <Form.Group controlId="formImagenPerfil">
                <Form.Label>Imagen de Perfil (URL)</Form.Label>
                <Form.Control
                  type="text"
                  name="imagenPerfil"
                  value={currentUser.imagenPerfil}
                  onChange={(e) => handleChange(e, true)}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdministrarUsuarios;
