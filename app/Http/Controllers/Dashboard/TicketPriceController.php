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
     * Display a listing of the ticket.
     *
     * @return \Illuminate\View\View
     */
    function create() {        
        $countries = Country::all();
        
        return view('dashboard.pages.ticket-prices.create', compact('countries'));
    }

    /**
     * Store a new ticket.
     *
     * @return \Illuminate\View\View
     */
    function store(Request $request) {        
        $request->validate([
            'libelle' => 'required|string|max:255',
            'prix' => 'required|numeric',
            'devise' => 'required|string|max:10',
            'is_promotion' => 'required|boolean',
            'country_id' => 'required|exists:countries,id',
        ]);

        TicketPrice::create([
            'libelle' => $request->libelle,
            'prix' => $request->prix,
            'devise' => $request->devise,
            'is_promotion' => $request->is_promotion,
            'country_id' => $request->country_id,
        ]);

        return redirect()->route('dashboard.ticket-prices')->with('success', 'Ticket price created successfully!');
    }

    /**
     * Show a ticket.
     *
     * @return \Illuminate\View\View
     */
    public function edit($id)
    {
        $ticket = TicketPrice::findOrFail($id);
        $countries = Country::all();
        
        return view('dashboard.pages.ticket-prices.edit', compact('ticket', 'countries'));
    }

    /**
     * Update a ticket.
     *
     * @return \Illuminate\View\View
     */
    function update(Request $request, $id)
    {
        $ticket = TicketPrice::findOrFail($id);

        $validatedData = $request->validate([
            'libelle' => 'required|string|max:255',
            'prix' => 'required|numeric',
            'devise' => 'required|string|max:10',
            'is_promotion' => 'required|boolean',
            'country_id' => 'required|exists:countries,id',
        ]);

        $ticket->update($validatedData);

        return redirect()->route('dashboard.ticket-prices')->with('success', 'Ticket updated successfully.');
    }

}
