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
            $table->unsignedBigInteger('coefficient_id');
            $table->unsignedBigInteger('winning_id');
            $table->integer('nombre_tickets');
            $table->timestamps();

            $table->foreign('coefficient_id')->references('id')->on('coefficients');
            $table->foreign('winning_id')->references('id')->on('winnings');
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
