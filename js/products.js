// Productos disponibles
const productos = [
  {
    nombre: "iPhone 13",
    precio: 370,
    modelo: "13",
    imagen:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202207-6-1inch-blue?wid=470&hei=556&fmt=png-alpha&.v=1656711491625",
    almacenamiento: "128GB",
    featured: false,
  },
  {
    nombre: "iPhone 14",
    precio: 400,
    modelo: "14",
    imagen:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-blue?wid=470&hei=556&fmt=png-alpha&.v=1663703841896",
    almacenamiento: "128GB",
    featured: false,
  },
  {
    nombre: "iPhone 13 Pro",
    precio: 470,
    modelo: "13",
    imagen:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-finish-select-202207-sierra-blue?wid=470&hei=556&fmt=png-alpha&.v=1656703841896",
    almacenamiento: "128GB",
    featured: false,
  },
  {
    nombre: "iPhone 16 Pro Max",
    precio: 1040,
    modelo: "16",
    imagen:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-max-finish-select-202409-naturaltitanium?wid=470&hei=556&fmt=png-alpha&.v=1726616100000",
    almacenamiento: "128GB",
    featured: true,
  },
  {
    nombre: "iPhone 13 Pro Max",
    precio: 540,
    modelo: "13",
    imagen:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-finish-select-202207-sierra-blue?wid=470&hei=556&fmt=png-alpha&.v=1656703841896",
    almacenamiento: "128GB",
    featured: false,
  },
  {
    nombre: "iPhone 14 Pro",
    precio: 550,
    modelo: "14",
    imagen: "./images/iphone-14-pro.jpeg",
    almacenamiento: "128GB",
    featured: false,
  },
  {
    nombre: "iPhone 14 Pro Max",
    precio: 580,
    modelo: "14",
    imagen:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-finish-select-202209-deeppurple?wid=470&hei=556&fmt=png-alpha&.v=1663703841896",
    almacenamiento: "128GB",
    featured: false,
  },
  {
    nombre: "iPhone 15",
    precio: 560,
    modelo: "15",
    imagen:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=470&hei=556&fmt=png-alpha&.v=1693009279096",
    almacenamiento: "128GB",
    featured: false,
  },
  {
    nombre: "iPhone 15 Pro",
    precio: 680,
    modelo: "15",
    imagen: "./images/iphone-15-pro.jpeg",
    almacenamiento: "128GB",
    featured: true,
  },
  {
    nombre: "iPhone 16",
    precio: 680,
    modelo: "16",
    imagen:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-blue?wid=470&hei=556&fmt=png-alpha&.v=1726616100000",
    almacenamiento: "128GB",
    featured: false,
  },
  {
    nombre: "iPhone 16 Pro",
    precio: 890,
    modelo: "16",
    imagen:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-naturaltitanium?wid=470&hei=556&fmt=png-alpha&.v=1726616100000",
    almacenamiento: "128GB",
    featured: true,
  },
];

// Configuración
const WHATSAPP_NUMBER = "3512177985";
let currentFilter = "all";

// Función para renderizar productos
function renderProducts(filter = "all", containerId = "productos-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";
  const filtered =
    filter === "all"
      ? productos
      : productos.filter((p) => p.modelo === filter);

  filtered.forEach((item, index) => {
    const isLarge = item.featured && index % 3 === 0;
    const isTall = item.featured && index % 4 === 1;

    const card = document.createElement("div");
    card.className = `bento-item ${
      isLarge ? "bento-item-large" : isTall ? "bento-item-tall" : ""
    }`;
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.innerHTML = `
      <div class="phone-float" style="height: ${
        isLarge ? "400px" : isTall ? "350px" : "250px"
      }; margin-bottom: 2rem;">
        <img 
          src="${item.imagen}" 
          alt="${item.nombre}"
          class="phone-image"
          loading="lazy"
          onerror="this.parentElement.innerHTML='<div style='display: flex; align-items: center; justify-content: center; height: 100%; color: #404040;'><i class='fas fa-mobile-alt' style='font-size: 4rem;'></i></div>'"
        />
      </div>
      <div>
        <p class="product-spec mb-2">${item.almacenamiento}</p>
        <h3 class="product-title">${item.nombre}</h3>
        <div class="mt-4 mb-6">
          <p class="product-price">$${item.precio} USD</p>
        </div>
        <a
          href="https://wa.me/${WHATSAPP_NUMBER}?text=Hola, me interesa el ${encodeURIComponent(
      item.nombre
    )}"
          class="cta-button"
        >
          Consultar disponibilidad
        </a>
      </div>
    `;
    container.appendChild(card);

    setTimeout(() => {
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// Inicializar filtros
function initFilters() {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      currentFilter = this.dataset.filter;
      renderProducts(currentFilter);
    });
  });
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  initFilters();
  renderProducts();
});
