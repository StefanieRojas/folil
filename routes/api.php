<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\ColaboradorController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\PedidoController;
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
Route::middleware('auth:api')->post('/guardarCategoria', [CategoriaController::class, 'guardarCategoria']);
Route::middleware('auth:api')->post('/obtenerCategoria',[CategoriaController::class, 'obtenerCategoria']);
Route::middleware('auth:api')->post('/guardarProveedor', [ProveedorController::class, 'guardarProveedor']);
Route::middleware('auth:api')->post('/obtenerProveedores',[ProveedorController::class, 'obtenerProveedores']);
Route::middleware('auth:api')->post('/guardarPedido', [PedidoController::class, 'guardarPedido']);
Route::middleware('auth:api')->post('/obtenerPedidos',[PedidoController::class, 'obtenerPedidos']);
Route::middleware('auth:api')->post('/guardarProducto', [ProductoController::class, 'guardarProducto']);
Route::middleware('auth:api')->post('/obtenerProducto',[ProductoController::class, 'obtenerProducto']);