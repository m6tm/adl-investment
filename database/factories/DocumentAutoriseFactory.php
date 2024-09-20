<?php

namespace Database\Factories;

use App\Enums\DOCUMENT_TYPE;
use App\Models\DocumentAutorise;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DocumentAutorise>
 */
class DocumentAutoriseFactory extends Factory
{

    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\Illuminate\Database\Eloquent\Model>
     */
    protected $model = DocumentAutorise::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $documents = DocumentAutorise::all()->map(fn(DocumentAutorise $document) => $document->type)->toArray();
        $document_types = array_filter(DOCUMENT_TYPE::getValues(), fn($type) => !in_array($type, $documents));
        
        return [
            'libelle' => $this->faker->sentence,
            'type' => $document_types,
        ];
    }
}
