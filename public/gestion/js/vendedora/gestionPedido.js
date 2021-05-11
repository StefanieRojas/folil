$(document).ready(function() {
    obtenerPedidos()    
});

listaPedidos = null;
listaProveedor = null;
listaCategoria = null;

function obtenerPedidos() {
    $.ajax({
        type: "POST", // la variable type guarda el tipo de la peticion GET,POST,..
        headers: {
            't': localStorage.getItem("token")
        },
        dataType: "text",
        url: webService + "/obtenerPedidos", //url guarda la ruta hacia donde se hace la peticion
        data: {
            id_colaborador: localStorage.getItem("idColaborador"),
        }, // data recibe un objeto con la informacion que se enviara al servidor
        success: function(datos) { //success es una funcion que se utiliza si el servidor retorna informacion

            listaPedidos = JSON.parse(datos).pedido //aqui estoy guardando solo los pedidos
            listaProveedor = JSON.parse(datos).proveedores //aqui estoy guardando a los proveedores
            listaCategoria = JSON.parse(datos).categoria
            tabla()
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    })
}

function tabla() {
    console.log(listaPedidos);
    if($.fn.DataTable.isDataTable("#tablaPedidos")){

        $("#tablaPedidos").DataTable().destroy();

    }
    $('#tablaPedidos').DataTable({
            data: listaPedidos,
            columns: [{
                    data: 'nombre_solicitante'
                },
                {
                    data: 'correo_solicitante'
                },
                {
                    data: 'telefono_solicitante'
                },
                {
                    data: 'categoria'
                },
                {
                    data: 'nombre_producto'
                },
                {
                    data: 'cantidad_producto'
                },
                {
                    data: 'descripcion_prod'
                },
                {
                    data: 'tipo_solicitud'
                },
                {
                    data: 'precio_pedido'
                },
                {
                    data: 'nombre_prov'
                },
                {
                    data: 'id_confirmacion',
                    render: function(data) {
                        if (data == 1) {
                            return "En espera";
                        }
                        if (data == 2) {
                            return "Cancelado";
                        }
                        if (data == 3) {
                            return "Confirmado";
                        }
                    }
                },
                {
                    data: 'id_estado',
                    render: function(data) {
                        if (data == 1) {
                            return "Recibido";
                        }
                        if (data == 2) {
                            return "En tienda";
                        }
                        if (data == 3) {
                            return "Atrasado";
                        }
                        if (data == 4) {
                            return "En proceso";
                        }
                        if (data == 5) {
                            return "Cancelado";
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

        for(var contar = 0; contar < listaProveedor.length; contar++){ //Crea un bucle primero es para decir donde parto (0), la variable que sea menor a mi arreglo y por ultimo el numero que como quiero que mi variable suba o aumente su valor
            //length es para saber que tan largo es un array
            //concatenar texto con variables ( '" + "' )
            var lista = "<option value='" + listaProveedor[contar].id_prov + "'>" + listaProveedor[contar].nombre_prov + "</option>";
            $("#proveedor").append(lista);
           // listaProveedor[$contar].nombre_prov//aqui imprimo los nombres de los proveedores que ahi (contar agarra todo lo que tengo dentro y me lo trae)
        }

        
        for(var contar = 0; contar < listaCategoria.length; contar++){ //Crea un bucle primero es para decir donde parto (0), la variable que sea menor a mi arreglo y por ultimo el numero que como quiero que mi variable suba o aumente su valor
            //length es para saber que tan largo es un array
            //concatenar texto con variables ( '" + "' )
            var lista = "<option value='" + listaCategoria[contar].id_categoria + "' data-pos= '" + contar +"'>" + listaCategoria[contar].categoria + "</option>";
            $("#categoria").append(lista);
           // este option me trae el valor del array (0 hasta donde dure)  mas el nombre de mi categoria
        }

    }

    function cargarProductos(){
        //me guarda la posicion de la categoria que seleccione en mi select 
        
        var posicion = document.getElementById('categoria');
        console.log( posicion.selectedIndex);
        var selectIndex= posicion.selectedIndex == "-1"?"0":posicion.selectedIndex; 
        console.log(selectIndex);
        valorSelect =  posicion.options[selectIndex].getAttribute("data-pos") == null?"0":posicion.options[selectIndex].getAttribute("data-pos");
        console.log(valorSelect)
        //Aqui estoy guardando la posicion de mi categoria  
        

        $("#producto").empty();
        $("#producto").prepend('<option value="" disabled hidden selected>Seleccione...</option>');
        
        //el FOR recorre el arreglo de productos de las categorias que seleccione
        console.log(listaCategoria)
        for(var contar = 0; contar < listaCategoria[valorSelect].productos.length; contar++){ //Crea un bucle primero es para decir donde parto (0), la variable que sea menor a mi arreglo y por ultimo el numero que como quiero que mi variable suba o aumente su valor
            
            
            //length es para saber que tan largo es un array
            //concatenar texto con variables ( '" + "' )
            var lista = "<option value='" + listaCategoria[valorSelect].productos[contar].id_producto + "'>" + listaCategoria[valorSelect].productos[contar].nombre_producto + "</option>";
            $("#producto").append(lista);
        }
    }


    function modalEditar(row) { //aqui se crea una modal para editar la categoria, dentro de los inputs ("#nombredelinput") se le asigno el valor que enseñaran
        //.val() cuando el parentesis viene vacio obtiene info, cuando viene lleno asigna valor.
        console.log(row) 
        $("#tituloModal").html("Editar Pedido")
        $("#id").val(listaPedidos[row].id_pedido)
        $("#nombre").val(listaPedidos[row].nombre_solicitante)
        $("#correo").val(listaPedidos[row].correo_solicitante)
        $("#telefono").val(listaPedidos[row].telefono_solicitante)
        $("#categoria").val(listaPedidos[row].id_categoria) 
        $('#categoria').change();
        $("#producto").val(listaPedidos[row].id_producto)
        $("#cantidad").val(listaPedidos[row].cantidad_producto)
        $("#descripcion").val(listaPedidos[row].descripcion_prod)
        $("#tipoSolicitud").val(listaPedidos[row].tipo_solicitud)
        $("#precio").val(listaPedidos[row].precio_pedido)
        $("#proveedor").val(listaPedidos[row].id_prov)
        $("#confirmacion").val(listaPedidos[row].id_confirmacion)
        $("#estado").val(listaPedidos[row].id_estado)
        $('#miModal').modal('show') //muestra el modal

    }

    function guardarPedido(){ 
        var pedido = {

            "id_usuario" : localStorage.getItem("idColaborador"), //es para asegurarme que el usuario que se logeo pueda Guardar/Editar esto
            "id_pedido" : $("#id").val(),
            "nombre_solicitante" : $("#nombre").val(),
            "correo_solicitante" : $("#correo").val(),
            "telefono_solicitante" : $("#telefono").val(),
            "categoria" : $("#categoria").val(),
            "nombre_producto" : $("#producto").val(),
            "cantidad_producto" : $("#cantidad").val(),
            "descripcion_prod" : $("#descripcion").val(),
            "tipo_solicitud" : $("#tipoSolicitud").val(),
            "precio_pedido" : $("#precio").val(),
            "id_prov" : $("#proveedor").val(),
            "id_confirmacion" :  $("#confirmacion").val(),
            "id_estado" : $("#estado").val()

        }
        
        $.ajax({
            type: "POST", // la variable type guarda el tipo de la peticion GET,POST,..
            headers: {
                't': localStorage.getItem("token")
            },
            dataType: "text",
            url: webService + "/guardarPedido", //url guarda la ruta hacia donde se hace la peticion
            data: pedido, // data recibe un objeto con la informacion que se enviara al servidor
            success: function(datos) { //success es una funcion que se utiliza si el servidor retorna informacion
                
                data = JSON.parse(datos)

                if(data.respuesta != undefined && data.respuesta == "error"){
                    toastr["error"](data.descripcion)
                }
                else{
                    obtenerPedidos()
                    $('#miModal').modal('hide')
                    toastr["success"]("El pedido ha sido editado correctamente.", "Pedido Editado")
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
        $("#correo").val("")
        $("#telefono").val("")
        $("#categoria").val("")
        $("#producto").val("")
        $("#cantidad").val("")
        $("#descripcion").val("")
        $("#tipoSolicitud").val("")
        $("#precio").val("")
        $("#proveedor").val("")
        $("#confirmacion").val("")
        $("#estado").val("")
        $('#miModal').modal('show')
        $("#producto").empty();
        $("#producto").prepend('<option value="" disabled hidden selected>Seleccione...</option>');
              
    } 