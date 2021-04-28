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
            title: 'Create new record',
            buttons: 'Add'
        } );
    } );
 
    // Edit record * crea un botton para editar los datos de mi tabla
    $('#tablaColaboradores').on('click', 'td.editor-edit', function (e) {
        e.preventDefault();
 
        editor.edit( $(this).closest('tr'), {
            title: 'Edit record',
            buttons: 'Update'
        } );
    } );
 
    // Delete a record * crea un botton para borrar los datos de mi tabla
    $('#tablaColaboradores').on('click', 'td.editor-delete', function (e) {
        e.preventDefault();
 
        editor.remove( $(this).closest('tr'), {
            title: 'Delete record',
            message: 'Are you sure you wish to remove this record?',
            buttons: 'Delete'
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
                defaultContent: '<i class="fa fa-pencil"/>',
                orderable: false
            },
            {
                data: null,
                className: "dt-center editor-delete",
                defaultContent: '<i class="fa fa-trash"/>',
                orderable: false
            }
        ],
        language: idioma_espanol
    });
//       console.log(datos);
//     $('#tablaColaboradores').DataTable( {
//         data: datos,
//         columns: [
            
//             { data: 'nombre_colab' },
//             { data: 'apellido_colab' },
//             { data: 'correo_colab' },
//             { data: 'id_privilegio' },
//             { data: 'id_estado'},
//             {    
//                 //edit button creation    
//                 render: function (data, type, row) {    
//                     return createButton('edit', row.id);    
//                 }    
//             },    
//         ],        
//         "searching": false,    
//         "paging": true,    
//         "info": true,    
//         "language": {    
//             "emptyTable": "No data available"    
//         },   
//         "fnRowCallback": function (nRow, aData, iDisplayIndex) {    
//             $("td:first", nRow).html(iDisplayIndex + 1);    
//             return nRow;    
//         },    
        
    
//         "language": idioma_espanol
//     } ); 
    
   
    
// function createButton(buttonType, rowID) {    
//     var buttonText = buttonType == "edit" ? "Edit" : "Delete";    
//     return '<button class="' + buttonType + '" type="button">' + buttonText+'</button>';    
// }    

//   }

  var idioma_espanol = {
        "processing": "Procesando...",
        "lengthMenu": "Mostrar _MENU_ registros",
        "zeroRecords": "No se encontraron resultados",
        "emptyTable": "Ningún dato disponible en esta tabla",
        "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
        "infoFiltered": "(filtrado de un total de _MAX_ registros)",
        "search": "Buscar:",
        "infoThousands": ",",
        "loadingRecords": "Cargando...",
        "paginate": {
            "first": "Primero",
            "last": "Último",
            "next": "Siguiente",
            "previous": "Anterior"
        },
        "aria": {
            "sortAscending": ": Activar para ordenar la columna de manera ascendente",
            "sortDescending": ": Activar para ordenar la columna de manera descendente"
        },
        "buttons": {
            "copy": "Copiar",
            "colvis": "Visibilidad",
            "collection": "Colección",
            "colvisRestore": "Restaurar visibilidad",
            "copyKeys": "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br \/> <br \/> Para cancelar, haga clic en este mensaje o presione escape.",
            "copySuccess": {
                "1": "Copiada 1 fila al portapapeles",
                "_": "Copiadas %d fila al portapapeles"
            },
            "copyTitle": "Copiar al portapapeles",
            "csv": "CSV",
            "excel": "Excel",
            "pageLength": {
                "-1": "Mostrar todas las filas",
                "1": "Mostrar 1 fila",
                "_": "Mostrar %d filas"
            },
            "pdf": "PDF",
            "print": "Imprimir"
        },
        "autoFill": {
            "cancel": "Cancelar",
            "fill": "Rellene todas las celdas con <i>%d<\/i>",
            "fillHorizontal": "Rellenar celdas horizontalmente",
            "fillVertical": "Rellenar celdas verticalmentemente"
        },
        "decimal": ",",
        "searchBuilder": {
            "add": "Añadir condición",
            "button": {
                "0": "Constructor de búsqueda",
                "_": "Constructor de búsqueda (%d)"
            },
            "clearAll": "Borrar todo",
            "condition": "Condición",
            "conditions": {
                "date": {
                    "after": "Despues",
                    "before": "Antes",
                    "between": "Entre",
                    "empty": "Vacío",
                    "equals": "Igual a",
                    "notBetween": "No entre",
                    "notEmpty": "No Vacio",
                    "not": "Diferente de"
                },
                "number": {
                    "between": "Entre",
                    "empty": "Vacio",
                    "equals": "Igual a",
                    "gt": "Mayor a",
                    "gte": "Mayor o igual a",
                    "lt": "Menor que",
                    "lte": "Menor o igual que",
                    "notBetween": "No entre",
                    "notEmpty": "No vacío",
                    "not": "Diferente de"
                },
                "string": {
                    "contains": "Contiene",
                    "empty": "Vacío",
                    "endsWith": "Termina en",
                    "equals": "Igual a",
                    "notEmpty": "No Vacio",
                    "startsWith": "Empieza con",
                    "not": "Diferente de"
                },
                "array": {
                    "not": "Diferente de",
                    "equals": "Igual",
                    "empty": "Vacío",
                    "contains": "Contiene",
                    "notEmpty": "No Vacío",
                    "without": "Sin"
                }
            },
            "data": "Data",
            "deleteTitle": "Eliminar regla de filtrado",
            "leftTitle": "Criterios anulados",
            "logicAnd": "Y",
            "logicOr": "O",
            "rightTitle": "Criterios de sangría",
            "title": {
                "0": "Constructor de búsqueda",
                "_": "Constructor de búsqueda (%d)"
            },
            "value": "Valor"
        },
        "searchPanes": {
            "clearMessage": "Borrar todo",
            "collapse": {
                "0": "Paneles de búsqueda",
                "_": "Paneles de búsqueda (%d)"
            },
            "count": "{total}",
            "countFiltered": "{shown} ({total})",
            "emptyPanes": "Sin paneles de búsqueda",
            "loadMessage": "Cargando paneles de búsqueda",
            "title": "Filtros Activos - %d"
        },
        "select": {
            "1": "%d fila seleccionada",
            "_": "%d filas seleccionadas",
            "cells": {
                "1": "1 celda seleccionada",
                "_": "$d celdas seleccionadas"
            },
            "columns": {
                "1": "1 columna seleccionada",
                "_": "%d columnas seleccionadas"
            }
        },
        "thousands": ".",
        "datetime": {
            "previous": "Anterior",
            "next": "Proximo",
            "hours": "Horas",
            "minutes": "Minutos",
            "seconds": "Segundos",
            "unknown": "-",
            "amPm": [
                "am",
                "pm"
            ]
        },
        "editor": {
            "close": "Cerrar",
            "create": {
                "button": "Nuevo",
                "title": "Crear Nuevo Registro",
                "submit": "Crear"
            },
            "edit": {
                "button": "Editar",
                "title": "Editar Registro",
                "submit": "Actualizar"
            },
            "remove": {
                "button": "Eliminar",
                "title": "Eliminar Registro",
                "submit": "Eliminar",
                "confirm": {
                    "_": "¿Está seguro que desea eliminar %d filas?",
                    "1": "¿Está seguro que desea eliminar 1 fila?"
                }
            },
            "error": {
                "system": "Ha ocurrido un error en el sistema (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">Más información&lt;\\\/a&gt;).<\/a>"
            },
            "multi": {
                "title": "Múltiples Valores",
                "info": "Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.",
                "restore": "Deshacer Cambios",
                "noMulti": "Este registro puede ser editado individualmente, pero no como parte de un grupo."
            }
        },
        "info": "Mostrando de _START_ a _END_ de _TOTAL_ entradas"
    }
}