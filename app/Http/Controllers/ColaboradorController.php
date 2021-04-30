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
        $validator = Validator::make($post, [
            'id_colaborador' => 'required|numeric', 
        ],$messages = [
            'required' => 'El :attribute es requerido.',
            'numeric' => 'El :attribute debe ser numerico.',
        ]);
        if ($validator->fails()) {
            return response()->json(array("respuesta"=>"error","descripcion"=>$validator->errors()),422); 
        }
        $id = trim($post["id_colaborador"]); //guardando en la variable $id el id_colab que esta en el $post
        $colaborador = Colaborador::where('id_colaborador',$id)->first(); 

        if(!isset($colaborador)){
            return response()->json(array("respuesta"=>"error","descripcion"=>"Tu usuario no existe"));
        }
        
        if($colaborador->id_privilegio != 1){
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
            "id_estado" => 'required|numeric'
        ],$messages = [
            'required' => 'El :attribute es requerido.',
            'numeric' => 'El :attribute debe ser numerico.',
            'string' => 'El :attribute no puede ir vacio.',
        ]);
        if ($validator->fails()) {
            return response()->json(array("respuesta"=>"error","descripcion"=>$validator->errors()),422); 
        }
        $id = trim($post["id_colaborador"]);
        $idUsuario = trim($post["id_usuario"]); //guardando en la variable $id el id_colab que esta en el $post
        $usuario = Colaborador::where('id_colaborador', $idUsuario)->first(); 

        if(!isset($usuario)){ //isset comprueba si una variable está definida o no en el script de PHP que se está ejecutando
            return response()->json(array("respuesta"=>"error","descripcion"=>"Tu usuario no existe."));
        }

        if($usuario->id_privilegio != 1){
            return response()->json(array("respuesta"=>"error","descripcion"=>"No tienes permiso"));
        }

        $colaborador = Colaborador::where('id_colaborador',$id)->first(); 

        if(!isset($colaborador)){ //isset comprueba si una variable está definida o no en el script de PHP que se está ejecutando
            return response()->json(array("respuesta"=>"error","descripcion"=>"Tu colaborador no existe."));
        }
        
        $colaborador->nombre_colab = trim($post["nombre_colab"]);
        $colaborador->apellido_colab = trim($post["apellido_colab"]);
        $colaborador->correo_colab = trim($post["correo_colab"]);
        $colaborador->telefono_colab = trim($post["telefono_colab"]);
        $colaborador->id_privilegio = trim($post["id_privilegio"]);
        $colaborador->id_estado = trim($post["id_estado"]);
        try {
            $colaborador->save();
            return response()->json(array("respuesta"=>"exitoso","descripcion"=>"El registro fue editado exitosamente."));
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
