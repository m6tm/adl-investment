<?php

use App\Enums\ACCOUNT_STATUS;
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
            $table->enum('statut', ACCOUNT_STATUS::getValues());
            $table->string('devise')->default('USD');
            $table->dateTime('created_at')->useCurrent();
            $table->dateTime('updated_at');

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
