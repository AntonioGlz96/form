<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuarios extends Model
{
    protected $table = 'usuarios';
    protected $fillable = ['id', 'name', 'gmail', 'tel'];
    
    public $timestamps = false;
}
