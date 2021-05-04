$(document).ready(function() {
    obtenerColaborador() //aqui llama a la funcion obtenerColaborador, asi que apenas cargue la pagina esto sera lo primero que enseñe
    
});

listaColab = null;

function obtenerColaborador() {
    $.ajax({
        type: "POST", // la variable type guarda el tipo de la peticion GET,POST,..
        headers: {
            't': localStorage.getItem("token")
        },
        dataType: "text",
        url: webService + "/obtenerColaborador", //url guarda la ruta hacia donde se hace la peticion
        data: {
            id_colaborador: localStorage.getItem("idColaborador"),
        }, // data recibe un objeto con la informacion que se enviara al servidor
        success: function(datos) { //success es una funcion que se utiliza si el servidor retorna informacion

            listaColab = JSON.parse(datos)
            tabla() //aqui llamamos a la funcion de la tabla
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    })
}

function tabla() {
    console.log(listaColab);
    if($.fn.DataTable.isDataTable("#tablaColaboradores")){

        $("#tablaColaboradores").DataTable().destroy();

    }
    $('#tablaColaboradores').DataTable({
            data: listaColab,
            columns: [{
                    data: 'nombre_colab'
                },
                {
                    data: 'apellido_colab'
                },
                {
                    data: 'correo_colab'
                },
                {
                    data: 'telefono_colab'
                },
                {
                    data: 'id_privilegio',
                    render: function(data) {
                        if (data == 1) {
                            return "Encargada de Local";
                        }
                        if (data == 2) {
                            return "Adm. Proveedor";
                        }
                        if (data == 3) {
                            return "Vendedora";
                        }
                    }
                },
                {
                    data: 'id_estado',
                    render: function(data) {
                        if (data == 1) {
                            return "Activo";
                        }
                        if (data == 2) {
                            return "Desvinculado";
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

            return '<button onclick="modalEditar(' + row + ')" name="button"> <i class="fas fa-user-edit"></i>  </button>';
        }
    }

    function modalEditar(row) {
        //.val() cuando el parentesis viene vacio obtiene info, cuando viene lleno asigna valor.
        console.log(row) 
        $("#tituloModal").html("Editar Colaborador")
        $("#id").val(listaColab[row].id_colaborador)
        $("#nombre").val(listaColab[row].nombre_colab)
        $("#apellido").val(listaColab[row].apellido_colab)
        $("#correo").val(listaColab[row].correo_colab)
        $("#telefono").val(listaColab[row].telefono_colab)
        $("#privilegio").val(listaColab[row].id_privilegio)
        $("#estadoColab").val(listaColab[row].id_estado)
        $("#contraseña").val(listaColab[row].password_colab)
        $('#miModal').modal('show') //muestra el modal

    }

    function guardarColab(){ 
        var colab = {

            "id_usuario" : localStorage.getItem("idColaborador"),
            "id_colaborador" : $("#id").val(),
            "nombre_colab" : $("#nombre").val(),
            "apellido_colab" : $("#apellido").val(),
            "correo_colab" : $("#correo").val(),
            "telefono_colab" : $("#telefono").val(),
            "id_privilegio" : $("#privilegio").val(),
            "id_estado" : $("#estadoColab").val(),
            "password_colab" :$("#contraseña").val()

        }
        
        $.ajax({
            type: "POST", // la variable type guarda el tipo de la peticion GET,POST,..
            headers: {
                't': localStorage.getItem("token")
            },
            dataType: "text",
            url: webService + "/guardarColab", //url guarda la ruta hacia donde se hace la peticion
            data: colab, // data recibe un objeto con la informacion que se enviara al servidor
            success: function(datos) { //success es una funcion que se utiliza si el servidor retorna informacion
                
                data = JSON.parse(datos)

                if(data.respuesta != undefined && data.respuesta == "error"){
                    toastr["error"](data.descripcion)
                }
                else{
                    obtenerColaborador()
                    $('#miModal').modal('hide')
                    toastr["success"]("Los datos del colaborador han sido editados correctamente.", "Colaborador Editado")
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
        $("#tituloModal").html("Nuevo Colaborador")
        localStorage.getItem("idColaborador")
        $("#id").val("-1")
        $("#nombre").val("")
        $("#apellido").val("")
        $("#correo").val("")
        $("#telefono").val("")
        $("#privilegio").val("")
        $("#estadoColab").val("")
        $("#contraseña").val("")
        $('#miModal').modal('show')
              
    } 