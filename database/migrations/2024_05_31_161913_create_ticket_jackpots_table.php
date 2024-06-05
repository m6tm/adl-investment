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
        Schema::create('ticket_jackpots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jackpot_id');
            $table->foreignId('coefficient_id');
            $table->string('date_creation');
            $table->string('date_mise_a_jour');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_jackpots');
    }
};
