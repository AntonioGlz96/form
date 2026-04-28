<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Crear un nuevo campo en la tabla 'autores'
     */
public function up(): void
{
    Schema::table('autores', function (Blueprint $table) {
        $table->string('nacionalidad')->after('nombre')->nullable();
    });
}

public function down(): void
{
    Schema::table('autores', function (Blueprint $table) {
        $table->dropColumn('nacionalidad');
    });
}
};
