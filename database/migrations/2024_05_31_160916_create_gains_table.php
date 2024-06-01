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
        Schema::create('gains', function (Blueprint $table) {
            $table->id();
    $table->unsignedBigInteger('user_id');
    $table->unsignedBigInteger('tirage_id');
    $table->decimal('montant', 10, 2);
    $table->timestamps();

    $table->foreign('user_id')->references('id')->on('users');
    $table->foreign('tirage_id')->references('id')->on('tirages');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gains');
    }
};
