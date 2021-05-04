$(document).ready(function() {
    obtenerProveedores()    
});

listaProveedor = null;

function obtenerProveedores() {
    $.ajax({
        type: "POST", // la variable type guarda el tipo de la peticion GET,POST,..
        headers: {
            't': localStorage.getItem("token")
        },
        dataType: "text",
        url: webService + "/obtenerProveedores", //url guarda la ruta hacia donde se hace la peticion
        data: {
            id_colaborador: localStorage.getItem("idColaborador"),
        }, // data recibe un objeto con la informacion que se enviara al servidor
        success: function(datos) { //success es una funcion que se utiliza si el servidor retorna informacion

            listaProveedor = JSON.parse(datos)
            tabla()
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    })
}

function tabla() {
    console.log(listaProveedor);
    if($.fn.DataTable.isDataTable("#tablaProveedor")){

        $("#tablaProveedor").DataTable().destroy();

    }
    $('#tablaProveedor').DataTable({
            data: listaProveedor,
            columns: [{
                    data: 'nombre_prov'
                },
                {
                    data: 'apellido_prov'
                },
                {
                    data: 'direccion_prov'
                },
                {
                    data: 'telefono_prov'
                },
                {
                    data: 'correo_prov'
                },
                {
                    data: 'categoria'
                },
                {
                    data: 'id_estado_prov',
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
                    data: 'id_calificacion',
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
        $("#tituloModal").html("Editar Proveedor")
        $("#id").val(listaProveedor[row].id_prov)
        $("#nombre").val(listaProveedor[row].nombre_prov)
        $("#apellido").val(listaProveedor[row].apellido_prov)
        $("#direccion").val(listaProveedor[row].direccion_prov)
        $("#telefono").val(listaProveedor[row].telefono_prov)
        $("#correo").val(listaProveedor[row].correo_prov)
        $("#categoriaProv").val(listaProveedor[row].id_categoria)
        $("#estadoProv").val(listaProveedor[row].id_estado_prov)
        $("#calificacion").val(listaProveedor[row].id_calificacion)
        $('#miModal').modal('show') //muestra el modal

    }

    function guardarProveedor(){ 
        var categoria = {

            "id_usuario" : localStorage.getItem("idColaborador"), //es para asegurarme que el usuario que se logeo pueda Guardar/Editar esto
            "id_prov" : $("#id").val(),
            "nombre_prov" : $("#nombre").val(),
            "apellido_prov" : $("#apellido").val(),
            "direccion_prov" : $("#direccion").val(),
            "telefono_prov" : $("#telefono").val(),
            "correo_prov" : $("#correo").val(),
            "id_categoria" : $("#categoriaProv").val(),
            "id_estado_prov" : $("#estadoProv").val(),
            "id_calificacion" : $("#calificacion").val()

        }
        
        $.ajax({
            type: "POST", // la variable type guarda el tipo de la peticion GET,POST,..
            headers: {
                't': localStorage.getItem("token")
            },
            dataType: "text",
            url: webService + "/guardarProveedor", //url guarda la ruta hacia donde se hace la peticion
            data: categoria, // data recibe un objeto con la informacion que se enviara al servidor
            success: function(datos) { //success es una funcion que se utiliza si el servidor retorna informacion
                
                data = JSON.parse(datos)

                if(data.respuesta != undefined && data.respuesta == "error"){
                    toastr["error"](data.descripcion)
                }
                else{
                    obtenerProveedores()
                    $('#miModal').modal('hide')
                    toastr["success"]("El proveedor ha sido editado correctamente.", "Proveedor Editado")
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
        $("#nombre").val("")
        $("#apellido").val("")
        $("#direccion").val("")
        $("#telefono").val("")
        $("#correo").val("")
        $("#categoriaProv").val("")
        $("#estadoProv").val("")
        $("#calificacion").val("")
        $('#miModal').modal('show')
              
    } 