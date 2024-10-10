<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TicketPrice;
use App\Models\Country;
use Illuminate\Support\Facades\Storage;

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
    function edit(int $ticket_id) {
        $ticket = TicketPrice::find($ticket_id);
        if (!$ticket) return redirect()->back()->with('error', 'Ticket not found');
        $currencies = json_decode(Storage::disk('data')->get('Currencies.json'));
        $countries = Country::all();
        
        return view('dashboard.pages.ticket-prices.edit', compact('countries', 'ticket', 'currencies'));
    }
}
