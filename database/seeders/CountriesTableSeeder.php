<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Country;

class CountriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $countries = [
            [
                'name' => 'Algeria',
                'dial_code' => '+213',
                'code' => 'DZ',
            ],
            [
                'name' => 'Cameroon',
                'dial_code' => '+237',
                'code' => 'CM',
            ],
            [
                'name' => 'Central African Republic',
                'dial_code' => '+236',
                'code' => 'CF',
            ],
            [
                'name' => 'Chad',
                'dial_code' => '+235',
                'code' => 'TD',
            ],
        ];

        foreach ($countries as $country) {
            Country::create($country);
        }
    }
}
