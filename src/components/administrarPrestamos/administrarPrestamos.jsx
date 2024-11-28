import React, { useEffect, useState } from "react";

import {
  Table,
  Button,
  Form,
  Container,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";

import "./administrarPrestamos.css"; // Archivo CSS para personalización
import axios from "axios";

const modifyData = async (id) => {
  try {

    console.log(id);

    const response = await axios.get(`http://localhost:3000/lending-report/${id}`);

    response.data.forEach((item, index) => {
      console.log(`Item ${index}:`, item);
      return item;
    });
  } catch (error) {
    // Manejo del error
    console.error("Error fetching data:", error);
  }
};

function AdministrarPrestamos() {
  const [items, setItems] = useState([
    {
      // Placeholder data
      id: 1,
      name: "Notebook 1",
      user: "Juan",
      lendingDate: "2024-9-20",
      returnDate: "2024-10-20",
      category: "Categoría 1",
      userRecieved: 1,
      stock: 21,
      price: "150000",
      isReturned: false,
    },
  ]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/lending-report"
      );

      // Actualizar el estado con los datos recibidos
      setItems(
        response.data.map((item) => ({
            id: item._id,
            name: item.name,
            user: item.user,
            lendingDate: item.lendingDate,
            returnDate: item.returnDate,
            category: item.category,
            userRecieved: item.userAsk,
            stock: item.stock,
            price: item.price,
            isReturned: item.isReturned,
          }))
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const hoy = new Date();
  const hoyText = hoy.toISOString().split("T")[0];

  useEffect(() => {
    fetchData();
  }, []); // El array vacío asegura que esto se ejecute solo al montar el componente

  const getNames = (id) => {
    const names = items.map((item) => item.name); // Extraer solo los nombres
    console.log("Names:", names);
    console.log(id);
    return names;
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/lending-report/${id}`);
    console.log(`El item ${id}, fue eliminado`);
  };

  const handleReject = (id) => {
    console.log(`Eliminando ítem con ID: ${id}`);
    // Lógica para eliminar el ítem
  };

  const dateCalculation = (date) => {
    const dateParts = date.split("-");
    const dateObject = new Date(+dateParts[0], dateParts[1] - 1, +dateParts[2]);
    const difference = dateObject.getTime() - hoy.getTime();
    const deltaDays = Math.ceil(difference / (1000 * 3600 * 24));
    console.log(deltaDays);
    return deltaDays;
  };

  return (
    <Container className="items-admin-container">
      <Row>
        <Col>
          <h2 className="text-center">
            Administración de préstamos - Fecha de hoy: {hoyText}
          </h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Acciones</th>
                <th>Nombre de producto</th>
                <th>Usuario que lo pidió</th>
                <th>Fecha de petición</th>
                <th>Fecha de devolución</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Cantidad a devolver</th>
                <th>Precio por unidad</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Button
                      variant="outline-primary"
                      onClick={() => getNames(item)}
                      className="mb-2"
                    >
                      Objeto devuelto
                    </Button>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.user}</td>
                  <td>{item.lendingDate}</td>
                  <td>{item.returnDate}</td>
                  <td>{item.category}</td>
                  <td>{item.stock}</td>
                  <td>{item.userRecieved}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default AdministrarPrestamos;