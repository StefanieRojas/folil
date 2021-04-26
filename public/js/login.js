$( document ).ready(function() {
  document.addEventListener("keyup",function(event){
      if(event.code==="Enter"){
          Login();
      }

  })  

});
function Login() {
    $.ajax({
        type: "GET", // la variable type guarda el tipo de la peticion GET,POST,..
        //headers:{'_token':"{{ csrf_token() }}"},
        dataType: "text",
        url: webService + "/loginme", //url guarda la ruta hacia donde se hace la peticion
        data: {
            user: $("#usuario").val(),
            password: $("#pass").val()
        }, // data recive un objeto con la informacion que se enviara al servidor
        success: function(datos) { //success es una funcion que se utiliza si el servidor retorna informacion
            
            datos=JSON.parse(datos)
            console.log(datos)

            localStorage.setItem("idColaborador", datos.id_colaborador);
            localStorage.setItem("token", datos.token);
            localStorage.setItem("nombreUsuario", datos.nombre_colab+" "+datos.apellido_colab);

            if(datos.id_privilegio==1){
                window.location.href = web+"encargada/index.html"
            }
            else if(datos.id_privilegio==2){
                window.location.href = web+"admprov/index.html"
            }
            else if(datos.id_privilegio==3){
                window.location.href = web+"vendedora/index.html"
            }
            else{
                window.location.href = web
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    })
}