//validacion formulario de contacto

let nombre = document.getElementById("nombre");
nombre.addEventListener("blur", validaNombre);

function validaNombre() {
    if (nombre.value == "") {
        nombre.className = "form-control is-invalid";
        return false;
    } else {
        nombre.className = "form-control is-valid";
        return true;
    }
}

// let email = document.getElementById("email");
// email.addEventListener("blur", validaEmail);

// function validaEmail(email.value) {
//     let expresion = /\w+@\w+\.[a-z]/;
//     if (email.value != "" && expresion.test(email.value)) {
//         email.className = "form-control is-valid";
//         return true;
//     } else {
//         email.className = "form-control is-invalid";
//         return false;
//     }
// }

function validarMail(input) {
    // leonard@gmail.com
    let expresion = /\w+@\w+\.[a-z]/;
    if (input.value != "" && expresion.test(input.value)) {
        input.className = "form-control is-valid";
        return true;
    } else {
        input.className = "form-control is-invalid";
        return false;
    }
}

let msj = document.getElementById("msj");
msj.addEventListener("blur", validaMsj);

function validaMsj(input) {
    if (msj.value != "" && msj.value.length >= 10) {
        msj.className = "form-control is-valid";
        return true;
    } else {

        msj.className = "form-control is-invalid";
        return false;
    }
}

function validarGeneral(event) {
    //evitar que recarge la pagina - event.prevetDefault
    event.preventDefault();
    console.log("Dentro de validarGeneral");

    if (validaNombre(document.getElementById("nombre")) && validarMail(document.getElementById("email")) && validaMsj(document.getElementById("msj"))) {
        enviarEmail();
    } else {
        alert("Ocurrio un problema");
    }
}

function enviarEmail() {
    let template_params = {
        "from_name": document.getElementById("nombre").value,
        "message_html": `Mensaje: ${document.getElementById("msj").value} - Email: ${document.getElementById("email").value}`
    };

    let service_id = "default_service";
    let template_id = "consulta_cv";
    emailjs.send(service_id, template_id, template_params).then(function (response) {
        //esta funcion se ejecuta cuando el mail se envio correctamente
        console.log(response);
        document.getElementById("mensajeEnvio").className = "alert alert-success my-3";
        document.getElementById("mensajeEnvio").innerText = "Su consulta fue enviada correctamente";

        document.getElementById("formulario").reset();

    },
        function (error) {
            //esta funcion se ejecuta cunado falla el envio
            console.log(error);
            document.getElementById("mensajeEnvio").className = "alert alert-danger my-3";
            document.getElementById("mensajeEnvio").innerText = "Ocurrio un error, intente nuevamente en unos minutos";

        }
    );
}

