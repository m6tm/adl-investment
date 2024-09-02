<?php

namespace App\Http\Controllers;

use App\Http\Requests\SetCountryRequest;
use App\Models\Country;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    function index() {
        $data_countries = Storage::disk('data')->get('CountryCodes.json');
        $data_countries = json_decode($data_countries, true);
        $countries = Country::all();
        $countries_code = $countries->map(fn(Country $country) => $country->code)->toArray();
        $data_countries = array_filter($data_countries, fn($country) => !in_array($country['code'], $countries_code));

        return view('dashboard.pages.settings.index', compact("data_countries", "countries"));
    }

    function addCountry(SetCountryRequest $request) {
        $data_countries = Storage::disk('data')->get('CountryCodes.json');
        $data_countries = json_decode($data_countries, true);
        $data_country = array_filter($data_countries, fn($country) => $country['dial_code'] == request('dial_code'));
        if (empty($data_country)) return redirect()->back()->with("error", __('settings.pays_autorise.message_error_1'));
        $data_country = array_values($data_country)[0];

        /**
         * @var Country $country
         */
        $country = Country::withTrashed()->with('users')->where('dial_code', request('dial_code'))->first();
        if ($country) {
            $country->restore();
            $users = User::withTrashed()->where('country_id', $country->id)->get();
            $users->each(fn(User $user) => $user->restore());
        } else {
            $country = Country::create([
                "name" => $data_country['name'],
                "code" => $data_country['code'],
                "dial_code" => $data_country['dial_code'],
            ]);
        }
        
        return redirect()->back()->with("success", __('settings.message_success'));
    }

    function removeCountry(int $country_id) {
        $country = Country::find($country_id);
        if (!$country) return redirect()->back()->with('error', __('settings.pays_autorise.message_error_2'));
        $country->users->each(fn(User $user) => $user->delete());
        $country->delete();
        return redirect()->back()->with('success', __('settings.message_success'));
    }
}
