// src/Utils/boleta.jsx
import jsPDF from "jspdf"; // Asegúrate de tener jsPDF instalado

// Función para generar boleta
export const generarBoleta = (alumno, solicitud) => {
    const doc = new jsPDF();
    
    // Configurar el contenido de la boleta
    doc.text(`Boleta de Solicitud`, 20, 20);
    doc.text(`Nombre: ${alumno.nombre}`, 20, 30);
    doc.text(`Correo: ${alumno.correo}`, 20, 40);
    doc.text(`Solicitud: ${solicitud.solicitud}`, 20, 50);
    doc.text(`Fecha de Solicitud: ${solicitud.fecha}`, 20, 60);
    
    // Agregar código de barras (simulado)
    doc.text("Código de Barras: | | | | |", 20, 70); // Simulación simple

    // Guardar la boleta
    doc.save(`boleta_${alumno.nombre}.pdf`);
};
