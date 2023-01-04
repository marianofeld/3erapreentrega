let menu = [
  { id: 0, nombre: "Hamburguesa combo A", precio: 1500, vegana: false, imgUrl: "https://broasteryasadochia.com/wp-content/uploads/2020/03/Desayunos9Am_-58.jpg" },
  { id: 1, nombre: "Hamburguesa combo B", precio: 1900, vegana: false, imgUrl: "https://rapiandres.com/wp-content/uploads/2020/04/IMG_8295-Editar.jpg" },
  { id: 2, nombre: "Hamburguesa veggie", precio: 1850, vegana: true, imgUrl: "https://suculenta.com.ar/wp-content/uploads/2020/06/HAMBURGUESA-VEGGIE-1-6.jpg" },
  { id: 3, nombre: "Hamburguesa combo C", precio: 2000, vegana: false, imgUrl: "https://caracoltv.brightspotcdn.com/dims4/default/8742358/2147483647/strip/true/crop/1000x716+0+0/resize/1000x716!/quality/90/?url=https%3A%2F%2Fcaracol-brightspot.s3-us-west-2.amazonaws.com%2Fassets%2Flakalle%2Fhamburguesa_con_papas_pixabay.jpg" },
  { id: 4, nombre: "Empanada de pollo", precio: 150, vegana: false, imgUrl: "http://alicante.com.ar/uploads/recetas/263_receta.jpg" },
  { id: 5, nombre: "Empanada de verdura", precio: 150, vegana: true, imgUrl: "https://cdn.recetips.com/pic/360/recetas_33a1725b1c0a020a66fd344bbaa49b23.jpg" }
]

let div = document.getElementById("cuadroDeCompras")

function mostrar(alimento) {
  div.innerHTML = " "
  for (let index = 0; index < alimento.length; index++) {
    div.innerHTML += `
    <div class="card fondoCard1" style="width: 18rem;">
      <img class="card-img-top" src="${alimento[index].imgUrl}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${alimento[index].nombre}</h5>
        <p class="card-text">Su precio es: ${alimento[index].precio}</p>
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
      `<li>Pediste ${carrito[index].unidades} de ${carrito[index].nombre} y el precio es ${carrito[index].precioTotal}</li> 
    <br>`

  }
  total = carrito.reduce((acc, valorTotal) => acc + valorTotal.precioTotal, 0
  )
  cajaDeCarrito.innerHTML += `<br><p>Total a pagar $${total} <p>
 <br>`

}

if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"))
  mostrarCarrito()
} else { carrito = [] }

let botonComprar = document.getElementById("botonComprar")
botonComprar.addEventListener("click", comprar)
function comprar() {

  localStorage.clear()
  carrito = []
  cajaDeCarrito.innerHTML = ``
}