<?php

namespace App\Http\Controllers;

use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    function index() {
        $permissions = Permission::all();
        return view('dashboard.pages.permissions.index', compact('permissions'));
    }

    function create() {
        return view('dashboard.pages.permissions.create');
    }
}
