<?php

namespace Database\Factories;

use App\Models\Country;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Country>
 */
class CountryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\Illuminate\Database\Eloquent\Model>
     */
    protected $model = Country::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $data_countries = Storage::disk('data')->get('CountryCodes.json');
        $data_countries = json_decode($data_countries, true);
        $countries = Country::all()->map(fn(Country $country) => $country->dial_code)->toArray();
        $data_countries = array_filter($data_countries, fn($country) => !in_array($country['dial_code'], $countries));
        $selected_country = $data_countries[array_rand($data_countries)];

        return $selected_country;
    }
}
