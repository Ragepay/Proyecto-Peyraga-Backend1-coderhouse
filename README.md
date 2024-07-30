# Proyecto de Gestión de Productos en Tiempo Real

Este proyecto es una aplicación web que utiliza Node.js, Express y Socket.IO para gestionar productos en tiempo real. La aplicación permite listar productos, agregar nuevos productos, y eliminar productos a través de una interfaz web interactiva.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para Node.js que facilita la creación de aplicaciones web.
- **Handlebars**: Motor de plantillas para generar HTML dinámico.
- **Socket.IO**: Biblioteca para comunicación en tiempo real entre cliente y servidor.
- **JavaScript**: Lenguaje de programación para la lógica del cliente y el servidor.
- **HTML/CSS**: Tecnologías para la estructura y el diseño de la interfaz web.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

- **`/src`**: Carpeta que contiene el código fuente de la aplicación.
  - **`app.js`**: Archivo principal del servidor que configura Express, Handlebars y Socket.IO.
  - **`/routes`**: Carpeta con los archivos de rutas.
    - **`products.router.js`**: Rutas para gestionar productos.
    - **`carts.router.js`**: Rutas para gestionar carritos de compras.
    - **`home.router.js`**: Ruta para la página de inicio.
    - **`realTimeProducts.router.js`**: Ruta para la página de productos en tiempo real.
  - **`/class`**: Carpeta con las clases para manejar productos y carritos.
    - **`productManager.js`**: Clase para gestionar productos.
    - **`cartsManager.js`**: Clase para gestionar carritos.
  - **`/utils.js`**: Archivo con utilidades, como la obtención del directorio base.
  - **`/public`**: Carpeta con archivos estáticos como CSS y JavaScript del cliente.
    - **`/js`**: Scripts del cliente.
      - **`home.js`**: Script para la página de inicio.
      - **`realTimeProducts.js`**: Script para la página de productos en tiempo real.
    - **`/css`**: Estilos CSS para la aplicación.
    - **`/images`**: Imágenes utilizadas en la aplicación.
  - **`/views`**: Carpeta con las plantillas de Handlebars.
    - **`home.handlebars`**: Plantilla para la página de inicio.
    - **`realTimeProducts.handlebars`**: Plantilla para la página de productos en tiempo real.

## Endpoints de la API

### Productos

- **`GET /api/products`**
  - **Descripción**: Lista todos los productos. Puede recibir un parámetro `limit` en la query para limitar la cantidad de productos retornados.
  
- **`POST /api/products`**
  - **Descripción**: Agrega un nuevo producto. Requiere los campos `title`, `description`, `code`, `price`, `stock`, `categoria` y opcionalmente `thumbnails` y `status`.

- **`GET /api/products/:id`**
  - **Descripción**: Obtiene un producto específico por su ID.

- **`PUT /api/products/:id`**
  - **Descripción**: Actualiza un producto existente por su ID.

- **`DELETE /api/products/:id`**
  - **Descripción**: Elimina un producto por su ID.

### Carritos

- **`GET /api/carts/:id`**
  - **Descripción**: Lista los productos de un carrito específico por su ID.

- **`POST /api/carts`**
  - **Descripción**: Crea un nuevo carrito con un array de productos.

- **`POST /api/carts/:id/producto/:productId`**
  - **Descripción**: Agrega un producto a un carrito específico por su ID.

## Vistas

- **`/` (Home)**
  - **Descripción**: Página de inicio que muestra una lista de productos en tiempo real.

- **`/realtimeproducts`**
  - **Descripción**: Página que permite agregar y eliminar productos en tiempo real. Incluye formularios para agregar y eliminar productos.

## Scripts del Cliente

### `home.js`

Este script maneja la conexión con el servidor y la visualización de productos en la página de inicio.

### `realTimeProducts.js`

Este script maneja la conexión con el servidor y la interacción en la página de productos en tiempo real, permitiendo agregar y eliminar productos.

## URL



## Configuración y Ejecución


1. **Clonar el Repositorio**
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
