<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    protected $table = 'proveedor';
    protected $primaryKey = 'id_prov';

    public function calificacion()
    {
        return $this->hasMany('App\Models\Calificacion');
    }

    public function categoria()
    {
        return $this->hasMany(Categoria::class,'id_categoria');
        //return $this->belongsTo('App\Models\Categoria','id_categoria');
    }

    public function estadoprov()
    {
        return $this->hasMany('App\Models\Estadoprov');
    }
}
