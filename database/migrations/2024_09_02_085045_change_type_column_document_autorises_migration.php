<?php

use App\Enums\DOCUMENT_TYPE;
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
        Schema::table('document_autorises', function (Blueprint $table) {
            $table->enum('type', DOCUMENT_TYPE::getValues())->unique()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('document_autorises', function (Blueprint $table) {
            //
        });
    }
};
