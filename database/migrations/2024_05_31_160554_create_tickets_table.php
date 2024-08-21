<?php

use App\Enums\TICKET_GAGNANT;
use App\Enums\TICKET_STATUS;
use App\Enums\TICKET_TYPE;
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
            $table->enum('type', TICKET_TYPE::getValues())->default(TICKET_TYPE::NORMAL);
            $table->enum('statut', TICKET_STATUS::getValues())->default(TICKET_STATUS::ACTIF);
            $table->enum('gagnant',TICKET_GAGNANT::getValues())->default(TICKET_GAGNANT::NON_DEFINI);
            $table->dateTime('created_at')->useCurrent();
            $table->dateTime('updated_at');

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
