<?php

namespace App\Http\Controllers;

use App\Helpers\AuthHelper;
use App\Http\Requests\RoleToUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    function index() {
        if (!AuthHelper::can('roles')) return redirect()->back()->withErrors('You are not authorized to perform this action');
        $roles = Role::all();
        return view('dashboard.pages.roles.index', compact('roles'));
    }

    function roleToUser(int $role_id, RoleToUserRequest $request) {
        if (!AuthHelper::can('role.to.user')) redirect()->back()->withErrors('You are not authorized to perform this action');
        $role = Role::find($role_id);
        if (!$role) {
            return redirect()->back()->with('error', 'Role not found');
        }

        $userIds = request('users') ?? [];
        
        DB::transaction(function() use ($userIds, $role_id) {
            // Récupérez tous les utilisateurs ayant déjà cette role
            $usersWithRole = User::whereHas('roles', function($query) use ($role_id) {
                $query->where('id', $role_id);
            })->pluck('id')->toArray();
            
            // Révoquez la role pour les utilisateurs qui ne sont pas dans la liste sélectionnée
            $usersToRevoke = array_diff($usersWithRole, $userIds);
            User::whereIn('id', $usersToRevoke)->each(function (User $user) use ($role_id) {
                $user->removeRole($role_id);
            });

            // Assignez la role aux utilisateurs sélectionnés
            User::whereIn('id', $userIds)->each(function (User $user) use ($role_id) {
                $user->assignRole($role_id);
            });
        });

        return redirect()->back()->with('success', 'Roles updated successfully');
    }
}
