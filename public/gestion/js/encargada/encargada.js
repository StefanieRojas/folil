$(document).ready(function() {
    obtenerColaborador()
    
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
        }, // data recive un objeto con la informacion que se enviara al servidor
        success: function(datos) { //success es una funcion que se utiliza si el servidor retorna informacion

            listaColab = JSON.parse(datos)
            tabla()
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    })
}

function tabla() {
    console.log(listaColab);
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

        console.log(row)
        $("#id").val(listaColab[row].id_colaborador)
        $("#nombre").val(listaColab[row].nombre_colab)
        $("#apellido").val(listaColab[row].apellido_colab)
        $("#correo").val(listaColab[row].correo_colab)
        $("#telefono").val(listaColab[row].telefono_colab)
        $("#privilegio").val(listaColab[row].id_privilegio)
        $("#estadoColab").val(listaColab[row].id_estado)
        $('#miModal').modal('show') //muestra el modal

        //$('#myModal').modal('hide') //esconde el modal
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
            "id_estado" : $("#estadoColab").val()

        }
        
        $.ajax({
            type: "POST", // la variable type guarda el tipo de la peticion GET,POST,..
            headers: {
                't': localStorage.getItem("token")
            },
            dataType: "text",
            url: webService + "/guardarColab", //url guarda la ruta hacia donde se hace la peticion
            data: colab, // data recive un objeto con la informacion que se enviara al servidor
            success: function(datos) { //success es una funcion que se utiliza si el servidor retorna informacion
                
                data = JSON.parse(datos)
                obtenerColaborador()
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus);
                alert("Error: " + errorThrown);
            }
        })

    }
