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
    imagen: "./images/iphone-13-pro.jpeg",
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
    imagen: "./images/iphone-14-pro-max.jpeg",
    almacenamiento: "128GB",
    featured: false,
  },
  {
    nombre: "iPhone 15",
    precio: 560,
    modelo: "15",
    imagen: "./images/iphone-15.jpeg",
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
    imagen: "./images/iphone-16-pro.jpeg",
    almacenamiento: "128GB",
    featured: true,
  },
];

// Configuración
const WHATSAPP_NUMBER = "3512177985";
let currentFilter = "all";
let currentSearch = "";
let currentSort = "default";

// Función para mostrar skeleton loaders
function showSkeletonLoaders(containerId = "productos-container", count = 6) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement("article");
    skeleton.className = "bento-item skeleton-loader";
    skeleton.setAttribute("aria-label", "Cargando producto");
    skeleton.innerHTML = `
      <div class="skeleton-image"></div>
      <div class="skeleton-content">
        <div class="skeleton-line skeleton-line-short"></div>
        <div class="skeleton-line skeleton-line-medium"></div>
        <div class="skeleton-line skeleton-line-long"></div>
        <div class="skeleton-button"></div>
      </div>
    `;
    container.appendChild(skeleton);
  }
}

// Función para renderizar productos
function renderProducts(filter = "all", containerId = "productos-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Mostrar skeleton loaders mientras se cargan los productos
  showSkeletonLoaders(containerId, 6);

  // Simular delay de carga (en producción esto sería el tiempo real de carga)
  setTimeout(() => {
    container.innerHTML = "";
    let filtered =
      filter === "all"
        ? productos
        : productos.filter((p) => p.modelo === filter);

    // Aplicar búsqueda
    if (currentSearch.trim() !== "") {
      const searchLower = currentSearch.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.nombre.toLowerCase().includes(searchLower) ||
          p.modelo.includes(searchLower)
      );
    }

    // Aplicar ordenamiento
    if (currentSort !== "default") {
      filtered = [...filtered].sort((a, b) => {
        switch (currentSort) {
          case "price-asc":
            return a.precio - b.precio;
          case "price-desc":
            return b.precio - a.precio;
          case "name-asc":
            return a.nombre.localeCompare(b.nombre);
          case "name-desc":
            return b.nombre.localeCompare(a.nombre);
          default:
            return 0;
        }
      });
    }

    // Verificar si hay productos después del filtrado
    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
          <p style="font-size: 1.25rem; color: #808080; margin-bottom: 1rem;">No se encontraron productos</p>
          <p style="font-size: 0.875rem; color: #a0a0a0;">Intenta con otro filtro o búsqueda</p>
        </div>
      `;
      return;
    }

    filtered.forEach((item, index) => {
    const isLarge = item.featured && index % 3 === 0;
    const isTall = item.featured && index % 4 === 1;

    const card = document.createElement("article");
    card.className = `bento-item ${
      isLarge ? "bento-item-large" : isTall ? "bento-item-tall" : ""
    }`;
    card.setAttribute("role", "listitem");
    card.setAttribute("aria-label", `${item.nombre} ${item.almacenamiento} - $${item.precio} USD`);
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.innerHTML = `
      <div class="phone-float" style="height: ${
        isLarge ? "400px" : isTall ? "350px" : "250px"
      }; margin-bottom: 2rem;">
        <img 
          src="${item.imagen}" 
          alt="${item.nombre} ${item.almacenamiento} - Precio: $${item.precio} USD"
          class="phone-image"
          loading="lazy"
          onerror="this.parentElement.innerHTML='<div style='display: flex; align-items: center; justify-content: center; height: 100%; color: #404040;' aria-label='${item.nombre}'><i class='fas fa-mobile-alt' style='font-size: 4rem;' aria-hidden='true'></i></div>'"
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
          aria-label="Consultar disponibilidad de ${item.nombre}"
          target="_blank"
          rel="noopener noreferrer"
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
  }, 300); // Cerrar el setTimeout principal
}

// Inicializar filtros
function initFilters() {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      // Add loading state
      this.classList.add("loading");
      
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-pressed", "false");
          b.classList.remove("loading");
        });
      this.classList.add("active");
      this.setAttribute("aria-pressed", "true");
      currentFilter = this.dataset.filter;
      
      // Render products with slight delay for smooth transition
      setTimeout(() => {
        renderProducts(currentFilter);
        this.classList.remove("loading");
      }, 100);
    });
    
    // Keyboard navigation support
    btn.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });
}

// Inicializar búsqueda
function initSearch() {
  const searchInput = document.getElementById("product-search");
  if (!searchInput) return;

  let searchTimeout;
  searchInput.addEventListener("input", function (e) {
    clearTimeout(searchTimeout);
    currentSearch = e.target.value;

    // Debounce: esperar 300ms después de que el usuario deje de escribir
    searchTimeout = setTimeout(() => {
      renderProducts(currentFilter);
    }, 300);
  });

  // Limpiar búsqueda con Escape
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      this.value = "";
      currentSearch = "";
      renderProducts(currentFilter);
    }
  });
}

// Inicializar ordenamiento
function initSort() {
  const sortSelect = document.getElementById("sort-select");
  if (!sortSelect) return;

  sortSelect.addEventListener("change", function (e) {
    currentSort = e.target.value;
    renderProducts(currentFilter);
  });
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  initFilters();
  initSearch();
  initSort();
  // Render products with a small delay to show skeleton loaders
  setTimeout(() => {
    renderProducts();
  }, 300);
});
