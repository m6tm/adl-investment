<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\View\View;
use Illuminate\Validation\Rules\Password;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): View
    {
        return view('auth.register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'first_name' => ['required', 'string', 'max:255'],
            'birth_date' => ['required', 'date'],
            'phone' => ['required', 'string', 'max:255', 'unique:'.User::class],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'pseudo' => ['required', 'string', 'max:255', 'unique:'.User::class],
            'city' => ['string', 'max:255'],
            'neighborhood' => ['string', 'max:255'],
            'password' => ['required', 'confirmed', 
                            Password::min(8)
                                ->mixedCase()
                                ->numbers()
                                ->symbols()
            ],
        ]);

        $user = User::create([
            'name' => $request->name,
            'first_name' => $request->first_name,
            'birth_date' => $request->birth_date,
            'phone' => $request->phone,
            'email' => $request->email,
            'pseudo' => $request->pseudo,
            'city' => $request->city,
            'neighborhood' => $request->neighborhood,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
