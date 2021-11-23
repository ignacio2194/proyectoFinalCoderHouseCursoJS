const guardarDatos = {
  nombreUsuario: "",
  emailUsuario: "",
  telUsuario: "",
};
const datosUsuario = []; // creo un array donde se van a guardar los  datos de la compra 
let botonEnviar = document.querySelector('.botonEnviar')
const seguirComprando = document.querySelector('.botonVolverTienda')
seguirComprando.addEventListener('click', (e) => {
  e.preventDefault()
  location.href = 'index.html'
})
botonEnviar.addEventListener('click', (e) => {
  e.preventDefault()
  let nombre = document.querySelector('#nombre').value
  let email = document.querySelector('#email').value
  let tel = document.querySelector('#telefono').value
  if (nombre ===''||email===''||tel==='') {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: `Nombre , email o telefono vacios , por favor intente nuevamente `,
      showConfirmButton: false,
      timer: 3000,
  });

  } else if(nombre.length<2|| email.length<3) {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: `El nombre o correo electronico son muy cortos , por favor intente nuevamente o ingrese otro `,
      showConfirmButton: false,
      timer: 4000,
  });
  }else if(tel.length<4||tel.length>20 || isNaN(tel)){
    Swal.fire({
      position: "center",
      icon: "warning",
      title: `El numero de telefono tiene que tener mas de 4 numeros pero menos de 20 y ser un numero `,
      showConfirmButton: false,
      timer: 4000,
  });
  }else{
    guardarDatos.nombreUsuario = nombre.value
    guardarDatos.emailUsuario = email.value
    guardarDatos.telUsuario = tel.value
    datosUsuario.push(guardarDatos)
    // guardo los datos en local storage 
    localStorage.setItem("usuario", JSON.stringify(datosUsuario))
    confirmaCompra()
    localStorage.clear();
  }

})

function confirmaCompra() {
  Swal.fire({
    position: "center",
    icon: "success",
    title: `Gracias por su compra  , pronto nos pondremos en contacto con usted . `,
    showConfirmButton: false,
    timer: 4500,

  });

}
