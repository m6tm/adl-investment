<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('portefeuille__investissements', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('compte_id');
            $table->string('balance_libelle');
            $table->double('balance_numeric');
            $table->timestamps();

            $table->foreign('compte_id')->references('id')->on('compte');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portefeuille__investissements');
    }
};
