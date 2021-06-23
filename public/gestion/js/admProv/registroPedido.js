$(document).ready(function() {

    loginvalid()  
    registroPedido()
      
});

listaPedido = null;
posicionPedido = null;

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
            "dom": '<lf<t>ip>',
            "scrollX": true,
            "columnDefs": [
                { "orderable": false, "targets": 6 }
                ],
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
                data: 'descripcion', //estado del pedido que se le designo el trabajo
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

        return '<button onclick="modalBorrar(' + row + ')" name="button" class="borrar"> <i class="fas fa-trash-alt"></i> </button>';
    }
}

function modalBorrar(row){

    posicionPedido = row;
    $('#miModal').modal('show')

}

function borrarRegistro() { 
    $.ajax({
        type: "POST", // la variable type guarda el tipo de la peticion GET,POST,..
        headers: {
            't': localStorage.getItem("token")
        },
        dataType: "text",
        url: webService + "/borrarRegistro", //url guarda la ruta hacia donde se hace la peticion
        data: {
            id_usuario: localStorage.getItem("idColaborador"),
            id_pedido: listaPedido[posicionPedido].id_pedido,
        }, // data recibe un objeto con la informacion que se enviara al servidor
        success: function(datos) { //success es una funcion que se utiliza si el servidor retorna informacion

            listaPedido = JSON.parse(datos) 

            if(listaPedido.respuesta != undefined && listaPedido.respuesta == "error"){
                toastr["error"](listaPedido.descripcion)
            }
            else{
                registroPedido()
                $('#miModal').modal('hide')
                toastr["success"](listaPedido.descripcion)
            }    
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    })

}
