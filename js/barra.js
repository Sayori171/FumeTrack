const usuarioNombre = localStorage.getItem('user_nombre') || 'Héroe';
const cigarrillosPorDia = Number(localStorage.getItem('user_cantidad_diaria')) || 10;
const COSTO_CIGARRILLO = Number(localStorage.getItem('user_costo_cigarrillo')) || 500;
const txtSalud = document.getElementById('txt-salud');
const barSalud = document.getElementById('bar-salud');
const txtCigarrillos = document.getElementById('txt-cigarrillos');
const txtDinero = document.getElementById('txt-dinero');

const btnDiaLimpio = document.getElementById('btn-dia-limpio');
const btnAbrirModal = document.getElementById('btn-abrir-modal');
const btnCerrarModal = document.getElementById('btn-cerrar-modal');
const btnConfirmarDesliz = document.getElementById('btn-confirmar-desliz');
const modalDesliz = document.getElementById('modal-desliz');
let puntosSalud = Number(localStorage.getItem('html_salud'));
let cigarrillosEvitados = Number(localStorage.getItem('html_cigarrillos'));
let dineroAhorrado = Number(localStorage.getItem('html_dinero'));

// Pequeña validación por si el localStorage está completamente vacío (primera vez)
if (localStorage.getItem('html_salud') === null) {
  puntosSalud = 50; // Inicia a mitad de camino
  cigarrillosEvitados = 0;
  dineroAhorrado = 0;
}

const tituloEncabezado = document.querySelector('h1');
if (tituloEncabezado) {
  tituloEncabezado.innerText = `El Camino de ${usuarioNombre}`;
}

// Función principal para renderizar los cambios en pantalla y guardar en el navegador
function actualizarUI() {
  // Actualizar los textos informativos
  txtSalud.innerText = `${puntosSalud}%`;
  txtCigarrillos.innerText = cigarrillosEvitados;
  txtDinero.innerText = `$${dineroAhorrado.toLocaleString('es-CO')} COP`;
  // Modificar el ancho de la barra de Tailwind fluidamente
  barSalud.style.width = `${puntosSalud}%`;
  // Guardar permanentemente los datos actualizados
  localStorage.setItem('html_salud', puntosSalud);
  localStorage.setItem('html_cigarrillos', cigarrillosEvitados);
  localStorage.setItem('html_dinero', dineroAhorrado);
}
// Evento: El usuario suma un día limpio con éxito
btnDiaLimpio.addEventListener('click', () => {
  // Suma los cigarrillos que NO consumió hoy según su encuesta
  cigarrillosEvitados += cigarrillosPorDia; 
  // Calcula el dinero exacto ahorrado hoy
  dineroAhorrado += (cigarrillosPorDia * COSTO_CIGARRILLO);
  // Sube el índice de salud un 5%, con un tope máximo del 100%
  puntosSalud = Math.min(puntosSalud + 5, 100); 

  // Refresca la pantalla
  actualizarUI();
});
// Evento: Confirmación de tropiezo en el Modal (ENFOQUE ANTI-FRUSTRACIÓN)
btnConfirmarDesliz.addEventListener('click', () => {
  // Resta un porcentaje controlado por el desliz (8%), pero nunca baja de 0%
  puntosSalud = Math.max(puntosSalud - 8, 0); 
  // NO le quitamos todo su dinero ahorrado, solo penalizamos el valor de UN cigarrillo
  dineroAhorrado = Math.max(dineroAhorrado - COSTO_CIGARRILLO, 0); 
  // Los cigarrillos totales rechazados en el pasado SE QUEDAN INTACTOS para no desanimar
  // Esconde el modal de alerta empática
  modalDesliz.classList.add('hidden'); 
  // Refresca la pantalla con los nuevos valores ajustados
  actualizarUI();
});
// Eventos mecánicos para abrir y cerrar la ventana flotante (Modal)
btnAbrirModal.addEventListener('click', () => {
  modalDesliz.classList.remove('hidden');
});
btnCerrarModal.addEventListener('click', () => {
  modalDesliz.classList.add('hidden');
});
actualizarUI();