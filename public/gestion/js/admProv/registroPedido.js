$(document).ready(function() {
    registroPedido()    
});

listaPedido = null;

function registroPedido() {
    $.ajax({
        type: "POST", // la variable type guarda el tipo de la peticion GET,POST,..
        headers: {
            't': localStorage.getItem("token")
        },
        dataType: "text",
        url: webService + "/registroPedido", //url guarda la ruta hacia donde se hace la peticion
        data: {
            id_colaborador: localStorage.getItem("idColaborador"),
        }, // data recibe un objeto con la informacion que se enviara al servidor
        success: function(datos) { //success es una funcion que se utiliza si el servidor retorna informacion

            listaPedido = JSON.parse(datos) //aqui estoy guardando solo los pedidos
            tabla()
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    })
}

function tabla() {
    console.log(listaPedido);
    if($.fn.DataTable.isDataTable("#tablaRegistroPedidos")){

        $("#tablaRegistroPedidos").DataTable().destroy();

    }
    $('#tablaRegistroPedidos').DataTable({
        data: listaPedido,
        columns: [{
                data: 'nombre_producto' 
            },
            {
                data: 'nombre_colab', 
            },
            {
                data: 'cantidad_producto',
            },
            {
                data: 'precio_pedido', //precio total (o sea el precio normal x cantidad)
            },
            {
                data: 'nombre_prov', 
            },
            {
                data: 'estado', //estado del pedido que se le designo el trabajo
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

        return '<button onclick="modalEditar(' + row + ')" name="button"> <i class="fas fa-trash-alt"></i> </button>';
    }
}