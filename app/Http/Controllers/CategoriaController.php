<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categoria;
use App\Models\Colaborador;
use Illuminate\Support\Facades\Validator;


class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function obtenerCategoria(Request $request) //crea una funcion llamada obtenerCategoria (request es lo que va a recibir de lo que llegue del navegador/google)
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
        
        if($colaborador->id_privilegio != 1){ //error que aparecera si el usuario que ingresa no tiene el permiso para ver/hacer ciertas cosas
            return response()->json(array("respuesta"=>"error","descripcion"=>"No tienes permiso"));
        }

        $categoria=Categoria::all();
        return response()->json($categoria);
    }

    public function guardarCategoria(Request $request)
    {
        $post = $request->all(); //agarra todo lo que le estoy enviando del navegador, lo que va en el ajax
        $validator = Validator::make($post, [
            "id_usuario" => 'required|numeric',
            "id_categoria" => 'required|numeric', 
            "categoria" => 'required|string',
            "id_estado" => 'required|numeric',
        ],$messages = [
            'required' => 'El :attribute es requerido.',
            'numeric' => 'El :attribute debe ser numerico.',
            'string' => 'El :attribute no puede ir vacio.',
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

        if($usuario->id_privilegio != 1){
            return response()->json(array("respuesta"=>"error","descripcion"=>"No tienes permiso"));
        }

        if($idCategoria == -1){ //aqui si el id es igual a -1 creara un nuevo colaborador
            $categoria = new Categoria;
            
        }
        else{ //sino entendera que lo estoy editando y traera todo lo que traiga en id al model

             //validar si el id que les estamos mandando es igual a -1 no tiene que buscar, sino crear un colaborador
            //where() compara una columna con los resultados de una subconsulta.
            //->first() Trae el primer modelo que coincida con las restricciones de la consulta ...
            $categoria = Categoria::where('id_categoria',$idCategoria)->first(); 

            if(!isset($categoria)){ //isset comprueba si una variable está definida o no en el script de PHP que se está ejecutando
                return response()->json(array("respuesta"=>"error","descripcion"=>"Tu categoria no existe."));
            }

        }      
        //
        $categoria->categoria = trim($post["categoria"]);
        $categoria->id_estado = trim($post["id_estado"]);
        try {
            $categoria->save(); //aqui guarda la informacion que ingrese en el modal
            
            if($idCategoria == -1){ //aqui si el id es -1 me enviara el mensaje de que se creo una categoria exitosamente
                return response()->json(array("respuesta"=>"exitoso","descripcion"=>"La categoria fue creada exitosamente."));
            }
            else{ //el programa entiende que termine de editar una categoria y me enviara el mensaje de que edite exitosamente
                return response()->json(array("respuesta"=>"exitoso","descripcion"=>"La categoria fue editada exitosamente."));
            }

        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(array("respuesta"=>"error","descripcion"=>$th));
            
        }
        
        return response()->json($categoria);
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
