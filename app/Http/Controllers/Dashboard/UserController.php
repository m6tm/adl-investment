<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the user list.
     *
     * @return \Illuminate\View\View
     */
    function index() {
        return view('dashboard.pages.users.index');
    }

    /**
     * Display a listing of the user list.
     *
     * @return \Illuminate\View\View
     */
    function create() {
        return view('dashboard.pages.users.create');
    }
}
