$(document).ready(function() {

    loginvalid()
    obtenerProveedores()    
    
    
});

listaProveedor = null;
//antes de la funcion de abajo va un checklogin, si me tira true hace todo el resto, sino me tira para el index.

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
            "dom": '<lf<t>ip>',
            "scrollX": true,
            "columnDefs": [
                { "orderable": false, "targets": 7 }
                ],
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
                    data: 'calificacion',
                },
                    {
                        render: function(data, type, row, meta) {
                            //console.log(row)
                            return createButton(meta.row) +" "+ createButton2(meta.row);
                        }
                    },
                ],

                language: espanol
            });

        function createButton(row) {

            return '<button onclick="modalEditar(' + row + ')" name="button" class="editar"> <i class="fas fa-edit"></i>  </button>';
        }
        function createButton2(row) {

            return '<button onclick="modalCalificar(' + row + ')" name="button" class="calificar"> <i class="fas fa-star"></i>  </button>';
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
        $("#estadoProv").val(listaProveedor[row].id_estado_prov)
        $("#calificacion").val(listaProveedor[row].calificacion)
        $('#miModal').modal('show') //muestra el modal

    }

    function guardarProveedor(){ 
        var proveedor = {

            "id_usuario" : localStorage.getItem("idColaborador"), //es para asegurarme que el usuario que se logeo pueda Guardar/Editar esto
            "id_prov" : $("#id").val(),
            "nombre_prov" : $("#nombre").val(),
            "apellido_prov" : $("#apellido").val(),
            "direccion_prov" : $("#direccion").val(),
            "telefono_prov" : $("#telefono").val(),
            "correo_prov" : $("#correo").val(),
            "id_estado_prov" : $("#estadoProv").val(),
            "calificacion" : $("#calificacion").val()

        }
        
        $.ajax({
            type: "POST", // la variable type guarda el tipo de la peticion GET,POST,..
            headers: {
                't': localStorage.getItem("token")
            },
            dataType: "text",
            url: webService + "/guardarProveedor", //url guarda la ruta hacia donde se hace la peticion
            data: proveedor, // data recibe un objeto con la informacion que se enviara al servidor
            success: function(datos) { //success es una funcion que se utiliza si el servidor retorna informacion
                
                data = JSON.parse(datos)

                if(data.respuesta != undefined && data.respuesta == "error"){
                    toastr["error"](data.descripcion)
                }
                else{
                    obtenerProveedores()
                    $('#miModal').modal('hide')
                    toastr["success"](data.descripcion)
                }    
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                // alert("Status: " + textStatus);
                // alert("Error: " + errorThrown);
                
                console.log(XMLHttpRequest.responseText);
    
                fallo=JSON.parse(XMLHttpRequest.responseText)
    
                
    
                mensaje="Los campos son requeridos. <br>";
    
                  Object.keys(fallo.descripcion).forEach(function(key, keyIndex) {
                    
                    string = fallo.descripcion[key][0];
    
                    function capitalizarPrimeraLetra(str) {
                      return str.charAt(0).toUpperCase() + str.slice(1);
                    }
                    
                    string = capitalizarPrimeraLetra(string);
    
                  mensaje += string + "<br>";
                  });
                  toastr["error"](mensaje, "Error en el servidor.")
            }
        })

    }

    function modalCrear(){
        //.val no funciona en etiquetas de texto (label h1/2/...)
        //.html cambiar valores estaticos como los textos
        $("#tituloModal").html("Nuevo Proveedor")
        localStorage.getItem("idColaborador")
        $("#id").val("-1")
        $("#nombre").val("")
        $("#apellido").val("")
        $("#direccion").val("")
        $("#telefono").val("")
        $("#correo").val("")
        $("#estadoProv").val("")
        $("#calificacion").val("")
        $('#miModal').modal('show')
              
    } 

    function modalCalificar(row){
        $("#tituloModalCal").html("Calificacion")
        $("#id").val(listaProveedor[row].id_prov) //DUDA AQUI
        $("#nombreCal").html(listaProveedor[row].nombre_prov)
        $("#apellidoCal").html(listaProveedor[row].apellido_prov)
        $("#calificacionProv").val("")
        $('#modalCalificar').modal('show') 
                
    }

    function guardarCalificacion(){ 
        var memo=document.getElementsByName('rating');
	    for(i=0; i<memo.length; i++){
	        if(memo[i].checked){
	         //var memory=memo[i].checked;
		        var memory=memo[i].value;
		        console.log(memory)
	        }
        }
        
        var calificacion = {

            "id_usuario" : localStorage.getItem("idColaborador"), //es para asegurarme que el usuario que se logeo pueda Guardar/Editar esto
            "id_prov" : $("#id").val(),
            "calificacion" : memory

        }

        $.ajax({
            type: "POST", // la variable type guarda el tipo de la peticion GET,POST,..
            headers: {
                't': localStorage.getItem("token")
            },
            dataType: "text",
            url: webService + "/guardarCalificacion", //url guarda la ruta hacia donde se hace la peticion
            data: calificacion, // data recibe un objeto con la informacion que se enviara al servidor
            success: function(datos) { //success es una funcion que se utiliza si el servidor retorna informacion
                
                data = JSON.parse(datos)

                if(data.respuesta != undefined && data.respuesta == "error"){
                    toastr["error"](data.descripcion)
                }
                else{
                    obtenerProveedores()
                    $('#modalCalificar').modal('hide')
                    toastr["success"](data.descripcion)
                }    
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus);
                alert("Error: " + errorThrown);
            }
        })

    }

