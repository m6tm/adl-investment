<?php

namespace App\Http\Controllers\web;

use App\Http\Controllers\Controller;
use App\Models\Country;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StaticPagesController extends Controller
{
    // Fichier d'appel des différentes pages du site web
    public function home()
    {
        $guzzle = new Client();
        $data = null;
        try {
            $response = $guzzle->get('https://api.myip.com');
            $data = json_decode($response->getBody(), true);
        } catch (GuzzleException $error) {
        }
        $defaultCurrencySymbol = '';
        $currencyCode = null;
        $currencySymbol = null;
        $Country = null;

        $defaultCountry = Country::where('code', 'us')->first();

        if ($data) {
            $country = Country::where('code', $data['cc'])->first();
            if ($Country) $currencyCode = $Country->code;
        }

        if ($data && !empty($currencyCode)) {
            $country = array_filter(
                json_decode(Storage::disk('data')->get('Countries.json'), true),
                fn($currency) => strtolower($currency['cca2']) == strtolower($currencyCode)
            );
            if (count($country) > 0) {
                $country_currencies = array_values($country)[0]['currencies'];
                $currencySymbol = array_values($country_currencies)[0]['symbol'];
            }
        }

        return view('welcome', compact('defaultCurrencySymbol', 'currencySymbol', 'currencyCode', 'Country', 'defaultCountry'));
    }

    public function tutoriel()
    {
        return view('web.pages.tutoriel.tutoriel');
    }

    public function tutorielDetails()
    {
        return view('web.pages.tutoriel.tutoriel-details');
    }

    public function servicesDetails()
    {
        return view('web.pages.services.service-details');
    }

    public function portfolioDetails()
    {
        return view('web.pages.portfolio.portfolio-details');
    }

    public function about()
    {
        return view('web.pages.home.about');
    }

    public function conditions()
    {
        return view('web.pages.home.conditions');
    }

    public function privacy()
    {
        return view('web.pages.home.privacy');
    }

    public function notFound()
    {
        return view('web.pages.errors.404');
    }
    public function team()
    {
        return view('web.pages.home.team');
    }
}
