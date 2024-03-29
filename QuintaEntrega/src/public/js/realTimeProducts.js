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

const formulario = document.getElementById('formAgregarProducto')

formulario.addEventListener("submit", (e) => {
  e.preventDefault()

  let nombre = document.getElementById('nombre').value
  let description = document.getElementById('description').value
  let price = document.getElementById('price').value
  let code = document.getElementById('code').value
  let stock = document.getElementById('stock').value

  socket.emit("agregarProducto", {nombre, description, price, code, stock})

  document.getElementById('nombre').value = ''
  document.getElementById('description').value = ''
  document.getElementById('price').value = ''
  document.getElementById('code').value = ''
  document.getElementById('stock').value = ''

})
