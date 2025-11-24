// Variables para contador y total
    let totalItems = 0;
    let totalPrecio = 0;

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
      }

      // Actualizar totales
      totalItems++;
      totalPrecio += precio;

      // Mostrar en pantalla
      document.getElementById("total-items").textContent = totalItems;
      document.getElementById("total-precio").textContent = totalPrecio.toLocaleString();
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

  alert("Carrito vaciado");
}
