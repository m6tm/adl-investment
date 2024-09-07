<?php

namespace App\Helpers;

use App\Enums\DOCUMENT_STATUS;
use App\Enums\USER_ROLE;
use App\Enums\USER_VERIFICATION_STATUS;
use App\Models\Document;
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

    public static function accountVerificationStatus() {
        $account_ready_verified = auth()->user()->verification_status == USER_VERIFICATION_STATUS::VERIFIED;
        $account_unverified = auth()->user()->verification_status == USER_VERIFICATION_STATUS::UNVERIFIED && auth()->user()->documents->count() === 0;
        $account_pending_verification = auth()->user()->verification_status == USER_VERIFICATION_STATUS::PENDING && auth()->user()->documents->count() > 0 && auth()->user()->documents->filter(fn(Document $document) => $document->statuts == DOCUMENT_STATUS::PENDING)->count() >= 0;
        $account_failled_verification = auth()->user()->documents->count() > 0 && auth()->user()->documents->filter(fn(Document $document) => $document->statuts == DOCUMENT_STATUS::REFUSED)->count() > 0;
        return compact('account_ready_verified', 'account_unverified', 'account_pending_verification', 'account_failled_verification');
    }
}