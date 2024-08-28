<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;

class AuthHelper {
    public static function getPermissions() {
        $permissions = Storage::disk('auth')->get('permissions.json');
        return json_decode($permissions, true);
    }
}