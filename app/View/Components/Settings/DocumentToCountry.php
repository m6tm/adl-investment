<?php

namespace App\View\Components\Settings;

use App\Models\Country;
use App\Models\DocumentAutorise;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class DocumentToCountry extends Component
{
    public $document_autorises;
    public $countries;
    /**
     * Create a new component instance.
     */
    public function __construct()
    {
        $this->document_autorises = DocumentAutorise::all();
        $this->countries = Country::all();
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.settings.document-to-country');
    }
}
