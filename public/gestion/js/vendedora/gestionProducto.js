$(document).ready(function() {
    obtenerProducto()    
});

listaCategoria = null;
listaProveedor = null;
listaProducto = null;

function obtenerProducto() {
    $.ajax({
        type: "POST", // la variable type guarda el tipo de la peticion GET,POST,..
        headers: {
            't': localStorage.getItem("token")
        },
        dataType: "text",
        url: webService + "/obtenerProducto", //url guarda la ruta hacia donde se hace la peticion
        data: {
            id_colaborador: localStorage.getItem("idColaborador"),
        }, // data recibe un objeto con la informacion que se enviara al servidor
        success: function(datos) { //success es una funcion que se utiliza si el servidor retorna informacion

            listaProducto = JSON.parse(datos).producto
            listaProveedor = JSON.parse(datos).proveedores //aqui estoy guardando a los proveedores
            listaCategoria = JSON.parse(datos).categoria
            console.log(JSON.parse(datos));
            tabla()
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    })
}

function tabla() {
    console.log(listaProducto);
    if($.fn.DataTable.isDataTable("#tablaProducto")){

        $("#tablaProducto").DataTable().destroy();

    }
    $('#tablaProducto').DataTable({
            data: listaProducto,
            columns: [{
                    data: 'nombre_producto'
                },
                {
                    data: 'stock',
                },
                {
                    data: 'precio_producto',
                },
                {
                    data: 'precio_tienda',
                },
                {
                    data: 'nombre_prov',
                },
                {
                    data: 'id_ubicacion',
                    render: function(data) {
                        if (data == 1) {
                            return "En bodega";
                        }
                        if (data == 2) {
                            return "En vitrina";
                        }
                        if (data == 3) {
                            return "En feria";
                        }
                    }
                },
                {
                    data: 'categoria',
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

    function modalEditar(row) { //aqui se crea una modal para editar la categoria, dentro de los inputs ("#nombredelinput") se le asigno el valor que enseñaran
        //.val() cuando el parentesis viene vacio obtiene info, cuando viene lleno asigna valor.
        console.log(row) 
        $("#tituloModal").html("Editar Producto")
        $("#idprod").val(listaProducto[row].id_producto)
        $("#producto").val(listaProducto[row].nombre_producto)
        $("#stock").val(listaProducto[row].stock)
        $("#precioProducto").val(listaProducto[row].precio_producto)
        $("#precioTienda").val(listaProducto[row].precio_tienda)
        $("#proveedor").val(listaProducto[row].id_prov)
        $("#ubicacion").val(listaProducto[row].id_ubicacion)
        $("#categoria").val(listaProducto[row].id_categoria)
        $('#miModal').modal('show') //muestra el modal

    }

    function guardarProducto(){ 
        var producto = {

            "id_usuario" : localStorage.getItem("idColaborador"), //es para asegurarme que el usuario que se logeo pueda Guardar/Editar esto
            "id_producto" : $("#idprod").val(),
            "nombre_producto" : $("#producto").val(),
            "stock" : $("#stock").val(),
            "precio_producto" : $("#precioProducto").val(),
            "precio_tienda" : $("#precioTienda").val(),
            "id_prov" : $("#proveedor").val(),
            "id_ubicacion" : $("#ubicacion").val(),
            "id_categoria" : $("#categoria").val()

        }
        
        $.ajax({
            type: "POST", // la variable type guarda el tipo de la peticion GET,POST,..
            headers: {
                't': localStorage.getItem("token")
            },
            dataType: "text",
            url: webService + "/guardarProducto", //url guarda la ruta hacia donde se hace la peticion
            data: producto, // data recibe un objeto con la informacion que se enviara al servidor
            success: function(datos) { //success es una funcion que se utiliza si el servidor retorna informacion
                
                data = JSON.parse(datos)

                if(data.respuesta != undefined && data.respuesta == "error"){
                    toastr["error"](data.descripcion)
                }
                else{
                    obtenerProducto()
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
        $("#tituloModal").html("Nuevo Producto")
        localStorage.getItem("idColaborador")
        $("#idprod").val("-1")
        $("#producto").val("")
        $("#stock").val("")
        $("#precioProducto").val("")
        $("#precioTienda").val("")
        $("#proveedor").val("")
        $("#ubicacion").val("")
        $("#categoria").val("")
        $('#miModal').modal('show')   
    } 