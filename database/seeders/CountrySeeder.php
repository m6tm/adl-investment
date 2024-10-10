<?php

namespace Database\Seeders;

use App\Models\Country;
use App\Models\TicketPrice;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Country::factory()
            ->count(5)
            ->hasUsers(5)
            ->create();

        $data_countries = Storage::disk('data')->get('CountryCodes.json');
        $data_countries = json_decode($data_countries, true);
        $us_country = array_filter($data_countries, fn($country) => $country['code'] == "US");
        $us_country = array_values($us_country)[0];

        $country = Country::factory()->create($us_country);

        $us_tickets_prices = [
            [
                'libelle' => '$1',
                'prix' => 1,
                'devise' => '$',
                'country_id' => $country->id,
                'is_promotion' => false,
            ],
            [
                'libelle' => '$2',
                'prix' => 2,
                'devise' => '$',
                'country_id' => $country->id,
                'is_promotion' => false,
            ],
            [
                'libelle' => '$5',
                'prix' => 5,
                'devise' => '$',
                'country_id' => $country->id,
                'is_promotion' => false,
            ],
            [
                'libelle' => '$10',
                'prix' => 10,
                'devise' => '$',
                'country_id' => $country->id,
                'is_promotion' => false,
            ]
        ];

        foreach ($us_tickets_prices as $ticket_price) {
            TicketPrice::factory()->create($ticket_price);
        }
    }
}
