<?php

use App\Enums\USER_VERIFICATION_STATUS;
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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pay_id')->nullable();
            $table->foreignId('referal_id')->nullable();
            $table->string('nom');
            $table->string('prenom');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('referal_link')->unique();
            $table->date('birt_day');
            $table->enum('verification_status', USER_VERIFICATION_STATUS::getValues())->default(USER_VERIFICATION_STATUS::UNVERIFIED);
            $table->dateTime('derniere_connexion');
            $table->rememberToken();
            $table->dateTime('created_at')->useCurrent();
            $table->dateTime('updated_at');
            $table->dateTime('deleted_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
