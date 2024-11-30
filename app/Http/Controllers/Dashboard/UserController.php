<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\USER_ROLE;
use App\Helpers\AuthHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the user list.
     *
     * @return \Illuminate\View\View
     */
    function index()
    {
        if (!AuthHelper::can('show.user')) return redirect()->back()->withErrors(__('dashboard/backend.not-access'));
        $users = User::where('id', '!=', auth()->user()->id)->get();
        if (AuthHelper::hasRole(USER_ROLE::ADMIN)) $users = $users->filter(fn(User $user) => $user->hasRole(USER_ROLE::PLAYER));
        return view('dashboard.pages.users.index', compact('users'));
    }

    /**
     * Display a listing of the user list.
     *
     * @return \Illuminate\View\View
     */
    function create()
    {
        if (!AuthHelper::can('create.user')) return redirect()->back()->withErrors(__('dashboard/backend.not-access'));
        $countries = json_decode(Storage::disk('local')->get('data/CountryCodes.json'), true);
        return view('dashboard.pages.users.create', compact('countries'));
    }

    function createPost(CreateUserRequest $request)
    {
        if (!AuthHelper::can('create.user')) return redirect()->back()->withErrors(__('dashboard/backend.not-access'));
    }

    /**
     * Display a listing of the user list.
     *
     * @return \Illuminate\View\View
     */
    function edit(string $user_id)
    {
        if (!AuthHelper::can('edit.user')) return redirect()->back()->withErrors(__('dashboard/backend.not-access'));
        $user = User::find($user_id);
        return view('dashboard.pages.users.edit', compact('user'));
    }
}
