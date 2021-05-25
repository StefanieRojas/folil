<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Estadopedido;
use App\Models\Colaborador;
use App\Models\Categoria;
use App\Models\Proveedor;
use App\Models\Producto;
use App\Models\Pedido;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class PedidoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function obtenerPedidos(Request $request)
    {
        $post = $request->all(); //agarra todo lo que le estoy enviando del navegador, lo que va en el ajax
        $validator = Validator::make($post, [ //aqui estoy validando mis datos, en este caso que id es requerido y es tipo numerico
            'id_colaborador' => 'required|numeric', 
        ],$messages = [ //los mensajes que me dejara en caso de que no llene los input 
            'required' => 'El :attribute es requerido.',
            'numeric' => 'El :attribute debe ser numerico.',
        ]);
        if ($validator->fails()) { //aqui si falla me enviara el error
            return response()->json(array("respuesta"=>"error","descripcion"=>$validator->errors()),422); 
        }
        $idColab = trim($post["id_colaborador"]); //guardando en la variable $id el id_colab que esta en el $post
        $colaborador = Colaborador::where('id_colaborador',$idColab)->first(); //compara ambos y luego me entrega el primero que encuentre con estas cosas

        if(!isset($colaborador)){//un error que aparecera si el usuario no existe dentro de mi tabla
            return response()->json(array("respuesta"=>"error","descripcion"=>"Tu usuario no existe"));
        }
        
        if($colaborador->id_privilegio != 3){ //error que aparecera si el usuario que ingresa no tiene el permiso para ver/hacer ciertas cosas
            return response()->json(array("respuesta"=>"error","descripcion"=>"No tienes permiso"));
        }

        $listaCategoria=Categoria::all();
        $listaProducto=Producto::all();
        $pedido=Pedido::all();
        $listaProveedor=Proveedor::all();

        foreach($pedido as $clave => $valor){

            $buscar = Producto::select('id_categoria')->where('id_producto', $pedido[$clave]->id_producto)->first();
            $pedido[$clave]-> id_categoria = $buscar->id_categoria;

        }

        foreach ($listaCategoria as $clave => $valor){

            $listaCategoria[$clave]->productos = Producto::where('id_categoria', $listaCategoria[$clave]->id_categoria)->get();
    
        }

        foreach ($pedido as $clave => $valor) {
           
            $proveedorSeleccionado = $listaProveedor->where('id_prov', $pedido[$clave]->id_prov)->first();
            $pedido[$clave]->nombre_prov = $proveedorSeleccionado->nombre_prov;
            $categoriaSeleccionada = $listaCategoria->where('id_categoria', $pedido[$clave]->id_categoria)->first();
            $pedido[$clave]->categoria = $categoriaSeleccionada->categoria;
            $pedido[$clave]->id_categoria = $categoriaSeleccionada->id_categoria;
            $productoSeleccionado = $listaProducto->where('id_producto', $pedido[$clave]->id_producto)->first();
            $pedido[$clave]->nombre_producto = $productoSeleccionado->nombre_producto;
            $pedido[$clave]->id_producto = $productoSeleccionado->id_producto;

        }
        $json["colaborador"] = $listaColaborador; //DUDA
        $json["categoria"] = $listaCategoria;
        $json["pedido"] = $pedido;
        $json["proveedores"] = $listaProveedor;
        return response()->json($json);
    }

    public function guardarPedido(Request $request)
    {
        $post = $request->all(); //agarra todo lo que le estoy enviando del navegador, lo que va en el ajax
        $validator = Validator::make($post, [
            "id_usuario" => 'required|numeric',
            "id_pedido" => 'required|numeric', 
            "nombre_solicitante" => 'required|string',
            "correo_solicitante" => 'required|string',
            "telefono_solicitante" => 'required|numeric',
            "tipo_solicitud" => 'required|string',
            "precio_pedido" => 'required|numeric',
            "id_prov" => 'required|numeric',
            "id_confirmacion" => 'required|numeric',
            "id_estado" => 'required|numeric',
            "cantidad_producto" => 'required|numeric',
            "id_producto" => 'required|numeric'
        ],$messages = [
            'required' => 'El :attribute es requerido.',
            'numeric' => 'El :attribute debe ser numerico.',
            'string' => 'El :attribute no puede ir vacio.',
        ]);
        if ($validator->fails()) {
            return response()->json(array("respuesta"=>"error","descripcion"=>$validator->errors()),422); 
        }
        //nose para que es esto :o
        $idPedido = trim($post["id_pedido"]);
        $idUsuario = trim($post["id_usuario"]); //guardando en la variable $id el id_colab que esta en el $post
        $usuario = Colaborador::where('id_colaborador', $idUsuario)->first(); 
                                     
        if(!isset($usuario)){ //isset comprueba si una variable está definida o no en el script de PHP que se está ejecutando
            return response()->json(array("respuesta"=>"error","descripcion"=>"Tu usuario no existe."));
        }

        if($usuario->id_privilegio != 3){
            return response()->json(array("respuesta"=>"error","descripcion"=>"No tienes permiso"));
        }

        if($idPedido == -1){ //aqui si el id es igual a -1 creara un nuevo colaborador
            $pedido = new Pedido;
            
        }
        else{ //sino entendera que lo estoy editando y traera todo lo que traiga en id al model

             //validar si el id que les estamos mandando es igual a -1 no tiene que buscar, sino crear un colaborador
            //where() compara una columna con los resultados de una subconsulta.
            //->first() Trae el primer modelo que coincida con las restricciones de la consulta ...
            $pedido = Pedido::where('id_pedido',$idPedido)->first(); 

            if(!isset($pedido)){ //isset comprueba si una variable está definida o no en el script de PHP que se está ejecutando
                return response()->json(array("respuesta"=>"error","descripcion"=>"Tu pedido no existe."));
            }

        }      
        //
        $pedido->nombre_solicitante = trim($post["nombre_solicitante"]);
        $pedido->correo_solicitante = trim($post["correo_solicitante"]);
        $pedido->telefono_solicitante = trim($post["telefono_solicitante"]);
        $pedido->descripcion_prod = trim($post["descripcion_prod"]);
        $pedido->tipo_solicitud = trim($post["tipo_solicitud"]);
        $pedido->precio_pedido = trim($post["precio_pedido"]);
        $pedido->id_prov = trim($post["id_prov"]);
        $pedido->id_confirmacion = trim($post["id_confirmacion"]);
        $pedido->id_estado = trim($post["id_estado"]);
        $pedido->id_producto = trim($post["id_producto"]);
        $pedido->cantidad_producto = trim($post["cantidad_producto"]);        
        try {
            $pedido->save(); //aqui guarda la informacion que ingrese en el modal
            
            if($idPedido == -1){ //aqui si el id es -1 me enviara el mensaje de que se creo una categoria exitosamente
                return response()->json(array("respuesta"=>"exitoso","descripcion"=>"El pedido fue creado exitosamente."));
            }
            else{ //el programa entiende que termine de editar una categoria y me enviara el mensaje de que edite exitosamente
                return response()->json(array("respuesta"=>"exitoso","descripcion"=>"El pedido fue editado exitosamente."));
            }

        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(array("respuesta"=>"error","descripcion"=>$th));
            
        }
        
        return response()->json($pedido);
    }

    public function obtenerProvporCategoria(Request $request)
    {
        $post = $request->all(); //agarra todo lo que le estoy enviando del navegador, lo que va en el ajax
        $validator = Validator::make($post, [
            "id_usuario" => 'required|numeric',
            "id_categoria" => 'required|numeric'
        ],$messages = [
            'required' => 'El :attribute es requerido.',
            'numeric' => 'El :attribute debe ser numerico.'
        ]);
        if ($validator->fails()) {
            return response()->json(array("respuesta"=>"error","descripcion"=>$validator->errors()),422); 
        }
        //nose para que es esto :o
        $idCategoria = trim($post["id_categoria"]);
        $idUsuario = trim($post["id_usuario"]); //guardando en la variable $id el id_colab que esta en el $post
        $usuario = Colaborador::where('id_colaborador', $idUsuario)->first(); 

        if(!isset($usuario)){ //isset comprueba si una variable está definida o no en el script de PHP que se está ejecutando
            return response()->json(array("respuesta"=>"error","descripcion"=>"Tu usuario no existe."));
        }

        if($usuario->id_privilegio != 3){
            return response()->json(array("respuesta"=>"error","descripcion"=>"No tienes permiso"));
        }

        

        $sql = 'SELECT DISTINCT p.id_prov, p.nombre_prov 
        FROM proveedor p
        JOIN producto pr
        ON
        p.id_prov = pr.id_prov
        WHERE pr.id_categoria = '.$idCategoria;
        $prov = DB::select($sql);
        return $prov;
        
    }

    public function registroPedido(Request $request)
    {
        $post = $request->all(); //agarra todo lo que le estoy enviando del navegador, lo que va en el ajax
        $validator = Validator::make($post, [ //aqui estoy validando mis datos, en este caso que id es requerido y es tipo numerico
            'id_colaborador' => 'required|numeric', 
        ],$messages = [ //los mensajes que me dejara en caso de que no llene los input 
            'required' => 'El :attribute es requerido.',
            'numeric' => 'El :attribute debe ser numerico.',
        ]);
        if ($validator->fails()) { //aqui si falla me enviara el error
            return response()->json(array("respuesta"=>"error","descripcion"=>$validator->errors()),422); 
        }
        $idColab = trim($post["id_colaborador"]); //guardando en la variable $id el id_colab que esta en el $post
        $colaborador = Colaborador::where('id_colaborador',$idColab)->first(); //compara ambos y luego me entrega el primero que encuentre con estas cosas

        if(!isset($colaborador)){//un error que aparecera si el usuario no existe dentro de mi tabla
            return response()->json(array("respuesta"=>"error","descripcion"=>"Tu usuario no existe"));
        }
        
        if($colaborador->id_privilegio != 2){ //error que aparecera si el usuario que ingresa no tiene el permiso para ver/hacer ciertas cosas
            return response()->json(array("respuesta"=>"error","descripcion"=>"No tienes permiso"));
        }

        $listaPedido=Pedido::all();
        $listaProducto=Producto::all();
        $listaProveedor=Proveedor::all();
        $listaColaborador=Colaborador::all();
        $listaEstado=Estadopedido::all();

        foreach($listaPedido as $clave => $valor){
            $buscarProducto = Producto::select('nombre_producto')->where('id_producto', $listaPedido[$clave]->id_producto)->first();
            $buscarColaborador = Colaborador::select('nombre_colab')->where('id_colaborador', $listaPedido[$clave]->id_colaborador)->first();
            $buscarProveedor = Proveedor::select('nombre_prov')->where('id_prov', $listaPedido[$clave]->id_prov)->first();
            $buscarEstado = EstadoPedido::select('estado')->where('id_estado', $listaPedido[$clave]->id_estado)->first();
            
            $listaPedido[$clave]->nombre_producto = $buscarProducto->nombre_producto;
            $listaPedido[$clave]->nombre_colab = $buscarColaborador->nombre_colab;
            $listaPedido[$clave]->nombre_prov = $buscarProveedor->nombre_prov;
            $listaPedido[$clave]->estado = $buscarEstado->estado;

        }

        return response()->json($listaPedido);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
