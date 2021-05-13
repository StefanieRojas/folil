$(document).ready(function() {
    obtenerCategoria()    
});

listaCategoria = null;

function obtenerCategoria() {
    $.ajax({
        type: "POST", // la variable type guarda el tipo de la peticion GET,POST,..
        headers: {
            't': localStorage.getItem("token")
        },
        dataType: "text",
        url: webService + "/obtenerCategoria", //url guarda la ruta hacia donde se hace la peticion
        data: {
            id_colaborador: localStorage.getItem("idColaborador"),
        }, // data recibe un objeto con la informacion que se enviara al servidor
        success: function(datos) { //success es una funcion que se utiliza si el servidor retorna informacion

            listaCategoria = JSON.parse(datos)
            tabla()
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    })
}

function tabla() {
    console.log(listaCategoria);
    if($.fn.DataTable.isDataTable("#tablaCategoria")){

        $("#tablaCategoria").DataTable().destroy();

    }
    $('#tablaCategoria').DataTable({
            data: listaCategoria,
            columns: [{
                    data: 'categoria'
                },
                {
                    data: 'id_estado',
                    render: function(data) {
                        if (data == 1) {
                            return "Activo";
                        }
                        if (data == 2) {
                            return "Inactivo";
                        }
                    }
                },
                    {
                        render: function(data, type, row, meta) {
                            //console.log(row)
                            return createButton(meta.row);
                        }
                    },
                ],

                language: espanol
            });

        function createButton(row) {

            return '<button onclick="modalEditar(' + row + ')" name="button"> <i class="fas fa-edit"></i></i>  </button>';
        }
    }

    function modalEditar(row) { //aqui se crea una modal para editar la categoria, dentro de los inputs ("#nombredelinput") se le asigno el valor que enseñaran
        //.val() cuando el parentesis viene vacio obtiene info, cuando viene lleno asigna valor.
        console.log(row) 
        $("#tituloModal").html("Editar Categoria")
        $("#id").val(listaCategoria[row].id_categoria)
        $("#categoria").val(listaCategoria[row].categoria)
        $("#estadoCategoria").val(listaCategoria[row].id_estado)
        $('#miModal').modal('show') //muestra el modal

    }

    function guardarCategoria(){ 
        var categoria = {

            "id_usuario" : localStorage.getItem("idColaborador"), //es para asegurarme que el usuario que se logeo pueda Guardar/Editar esto
            "id_categoria" : $("#id").val(),
            "categoria" : $("#categoria").val(),
            "id_estado" : $("#estadoCategoria").val()

        }
        
        $.ajax({
            type: "POST", // la variable type guarda el tipo de la peticion GET,POST,..
            headers: {
                't': localStorage.getItem("token")
            },
            dataType: "text",
            url: webService + "/guardarCategoria", //url guarda la ruta hacia donde se hace la peticion
            data: categoria, // data recibe un objeto con la informacion que se enviara al servidor
            success: function(datos) { //success es una funcion que se utiliza si el servidor retorna informacion
                
                data = JSON.parse(datos)

                if(data.respuesta != undefined && data.respuesta == "error"){
                    toastr["error"](data.descripcion)
                }
                else{
                    obtenerCategoria()
                    $('#miModal').modal('hide')
                    toastr["success"](data.descripcion)
                }    
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus);
                alert("Error: " + errorThrown);
            }
        })

    }

    function modalCrear(){
        //.val no funciona en etiquetas de texto (label h1/2/...)
        //.html cambiar valores estaticos como los textos
        $("#tituloModal").html("Nueva Categoria")
        localStorage.getItem("idColaborador")
        $("#id").val("-1")
        $("#categoria").val("")
        $("#estadoCategoria").val("")
        $('#miModal').modal('show')
              
    } 