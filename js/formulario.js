const guardarDatos = {
    nombreUsuario: "",
    emailUsuario: "",
    mensajeUsuario: "",
};


const datosUsuario = []; // creo un array donde se van a guardar los  datos del formulario 

$("#boton").click(function (e) {
    let nombre = $("#nombre").val();
    let email = $("#email").val();
    let mensaje = $("#mensaje").val();

    e.preventDefault();
    if (nombre === "" || email === "" ||  mensaje === ""  ) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: `El nombre , email y mensaje son obligatorios , por favor intente nuevamente `,
            showConfirmButton: false,
            timer: 3000,
        });
        
    }else if(nombre.length < 2 && email.length < 3){
        Swal.fire({
            position: "center",
            icon: "warning",
            title: `Nombre o email no valido , por favor intente nuevamente `,
            showConfirmButton: false,
            timer: 3000,
        });
    }else{
        guardarDatos.nombreUsuario = nombre;
        guardarDatos.emailUsuario = email;
        guardarDatos.mensajeUsuario = mensaje;
        datosUsuario.push(guardarDatos)
        // guardo los datos en local storage 
        localStorage.setItem("usuario", JSON.stringify(datosUsuario))
        ConfirmarEnvio();
    }
});

function ConfirmarEnvio() {
    // hago la peticion con post
    const URLPOST = "https://jsonplaceholder.typicode.com/posts"
    const data = { datosFormulario: JSON.parse(localStorage.getItem('usuario'))} 
    
    $.post(URLPOST, data, function (respuesta,estado) {
        console.log(estado);
        if(estado=="success"){
            Swal.fire({
        position: "center",
          icon: "success",
          title: `Gracias por contactarnos , pronto nos contactaremos con usted .Su numero de mensaje es  `,
          showConfirmButton: true,
          timer: 7000,
      });

     }
        
    })

}


