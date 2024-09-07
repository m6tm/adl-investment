<?php

namespace Database\Factories;

use App\Models\Telephone;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Telephone>
 */
class TelephoneFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\Illuminate\Database\Eloquent\Model>
     */
    protected $model = Telephone::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $data_countries = Storage::disk('data')->get('CountryCodes.json');
        $data_countries = json_decode($data_countries, true);
        $countries = Telephone::all()->map(fn(Telephone $telephone) => $telephone->code)->toArray();
        $data_countries = array_filter($data_countries, fn($country) => !in_array($country['code'], $countries));
        $selected_country = $data_countries[array_rand($data_countries)];
        return [
            'user_id' => User::factory(),
            'code' => $selected_country['code'],
            'telephone' => $this->faker->unique()->phoneNumber(),
        ];
    }
}
