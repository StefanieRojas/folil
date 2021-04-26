<?php

namespace App\Http\Middleware;
use Closure;
use App\Models\Colaborador;

//use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate 
{
    public function handle($request, Closure $next) {
		
        $token = $request->header('t');
        $msgInvalido = "token invalido";
        $msgExpiracion = "sesion expirada";
		$usu = Colaborador::where('token',$token)->first();

		if(isset($usu)){
			
	
			$request->merge(array("token" => $usu->token));
	
			
			$_response = $next($request);
			
			//esto es para evitar la caché
			$_response->headers->set('Cache-Control: no-cache' , 'must-revalidate');
			$_response->headers->set("Pragma", "no-cache");
			$_response->headers->set("Expires", "Sat, 26 Jul 1997 05:00:00 GMT");
			
			return $_response;			
			
			
		}

        echo $msgInvalido;
        exit;
    }
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    // protected function redirectTo($request)
    // {
    //     print_r('hola');
    //     // if (! $request->expectsJson()) {
    //     //     return route('login');
    //     // }
    // }
}
