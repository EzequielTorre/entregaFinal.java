const API_URL = "http://localhost:8080/api";
let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  showSection("productos");
  loadProducts();
  loadCategories();

  document.getElementById("menu-toggle").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("wrapper").classList.toggle("toggled");
  });

  document
    .getElementById("product-form")
    .addEventListener("submit", saveProduct);
  document
    .getElementById("categoria-form")
    .addEventListener("submit", saveCategory);
  document
    .getElementById("usuario-form")
    .addEventListener("submit", saveUsuario);
});

function showSection(sectionId) {
  document
    .querySelectorAll("section")
    .forEach((s) => s.classList.add("d-none"));
  document.getElementById(`${sectionId}-section`).classList.remove("d-none");
  document.getElementById("section-title").innerText =
    sectionId.charAt(0).toUpperCase() + sectionId.slice(1);

  if (sectionId === "historial") loadOrderHistory();
  if (sectionId === "admin") {
    loadUsuarios();
    loadStockCritico();
  }
}

async function loadProducts() {
  const res = await fetch(`${API_URL}/productos`);
  const products = await res.json();
  const tbody = document.getElementById("productos-table");
  tbody.innerHTML = "";

  products.forEach((p) => {
    tbody.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.nombre}</td>
                <td>$${p.precio.toFixed(2)}</td>
                <td>${p.stock}</td>
                <td><span class="badge bg-secondary">${p.tipo}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-info" onclick="addToCart(${p.id}, '${p.nombre}', ${p.precio})">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${p.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
  });
}

// Gestión de Usuarios y Stock (Admin)
async function loadUsuarios() {
  const res = await fetch(`${API_URL}/usuarios`);
  const users = await res.json();
  const tbody = document.getElementById("usuarios-table");
  tbody.innerHTML = "";
  users.forEach((u) => {
    tbody.innerHTML += `
            <tr>
                <td>${u.nombre}</td>
                <td>${u.email}</td>
                <td><span class="badge bg-dark">${u.rol}</span></td>
                <td><button class="btn btn-sm text-danger" onclick="deleteUsuario(${u.id})"><i class="fas fa-trash"></i></button></td>
            </tr>
        `;
  });
}

async function saveUsuario(e) {
  e.preventDefault();
  const usuario = {
    nombre: document.getElementById("u-nombre").value,
    email: document.getElementById("u-email").value,
    rol: document.getElementById("u-rol").value,
  };
  await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  document.getElementById("usuario-form").reset();
  loadUsuarios();
}

async function deleteUsuario(id) {
  if (confirm("¿Eliminar usuario?")) {
    await fetch(`${API_URL}/usuarios/${id}`, { method: "DELETE" });
    loadUsuarios();
  }
}

async function loadStockCritico() {
  const res = await fetch(`${API_URL}/productos`);
  const products = await res.json();
  const container = document.getElementById("stock-critico-list");
  const critical = products.filter((p) => p.stock < 5);

  container.innerHTML =
    critical.length === 0 ? '<p class="text-success">Stock saludable.</p>' : "";
  critical.forEach((p) => {
    container.innerHTML += `
            <div class="alert alert-warning py-2 d-flex justify-content-between align-items-center">
                <span>${p.nombre}</span>
                <span class="badge bg-danger">${p.stock} unidades</span>
            </div>
        `;
  });
}

async function loadCategories() {
  const res = await fetch(`${API_URL}/categorias`);
  const cats = await res.json();
  const list = document.getElementById("categorias-list");
  const select = document.getElementById("p-categoria");

  list.innerHTML = "";
  select.innerHTML = '<option value="">Sin Categoría</option>';

  cats.forEach((c) => {
    list.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${c.nombre}
                <button class="btn btn-sm btn-danger" onclick="deleteCategory(${c.id})"><i class="fas fa-times"></i></button>
            </li>
        `;
    select.innerHTML += `<option value="${c.id}">${c.nombre}</option>`;
  });
}

function toggleExtraFields() {
  const tipo = document.getElementById("p-tipo").value;
  document
    .getElementById("electronico-fields")
    .classList.toggle("d-none", tipo !== "ELECTRONICO");
  document
    .getElementById("perecedero-fields")
    .classList.toggle("d-none", tipo !== "PERECEDERO");
}

async function saveProduct(e) {
  e.preventDefault();
  const tipo = document.getElementById("p-tipo").value;
  const product = {
    nombre: document.getElementById("p-nombre").value,
    precio: parseFloat(document.getElementById("p-precio").value),
    stock: parseInt(document.getElementById("p-stock").value),
    categoria: document.getElementById("p-categoria").value
      ? { id: parseInt(document.getElementById("p-categoria").value) }
      : null,
  };

  if (tipo === "ELECTRONICO") {
    product.garantiaMeses = parseInt(
      document.getElementById("p-garantia").value,
    );
  } else {
    product.diasParaVencer = parseInt(
      document.getElementById("p-vencimiento").value,
    );
  }

  const endpoint =
    tipo === "ELECTRONICO" ? "/productos/electronico" : "/productos/perecedero";

  await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  bootstrap.Modal.getInstance(document.getElementById("productModal")).hide();
  document.getElementById("product-form").reset();
  loadProducts();
}

async function deleteProduct(id) {
  if (confirm("¿Eliminar producto?")) {
    await fetch(`${API_URL}/productos/${id}`, { method: "DELETE" });
    loadProducts();
  }
}

async function saveCategory(e) {
  e.preventDefault();
  const nombre = document.getElementById("cat-nombre").value;
  await fetch(`${API_URL}/categorias`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre }),
  });
  document.getElementById("cat-nombre").value = "";
  loadCategories();
}

async function deleteCategory(id) {
  await fetch(`${API_URL}/categorias/${id}`, { method: "DELETE" });
  loadCategories();
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
            <div class="d-flex justify-content-between align-items-center mb-2 p-2 border rounded">
                <div>
                    <strong>${item.producto.nombre}</strong><br>
                    <small>$${item.producto.precio} x ${item.cantidad}</small>
                </div>
                <div class="text-end">
                    <span>$${subtotal.toFixed(2)}</span>
                    <button class="btn btn-sm btn-link text-danger" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash"></i>
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
  } catch (e) {
    alert(e.message);
  }
}

async function loadOrderHistory() {
  const res = await fetch(`${API_URL}/pedidos`);
  const orders = await res.json();
  const container = document.getElementById("historial-list");

  container.innerHTML =
    orders.length === 0
      ? '<p class="text-muted">No hay pedidos registrados.</p>'
      : "";

  orders.reverse().forEach((o) => {
    const fecha = new Date(o.fecha).toLocaleString();
    let itemsHtml = o.lineas
      .map((l) => `<li>${l.producto.nombre} x ${l.cantidad}</li>`)
      .join("");

    container.innerHTML += `
            <div class="card mb-3 border-info">
                <div class="card-body">
                    <h6 class="card-title d-flex justify-content-between">
                        Pedido #${o.id} 
                        <span class="text-muted small">${fecha}</span>
                    </h6>
                    <ul>${itemsHtml}</ul>
                    <div class="text-end">
                        <strong>Total: $${o.lineas.reduce((sum, l) => sum + l.producto.precio * l.cantidad, 0).toFixed(2)}</strong>
                    </div>
                </div>
            </div>
        `;
  });
}
