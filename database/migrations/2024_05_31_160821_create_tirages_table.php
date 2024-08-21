<?php

use App\Enums\TICKET_TYPE;
use App\Enums\TIRAGE_STATUS;
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
            $table->enum('statut', TIRAGE_STATUS::getValues())->default(TIRAGE_STATUS::ATTENTE);
            $table->enum('type', TICKET_TYPE::getValues())->default(TICKET_TYPE::NORMAL);
            $table->dateTime('created_at')->useCurrent();
            $table->dateTime('updated_at');

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
