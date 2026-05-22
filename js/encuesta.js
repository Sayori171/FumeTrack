    const form = document.getElementById('form-encuesta');

    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Evita que la página se recargue de forma convencional

      // Capturar los valores del formulario
      const nombre = document.getElementById('input-nombre').value;
      const cantidadDiaria = Number(document.getElementById('input-cantidad').value);
      const precioPaquete = Number(document.getElementById('input-precio').value);
      const unidadesPaquete = Number(document.getElementById('input-unidades').value);

      // Calcular el costo exacto de cada cigarrillo individual
      const costoCigarrilloIndividual = Math.round(precioPaquete / unidadesPaquete);

      // Guardar la configuración inicial en el LocalStorage
      localStorage.setItem('user_nombre', nombre);
      localStorage.setItem('user_cantidad_diaria', cantidadDiaria);
      localStorage.setItem('user_costo_cigarrillo', costoCigarrilloIndividual);
    
      // Inicializar los valores del dashboard para que arranquen limpios
      localStorage.setItem('html_salud', 30); // Empieza a mitad de camino
      localStorage.setItem('html_cigarrillos', 0);
      localStorage.setItem('html_dinero', 0);
      // Redirigir al archivo principal del tablero
      window.location.href = 'dashboard.html'; 
    });