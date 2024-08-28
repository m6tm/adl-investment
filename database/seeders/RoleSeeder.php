<?php

namespace Database\Seeders;

use App\Enums\USER_ROLE;
use App\Enums\USER_ROLE_DESCRIPTION;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (USER_ROLE::getKeys() as $key) {
            Role::create([
                'name' => USER_ROLE::getValue($key),
                'description' => USER_ROLE_DESCRIPTION::getValue($key),
            ]);
        }
    }
}
