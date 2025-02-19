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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('tirage_id');
            $table->foreignId('ticket_price_id');
            $table->foreignId('ticket_categorie_id');
            $table->foreignId('paiement_id');
            $table->enum('type',['bonus','mallus']);
            $table->enum('statut',['utilise']);
            $table->boolean('gagnant',['nom','oui']);
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
