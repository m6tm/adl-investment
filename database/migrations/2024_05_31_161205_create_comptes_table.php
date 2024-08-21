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
        Schema::create('comptes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('portefeuille_id');
            $table->foreignId('portefeuille_investissement_id');
            $table->enum('statut',['inactif','actif']);
            $table->float('solde');
            $table->string('devise')->default('EUR');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comptes');
    }
};
