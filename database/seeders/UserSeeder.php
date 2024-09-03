<?php

namespace Database\Seeders;

use App\Enums\USER_ROLE;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /**
         * @var User $user
         */
        $user = User::factory()
            ->hasAddress()
            ->hasPhones()
            ->create([
                'email' => 'super-admin@gmail.com',
            ]);

        $user->assignRole(USER_ROLE::SUPER_ADMIN);
        
        /**
         * @var Collection $users
         */
        $users = User::factory(4)
            ->hasAddress()
            ->hasPhones()
            ->create();

        $users->each(function (User $user) {
            $other_roles = [USER_ROLE::ADMIN, USER_ROLE::PLAYER];
            $random_role = $other_roles[array_rand($other_roles)];
            $user->assignRole($random_role);
        });

        $users = User::all();
        $user_with_not_role = $users->filter(function (User $user) {
            return $user->getRoleNames()->count() === 0;
        });
        $user_with_not_role->each(function (User $user) {
            $other_roles = [USER_ROLE::ADMIN, USER_ROLE::PLAYER];
            $random_role = $other_roles[array_rand($other_roles)];
            $user->assignRole($random_role);
        });
    }
}
