<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Proveedor;
use App\Models\Colaborador;
use App\Models\Producto;
use App\Models\Estadopedido;

class Pedido extends Model
{
    protected $table = 'pedido';
    protected $primaryKey = 'id_pedido';

    public function colaborador()
    {
        return $this->hasOne(Colaborador::class,'id_colaborador');
    }

    public function proveedor()
    {
        return $this->hasMany(Proveedor::class,'id_prov');
    }

    public function producto()
    {
        return $this->hasMany(Producto::class,'id_producto');
    }

    public function estadoPedido()
    {
        return $this->hasMany(Estadopedido::class,'id_estado');
    }

    public function categoria()
    {
        return $this->hasMany('App\Models\Categoria');
    }
}
