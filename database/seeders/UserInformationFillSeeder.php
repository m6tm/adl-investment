<?php

namespace Database\Seeders;

use App\Models\Addresse;
use App\Models\Telephone;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class UserInformationFillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        $users->each(function(User $user) {
            $data_countries = Storage::disk('data')->get('CountryCodes.json');
            $data_countries = json_decode($data_countries, true);
            $countries = Telephone::all()->map(fn(Telephone $telephone) => $telephone->code)->toArray();
            $data_countries = array_filter($data_countries, fn($country) => !in_array($country['code'], $countries));
            $selected_country = $data_countries[array_rand($data_countries)];

            if ($user->phones->count() === 0) {
                Telephone::create([
                    'user_id' => $user->id,
                    'code' => $selected_country['code'],
                    'telephone' => fake()->unique()->phoneNumber(),
                ]);
            }

            if (!$user->address) {
                Addresse::create([
                    'user_id' => $user->id,
                    'city' => fake()->city(),
                    'street' => fake()->streetName(),
                ]);
            }
        });
    }
}
