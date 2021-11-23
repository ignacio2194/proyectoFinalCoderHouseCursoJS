if (localStorage.getItem("carrito")) {
  let carritoTraido = JSON.parse(localStorage.getItem("carrito"));

  let divResumen = document.createElement("div");

  carritoTraido.forEach((item) => {
    const divProductosCarrito = document.createElement("div");
    divProductosCarrito.classList.add("productosDelCarrito");
    funcionesDeCarrito(item, divProductosCarrito);

    // creo los botones + , - y x  para aumentar , disminuir  o quitar un producto del carrito
    crearBoton(item.id, "+", "botonSumar", divProductosCarrito, (e) => {

      item.cantidad++
      localStorage.setItem("carrito", JSON.stringify(carritoTraido));
     
      if (item.cantidad > 9) {
        carritoLLeno()
        item.cantidad =9
        // actualizo el localStorage al nuevo valor 
        localStorage.setItem("carrito", JSON.stringify(carritoTraido));
      }
  
      e.target.parentElement.firstChild.textContent = `${item.nombre}  $${item.precio} cantidad  :${item.cantidad}`
      sumaPrecioCantidad()


    });

    crearBoton(item.id, "-", "botonDisminuir", divProductosCarrito, (e) => {
      // accedo al item y que empiece a disminuir la cantidad y por cada click setea el nuevo valor en localStorage
      item.cantidad--
      localStorage.setItem("carrito", JSON.stringify(carritoTraido));

      if (item.cantidad <1) {
        minimoProductos()
        item.cantidad =1
        // actualizo el localStorage al nuevo valor 
        localStorage.setItem("carrito", JSON.stringify(carritoTraido));
      }
      e.target.parentElement.firstChild.textContent = `${item.nombre}  $${item.precio} cantidad  :${item.cantidad}`
    sumaPrecioCantidad()
     
    });

    crearBoton(item.id, "x", "botonEliminar", divProductosCarrito, (e) => {
      let botonQuitar = document.createElement("button");
      botonQuitar.id = item.id;
      e.target.parentElement.remove();
      const productosCarrito = JSON.parse(localStorage.getItem("carrito")).filter((producto) => botonQuitar.id != producto.id); localStorage.setItem("carrito", JSON.stringify(productosCarrito));
      // si  hay un solo producto y lo elimino que entonces quite tambien los botones de vaciar carrito y confirmar compra 
     if(productosCarrito.length===0){
      localStorage.removeItem('carrito')
      BotonesCarrito()
     }
      let precioPrevio = document.querySelector(".precioCantidad");
      if (precioPrevio) {
        precioPrevio.remove();
      }
    sumaPrecioCantidad()

   
    });


 document.getElementById("contenedorResumen").appendChild(divResumen);
    
  });

  function crearBoton(id, contenido, clase, divProductosCarrito, evento) {
    let boton = document.createElement("button");
    boton.id = id
    boton.textContent = contenido;
    boton.classList.add(clase);
    boton.addEventListener("click", evento);
    divProductosCarrito.appendChild(boton);

  }


  function funcionesDeCarrito(item, divProductosCarrito) {
    let { nombre,precio, cantidad } = item;
    // creo un parrafo para guardar el nombre
    let p = document.createElement("p");
    p.textContent = `${nombre} $${precio} cantidad : ${cantidad}`;
    const misProductos = JSON.parse(localStorage.getItem("carrito"));
    divProductosCarrito.appendChild(p);
    divResumen.appendChild(divProductosCarrito);
  }


  function sumaPrecioCantidad() {
    if (localStorage.getItem("carrito")) {
      // guardo todos los datos de carrito
      let resultadoTotal = []
      let total = 0;
      
      JSON.parse(localStorage.getItem("carrito")).forEach((producto) => {
        let { precio, cantidad } = producto
        total = precio * cantidad
        resultadoTotal.push(total)
         // si hay un precio entonces no crees otra alerta 
      let precioCantidadPrevio = document.querySelector(".precioCantidad");
      if (precioCantidadPrevio) {
        precioCantidadPrevio.remove();
      }
      });
      let resultado = resultadoTotal.reduce((acc, el) => acc + el, 0)
      const divContenedor = document.createElement("div");
      let p = document.createElement("p");
      p.innerHTML = `<span> el precio es  $ ${resultado} </span>`;
      divContenedor.classList.add("precioCantidad");
      divContenedor.appendChild(p);
      document.querySelector("#contenedorResumen").appendChild(divContenedor);
     
    }
  }
  sumaPrecioCantidad()
  // BOTONES PARA VACIAR EL CARRITO Y CONFIRMAR LA COMPRA 
  const limpiarCarrito = document.querySelector('#vaciarCarrito')
  limpiarCarrito.classList.add('limpiarCarrito')
  limpiarCarrito.addEventListener('click', (e) => {
    localStorage.removeItem('carrito')
    BotonesCarrito()
    pintarCarrito(carritoTraido)
  })
  const confirmaCompra = document.getElementById('confirmarCompra ')
  confirmaCompra.classList.add('limpiarCarrito')
  confirmaCompra.addEventListener('click', (e) => {
    BotonesCarrito()
    pintarCarrito(carritoTraido)
    location.href="procesarCompra.html"

  })


  // -----ALERTAS ---
  function carritoLLeno() {
    Swal.fire({
      position: "center",
      icon: "info",
      title: `Por el momento solo se pueden agregar hasta 9 productos iguales`,
      showConfirmButton: false,
      timer: 3000,
    });
  }
  function minimoProductos() {
    Swal.fire({
      position: "center",
      icon: "info",
      title: `Por lo menos 1 producto tiene que haber en el carrito `,
      showConfirmButton: false,
      timer: 3000,
    });
  }
  
}
function BotonesCarrito() {
  if (localStorage.getItem('carrito') === null||localStorage.getItem('carrito') === []) {
    document.querySelector('#vaciarCarrito').style.display = 'none'
    document.getElementById('confirmarCompra ').style.display = 'none'
  }else{
    document.querySelector('#vaciarCarrito').style.display = 'block'
    document.getElementById('confirmarCompra ').style.display = 'block'
  }
}
BotonesCarrito()
