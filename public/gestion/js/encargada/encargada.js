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
              tabla(datos)        
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
              alert("Status: " + textStatus);
              alert("Error: " + errorThrown);
          }
      })
  }

  function tabla(datos){
    console.log(datos);
  $('#tablaColaboradores').DataTable( {
      data: datos,
      columns: [
          { data: 'nombre_colab' },
          { data: 'apellido_colab' },
          { data: 'correo_colab' },
          { data: 'telefono_colab' },
          { data: 'id_privilegio' },
          { data: 'id_estado'},
          {    
            render: function (data, type, row) {    
            return createButton('edit', row.id);    
          }    
          },    
      ],

      language: espanol
  } );   

    function createButton(buttonType, rowID) {    
                  return '<button onclick="modalEditar()" name="button"> <i class="fas fa-user-edit"></i>  </button>';    
      }    
}
    function modalEditar(){
        $('#miModal').modal('show') //muestra el modal

        //$('#myModal').modal('hide') //esconde el modal
    }