<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $user = User::create([
            'email' => 'test@gmail.com',
            'password' => Hash::make('password'),
            'nom' => 'TEST',
            'prenom' => 'user',
            'birt_day' => '2004-08-05',
            'adresse' => 'canada',
            'verification_status' => User::VERIFICATION_PENDING, 
            'derniere_connexion' => now(),
    ]);

    User::factory(10)->create();

    }
}
