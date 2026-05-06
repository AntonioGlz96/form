<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\ProjectCatalog;

class ProjectController extends Controller
{
    public function store(Request $request)
{
    $validated = $request->validate([
        'no_project' => 'required|string',
        'name_project' => 'required|string',

        'areas' => 'array',
        'areas.*' => 'integer',

        'uniforms' => 'array',
        'uniforms.*' => 'integer',

        // NUEVO: validación para modelos por prenda
        'models_by_garment' => 'nullable|array',
        'models_by_garment.*' => 'array',
        'models_by_garment.*.*' => 'integer|exists:catalogs,id',
    ]);

    $project = Project::create([
        'no_project' => $request->no_project,
        'name_project' => $request->name_project,
    ]);

    // EXISTENTE
    foreach ($request->areas ?? [] as $area) {
        DB::table('projects_catalogs')->insert([
            'project_id' => $project->id,
            'catalog_id' => $area,
        ]);
    }

    // EXISTENTE
    foreach ($request->uniforms ?? [] as $uniform) {
        DB::table('projects_catalogs')->insert([
            'project_id' => $project->id,
            'catalog_id' => $uniform,
        ]);
    }

    // NUEVO: insertar modelos con tipo de prenda
    if ($request->has('models_by_garment')) {

        foreach ($request->models_by_garment as $clothe => $models) {

            foreach ($models as $model) {

                DB::table('projects_catalogs')->insert([
                    'project_id' => $project->id,
                    'catalog_id' => $model,
                    'clothes' => strtoupper($clothe), // NUEVO campo
                ]);
            }
        }
    }

    return response()->json(['success' => true]);
}
}