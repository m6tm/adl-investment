<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Country;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\View\View;
use Illuminate\Validation\Rules\Password;
use App\Enums\USER_VERIFICATION_STATUS;
use App\Http\Requests\RegistrationRequest;
use App\Models\Addresse;
use App\Models\Telephone;

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
    public function store(RegistrationRequest $request): RedirectResponse
    {
        $country = Country::where('dial_code', request()->country)->first();
        $user = User::create([
            'name' => request()->name,
            'first_name' => request()->first_name,
            'email' => request()->email,
            'birth_date' => request()->birth_date,
            'pseudo' => request()->pseudo,
            'password' => Hash::make(request()->password),
            'verification_status' => USER_VERIFICATION_STATUS::PENDING,
            'country_id' => $country->id,
        ]);

        $telephone = Telephone::create([
            'telephone' => request()->phone,
            'code' => $country->dial_code,
            'user_id' => $user->id,
        ]);

        $address = Addresse::create([
            'city' => request()->city,
            'street' => request()->neighborhood,
            'user_id' => $user->id,
        ]);

        event(new Registered($user));

        Auth::login($user, true);

        return redirect(RouteServiceProvider::HOME);
    }
}
