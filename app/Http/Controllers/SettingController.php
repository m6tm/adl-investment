<?php

namespace App\Http\Controllers;

use App\Enums\USER_ROLE;
use App\Helpers\AuthHelper;
use App\Http\Requests\AssignDocumentToCountryRequest;
use App\Http\Requests\SetCountryRequest;
use App\Models\Country;
use App\Models\PaysDocumentAutorise;
use App\Models\TicketPrice;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    function index()
    {
        if (AuthHelper::hasRole(USER_ROLE::PLAYER)) redirect()->back()->with("error", __('backend.not-access'));
        return view('dashboard.pages.settings.index');
    }

    function addCountry(SetCountryRequest $request)
    {
        if (!AuthHelper::can('toggle.countries')) redirect()->back()->with("error", __('backend.not-access'));
        $data_countries = Storage::disk('data')->get('CountryCodes.json');
        $data_countries = json_decode($data_countries, true);
        $data_country = array_filter($data_countries, fn($country) => $country['dial_code'] == request('dial_code'));

        $devises = Storage::disk('data')->get('Currencies.json');
        $devises = json_decode($devises, true);
        $devises = array_map(fn($devise) => [
            'code' => $devise['code'],
            'name' => $devise['name'],
        ], array_values($devises));
        $devise = array_filter($devises, fn($devise) => $devise['code'] == request('devise'));
        $devise = array_values($devise);

        if (empty($data_country) || empty($devise)) return redirect()->back()->with("error", __('settings.pays_autorise.message_error_1'));
        $devise = array_values($devise)[0];
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
            // dd($request->input());
            $country = Country::create([
                "name" => $data_country['name'],
                "code" => $data_country['code'],
                "dial_code" => $data_country['dial_code'],
            ]);
            $country->refresh();

            TicketPrice::insert([
                [
                    'libelle' => '$1',
                    'prix' => $request->ticket_1,
                    'devise' => $devise['code'],
                    'is_promotion' => false,
                    'country_id' => $country->id,
                    'updated_at' => now(),
                    'created_at' => now(),
                ],
                [
                    'libelle' => '$2',
                    'prix' => $request->ticket_2,
                    'devise' => $devise['code'],
                    'is_promotion' => false,
                    'country_id' => $country->id,
                    'updated_at' => now(),
                    'created_at' => now(),
                ],
                [
                    'libelle' => '$5',
                    'prix' => $request->ticket_5,
                    'devise' => $devise['code'],
                    'is_promotion' => false,
                    'country_id' => $country->id,
                    'updated_at' => now(),
                    'created_at' => now(),
                ],
                [
                    'libelle' => '$10',
                    'prix' => $request->ticket_10,
                    'devise' => $devise['code'],
                    'is_promotion' => false,
                    'country_id' => $country->id,
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            ]);
        }

        return redirect()->back()->with("success", __('settings.message_success'));
    }

    function removeCountry(int $country_id)
    {
        if (!AuthHelper::can('toggle.countries')) redirect()->back()->with("error", __('backend.not-access'));
        $country = Country::find($country_id);
        if (!$country) return redirect()->back()->with('error', __('settings.pays_autorise.message_error_2'));
        $country->users->each(fn(User $user) => $user->delete());
        $country->delete();
        return redirect()->back()->with('success', __('settings.message_success'));
    }

    function assignDocument(AssignDocumentToCountryRequest $request)
    {
        if (!AuthHelper::can('assign.document.to.country')) redirect()->back()->with("error", __('backend.not-access'));
        /**
         * @var Country $country
         */
        $country = Country::find(request('country_id'));
        $documentIds = request('documents') ?? [];

        $country->documents_autorises->each(fn(PaysDocumentAutorise $document) => $document->delete());
        foreach ($documentIds as $id) {
            PaysDocumentAutorise::create([
                "country_id" => $country->id,
                "document_autorise_id" => $id,
            ]);
        }

        return redirect()->back()->with('success', __('settings.message_success'));
    }
}
