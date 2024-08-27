<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PermissionController extends Controller
{
    function index() {
        return view('dashboard.pages.permissions.index');
    }
}
