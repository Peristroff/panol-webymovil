import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Form,
} from "react-bootstrap";
import "./administrarItems.css";
import axios from "axios";

const fetchData = async (setItems) => {
  try {
    const response = await axios.get("http://localhost:3000/items");

    if (response.status === 200) {
      setItems(response.data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

function AdministrarItems() {
  const [items, setItems] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    stock: 0,
    category: '',
    disponibility: false,
  });

  useEffect(() => {
    fetchData(setItems);
  }, []);

  const handleEdit = (item) => {
    setCurrentItem(item);
    setShowEditModal(true);
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/items-create',
        newItem,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 200 || response.status === 201) {
        setItems([...items, response.data]);
        setShowCreateModal(false);
        setNewItem({
          name: '',
          description: '',
          stock: 0,
          category: '',
          disponibility: false,
        });
      }
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleSave = async () => {
    try {
      const { _id, ...data } = currentItem;
      const response = await axios.put(
        `http://localhost:3000/items/${_id}`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(data);
      if (response.status === 200) {
        setItems(items.map((item) => (item._id === _id ? currentItem : item)));
        setShowEditModal(false);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/items/${_id}`);
      if (response.status === 200) {
        setItems(items.filter((item) => item._id !== _id));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };

  return (
    <Container className="items-admin-container">
      <Row>
        <Col>
          <h2 className="text-center">Manejo de inventario</h2>
          <Button
            variant="primary"
            id="addButton"
            onClick={() => setShowCreateModal(true)}
            className="mb-3"
          >
            Crear Item
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Accciones</th>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Disponibilidad</th>
                <th>Creado</th>
                <th>Actualizado</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>
                    <Button
                      variant="outline-warning"
                      onClick={() => handleEdit(item)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </td>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.stock}</td>
                  <td>{item.category}</td>
                  <td>{item.disponibility ? "Yes" : "No"}</td>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>
                  <td>{new Date(item.updatedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentItem && (
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={currentItem.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={currentItem.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={currentItem.stock}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={currentItem.category}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formDisponibility">
                <Form.Label>Disponibility</Form.Label>
                <Form.Check
                  type="checkbox"
                  name="disponibility"
                  checked={currentItem.disponibility}
                  onChange={(e) =>
                    setCurrentItem({
                      ...currentItem,
                      disponibility: e.target.checked,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nuevo Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={newItem.stock}
                onChange={(e) =>
                  setNewItem({ ...newItem, stock: parseInt(e.target.value) })
                }
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                value={newItem.category}
                onChange={(e) =>
                  setNewItem({ ...newItem, category: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formDisponibility">
              <Form.Check
                type="checkbox"
                label="Disponibilidad"
                checked={newItem.disponibility}
                onChange={(e) =>
                  setNewItem({ ...newItem, disponibility: e.target.checked })
                }
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
    </Container>
  );
}

export default AdministrarItems;
