fetch("./archivo.json")
  .then(response => response.json())
  .then(menu => {
    miPrograma(menu)
  })

function miPrograma(menu) {

  let div = document.getElementById("cuadroDeCompras")
  let divCompras = document.getElementById("divCompras")
  let botonCarrito = document.getElementById("botonCarrito")
  let acaCarrito = document.getElementById("acaCarrito")
  let botonTodo = document.getElementById("todo")
  let botones = document.getElementsByClassName('boton')
  let botonVegano = document.getElementById("botonVegano")
  let vegano = menu.filter((alimento) => (alimento.vegana == true))
  let botonCarne = document.getElementById("botonCarne")
  let carne = menu.filter((alimento) => (alimento.vegana == false))
  let carrito
  let cajaDeCarrito = document.getElementById("cajaDeCarrito")
  let total = 0
  let botonComprar = document.getElementById("botonComprar")

  function mostrar(alimento) {
    divCompras.classList.add("display2")
    divCompras.classList.remove("display")
    acaCarrito.classList.remove("display2")
    acaCarrito.classList.add("display")
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

    for (const boton of botones) {
      boton.addEventListener("click", agregarAlCarrito)
    }
  }

  mostrar(menu)

  // todo de vegano

  botonTodo.onclick = () => { mostrar(menu) }

  botonVegano.onclick = () => { mostrar(vegano) }
  botonVegano.addEventListener("mouseover", function () {
    botonVegano.classList.add("fondo")
  })

  // todo de carne

  
  botonCarne.onclick = () => { mostrar(carne) }
  botonCarne.addEventListener("mouseover", function () {
    botonCarne.classList.add("fondo2")
  })


  // carrito
 

  function agregarAlCarrito(e) {

    let pedidoBuscado = menu.find(alimento => alimento.id == e.target.id)
    let posicionBuscada = carrito.findIndex(alimento => alimento.id == pedidoBuscado.id)
    if (posicionBuscada != -1) {
      Toastify({
        text: "Has añadido otra unidad al carrito",
        className: "info",
        style: {
          background: "#BE1F0A",
          border: "black 2px solid"
        }
      }).showToast();
      carrito[posicionBuscada].unidades++
      carrito[posicionBuscada].precioTotal = carrito[posicionBuscada].unidades * carrito[posicionBuscada].precioPorUnidad
    } else {
      Toastify({
        text: "Has añadido un producto al carrito",
        className: "info",
        style: {
          background: "#BE1F0A",
          border: "black 2px solid"
        }
      }).showToast();
      carrito.push({ id: pedidoBuscado.id, nombre: pedidoBuscado.nombre, precioPorUnidad: pedidoBuscado.precio, unidades: 1, precioTotal: pedidoBuscado.precio })
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    mostrarCarrito()
  }

  
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

  
  botonComprar.addEventListener("click", comprar)
  function comprar() {
    if (total != 0) {
      acaCarrito.classList.add("display")
      acaCarrito.classList.remove("display2")
      Swal.fire({
        title: 'La compra se ha efectuado con exito.',
        showConfirmButton: false,
        imageUrl: './elisleno.png',
        imageHeight: 150,
        imageAlt: 'A tall image',
        timer: 1500,
        background: '#3d3d3d',
        color: 'coral',
      })
    }
    else if (total == 0) {
      divCompras.classList.add("display2")
      divCompras.classList.remove("display")
      Swal.fire({
        title: 'No has añadido nada al carrito',
        showConfirmButton: false,
        imageUrl: 'https://thumbs.dreamstime.com/b/historieta-triste-de-la-hamburguesa-43762532.jpg',
        imageHeight: 150,
        imageAlt: 'A tall image',
        timer: 1500,
        background: '#3d3d3d',
        color: 'coral',
      })
    }
    localStorage.clear()
    carrito = []
    cajaDeCarrito.innerHTML = ``
    total = 0
  }
  botonCarrito.addEventListener("click", nuevaFuncion)
  function nuevaFuncion() {
    acaCarrito.classList.remove("display")
    acaCarrito.classList.add("display2")
    divCompras.classList.remove("display2")
    divCompras.classList.add("display")

  }

}
