const subscribeButton = document.querySelector('.subscribe-button');
const emailInput = document.querySelector('.email-input');

// Escuchar el clic en el botón
subscribeButton.addEventListener('click', async (event) => {
  event.preventDefault(); // Evita el comportamiento predeterminado del botón

  // Obtener el valor del input
  const email = emailInput.value.trim();

  // Validar que el campo no esté vacío y tenga un formato de correo válido
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Por favor, ingresa un correo válido.');
    return;
  }

  try {
    // Construir la URL absoluta basada en el origen del servidor
    const url = 'https://landing-page-backend-nine.vercel.app/api/save-email';

    // Hacer el fetch hacia la ruta
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }), // Enviar el correo en formato JSON
    });

    // Manejar la respuesta del servidor
    if (response.ok) {
      alert('¡Correo guardado exitosamente!');
      emailInput.value = ''; // Limpiar el campo de correo
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Error al conectar con el servidor:', error);
    alert('No se pudo conectar con el servidor. Inténtalo más tarde.');
  }
});
