# /// Phone - Tienda de iPhone

Tienda online minimalista y premium de iPhone con diseño inspirado en Apple/Tesla.

## 🚀 Características

- **Diseño Ultra-Minimalista**: Estilo premium tipo Apple con tipografía grande y mucho espacio en blanco
- **Bento Grid**: Cuadrícula moderna con diferentes tamaños para destacar productos
- **Imágenes Flotantes**: Animaciones suaves que hacen que los productos "leviten"
- **Dark/Light Mode**: Diseño adaptable con fondo blanco y alto contraste
- **Responsive**: Totalmente adaptable a móviles, tablets y desktop
- **Filtros Dinámicos**: Filtra productos por modelo (iPhone 13, 14, 15, 16)
- **Integración WhatsApp**: Contacto directo con botones de WhatsApp pre-configurados

## 📁 Estructura del Proyecto

```
iphone-web-page/
├── Index.html          # Landing page principal
├── productos.html      # Página de catálogo de productos
├── css/
│   └── styles.css     # Estilos compartidos
├── js/
│   └── products.js     # Lógica de productos y filtros
└── README.md          # Este archivo
```

## 🎨 Páginas

### Index.html (Landing Page)

- Hero section con mensaje principal
- Badges de beneficios (Garantía, Envío, Originalidad)
- CTA para ver productos
- Footer con redes sociales

### productos.html (Catálogo)

- Header con título
- Sistema de filtros por modelo
- Bento Grid con todos los productos
- Cada producto incluye:
  - Imagen oficial de Apple
  - Nombre del modelo
  - Almacenamiento (128GB)
  - Precio en USD
  - Botón de contacto WhatsApp

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos personalizados con animaciones
- **JavaScript**: Funcionalidad de filtros y renderizado dinámico
- **Tailwind CSS**: Framework CSS utility-first
- **Font Awesome**: Iconos
- **Google Fonts (Inter)**: Tipografía neogrotesca estilo San Francisco

## 📱 Productos Disponibles

- iPhone 13 / 13 Pro / 13 Pro Max
- iPhone 14 / 14 Pro / 14 Pro Max
- iPhone 15 / 15 Pro
- iPhone 16 / 16 Pro / 16 Pro Max

Todos los modelos disponibles en **128GB** de almacenamiento.

## 🔧 Configuración

### Requisitos

- Navegador web moderno
- Conexión a internet (para cargar imágenes de Apple CDN)

### Instalación Local

1. Clona el repositorio:

```bash
git clone https://github.com/ClauRodriguez/iphone-web-page.git
```

2. Abre el archivo `Index.html` en tu navegador

O usa un servidor local:

```bash
# Con Python
python -m http.server 8000

# Con Node.js (http-server)
npx http-server
```

Luego abre: `http://localhost:8000`

## 📝 Personalización

### Cambiar número de WhatsApp

Edita la constante `WHATSAPP_NUMBER` en `js/products.js`:

```javascript
const WHATSAPP_NUMBER = "3512177985";
```

### Agregar/Modificar Productos

Edita el array `productos` en `js/products.js`:

```javascript
const productos = [
  {
    nombre: "iPhone 13",
    precio: 370,
    modelo: "13",
    imagen: "URL_DE_IMAGEN",
    almacenamiento: "128GB",
    featured: false, // true para destacar
  },
  // ... más productos
];
```

### Cambiar Colores

Los colores principales están en `css/styles.css`. Puedes modificar:

- Colores de fondo: `background-color` en `body`
- Colores de texto: `color` en `body` y clases específicas
- Colores de botones: `.cta-button`, `.whatsapp-button`
- Gradientes: `.logo-bar`, `.product-price`

## 🚀 Despliegue

### Netlify (Recomendado)

1. Conecta tu repositorio de GitHub con Netlify
2. Configuración:
   - Build command: (vacío)
   - Publish directory: `/`
3. Deploy automático en cada push

### GitHub Pages

1. Ve a Settings → Pages
2. Selecciona branch `main` y carpeta `/root`
3. Tu sitio estará en: `https://tu-usuario.github.io/iphone-web-page`

## 📞 Contacto

- WhatsApp: [3512177985](https://wa.me/3512177985)
- GitHub: [@ClauRodriguez](https://github.com/ClauRodriguez)

## 📄 Licencia

Este proyecto es privado. Todos los derechos reservados.

## 🎯 Próximas Mejoras

- [ ] Sistema de búsqueda de productos
- [ ] Comparador de modelos
- [ ] Galería de imágenes por producto
- [ ] Integración con sistema de inventario
- [ ] Modo oscuro/claro toggle
- [ ] Página de detalles individual por producto

---

**© 2026 /// Phone** - Precios sujetos a cambios sin previo aviso.
