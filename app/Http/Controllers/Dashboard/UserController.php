<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\USER_ROLE;
use App\Enums\USER_VERIFICATION_STATUS;
use App\Helpers\AuthHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\EditUserRequest;
use App\Jobs\SendCreateUserEmail;
use App\Models\Addresse;
use App\Models\Country;
use App\Models\Telephone;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the user list.
     *
     * @return \Illuminate\View\View
     */
    function index()
    {
        if (!AuthHelper::can('show.user')) return redirect()->back()->withErrors(__('backend.not-access'));
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
        if (!AuthHelper::can('create.user')) return redirect()->back()->withErrors(__('backend.not-access'));
        $countries = Country::all();
        return view('dashboard.pages.users.create', compact('countries'));
    }

    function createPost(CreateUserRequest $request)
    {
        if (!AuthHelper::can('create.user')) return redirect()->back()->withErrors(__('backend.not-access'));
        $country = Country::where('name', request('pays'))->first();

        /**
         * @var User $user
         */
        $user = User::create([
            'name' => request()->nom,
            'first_name' => request()->prenom,
            'email' => request()->email,
            'birth_date' => date('Y-m-d', strtotime(request()->birth_date)),
            'pseudo' => request()->pseudo ?? fake()->userName,
            'password' => Hash::make('password_default'),
            'verification_status' => USER_VERIFICATION_STATUS::VERIFIED,
            'country_id' => $country->id,
        ]);

        Telephone::create([
            'telephone' => request()->telephone,
            'code' => $country->dial_code,
            'user_id' => $user->id,
        ]);

        Addresse::create([
            'city' => request()->ville,
            'street' => '',
            'user_id' => $user->id,
        ]);

        $user->assignRole(USER_ROLE::ADMIN);

        SendCreateUserEmail::dispatch($user);
        return redirect()->route('dashboard.user.list')->with('success', __('backend.success'));
    }

    /**
     * Display a listing of the user list.
     *
     * @return \Illuminate\View\View
     */
    function edit(string $user_id)
    {
        if (!AuthHelper::can('edit.user')) return redirect()->back()->withErrors(__('backend.not-access'));
        $countries = Country::all();
        $user = User::find($user_id);
        return view('dashboard.pages.users.edit', compact('user', 'countries'));
    }

    function editPost(int $user_id, EditUserRequest $request)
    {
        if (!AuthHelper::can('edit.user')) return redirect()->back()->withErrors(__('backend.not-access'));
        /**
         * @var User $user
         */
        $user = User::find($user_id);
        if (!$user) return redirect()->back()->with('error', __('users.requests.not_user'));

        if (request('reset') == 'on') {
            $user->password = Hash::make('password_default');
        }
        $user->update();

        return redirect()->route('dashboard.user.list')->with('success', __('backend.success'));
    }

    function destroy(int $user_id)
    {
        if (!AuthHelper::can('delete.user')) return redirect()->back()->withErrors(__('backend.not-access'));
        $user = User::find($user_id);
        if (!$user) return redirect()->back()->with('error', __('users.requests.not_user'));
        $user->delete();
        return redirect()->route('dashboard.user.list')->with('success', __('backend.success'));
    }
}
