# Proyecto Final: TECHLAB - Sistema de Gestión de E-commerce

## Datos del Alumno

- **Alumno**: Torres Ezequiel
- **Materia**: Programación Orientada a Objetos / Back-End / Java
- **Profesor**: Miguel Angel Nefle
- **Tutor/a**: Natalia Themtham
- **Institución**: Agencia de Habilidades para el Futuro - Talento Tech

---

## 📋 Descripción del Proyecto

Este proyecto es un **sistema de gestión de e-commerce**, desarrollado en **Java con Spring Boot** (Back-End) y **HTML/CSS/JavaScript Vanilla** (Front-End), diseñado para gestionar productos, categorías, carrito de compras, pedidos y control de stock.

---

## ✅ Requerimientos Obligatorios Cumplidos

### 1. Entidades Principales

| Entidad          | Atributos                                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Producto**     | `id` (Long), `nombre` (String), `descripcion` (String), `precio` (double), `categoria` (String), `imagen` (URL), `stock` (int) |
| **Pedido**       | `id` (Long), `lineas` (List<LineaPedido>), `fecha` (LocalDateTime), `estado` (EstadoPedido)                                    |
| **LineaPedido**  | `id` (Long), `producto` (Producto), `cantidad` (int)                                                                           |
| **EstadoPedido** | Enum: `PENDIENTE`, `CONFIRMADO`, `ENVIADO`, `ENTREGADO`, `CANCELADO`                                                           |

### 2. Endpoints REST Implementados

| Método | Endpoint                         | Descripción                                |
| ------ | -------------------------------- | ------------------------------------------ |
| GET    | `/api/productos`                 | Listar todos los productos                 |
| GET    | `/api/productos/{id}`            | Obtener detalle de un producto por ID      |
| GET    | `/api/productos/buscar?nombre=X` | Buscar productos por nombre                |
| POST   | `/api/productos`                 | Crear un nuevo producto                    |
| PUT    | `/api/productos/{id}`            | Actualizar un producto existente           |
| DELETE | `/api/productos/{id}`            | Eliminar un producto                       |
| POST   | `/api/pedidos`                   | Crear un pedido (valida y descuenta stock) |
| GET    | `/api/pedidos`                   | Listar todos los pedidos (historial)       |

### 3. Lógica de Negocio

- ✅ **Validación de stock**: Verifica que haya stock suficiente al crear un pedido.
- ✅ **Descuento de stock**: Descuenta automáticamente el stock al confirmar un pedido.
- ✅ **Excepciones personalizadas**: `StockInsuficienteException` (HTTP 400) y `ProductoNoEncontradoException` (HTTP 404).
- ✅ **Manejo global de errores**: `GlobalExceptionHandler` para manejar excepciones en toda la API.
- ✅ **Control de stock crítico**: Alertas en el frontend para productos con stock menor a 5 unidades.
- ✅ **Buenas prácticas Spring Boot**: Inyección de dependencias por constructor. 

### 4. Organización del Código

El proyecto sigue una estructura modular y organizada en paquetes lógicos:

- `com.techlab` → Paquete principal
  - `productos` → Entidad `Producto`
  - `pedidos` → Entidades `Pedido`, `LineaPedido` y `EstadoPedido`
  - `excepciones` → Excepciones personalizadas y `GlobalExceptionHandler`
  - `controller` → Controladores REST (`ProductoController`, `PedidoController`)
  - `service` → `TiendaService` 
  - `repository` → Repositorios JPA (`ProductoRepository`, `PedidoRepository`)

---

## 🎨 Frontend - Funcionalidades Principales

El frontend cuenta con una interfaz intuitiva y fácil de usar con las siguientes opciones:

1. **Gestionar Productos**
   - Agregar, listar, buscar por ID, actualizar y eliminar productos.
2. **Gestionar Categorías**
   - Ver y listado de categorías.
3. **Ver Carrito de Compras**
   - Agregar productos al carrito, ver el total.
4. **Realizar Pedido**
   - Confirmar el pedido y descontar el stock.
5. **Historial de Pedidos**
   - Ver todos los pedidos realizados con su estado y total.
6. **Administración**
   - Ver alertas de stock crítico (menos de 5 unidades).

---

## 🛠️ Stack Tecnológico

| Categoría        | Tecnologías                                                        |
| ---------------- | ------------------------------------------------------------------ |
| **Back-End**     | Java 17+, Spring Boot 3.x, Spring Data JPA, Hibernate, H2 Database |
| **Front-End**    | HTML 5, CSS 3, JavaScript Vanilla, Bootstrap 5                     |
| **Herramientas** | Maven, Git/GitHub, VS Code                                         |

---

## 🚀 Como Ejecutar el Proyecto:

1. **Prerrequisitos**

- Tener instalado:
  - Java 17 o superior
  - Maven
  - Git 

2. **Paso a Paso**

1. **Clonar el repositorio** 
   ```bash
   git clone https://github.com/EzequielTorre/entregaFinal.java.git
   ```
1. **Navegar a la carpeta del proyecto**:
   ```bash
   cd entregaFinal.java
   ```
1. **Ejecutar la aplicación**:
   ```bash
   mvn spring-boot:run
   ```
1. **Abrir el navegador y acceder a**:
   - Aplicación (Frontend): `http://localhost:8082/index.html`
   - Consola H2 (para ver la base de datos): `http://localhost:8082/h2-console`
     - JDBC URL: `jdbc:h2:file:./data/techlabdb`
     - Usuario: `sa`
     - Contraseña: (dejar vacía)

---

## 📁 Estructura del Proyecto:

```
src/main/
├── java/com/techlab/
│   ├── TechlabApplication.java (clase principal)
│   ├── productos/
│   │   └── Producto.java (entidad producto)
│   ├── pedidos/
│   │   ├── EstadoPedido.java (enum de estados)
│   │   ├── LineaPedido.java (entidad intermedia)
│   │   └── Pedido.java (entidad pedido)
│   ├── excepciones/
│   │   ├── StockInsuficienteException.java
│   │   ├── ProductoNoEncontradoException.java
│   │   └── GlobalExceptionHandler.java
│   ├── controller/
│   │   ├── ProductoController.java
│   │   └── PedidoController.java
│   ├── service/
│   │   └── TiendaService.java (logica de negocio)
│   └── repository/
│       ├── ProductoRepository.java (repo de productos)
│       └── PedidoRepository.java (repo de pedidos)
└── resources/
    ├── application.properties (configuracion)
    └── static/
        ├── index.html (interfaz principal)
        ├── css/style.css (estilos)
        └── js/app.js (logica frontend)
```

---

## 📝 Notas Importantes:

- **Persistencia**: Los datos se guardan en un archivo `techlabdb.mv.db` dentro de la carpeta `data/`, por lo que NO se pierden al cerrar la aplicación.
- **CORS**: La API está configurada para permitir conexiones desde cualquier origen para facilitar el desarrollo.

---

## 🎯 Conclusión:

Con este proyecto se demuestra el uso práctico de conceptos como:

- Programación Orientada a Objetos (encapsulamiento, constructores, métodos get/set)
- API RESTful con Spring Boot
- Acceso a bases de datos con JPA/Hibernate
- Manejo de excepciones personalizadas
- Integración entre Frontend y Backend con Fetch API
- Buenas prácticas de desarrollo en Java y Spring Boot
