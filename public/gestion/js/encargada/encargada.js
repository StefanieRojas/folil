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

  var editor; // use a global for the submit and return data rendering in the examples

  function tabla(datos){
    editor = new $.fn.dataTable.Editor( {
        "data": datos,
        "table": "#tablaColaboradores",
        idSrc:  'id_colaborador',
        "fields": [ {
                "label": "Nombre:",
                "name": "nombre_colab"
            }, {
                "label": "Apellido:",
                "name": "apellido_colab"
            }, {
                "label": "Correo:",
                "name": "correo_colab"
            }, {
                "label": "Privilegio:",
                "name": "id_privilegio"
            }, {
                "label": "Estado:",
                "name": "id_estado"
            }
        ]
    } );
 
    // New record * para crear un nuevo usuario
    $('a.editor-create').on('click', function (e) {
        e.preventDefault();
 
        editor.create( {
            title: 'Crear nuevo Colaborador',
            buttons: 'Agregar'
        } );
    } );
 
    // Edit record * crea un botton para editar los datos de mi tabla
    $('#tablaColaboradores').on('click', 'td.editor-edit', function (e) {
        e.preventDefault();
 
        editor.edit( $(this).closest('tr'), {
            title: 'Editar Colaborador',
            buttons: 'Guardar'
        } );
    } );
    
    var table = $('#tablaColaboradores').DataTable( {
        data: datos,
        columns: [
            // { data: null, render: function ( data, type, row ) {
            //     // Combine the first and last names into a single table field
            //     return data.first_name+' '+data.last_name;
            // } },
            { data: "nombre_colab" },
            { data: "apellido_colab" },
            { data: "correo_colab" },
            { data: "id_privilegio" },
            { data: "id_estado"},
            {
                data: null,
                className: "dt-center editor-edit",
                defaultContent: '<i class="fas fa-user-edit">',
                orderable: false
            }
        ],
        language: espanol
    });
}