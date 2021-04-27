$( document ).ready(function() {
      obtenerColaborador()
    
  });
  
  function obtenerColaborador() {
      $.ajax({
          type: "POST", // la variable type guarda el tipo de la peticion GET,POST,..
          headers:{'t':localStorage.getItem("token")},
          dataType: "text",
          url: webService + "/obtenerColaborador", //url guarda la ruta hacia donde se hace la peticion
          data: {
                id_colaborador: localStorage.getItem("idColaborador"),
          }, // data recive un objeto con la informacion que se enviara al servidor
          success: function(datos) { //success es una funcion que se utiliza si el servidor retorna informacion
              
              datos=JSON.parse(datos)
              console.log(datos)              
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
              alert("Status: " + textStatus);
              alert("Error: " + errorThrown);
          }
      })
  }