<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TicketPrice;
use App\Models\Country;

class TicketPriceController extends Controller
{
    /**
     * Display a listing of the ticket.
     *
     * @return \Illuminate\View\View
     */
    function index() {
        $prices = TicketPrice::with('country')->get();
        
        return view('dashboard.pages.ticket-prices.index', compact('prices'));
    }

    /**
     * Edit a ticket.
     *
     * @return \Illuminate\View\View
     */
    function edit() {
        $countries = Country::all();
        
        return view('dashboard.pages.ticket-prices.edit', compact('countries'));
    }
}
