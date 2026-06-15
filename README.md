# Proyecto Final: TECHLAB - Sistema de Gestión de E-commerce - Agencia de Habilidades para el Futuro - Talento Tech

## Alumno:
Torres Ezequiel 

## Materia:
Programación Orientada a Objetos  / Back - End / Java


## Profesor: 
Miguel Angel Nefle

## Tutor/a:
Natalia Themtham
---

## 📋 Descripción del Proyecto

Este proyecto es una API RESTful desarrollada en **Java con Spring Boot** y una interfaz de usuario en **HTML/CSS/JS vanilla**, que funciona como sistema de gestión de un e-commerce llamado TECHLAB.

El sistema permite gestionar productos, categorías, carrito de compras, órdenes/pedidos y control de stock.

---

## ✅ Requerimientos Obligatorios Cumplidos

### 1. Entidades Principales

- **Producto**: id, nombre, descripción, precio, categoría, imagen, stock.
- **Pedido/Orden**: id, lista de productos/lineas, fecha de creación, estado.
- **LineaPedido**: objeto intermedio que asocia Producto + Cantidad.
- **EstadoPedido**: enum con los estados PENDIENTE, CONFIRMADO, ENVIADO, ENTREGADO, CANCELADO.

### 2. Endpoints REST Implementados

| Método | Endpoint              | Descripción                                |
| ------ | --------------------- | ------------------------------------------ |
| GET    | `/api/productos`      | Listar todos los productos                 |
| GET    | `/api/productos/{id}` | Obtener detalle de un producto por ID      |
| POST   | `/api/productos`      | Crear un nuevo producto                    |
| PUT    | `/api/productos/{id}` | Actualizar un producto existente           |
| DELETE | `/api/productos/{id}` | Eliminar un producto                       |
| POST   | `/api/pedidos`        | Crear un pedido (valida y descuenta stock) |
| GET    | `/api/pedidos`        | Listar todos los pedidos (historial)       |

### 3. Lógica de Negocio

- ✅ Validación de stock suficiente al momento de crear un pedido.
- ✅ Descuento automático de stock al confirmar un pedido.
- ✅ Excepción personalizada `StockInsuficienteException` con manejo global de errores (HTTP 400).
- ✅ Excepción `ProductoNoEncontradoException` para manejo de errores (HTTP 404).
- ✅ Alertas en el frontend para productos con stock menor a 5 unidades.

### 4. Organización del Código

El proyecto está organizado en paquetes lógicos según la temática:

- `com.techlab.productos` → Entidad Producto
- `com.techlab.pedidos` → Entidades Pedido y LineaPedido
- `com.techlab.excepciones`→ Excepciones personalizadas y GlobalExceptionHandler
- `com.techlab.controller` → Controladores REST
- `com.techlab.service` → TiendaService (logica de negocio)
- `com.techlab.repository` → Repositorios JPA (acceso a datos)

### 5. Frontend - Menú Principal

El HTML cuenta con la interfaz completa, alineada con los requerimientos:

1. **Gestionar Productos** (a: Agregar, b: Listar, c: Buscar por ID, d: Actualizar, e: Eliminar, f: Volver)
2. **Gestionar Categorías**
3. **Ver Carrito de Compras**
4. **Realizar Pedido**
5. **Consultar Historial de Pedidos**
6. **Administración (usuarios y stock)**

---

## 🛠️ Stack Tecnológico

- **Java 17 o superior**
- **Spring Boot 3.x**
  - Spring Data JPA (para acceso a datos)
  - Spring Web (para la API REST)
  - H2 Database (base de datos en archivo, para persistencia sin instalación)
- **HTML 5 / CSS 3 / JavaScript Vanilla**
- **Bootstrap 5** (para la interfaz de usuario)

---

## 🚀 Cómo ejecutar el proyecto

1. **Abrir la terminal** y navegar a la carpeta del proyecto.
2. Ejecutar el comando:
   ```bash
   mvn spring-boot:run
   ```
3. **Abrir el navegador** y visitar:
   - Aplicación: `http://localhost:8082/index.html`
   - Consola H2 (para ver la base de datos): `http://localhost:8082/h2-console`
     - URL JDBC: `jdbc:h2:file:./data/techlabdb`
     - Usuario: `sa`
     - Contraseña: (vacía)

---

## � Estructura del Proyecto

```
src/main/
├── java/com/techlab/
│   ├── TechlabApplication.java (clase principal de Spring Boot)
│   ├── productos/
│   │   └── Producto.java
│   ├── pedidos/
│   │   ├── EstadoPedido.java
│   │   ├── LineaPedido.java
│   │   └── Pedido.java
│   ├── excepciones/
│   │   ├── StockInsuficienteException.java
│   │   ├── ProductoNoEncontradoException.java
│   │   └── GlobalExceptionHandler.java
│   ├── controller/
│   │   ├── ProductoController.java
│   │   └── PedidoController.java
│   ├── service/
│   │   └── TiendaService.java
│   └── repository/
│       ├── ProductoRepository.java
│       └── PedidoRepository.java
└── resources/
    ├── application.properties (configuración de Spring Boot y DB)
    └── static/
        ├── index.html
        ├── css/style.css
        └── js/app.js
```

---

## 📝 Notas

- **Persistencia**: Los datos se guardan en un archivo `techlabdb.mv.db` dentro de la carpeta `data/`, por lo que no se pierden al cerrar la aplicación.
- **CORS**: La API está configurada para permitir conexiones desde cualquier origen (para facilitar el desarrollo).

---

## 🎯 Conclusión

El proyecto cumple con **todos los requerimientos obligatorios** especificados, demostrando el correcto uso de:

- POO (encapsulamiento, métodos get/set)
- Colecciones (ArrayList y Sets para categorías)
- Excepciones personalizadas y manejo global de errores
- API RESTful con Spring Boot
- JPA/Hibernate para acceso a datos
- Integración entre frontend y backend usando fetch API


