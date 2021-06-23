//ESTE JS ES UNO QUE PUEDEN COMPARTIR MUCHAS VISTAS, POR LO QUE AQUI IRIA TODA COSA QUE SE PUEDA COMPARTIR, POR EJEMPLO EL CERRAR SESION, YA QUE IRIA EN TODAS LAS VISTAS

webService = "http://127.0.0.1:8000/api"
web = "http://127.0.0.1:8000/gestion/html"
espanol = {
    "decimal": "",
    "emptyTable": "No hay información",
    "info": "Mostrando de _START_ a _END_ de _TOTAL_ Datos",
    "infoEmpty": "Mostrando 0 to 0 of 0 Datos",
    "infoFiltered": "(Filtrado de _MAX_ total datos)",
    "infoPostFix": "",
    "thousands": ",",
    "lengthMenu": "Mostrar _MENU_ Datos",
    "loadingRecords": "Cargando...",
    "processing": "Procesando...",
    "search": "Buscar:",
    "zeroRecords": "Sin resultados encontrados",
    "paginate": {
        "first": "Primero",
        "last": "Ultimo",
        "next": "Siguiente",
        "previous": "Anterior"
    }
}

function cerrarSesion() { //limpia el localStorage borrando los datos de la sesion y luego te dirije hasta el login.

    localStorage.clear();
    window.location.href = web+"/index.html"
    
}

function checkLogin() {
     //Despues crear una funcion checklogin que cada vez que entro a una vista sin entrar sesion me redirija al Login diciendo que debo logearme para eso
    //A lo mejor tirarle un error de los toastr que diga que necesitas ingresar y luego redirija

    //en las vistas traen ajax (en la parte de post o get), antes de llamar estas llamar una funcion CheckLogin
    //Si el localStorage tiene token que pueda ir a la pagina, sino que vaya al login
    //aqui debo poner que si esta o no (true o false) entonces en los otros debo preguntar si esta o no con los if
    localStorage.getItem('token', 'logged-in')
}

//id es igual nombre de usuario
$(document).ready(function() {
    $("#userName").html(localStorage.getItem("nombreUsuario"))
});


//AQUI ABAJO VAN NUEVAS FUNCIONES
// function loginvalid(id_usr){
//     if (id_usr==null) {
//         localStorage.validar = true;
//          showFeedback("error","Debes iniciar sesion con la cuenta vinculada al sistema","Datos incorrectos");
//          redirectLogin()
//     } else {
       
//     }
// }

function loginvalid(){
    var usuLog = localStorage.getItem('token')
    if (usuLog == undefined) {
        localStorage.setItem('verificar', false)
        window.location.href = web + "/index.html"
    }
    else {
        return true;
    }
}
 
function numeroTelefono(string){
    var out = '';
    var filtro = '1234567890()+-,';
    
    for (var i=0; i<string.length; i++){
        if (filtro.indexOf(string.charAt(i)) != -1) {
                out += string.charAt(i);
        }
    }

    return out;
}
//Tiene limite largo de 15
function Numeros(string){
    var out = '';
    var filtro = '1234567890';
    
    for (var i=0; i<string.length; i++){
        if (filtro.indexOf(string.charAt(i)) != -1) {
            if(out.length<15){
                out += string.charAt(i);
            }
        }
    }

    return out;
}
//No tiene limite largo
function NumerosLargo(string,largo){
    var out = '';
    var filtro = '1234567890';
    
    for (var i=0; i<string.length; i++){
        if (filtro.indexOf(string.charAt(i)) != -1) {
            if(out.length<(largo)){
                out += string.charAt(i);
            }
        }
    }

    return out;
}

//Se le puede poner espacios
function NumerosEspacio(string){
    var out = '';
    var filtro = '1234567890 ';
    
    for (var i=0; i<string.length; i++){
        if (filtro.indexOf(string.charAt(i)) != -1) {
            if(out.length<15){
                out += string.charAt(i);
            }
        }
    }

    return out;
}

function NumText(string){
    var out = '';
    var filtro = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890-áéíóúÁÉÍÓÚüÜ´",.°!#$%(){}@;:/¿?¡ ';
    
    for (var i=0; i<string.length; i++){
        if (filtro.indexOf(string.charAt(i)) != -1 || string.charAt(i) == "\n" || string.charAt(i) == "\r" || string.charAt(i) == "'") {
            out += string.charAt(i);
        }
    }
    return out;
}

function Rut(string){
    var out = '';
    var filtro = '1234567890kK';
    
    for (var i=0; i<string.length; i++){
        if (filtro.indexOf(string.charAt(i)) != -1){ 
            if(out.length < 10){
                out += string.charAt(i);
            }
        }
    }
    return out;
}

function TextSimbolos(string){
    var out = '';
    var filtro = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZáéíóúÁÉÍÓÚüÜ´"-,.°!#$%(){}@;: ';
    for (var i=0; i<string.length; i++){
       if (filtro.indexOf(string.charAt(i)) != -1 || string.charAt(i) == "\n" || string.charAt(i) == "\r" || string.charAt(i) == "'"){ 
            if(out.length<5000){
                out += string.charAt(i);
            }
        }
    }
    return out;
}


function Text(string){
    var out = '';
    var filtro = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZáéíóúÁÉÍÓÚüÜ'- ";
    for (var i=0; i<string.length; i++){
       if (filtro.indexOf(string.charAt(i)) != -1 || string.charAt(i) == "\n" || string.charAt(i) == "\r" || string.charAt(i) == "'"){ 
            if(out.length<250){
                out += string.charAt(i);
            }
        }
    }
    return out;
}

function ValidateEmail(input) {

    var mailState=true
    var email = input.value;
    //lblError.innerHTML = "";
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if(email.trim().length > 0){
        if (!expr.test(email)) {
            $('#'+input.id).addClass('is-invalid')
            //lblError.innerHTML = "";
            return mailState=false
        }else{
            $('#'+input.id).removeClass('is-invalid')
            return mailState=true
        }
    }
}

function disabled(){
    $("input").each(function() {
        $(this).attr('disabled',true)
    })

    $("select").each(function() {
        $(this).attr('disabled',true)
    })

    $('#btnGuardar').remove();
}

//Esto revisa que no haya dejado algun espacio sin llenar
// function validar(){

// 	$('#'+tipo+'Modal').find('input').each(function(){ 
	        
// 		if(!(this.id).includes('Encargado') && !(this.id).includes('inputCelularAlumno') && !(this.id).includes('inputWhatsappAlumno') && !(this.id).includes('inputDiscapacidadAlumno') 
// 			&& !(this.id).includes('inputApellidoMaterno') && !(this.id).includes('inputMailSecundarioAlumno') ){

// 		    if (this.disabled == false && (this.value == "" || this.value == undefined)) {
// 		        $(this).addClass('is-invalid')
// 		        valida = false;
// 		    }else{
// 		        $(this).removeClass('is-invalid')
// 		    }

// 		    if(this.disabled == false && (this.id).includes('Mail')){
// 		        if(ValidateEmail(this) == undefined || ValidateEmail(this) == false){
// 		          valida = false;
// 		        } 
// 		    }
// 		}
// 	});	
// }
