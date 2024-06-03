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
        Schema::create('tirages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('roue_id');
            $table->date('date_tirage');
            $table->time('heure_tirage');
            $table->string('statut')->default('encours');
            $table->timestamps();

            $table->foreign('roue_id')->references('id')->on('roues');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tirages');
    }
};
