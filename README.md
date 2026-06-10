# 🛒 TECHLAB - Sistema de Gestión E-commerce

¡Hola! Soy Ezequiel Torres y este es mi proyecto de **Entrega Final** para el curso Talento Tech de Programación Java.

---

## � ¿De qué se trata?

Es un sistema completo para gestionar un local de tecnología. Incluye:

- **Gestión de Productos**: Agregar, listar, editar y eliminar productos.
- **Gestión de Categorías**: Organizar los productos por categorías.
- **Carrito de Compras**: Agregar productos al carrito y ver el total.
- **Realizar Pedidos**: Procesar compras, validar stock.
- **Historial de Pedidos**: Ver todas las ventas realizadas.
- **Panel de Administración**: Gestionar usuarios y alertar sobre stock crítico.

---

## 🛠️ Tecnologías que usé

- **Backend**: Java 17 con Spring Boot 3.2.0
- **Persistencia**: Spring Data JPA
- **Base de Datos**: H2 + MySQL compatible
- **Frontend**: HTML5, CSS3 y JavaScript con Bootstrap 5
- **Control de Versiones**: Git

---

## 📁 Estructura del Proyecto

```
src/main/java/ar/com/cac/preentrega/
├── controller/      # Controladores REST (API)
├── exception/       # Manejo de errores global
├── model/           # Entidades JPA
├── repository/      # Interfaces JPA
└── service/         # Lógica de negocio
src/main/resources/
└── static/          # Frontend (HTML, CSS, JS)
```

---

## 🚀 ¿Cómo ejecutarlo?

1.  **Abrir el proyecto** en tu IDE favorito 
2.  **Ejecutar la clase**: `PreentregaApplication.java`
3.  **Abrir el navegador** y visitar:
    - 🏪 **TECHLAB**: `http://localhost:8082/index.html`
    - 🗄️ **H2 Console (base de datos)**: `http://localhost:8082/h2-console`
      - URL JDBC: `jdbc:h2:mem:techlab_db`
      - Usuario: `sa`
      - Contraseña: `no tiene`

---

## 📚 Lo que aprendí

Aplicar conceptos avanzados de Java como:

- Programación Orientada a Objetos (POO)
- Herencia y polimorfismo
- Manejo de excepciones personalizadas
- APIs RESTful
- Conexión a bases de datos con JPA/Hibernate

---

## 🤝 Profesor y Tutora

- Profesor: Miguel Nefle
- Tutora: Natalia Themtham

¡Gracias por el cursado! 
