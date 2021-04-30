<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\ColaboradorController;
use App\Http\Controllers\LoginController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/loginme', [LoginController::class, 'login']);
Route::get('/obtenerProveedores', [ProveedorController::class, 'obtenerProveedores']);
Route::middleware('auth:api')->post('/guardarColab', [ColaboradorController::class, 'guardarColab']);
Route::middleware('auth:api')->post('/obtenerColaborador',[ColaboradorController::class, 'obtenerColaborador']);
