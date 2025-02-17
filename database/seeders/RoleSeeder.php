<?php

namespace Database\Seeders;

use App\Enums\USER_ROLE;
use App\Helpers\AuthHelper;
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
                'description' => USER_ROLE::getValue($key),
            ]);
        }

        $this->forSuperAdmin();
        $this->forAdmin();
        $this->forPlayer();
    }

    function forSuperAdmin()
    {
        /**
         * @var Role $role_super_admin
         */
        $role_super_admin = Role::where('name', USER_ROLE::SUPER_ADMIN)->first();
        $permissions = AuthHelper::getPermissions(USER_ROLE::SUPER_ADMIN);

        foreach ($permissions as $permission) {
            $role_super_admin->givePermissionTo($permission);
        }
    }

    function forAdmin()
    {
        /**
         * @var Role $role_admin
         */
        $role_admin = Role::where('name', USER_ROLE::ADMIN)->first();
        $permissions = AuthHelper::getPermissions(USER_ROLE::ADMIN);

        foreach ($permissions as $permission) {
            $role_admin->givePermissionTo($permission);
        }
    }

    function forPlayer()
    {
        /**
         * @var Role $role_player
         */
        $role_player = Role::where('name', USER_ROLE::PLAYER)->first();
        $permissions = AuthHelper::getPermissions(USER_ROLE::PLAYER);

        foreach ($permissions as $permission) {
            $role_player->givePermissionTo($permission['name']);
        }
    }
}
