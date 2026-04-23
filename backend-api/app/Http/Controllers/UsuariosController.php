<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;

class UsuariosController
{
    public function index()
    {
        $usuarios = Usuarios::all();
        return response()->json($usuarios);
    }
    
    public function store(Request $request)
    {
        $usuario = Usuarios::create($request->all());
        return response()->json($usuario, 201);
    }
}
