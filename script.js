// Variables para contador y total
let totalItems = 0;
let totalPrecio = 0;
let carrito = [];

function agregarAlCarrito(producto) {
  let precio = 0;
  // Obtener el precio según el producto
  if (producto === "super") {
    precio = parseInt(document.getElementById("precio-super").textContent);
  } else if (producto === "samba") {
    precio = parseInt(document.getElementById("precio-samba").textContent);
  } else if (producto === "galaxy") {
    precio = parseInt(document.getElementById("precio-galaxy").textContent);
  } else if (producto === "eclyp") {
    precio = parseInt(document.getElementById("precio-eclyp").textContent);
  } else if (producto === "colo") {
    precio = parseInt(document.getElementById("precio-colo").textContent);
  } else if (producto === "buzo") {
    precio = parseInt(document.getElementById("precio-buzo").textContent);
  } else if (producto === "cedes") {
    precio = parseInt(document.getElementById("precio-cedes").textContent);
  } else if (producto === "hoodie") {
    precio = parseInt(document.getElementById("precio-hoodie").textContent);
  } else if (producto === "licra") {
    precio = parseInt(document.getElementById("precio-licra").textContent);
  } else if (producto === "bralette") {
    precio = parseInt(document.getElementById("precio-bralette").textContent);
  } else if (producto === "optime") {
    precio = parseInt(document.getElementById("precio-optime").textContent);
  } else if (producto === "camiseta") {
    precio = parseInt(document.getElementById("precio-camiseta").textContent);
  }

  // Actualizar totales
  totalItems++;
  totalPrecio += precio;
  carrito.push({
    nombre: producto,
    precio: precio
  });
  // Mostrar en pantalla
  document.getElementById("total-items").textContent = totalItems;
  document.getElementById("total-precio").textContent = totalPrecio.toLocaleString();
  document.getElementById("total-carrito-panel").textContent = totalPrecio.toLocaleString();
  actualizarListaCarrito();
  localStorage.setItem("totalItems", totalItems);
  localStorage.setItem("totalPrecio", totalPrecio);

}


// Detectar clic en el botón Vaciar Carrito
document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
  // Reiniciar variables
  totalItems = 0;
  totalPrecio = 0;
  // Actualizar en pantalla
  document.getElementById("total-items").textContent = totalItems;
  document.getElementById("total-precio").textContent = totalPrecio;
  localStorage.setItem("totalItems", totalItems);
  localStorage.setItem("totalPrecio", totalPrecio);
  localStorage.setItem("totalItems", 0);
  localStorage.setItem("totalPrecio", 0);
  alert("Productos eliminados");
  carrito = [];
  document.getElementById("lista-carrito").innerHTML = "";

}
window.addEventListener("DOMContentLoaded", function () {
  totalItems = parseInt(localStorage.getItem("totalItems")) || 0;
  totalPrecio = parseInt(localStorage.getItem("totalPrecio")) || 0;

  document.getElementById("total-items").textContent = totalItems;
  document.getElementById("total-precio").textContent = totalPrecio.toLocaleString();
  document.getElementById("total-carrito-panel").textContent = totalPrecio.toLocaleString();
});
// Mostrar / ocultar panel carrito
function mostrarCarrito() {
  const panel = document.getElementById("carrito-panel");
  panel.classList.toggle("carrito-oculto");
  panel.classList.toggle("carrito-visible");
  actualizarListaCarrito();
}
// Actualizar lista de productos
function actualizarListaCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";
  // Si no hay productos
  if (totalItems === 0) {
    lista.innerHTML = "<li>Carrito vacío</li>";
    return;
  }
  // Agregar ítems del carrito 
  const item = document.createElement("li");
  item.textContent = `Total de productos: ${totalItems} - Precio total: $${totalPrecio.toLocaleString()}`;

  lista.appendChild(item);
}
function actualizarListaCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";
  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio.toLocaleString()}`;
    lista.appendChild(li);
  });
}

