<?php

namespace App\View\Components\Settings;

use App\Models\Country;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Storage;
use Illuminate\View\Component;

class AuthorizedCountries extends Component
{
    public $data_countries;
    public $countries;
    public $devises;
    /**
     * Create a new component instance.
     */
    public function __construct()
    {
        $data_countries = Storage::disk('data')->get('CountryCodes.json');
        $data_countries = json_decode($data_countries, true);
        $countries = Country::all();
        $this->countries = $countries;
        $countries_code = $countries->map(fn(Country $country) => $country->code)->toArray();
        $data_countries = array_filter($data_countries, fn($country) => !in_array($country['code'], $countries_code));
        $this->data_countries = $data_countries;
        $devises = Storage::disk('data')->get('Currencies.json');
        $devises = json_decode($devises, true);
        $devises = array_map(fn($devise) => [
            'code' => $devise['code'],
            'name' => $devise['name'],
        ], array_values($devises));
        $this->devises = $devises;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.settings.authorized-countries');
    }
}
