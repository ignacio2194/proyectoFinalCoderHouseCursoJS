document.addEventListener("DOMContentLoaded", function () {
  iniciarFunciones();
});

let carrito = []; // aca se guardan todos los productos pickeados por el usuario

async function iniciarFunciones() {
  const productos = await obtenerProductos();
  crearProducto(productos);
}

//creo todos los elementos html y con fetch api leo y pinto las imagenes en el navegador
async function obtenerProductos() {
  try {
    const resultado = await fetch("./productos.json");
    const data = await resultado.json();
    // agrego la cantidad a cada producto 
    for (const producto of data.productos) {
      producto.cantidad = 1
      // console.log(producto);

    }
    return data.productos;
  } catch (error) {
    console.log(error);
  }
}
function crearProducto(productos) {
  productos.forEach((producto) => {
    const { nombre, precio, imagen } = producto;
    const nombreProducto = document.createElement("p");
    nombreProducto.textContent = nombre;
    nombreProducto.classList.add("nombreProducto");

    // crear boton agregar al carrito
    const boton = document.createElement("button");
    boton.textContent = "agregar al carrito ";
    boton.classList.add("boton");
    boton.id = producto.id;
    boton.addEventListener("click", () => {
      alertaProducto(producto);
    });
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto);

    });

    const precioProducto = document.createElement("p");
    precioProducto.textContent = `$ ${precio}`;
    precioProducto.classList.add("precioProducto");

    const imagenProducto = document.createElement("IMG");
    imagenProducto.src = imagen;

    imagenProducto.classList.add("imagenProducto");

    // genero un div para guardar toda la informacion del json
    const divProductosTienda = document.createElement("DIV");
    divProductosTienda.classList.add("divProductosTienda");
    const divProductos = document.createElement("DIV");
    divProductos.classList.add("divProductos");
    

    //inyectar imagen,nombre y precio al html
    divProductos.appendChild(imagenProducto);
    divProductos.appendChild(nombreProducto);
    divProductos.appendChild(precioProducto);
    divProductos.appendChild(boton);
    divProductosTienda.appendChild(divProductos)
    if (document.getElementById("productos")) {
      document.getElementById("productos").appendChild(divProductosTienda);
    }
  });
}

function agregarAlCarrito(producto) {
  const { id, precio, nombre, cantidad } = producto;
  if (Object.keys(carrito).length === 0) {
    //  creo una coleccion de objetos para guardar la info del carrito 
    cart = JSON.parse(localStorage.getItem("carrito")) || []
    // uso findIndex para preguntar si existe ese id en el carrito
    const idx = cart.findIndex(item => item.id === id)
    if (idx === -1) {
      //  en el caso de que no exista el  pusheo un nuevo objeto 
      cart.push({
        id: id,
        nombre: nombre,
        precio: precio,
        cantidad: cantidad
      });
      localStorage.setItem("carrito", JSON.stringify([...cart]));
    } else {
      // comparo por id , si el item tiene el mismo id . Entonces aumentame la cantidad del mismo 
      cart.map(item => item.id === id ? item.cantidad++ : item)
      localStorage.setItem("carrito", JSON.stringify([...cart]));
      return;

    }
    pintarCarrito(cart)
  }
}

function pintarCarrito(cart) {
  //crear un div para guardar toda la info del carrito y mostrarla en pantalla
  const divCarrito = document.createElement("div");
  divCarrito.classList.add("carrito");
  divCarrito.innerHTML = '';
  cart.forEach(producto => {
    let selecctor = $("#contenedorResumen");
    selecctor.html(carrito)
    selecctor.append(divCarrito);

  })
}


function alertaProducto(producto) {
  Swal.fire({
    position: "center",
    icon: "success",
    title: `producto cargado al carrito al carrito  ${producto.nombre}`,
    showConfirmButton: false,
    timer: 3000,
  });
}
