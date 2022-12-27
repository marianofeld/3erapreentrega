let menu =
  [
    { id: 0, nombre: "hamburguesa combo A", precio: 1500, vegana: false, imgUrl: "https://http2.mlstatic.com/D_NQ_NP_738725-MLA44377639664_122020-O.webp" },
    { id: 1, nombre: "hamburguesa combo B", precio: 1900, vegana: false, imgUrl: "https://http2.mlstatic.com/D_NQ_NP_738725-MLA44377639664_122020-O.webp" },
    { id: 2, nombre: "hamburguesa veggie", precio: 1850, vegana: true, imgUrl: "https://http2.mlstatic.com/D_NQ_NP_738725-MLA44377639664_122020-O.webp" },
    { id: 3, nombre: "hamburguesa combo C", precio: 2000, vegana: false, imgUrl: "https://http2.mlstatic.com/D_NQ_NP_738725-MLA44377639664_122020-O.webp" },
    { id: 4, nombre: "empanada de pollo", precio: 150, vegana: false, imgUrl: "https://http2.mlstatic.com/D_NQ_NP_738725-MLA44377639664_122020-O.webp" },
    { id: 5, nombre: "empanada de verdura", precio: 150, vegana: true, imgUrl: "https://http2.mlstatic.com/D_NQ_NP_738725-MLA44377639664_122020-O.webp" }
  ]

let div = document.getElementById("cuadroDeCompras")

function mostrar(alimento) {
  div.innerHTML = " "
  for (let index = 0; index < alimento.length; index++) {
    div.innerHTML +=

      `
<div class="row row-cols-1 row-cols-sm-1 g-3" id="productoDiv">
<div class="col">
  <div class="card">
    <img src="${alimento[index].imgUrl}" class="card-img-top" alt="card-grid-image">
    <div class="card-body">
      <h5 class="card-title">${alimento[index].nombre}</h5>
      <p class="card-text">${alimento[index].precio}</p>
    </div>
    <button type="button" id="${alimento[index].id}" class="btn btn-primary boton">Añadir al pedido</button>
  </div>
</div>
`
  }
  let botones = document.getElementsByClassName('boton')


  for (const boton of botones) {
    boton.addEventListener("click", agregarAlCarrito)
  }
}

mostrar(menu)

// todo de vegano
let botonTodo = document.getElementById("todo")
botonTodo.onclick = () => { mostrar(menu) }

let botonVegano = document.getElementById("botonVegano")
let vegano = menu.filter((alimento) => (alimento.vegana == true))
botonVegano.onclick = () => { mostrar(vegano) }
botonVegano.addEventListener("mouseover", function () {
  botonVegano.classList.add("fondo")
})

// todo de carne

let botonCarne = document.getElementById("botonCarne")

let carne = menu.filter((alimento) => (alimento.vegana == false))
botonCarne.onclick = () => { mostrar(carne) }
botonCarne.addEventListener("mouseover", function () {
  botonCarne.classList.add("fondo2")
})


// carrito
let carrito

function agregarAlCarrito(e) {

  let pedidoBuscado = menu.find(alimento => alimento.id == e.target.id)
  let posicionBuscada = carrito.findIndex(alimento => alimento.id == pedidoBuscado.id)
  if (posicionBuscada != -1) {
    carrito[posicionBuscada].unidades++
    carrito[posicionBuscada].precioTotal = carrito[posicionBuscada].unidades * carrito[posicionBuscada].precioPorUnidad
  } else {
    carrito.push({ id: pedidoBuscado.id, nombre: pedidoBuscado.nombre, precioPorUnidad: pedidoBuscado.precio, unidades: 1, precioTotal: pedidoBuscado.precio })
  }
  localStorage.setItem("carrito", JSON.stringify(carrito))
  mostrarCarrito()
}

let cajaDeCarrito = document.getElementById("cajaDeCarrito")
let total = 0
function mostrarCarrito() {
  cajaDeCarrito.innerHTML = ""
  for (let index = 0; index < carrito.length; index++) {
    cajaDeCarrito.innerHTML +=
      `Pediste ${carrito[index].unidades} de ${carrito[index].nombre} y el precio es ${carrito[index].precioTotal} 
    <br>`

  }
  total = carrito.reduce((acc, valorTotal) => acc + valorTotal.precioTotal, 0
  )
  cajaDeCarrito.innerHTML += `<br>Total a pagar $${total} 
 <br>`
 
}

if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"))
  mostrarCarrito()
}else {carrito = []}

let botonComprar = document.getElementById("botonComprar")
botonComprar.addEventListener("click", comprar)
function comprar() {

  localStorage.clear()
  carrito = []
  cajaDeCarrito.innerHTML = `el total a pagar es ${total}`
}