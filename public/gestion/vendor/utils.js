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
   