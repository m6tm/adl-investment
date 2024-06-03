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
            $table->string('type')->default('normal');
            $table->string('statut')->default('actif');
            $table->boolean('gagnant');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('tirage_id')->references('id')->on('tirages');
            $table->foreign('ticket_price_id')->references('id')->on('ticket_prices');
            $table->foreign('ticket_categorie_id')->references('id')->on('ticket_categories');
            $table->foreign('paiement_id')->references('id')->on('paiements');
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
