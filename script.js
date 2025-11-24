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
      }

      // Actualizar totales
      totalItems++;
      totalPrecio += precio;

      // Mostrar en pantalla
      document.getElementById("total-items").textContent = totalItems;
      document.getElementById("total-precio").textContent = totalPrecio.toLocaleString();
    }



