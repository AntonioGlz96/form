<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Crear un nuevo campo fk en la tabla 'libros'
     */
public function up(): void
{
    Schema::table('libros', function (Blueprint $table) {
        // foreignId create la columna 'autor_id'
        // constrained busca la tabla 'autores' automáticamente
        $table->foreignId('autor_id')->after('id')->constrained('autores')->onDelete('cascade');
    });
}

public function down(): void
{
    Schema::table('libros', function (Blueprint $table) {
        $table->dropForeign(['autor_id']); // Primero quitamos la relación
        $table->dropColumn('autor_id');    // Luego borramos la columna
    });
}
};
