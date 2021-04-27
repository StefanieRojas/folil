<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Colaborador;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;


class LoginController extends BaseController
{
    public function login(Request $request)
    {
        $post = $request->all();
        $validator = Validator::make($post, [
            'usuario' => 'required',
            'password' => 'required',
        ],$messages = [
            'required' => ':attribute es requerido/a.',
        ]);

        if ($validator->fails()) {
            return response()->json(array("respuesta"=>"error","descripcion"=>$validator->errors()),422); 
        }
        $nombreUsuario = trim($post["usuario"]); //trim toma algo que le envio y le borra los espacion en blanco del principio y final.
        $pass = trim($post["password"]);
        $colaborador = Colaborador::where('nombre_colab',$nombreUsuario)->where('password_colab',md5($pass))->first();

        if(!isset($colaborador)){
            return response()->json(array("respuesta"=>"error","descripcion"=>"Tu usuario no existe"));
        }

        if($colaborador->token==null){
            $random = rand(1,10000);//la variable guardara un numero random del 1 al 10000
            $token = strrev($colaborador->id_colaborador.$random.$colaborador->password_colab.md5(trim($nombreUsuario)).$colaborador->id_colaborador.$random.$colaborador->password_colab.md5(trim($nombreUsuario))); //streev toma el string y lo invierte
            $colaborador->token=$token;
            $colaborador->save();
        }    

        return response()->json($colaborador);
    }
}
?>