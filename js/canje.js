// Plan Canje - iPhone Trade-in Calculator

// Precios de venta de todos los modelos (para calcular el total a pagar)
// Estos son los precios de venta, no los valores de canje
const preciosTodos = {
  // iPhone 11 serie
  "11": 250, // Precio estimado de venta
  "11 Pro": 300,
  "11 Pro Max": 350,
  // iPhone 12 serie
  "12": 350,
  "12 Pro": 400,
  "12 Pro Max": 450,
  // iPhone 13 serie
  "13": 370,
  "13 Pro": 470,
  "13 Pro Max": 540,
  // iPhone 14 serie
  "14": 400,
  "14 Pro": 550,
  "14 Pro Max": 580,
  // iPhone 15 serie
  "15": 560,
  "15 Pro": 680,
  "15 Pro Max": 750, // Precio estimado
  // iPhone 16 serie (nuevos)
  "16": 680,
  "16 Pro": 890,
  "16 Pro Max": 1040,
};

// Función para calcular el valor de canje (precio de venta - 30% = 70% del precio)
function calcularValorCanje(modelo) {
  const precioVenta = preciosTodos[modelo] || 0;
  return Math.round(precioVenta * 0.7); // 70% del precio de venta
}

// Valores de canje calculados automáticamente (70% del precio de venta)
const valoresCanje = {
  "11": calcularValorCanje("11"),
  "11 Pro": calcularValorCanje("11 Pro"),
  "11 Pro Max": calcularValorCanje("11 Pro Max"),
  "12": calcularValorCanje("12"),
  "12 Pro": calcularValorCanje("12 Pro"),
  "12 Pro Max": calcularValorCanje("12 Pro Max"),
  "13": calcularValorCanje("13"),
  "13 Pro": calcularValorCanje("13 Pro"),
  "13 Pro Max": calcularValorCanje("13 Pro Max"),
  "14": calcularValorCanje("14"),
  "14 Pro": calcularValorCanje("14 Pro"),
  "14 Pro Max": calcularValorCanje("14 Pro Max"),
  "15": calcularValorCanje("15"),
  "15 Pro": calcularValorCanje("15 Pro"),
  "15 Pro Max": calcularValorCanje("15 Pro Max"),
};

// Modelos disponibles para canje
const modelosCanje = [
  "11",
  "11 Pro",
  "11 Pro Max",
  "12",
  "12 Pro",
  "12 Pro Max",
  "13",
  "13 Pro",
  "13 Pro Max",
  "14",
  "14 Pro",
  "14 Pro Max",
  "15",
  "15 Pro",
  "15 Pro Max",
];

// Modelos nuevos disponibles (todos los modelos superiores)
const todosLosModelos = [
  "11",
  "11 Pro",
  "11 Pro Max",
  "12",
  "12 Pro",
  "12 Pro Max",
  "13",
  "13 Pro",
  "13 Pro Max",
  "14",
  "14 Pro",
  "14 Pro Max",
  "15",
  "15 Pro",
  "15 Pro Max",
  "16",
  "16 Pro",
  "16 Pro Max",
];

// Modelos nuevos disponibles (solo iPhone 16)
const modelosNuevos = ["16", "16 Pro", "16 Pro Max"];

// Estado actual
let equipoUsado = null;
let equipoNuevo = null;

// Obtener índice de un modelo en la jerarquía
function getModeloIndex(modelo) {
  return todosLosModelos.indexOf(modelo);
}

// Obtener modelos superiores al modelo dado
function getModelosSuperiores(modeloUsado) {
  const indexUsado = getModeloIndex(modeloUsado);
  if (indexUsado === -1) return [];

  // Retornar todos los modelos que están después del usado
  return todosLosModelos.slice(indexUsado + 1);
}

// Actualizar selector de equipo nuevo basado en el usado
function updateSelectorNuevo() {
  const selectorNuevo = document.getElementById("equipo-nuevo");
  const valorAnterior = selectorNuevo.value;

  // Limpiar selector
  selectorNuevo.innerHTML = '<option value="">Selecciona un modelo</option>';

  if (!equipoUsado) {
    // Si no hay equipo usado, mostrar solo iPhone 16
    modelosNuevos.forEach((modelo) => {
      const option = document.createElement("option");
      option.value = modelo;
      option.textContent = `iPhone ${modelo}`;
      selectorNuevo.appendChild(option);
    });
    return;
  }

  // Obtener modelos superiores
  const modelosDisponibles = getModelosSuperiores(equipoUsado);

  if (modelosDisponibles.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No hay modelos superiores disponibles";
    selectorNuevo.appendChild(option);
    equipoNuevo = null;
    updateResumen();
    return;
  }

  // Llenar selector con modelos superiores
  modelosDisponibles.forEach((modelo) => {
    const option = document.createElement("option");
    option.value = modelo;
    option.textContent = `iPhone ${modelo}`;
    selectorNuevo.appendChild(option);
  });

  // Si el valor anterior ya no es válido, limpiarlo
  if (valorAnterior && !modelosDisponibles.includes(valorAnterior)) {
    selectorNuevo.value = "";
    equipoNuevo = null;
  } else if (valorAnterior && modelosDisponibles.includes(valorAnterior)) {
    selectorNuevo.value = valorAnterior;
    equipoNuevo = valorAnterior;
  }

  updateResumen();
}

// Inicializar selectores
function initSelectors() {
  const selectorUsado = document.getElementById("equipo-usado");
  const selectorNuevo = document.getElementById("equipo-nuevo");

  // Llenar selector de equipo usado
  modelosCanje.forEach((modelo) => {
    const option = document.createElement("option");
    option.value = modelo;
    option.textContent = `iPhone ${modelo}`;
    selectorUsado.appendChild(option);
  });

  // Inicializar selector nuevo (solo iPhone 16 por defecto)
  modelosNuevos.forEach((modelo) => {
    const option = document.createElement("option");
    option.value = modelo;
    option.textContent = `iPhone ${modelo}`;
    selectorNuevo.appendChild(option);
  });

  // Event listeners
  selectorUsado.addEventListener("change", (e) => {
    equipoUsado = e.target.value;
    updateSelectorNuevo();
  });

  selectorNuevo.addEventListener("change", (e) => {
    equipoNuevo = e.target.value;
    updateResumen();
  });
}

// Actualizar resumen de cálculo
function updateResumen() {
  const resumenCard = document.getElementById("resumen-card");
  const precioNuevoEl = document.getElementById("precio-nuevo");
  const valorUsadoEl = document.getElementById("valor-usado");
  const totalEl = document.getElementById("total-pagar");

  if (!equipoUsado || !equipoNuevo) {
    resumenCard.style.display = "none";
    return;
  }

  resumenCard.style.display = "block";

  const valorUsado = valoresCanje[equipoUsado] || 0;
  const precioNuevo = preciosTodos[equipoNuevo] || 0;
  const total = Math.max(0, precioNuevo - valorUsado);

  precioNuevoEl.textContent = `$${precioNuevo} USD`;
  valorUsadoEl.textContent = `$${valorUsado} USD`;
  totalEl.textContent = `$${total} USD`;
}

// Generar mensaje de WhatsApp
function generarMensajeWhatsApp() {
  if (!equipoUsado || !equipoNuevo) {
    alert("Por favor, selecciona ambos equipos para continuar.");
    return;
  }

  const valorUsado = valoresCanje[equipoUsado] || 0;
  const precioNuevo = preciosTodos[equipoNuevo] || 0;
  const total = Math.max(0, precioNuevo - valorUsado);

  const mensaje = `Hola, me interesa el Plan Canje:

📱 Equipo que entrego: iPhone ${equipoUsado}
💰 Valor de canje: $${valorUsado} USD

📱 Equipo que quiero: iPhone ${equipoNuevo}
💰 Precio: $${precioNuevo} USD

💵 Total a pagar: $${total} USD

¿Podrían confirmarme disponibilidad?`;

  const whatsappNumber = "3512177985";
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    mensaje
  )}`;
  window.open(url, "_blank");
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  initSelectors();

  const btnCotizar = document.getElementById("btn-cotizar");
  if (btnCotizar) {
    btnCotizar.addEventListener("click", generarMensajeWhatsApp);
  }
});
