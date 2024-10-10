<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TicketPrice>
 */
class TicketPriceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'libelle' => fake()->sentence(2),
            'prix' => fake()->randomElement([1, 2, 5, 10]),
            'devise' => fake()->randomElement(['$', '€', '£', '¥']),
            'is_promotion' => fake()->boolean(),
        ];
    }
}
