<?php

namespace App\Helpers;

use App\Enums\USER_ROLE;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class AuthHelper {
    public static function getPermissions(string $role = null) {
        switch ($role) {
            case USER_ROLE::ADMIN:
                $permissions = Storage::disk('auth')->get('admin-permissions.json');
                return json_decode($permissions, true);
                break;

            case USER_ROLE::SUPER_ADMIN:
                $permissions = Storage::disk('auth')->get('super-admin-permissions.json');
                return json_decode($permissions, true);
                break;

            case USER_ROLE::PLAYER:
                $permissions = Storage::disk('auth')->get('player-permissions.json');
                return json_decode($permissions, true);
                break;
            default:
                $permissions = Storage::disk('auth')->get('permissions.json');
                return json_decode($permissions, true);
                break;
        }
    }

    public static function can(string $permission) {
        /**
         * @var User $user
         */
        $user = User::find(auth()->user()->id);
        return $user->can($permission);
    }

    public static function hasRole(...$roles) {
        /**
         * @var User $user
         */
        $user = User::find(auth()->user()->id);
        return $user->hasAllRoles($roles);
    }
}