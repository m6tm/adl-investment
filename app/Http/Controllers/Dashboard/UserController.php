<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\USER_ROLE;
use App\Helpers\AuthHelper;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the user list.
     *
     * @return \Illuminate\View\View
     */
    function index() {
        if (!AuthHelper::can('show.user')) return redirect()->back()->withErrors(__('dashboard/backend.not-access'));
        $users = User::where('id', '!=', auth()->user()->id)->get();
        return view('dashboard.pages.users.index', compact('users'));
    }

    /**
     * Display a listing of the user list.
     *
     * @return \Illuminate\View\View
     */
    function create() {
        if (!AuthHelper::can('create.user')) return redirect()->back()->withErrors(__('dashboard/backend.not-access'));
        return view('dashboard.pages.users.create');
    }

    /**
     * Display a listing of the user list.
     *
     * @return \Illuminate\View\View
     */
    function edit(string $user_id) {
        if (!AuthHelper::can('edit.user')) return redirect()->back()->withErrors(__('dashboard/backend.not-access'));
        $user = User::find($user_id);
        return view('dashboard.pages.users.edit', compact('user'));
    }
}
