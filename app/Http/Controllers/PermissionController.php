<?php

namespace App\Http\Controllers;

use App\Helpers\AuthHelper;
use App\Http\Requests\PermissionToProfilRequest;
use App\Http\Requests\PermissionToUserRequest;
use App\Http\Requests\UpdatePermissionRequest;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionController extends Controller
{
    function index()
    {
        if (!AuthHelper::can('permissions')) return redirect()->back()->withErrors(__('backend.not-access'));
        $permissions = Permission::all();
        return view('dashboard.pages.permissions.index', compact('permissions'));
    }

    function permissionToUser(int $permission_id, PermissionToUserRequest $request)
    {
        if (!AuthHelper::can('permission.to.user')) return redirect()->back()->withErrors(__('backend.not-access'));
        $permission = Permission::find($permission_id);
        if (!$permission) {
            return redirect()->back()->with('error', __('backend.permission-not-found'));
        }

        $userIds = request('users') ?? [];

        DB::transaction(function () use ($userIds, $permission_id) {
            // Récupérez tous les utilisateurs ayant déjà cette permission
            $usersWithPermission = User::whereHas('permissions', function ($query) use ($permission_id) {
                $query->where('id', $permission_id);
            })->pluck('id')->toArray();

            // Révoquez la permission pour les utilisateurs qui ne sont pas dans la liste sélectionnée
            $usersToRevoke = array_diff($usersWithPermission, $userIds);
            User::whereIn('id', $usersToRevoke)->each(function (User $user) use ($permission_id) {
                $user->revokePermissionTo($permission_id);
            });

            // Assignez la permission aux utilisateurs sélectionnés
            User::whereIn('id', $userIds)->each(function (User $user) use ($permission_id) {
                $user->givePermissionTo($permission_id);
            });
        });

        return redirect()->back()->with('success', __('backend.permission-updated'));
    }

    function permissionToRole(int $permission_id, PermissionToProfilRequest $request)
    {
        if (!AuthHelper::can('permission.to.role')) return redirect()->back()->withErrors(__('backend.not-access'));
        $permission = Permission::find($permission_id);
        if (!$permission) {
            return redirect()->back()->with('error', __('backend.permission-not-found'));
        }

        $roleIds = request('roles') ?? [];

        DB::transaction(function () use ($roleIds, $permission_id) {
            // Récupérer tous les roles ayant déjà cette permission
            $rolesWithPermission = Role::whereHas('permissions', function ($query) use ($permission_id) {
                $query->where('id', $permission_id);
            })->pluck('id')->toArray();

            // Révoquer la permission pour les roles qui ne sont pas dans la liste sélectionnée
            $rolesToRevoke = array_diff($rolesWithPermission, $roleIds);
            Role::whereIn('id', $rolesToRevoke)->each(function (Role $role) use ($permission_id) {
                $role->revokePermissionTo($permission_id);
            });

            // Assigner la permission aux roles sélectionnés
            Role::whereIn('id', $roleIds)->each(function (Role $role) use ($permission_id) {
                $role->givePermissionTo($permission_id);
            });
        });

        return redirect()->back()->with('success', __('backend.permission-to-role'));
    }
}
