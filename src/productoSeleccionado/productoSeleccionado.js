document.querySelectorAll('nav ul li a').forEach(item => {
    item.addEventListener('click', event => {
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('selected');
        });
        event.target.classList.add('selected');
    });
});

// Ensure this code is in `src/productoSeleccionado/productoSeleccionado.js`
document.addEventListener('DOMContentLoaded', () => {
    const inputButton = document.getElementById('inputButton');
    if (inputButton) {
        inputButton.addEventListener('click', () => {
            alert('Solicitud realizada correctamente');
        });
    } else {
        console.error('inputButton element not found');
    }
});
