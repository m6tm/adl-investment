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
            $table->string('statut')->default('inactif');
            $table->decimal('solde', 10, 2)->default(0.00);
            $table->string('devise')->default('EUR');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('portefeuille_id')->references('id')->on('portefeuilles');
            $table->foreign('portefeuille_investissement_id')->references('id')->on('portefeuille_investissements');
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
