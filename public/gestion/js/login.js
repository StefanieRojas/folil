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
            usuario: $("#usuario").val(),
            password: $("#pass").val()
        }, // data recive un objeto con la informacion que se enviara al servidor
        success: function(datos) { //success es una funcion que se utiliza si el servidor retorna informacion
            
            datos=JSON.parse(datos)
            console.log(datos)

            if(datos.respuesta != undefined && datos.respuesta == "error"){
                toastr["error"](datos.descripcion)
            }

            localStorage.setItem("idColaborador", datos.id_colaborador);
            localStorage.setItem("token", datos.token);
            localStorage.setItem("nombreUsuario", datos.nombre_colab+" "+datos.apellido_colab);

            if(datos.id_privilegio==1){
                //window.location.href = web+"/encargada/index.html"
            }
            else if(datos.id_privilegio==2){
                //window.location.href = web+"/admprov/index.html"
            }
            else if(datos.id_privilegio==3){
                //window.location.href = web+"/vendedora/index.html"
            }
            else{
                //window.location.href = web+"/index.html"
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // alert("Status: " + textStatus);
            // alert("Error: " + errorThrown);
            
            console.log(XMLHttpRequest.responseText);

            fallo=JSON.parse(XMLHttpRequest.responseText)

            

            mensaje="Datos incorrectos. <br>";

              Object.keys(fallo.descripcion).forEach(function(key, keyIndex) {
                
                string = fallo.descripcion[key][0];

                function capitalizarPrimeraLetra(str) {
                  return str.charAt(0).toUpperCase() + str.slice(1);
                }
                
                string = capitalizarPrimeraLetra(string);

              mensaje += string + "<br>";
              });
              toastr["error"](mensaje, "Error en el servidor.")
        }
    })
}