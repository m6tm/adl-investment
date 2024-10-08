<?php

namespace Database\Seeders;

use App\Enums\DOCUMENT_TYPE;
use App\Models\Country;
use App\Models\DocumentAutorise;
use Illuminate\Database\Seeder;

class DocumentAutoriseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $document_types = DOCUMENT_TYPE::getValues();
        foreach ($document_types as $document) {
            DocumentAutorise::create([
                'libelle' => $document,
                'type' => $document,
            ]);
        }
    }
}
