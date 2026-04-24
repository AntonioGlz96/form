<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;

class UsuariosController extends Controller
{
    // Listar todos los usuarios
    public function index()
    {
        return response()->json(Usuarios::all(), 200);
    }

    // Crear un nuevo usuario
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'  => 'required|string|max:255',
            'gmail' => 'required|email|unique:usuarios,gmail',
            'tel'   => 'nullable|string'
        ]);

        $usuario = Usuarios::create($validated);
        return response()->json($usuario, 201);
    }

    // Mostrar un usuario específico
    public function show($id)
    {
        $usuario = Usuarios::find($id);
        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
        return response()->json($usuario, 200);
    }

    // Actualizar un usuario
    public function update(Request $request, $id)
    {
        $usuario = Usuarios::find($id);
        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
        $validated = $request->validate([
            'name'  => 'string|max:255',
            'gmail' => 'email|unique:usuarios,gmail,' . $id,
            'tel'   => 'nullable|string'
        ]);
        $usuario->update($validated);
        return response()->json($usuario, 200);
    }

    // Eliminar un usuario
    public function destroy($id)
    {
        $usuario = Usuarios::find($id);
        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
        $usuario->delete();
        return response()->json(['message' => 'Usuario eliminado correctamente'], 200);
    }


    public function buscar($email)
{
    // Usamos 'like' para que busque correos que contengan ese texto
    $usuarios = Usuarios::where('gmail', 'LIKE', "%$email%")->get();
    return response()->json($usuarios);
}
}