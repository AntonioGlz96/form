<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\ProjectCatalog;

class ProjectController extends Controller
{
    public function storeOrUpdate(Request $request)
    {
        $project = Project::updateOrCreate(
            ['id' => $request->id],
            $request->all()
        );

        // 🔥 LIMPIAR RELACIONES ANTERIORES
        ProjectCatalog::where('project_id', $project->id)->delete();

        // AREAS
        foreach ($request->areas ?? [] as $areaId) {
            ProjectCatalog::create([
                'project_id' => $project->id,
                'catalog_id' => $areaId,
                'garment_type' => null
            ]);
        }

        // UNIFORMS
        foreach ($request->uniforms ?? [] as $uniformId) {
            ProjectCatalog::create([
                'project_id' => $project->id,
                'catalog_id' => $uniformId,
                'garment_type' => null
            ]);
        }

        // 🔥 MODELOS POR PRENDA
        if ($request->has('models_by_garment')) {
            foreach ($request->models_by_garment as $garment => $models) {
                foreach ($models as $modelId) {
                    ProjectCatalog::create([
                        'project_id' => $project->id,
                        'catalog_id' => $modelId,
                        'garment_type' => $garment
                    ]);
                }
            }
        }

        return response()->json([
            'message' => 'Proyecto guardado correctamente'
        ], 200);
    }
}