const socket = io()

const listaProductos = document.getElementById('listaProductos')

socket.on('datos', (productos) => {
    renderizarProductos(productos)

})

function renderizarProductos(productos) {
    listaProductos.innerHTML = '';
    productos.forEach((producto) => {
      const li = document.createElement('li');
      li.textContent = producto.title;
      listaProductos.appendChild(li);
    });
  }
