<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Address;
use App\Models\Country;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\View\View;
use Illuminate\Validation\Rules\Password;
use App\Enums\USER_VERIFICATION_STATUS;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): View
    {
        $countries = Country::all();
        
        return view('auth.register', compact('countries'));
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
            'phone' => ['required', 'string', 'max:255', 'unique:'.Address::class],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'pseudo' => ['required', 'string', 'max:255', 'unique:'.User::class],
            'city' => ['string', 'max:255'],
            'neighborhood' => ['string', 'max:255'],
            'country_id' => ['required', 'exists:countries,id'],
            'password' => [
                'required', 
                'confirmed', 
                Password::min(8)
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
            ],
        ]);

        $user = User::create([
            'name' => $request->name,
            'first_name' => $request->first_name,
            'email' => $request->email,
            'birth_date' => $request->birth_date,
            'pseudo' => $request->pseudo,
            'password' => Hash::make($request->password),
            'verification_status' => USER_VERIFICATION_STATUS::PENDING,
            'country_id' => $request->country_id,
        ]);

        $address = Address::create([
            'phone' => $request->phone,
            'city' => $request->city,
            'neighborhood' => $request->neighborhood,
            'user_id' => $user->id,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
