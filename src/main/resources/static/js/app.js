const API_URL = "http://localhost:8082/api";
let cart = [];
let categorias = [];

document.addEventListener("DOMContentLoaded", () => {
  showSection("productos");
  loadProducts();
  loadCategorias();

  document.getElementById("menu-toggle").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("wrapper").classList.toggle("toggled");
  });

  document
    .getElementById("product-form")
    .addEventListener("submit", saveProduct);
  document
    .getElementById("categoria-form")
    .addEventListener("submit", saveCategoria);
  document
    .getElementById("editar-product-form")
    .addEventListener("submit", updateProduct);
});

function showSection(sectionId) {
  document
    .querySelectorAll("section")
    .forEach((s) => s.classList.add("d-none"));
  document.getElementById(`${sectionId}-section`).classList.remove("d-none");
  document.getElementById("section-title").innerText =
    "SISTEMA DE GESTIÓN - TECHLAB";

  if (sectionId === "historial") loadOrderHistory();
  if (sectionId === "admin") {
    loadStockCritico();
  }
}

function showBuscarPorId() {
  document.getElementById("buscar-id-section").classList.remove("d-none");
}

async function buscarProductoPorId() {
  const id = document.getElementById("buscar-id").value;
  if (!id) return;

  try {
    const res = await fetch(`${API_URL}/productos/${id}`);
    if (!res.ok) throw new Error("Producto no encontrado");
    const producto = await res.json();

    document.getElementById("editar-id").value = producto.id;
    document.getElementById("editar-nombre").value = producto.nombre;
    document.getElementById("editar-descripcion").value = producto.descripcion;
    document.getElementById("editar-precio").value = producto.precio;
    document.getElementById("editar-categoria").value = producto.categoria;
    document.getElementById("editar-imagen").value = producto.imagen;
    document.getElementById("editar-stock").value = producto.stock;

    const modal = new bootstrap.Modal(
      document.getElementById("editarProductModal"),
    );
    modal.show();
    document.getElementById("buscar-id-section").classList.add("d-none");
    document.getElementById("buscar-id").value = "";
  } catch (error) {
    alert("Error: " + error.message);
  }
}

async function loadProducts() {
  const res = await fetch(`${API_URL}/productos`);
  const productos = await res.json();
  const tbody = document.getElementById("productos-table");
  tbody.innerHTML = "";

  productos.forEach((p) => {
    tbody.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>
                    ${p.imagen ? `<img src="${p.imagen}" alt="${p.nombre}" style="width: 60px; height: 60px; object-fit: cover;">` : '<i class="fas fa-image text-muted"></i>'}
                </td>
                <td>${p.nombre}</td>
                <td class="text-truncate" style="max-width: 200px;">${p.descripcion}</td>
                <td>$${p.precio.toFixed(2)}</td>
                <td><span class="badge bg-secondary">${p.categoria}</span></td>
                <td><span class="badge ${p.stock < 5 ? "bg-danger" : "bg-success"}">${p.stock}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-info" onclick="addToCart(${p.id}, '${p.nombre}', ${p.precio})">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-warning" onclick="editarProducto(${p.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${p.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
  });
}

async function editarProducto(id) {
  try {
    const res = await fetch(`${API_URL}/productos/${id}`);
    const producto = await res.json();

    document.getElementById("editar-id").value = producto.id;
    document.getElementById("editar-nombre").value = producto.nombre;
    document.getElementById("editar-descripcion").value = producto.descripcion;
    document.getElementById("editar-precio").value = producto.precio;
    document.getElementById("editar-categoria").value = producto.categoria;
    document.getElementById("editar-imagen").value = producto.imagen || "";
    document.getElementById("editar-stock").value = producto.stock;

    const modal = new bootstrap.Modal(
      document.getElementById("editarProductModal"),
    );
    modal.show();
  } catch (error) {
    alert("Error al cargar producto");
  }
}

async function loadCategorias() {
  const res = await fetch(`${API_URL}/productos`);
  const productos = await res.json();
  const catsSet = new Set(productos.map((p) => p.categoria).filter((c) => c));
  categorias = Array.from(catsSet);

  const list = document.getElementById("categorias-list");
  list.innerHTML = "";
  categorias.forEach((c) => {
    list.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${c}
                <span class="badge bg-info">${productos.filter((p) => p.categoria === c).length}</span>
            </li>
        `;
  });
}

async function saveProduct(e) {
  e.preventDefault();
  const producto = {
    nombre: document.getElementById("p-nombre").value,
    descripcion: document.getElementById("p-descripcion").value,
    precio: parseFloat(document.getElementById("p-precio").value),
    categoria: document.getElementById("p-categoria").value,
    imagen: document.getElementById("p-imagen").value || null,
    stock: parseInt(document.getElementById("p-stock").value),
  };

  await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });

  bootstrap.Modal.getInstance(document.getElementById("productModal")).hide();
  document.getElementById("product-form").reset();
  loadProducts();
  loadCategorias();
}

async function updateProduct(e) {
  e.preventDefault();
  const id = document.getElementById("editar-id").value;
  const producto = {
    nombre: document.getElementById("editar-nombre").value,
    descripcion: document.getElementById("editar-descripcion").value,
    precio: parseFloat(document.getElementById("editar-precio").value),
    categoria: document.getElementById("editar-categoria").value,
    imagen: document.getElementById("editar-imagen").value || null,
    stock: parseInt(document.getElementById("editar-stock").value),
  };

  await fetch(`${API_URL}/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });

  bootstrap.Modal.getInstance(
    document.getElementById("editarProductModal"),
  ).hide();
  document.getElementById("editar-product-form").reset();
  loadProducts();
  loadCategorias();
}

async function deleteProduct(id) {
  if (confirm("e) ¿Eliminar Producto?")) {
    await fetch(`${API_URL}/productos/${id}`, { method: "DELETE" });
    loadProducts();
    loadCategorias();
  }
}

async function saveCategoria(e) {
  e.preventDefault();
  alert("Categorías se crean automáticamente al agregar productos.");
  document.getElementById("categoria-form").reset();
}

async function loadStockCritico() {
  const res = await fetch(`${API_URL}/productos`);
  const products = await res.json();
  const container = document.getElementById("stock-critico-list");
  const critical = products.filter((p) => p.stock < 5);

  container.innerHTML =
    critical.length === 0
      ? '<p class="text-success"><i class="fas fa-check-circle"></i> Stock saludable, no hay productos con menos de 5 unidades.</p>'
      : "";

  critical.forEach((p) => {
    container.innerHTML += `
            <div class="alert alert-warning py-2 d-flex justify-content-between align-items-center">
                <div>
                    <i class="fas fa-exclamation-triangle"></i>
                    <strong>${p.nombre}</strong>
                </div>
                <span class="badge bg-danger">${p.stock} unidades</span>
            </div>
        `;
  });
}

function addToCart(id, nombre, precio) {
  const item = cart.find((i) => i.producto.id === id);
  if (item) {
    item.cantidad++;
  } else {
    cart.push({ producto: { id, nombre, precio }, cantidad: 1 });
  }
  updateCartUI();
}

function updateCartUI() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const countEl = document.getElementById("cart-count");

  container.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    const subtotal = item.producto.precio * item.cantidad;
    total += subtotal;
    count += item.cantidad;

    container.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-2 p-3 border rounded shadow-sm">
                <div>
                    <strong>${item.producto.nombre}</strong><br>
                    <small>$${item.producto.precio.toFixed(2)} x ${item.cantidad}</small>
                </div>
                <div class="text-end">
                    <span class="h5">$${subtotal.toFixed(2)}</span>
                    <button class="btn btn-sm btn-link text-danger ms-2" onclick="removeFromCart(${index})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;
  });

  totalEl.innerText = total.toFixed(2);
  countEl.innerText = count;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

async function checkout() {
  if (cart.length === 0) return alert("El carrito está vacío");

  try {
    const res = await fetch(`${API_URL}/pedidos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Error al procesar el pedido");
    }

    alert("Pedido realizado con éxito!");
    cart = [];
    updateCartUI();
    loadProducts();
    showSection("historial");
  } catch (error) {
    alert(error.message);
  }
}

async function loadOrderHistory() {
  const res = await fetch(`${API_URL}/pedidos`);
  const pedidos = await res.json();
  const container = document.getElementById("historial-list");

  container.innerHTML =
    pedidos.length === 0
      ? '<p class="text-muted">No hay pedidos registrados.</p>'
      : "";

  pedidos.reverse().forEach((pedido) => {
    const fecha = new Date(pedido.fecha).toLocaleString();
    const estadoBadge = getEstadoBadge(pedido.estado);

    let itemsHtml = pedido.lineas
      .map(
        (l) => `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${l.producto.nombre} x ${l.cantidad}
                <span class="badge bg-info">$${l.subtotal.toFixed(2)}</span>
            </li>
        `,
      )
      .join("");

    container.innerHTML += `
            <div class="card mb-4 border-info shadow-sm">
                <div class="card-header bg-info text-white d-flex justify-content-between align-items-center">
                    <h6 class="mb-0">Pedido #${pedido.id} - ${fecha}</h6>
                    ${estadoBadge}
                </div>
                <div class="card-body">
                    <ul class="list-group list-group-flush mb-3">
                        ${itemsHtml}
                    </ul>
                    <div class="text-end border-top pt-3">
                        <h5 class="mb-0">Total: $${pedido.total.toFixed(2)}</h5>
                    </div>
                </div>
            </div>
        `;
  });
}

function getEstadoBadge(estado) {
  const estados = {
    PENDIENTE: '<span class="badge bg-warning">PENDIENTE</span>',
    CONFIRMADO: '<span class="badge bg-primary">CONFIRMADO</span>',
    ENVIADO: '<span class="badge bg-info">ENVIADO</span>',
    ENTREGADO: '<span class="badge bg-success">ENTREGADO</span>',
    CANCELADO: '<span class="badge bg-danger">CANCELADO</span>',
  };
  return estados[estado] || '<span class="badge bg-secondary">PENDIENTE</span>';
}
