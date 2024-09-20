<?php

namespace Database\Seeders;

use App\Models\Country;
use App\Models\DocumentAutorise;
use App\Models\PaysDocumentAutorise;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CountryDocumentAutorizedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $countries = Country::all();
        $document_autorises = DocumentAutorise::all();
        foreach ($countries as $country) {
            if ($country->id % 2 == 0) {
                continue;
            }
            foreach ($document_autorises as $document_autorise) {
                if ($document_autorise->id % 2 == 1) {
                    continue;
                }
                PaysDocumentAutorise::create([
                    'country_id' => $country->id,
                    'document_autorise_id' => $document_autorise->id,
                ]);
            }
        }
    }
}
