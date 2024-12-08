<?php

namespace App\View\Components\Tables;

use App\Models\Country;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class PricingTable extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(public Country $country)
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        $ticket_prices = $this->country->ticket_prices;
        return view('components.tables.pricing-table');
    }
}
