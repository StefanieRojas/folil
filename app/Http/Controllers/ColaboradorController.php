<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Colaborador;
use Illuminate\Support\Facades\Validator;

class ColaboradorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function obtenerColaborador(Request $request)
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
        $id = trim($post["id_colaborador"]); //guardando en la variable $id el id_colab que esta en el $post
        $colaborador = Colaborador::where('id_colaborador',$id)->first(); //compara ambos y luego me entrega el primero que encuentre con estas cosas

        if(!isset($colaborador)){//un error que aparecera si el usuario no existe dentro de mi tabla
            return response()->json(array("respuesta"=>"error","descripcion"=>"Tu usuario no existe"));
        }
        
        if($colaborador->id_privilegio != 1){ //error que aparecera si el usuario que ingresa no tiene el permiso para ver/hacer ciertas cosas
            return response()->json(array("respuesta"=>"error","descripcion"=>"No tienes permiso"));
        }
        $colaborador=Colaborador::all();
        return response()->json($colaborador);
    }

    public function guardarColab(Request $request)
    {
        $post = $request->all(); //agarra todo lo que le estoy enviando del navegador, lo que va en el ajax
        $validator = Validator::make($post, [
            "id_usuario" => 'required|numeric',
            "id_colaborador" => 'required|numeric', 
            "nombre_colab" => 'required|string',
            "apellido_colab" => 'required|string',
            "correo_colab" => 'required|string',
            "telefono_colab" => 'required|numeric',
            "id_privilegio" => 'required|numeric',
            "id_estado" => 'required|numeric',
            "password_colab" => 'required|string'
        ],$messages = [
            'required' => 'El :attribute es requerido.',
            'numeric' => 'El :attribute debe ser numerico.',
            'string' => 'El :attribute no puede ir vacio.',
        ]);
        if ($validator->fails()) {
            return response()->json(array("respuesta"=>"error","descripcion"=>$validator->errors()),422); 
        }
        $id = trim($post["id_colaborador"]);
        $pass = trim($post["password_colab"]);
        $idUsuario = trim($post["id_usuario"]); //guardando en la variable $id el id_colab que esta en el $post
        $usuario = Colaborador::where('id_colaborador', $idUsuario)->first(); 
                                     
        if(!isset($usuario)){ //isset comprueba si una variable está definida o no en el script de PHP que se está ejecutando
            return response()->json(array("respuesta"=>"error","descripcion"=>"Tu usuario no existe."));
        }

        if($usuario->id_privilegio != 1){
            return response()->json(array("respuesta"=>"error","descripcion"=>"No tienes permiso"));
        }

        if($id == -1){ //aqui si el id es igual a -1 creara un nuevo colaborador
            $colaborador = new Colaborador;
            
        }
        else{ //sino entendera que lo estoy editando y traera todo lo que traiga en id al model

             //validar si el id que les estamos mandando es igual a -1 no tiene que buscar, sino crear un colaborador
            //where() compara una columna con los resultados de una subconsulta.
            //->first() Trae el primer modelo que coincida con las restricciones de la consulta ...
            $colaborador = Colaborador::where('id_colaborador',$id)->first(); 

            if(!isset($colaborador)){ //isset comprueba si una variable está definida o no en el script de PHP que se está ejecutando
                return response()->json(array("respuesta"=>"error","descripcion"=>"Tu colaborador no existe."));
            }

        }      
        //
        $colaborador->nombre_colab = trim($post["nombre_colab"]);
        $colaborador->apellido_colab = trim($post["apellido_colab"]);
        $colaborador->correo_colab = trim($post["correo_colab"]);
        $colaborador->telefono_colab = trim($post["telefono_colab"]);
        $colaborador->id_privilegio = trim($post["id_privilegio"]);
        $colaborador->id_estado = trim($post["id_estado"]);
        $colaborador->password_colab = md5(trim($post["password_colab"]));
        try {
            $colaborador->save(); //aqui guarda la informacion que ingrese en el modal
            
            if($id == -1){ //aqui si el id es -1 me enviara el mensaje de que se creo un colaborador exitosamente
                return response()->json(array("respuesta"=>"exitoso","descripcion"=>"El colaborador fue creado exitosamente."));
            }
            else{ //el programa entiende que termine de editar un colaborador y me enviara el mensaje de que edite exitosamente
                return response()->json(array("respuesta"=>"exitoso","descripcion"=>"El colaborador fue editado exitosamente."));
            }

        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(array("respuesta"=>"error","descripcion"=>$th));
            
        }
        
        return response()->json($colaborador);
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
