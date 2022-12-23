let menu = [{ nombre: "hamburguesa combo A", precio: 1500, vegana: false, imgUrl: "https://http2.mlstatic.com/D_NQ_NP_738725-MLA44377639664_122020-O.webp" },
{ nombre: "hamburguesa combo B", precio: 1900, vegana: false, imgUrl: "https://http2.mlstatic.com/D_NQ_NP_738725-MLA44377639664_122020-O.webp" },
{ nombre: "hamburguesa veggie", precio: 1850, vegana: true, imgUrl: "https://http2.mlstatic.com/D_NQ_NP_738725-MLA44377639664_122020-O.webp" },
{ nombre: "hamburguesa combo C", precio: 2000, vegana: false, imgUrl: "https://http2.mlstatic.com/D_NQ_NP_738725-MLA44377639664_122020-O.webp" },
{ nombre: "empanada de pollo", precio: 150, vegana: false, imgUrl: "https://http2.mlstatic.com/D_NQ_NP_738725-MLA44377639664_122020-O.webp" },
{ nombre: "empanada de verdura", precio: 150, vegana: true, imgUrl: "https://http2.mlstatic.com/D_NQ_NP_738725-MLA44377639664_122020-O.webp" }
]

let div = document.getElementById("cuadroDeCompras")
let botonVegano = document.getElementById("botonVegano")
botonVegano.addEventListener("click", mostrarVegano)
let vegano = menu.filter((producto) => (producto.vegana == true))

botonVegano.addEventListener("mouseover",function() {
  botonVegano.classList.add("fondo")})

// function clase() {botonVegano.className("fondo")}

for (const alimento of menu) {
  div.innerHTML +=
    `
    <div class="row row-cols-1 row-cols-sm-2 g-3">
    <div class="col">
      <div class="card">
        <img src="${alimento.imgUrl}" class="card-img-top" alt="card-grid-image">
        <div class="card-body">
          <h5 class="card-title">${alimento.nombre}</h5>
          <p class="card-text">${alimento.precio}</p>
        </div>
        <button type="button" id="boton" class="btn btn-primary">Añadir al pedido</button>
      </div>
    </div>
    `
}



let botonCarne = document.getElementById("botonCarne")
let carne = menu.filter((producto) => (producto.vegana == false))
botonCarne.addEventListener("click", mostrarCarne)



// preguntar porque no puedo hacer una funcion generica para vegano y carne en el event listener















function mostrarVegano() {
  div.innerHTML = ""
  for (let index = 0; index < vegano.length; index++) {
    div.innerHTML +=
      `
    <div class="row row-cols-1 row-cols-sm-2 g-3">
    <div class="col">
      <div class="card">
        <img src="${vegano[index].imgUrl}" class="card-img-top" alt="card-grid-image">
        <div class="card-body">
          <h5 class="card-title">${vegano[index].nombre}</h5>
          <p class="card-text">${vegano[index].precio}</p>
        </div>
        <button type="button" id="boton" class="btn btn-primary">Añadir al pedido</button>
      </div>
    </div>
    `
  }
}

function mostrarCarne() {
  div.innerHTML = ""
  for (let index = 0; index < carne.length; index++) {
    div.innerHTML +=
      `
    <div class="row row-cols-1 row-cols-sm-2 g-3">
    <div class="col">
      <div class="card">
        <img src="${carne[index].imgUrl}" class="card-img-top" alt="card-grid-image">
        <div class="card-body">
          <h5 class="card-title">${carne[index].nombre}</h5>
          <p class="card-text">${carne[index].precio}</p>
        </div>
        <button type="button" id="boton" class="btn btn-primary">Añadir al pedido</button>
      </div>
    </div>
    `
  }
}