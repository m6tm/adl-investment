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
        Schema::create('tickets_draws', function (Blueprint $table) {
             $table->id();
            $table->foreignId('coefficient_id');
            $table->foreignId('winning_id');
            $table->integer('nombre_ticket_a_tirer');
            $table->dateTime('created_at')->useCurrent();
            $table->dateTime('updated_at');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets_draws');
    }
};
