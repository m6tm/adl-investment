<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /**
     * Display a listing of the ticket.
     *
     * @return \Illuminate\View\View
     */
    function index() {
        return view('dashboard.pages.tickets.index');
    }

    /**
     * Create a ticket.
     *
     * @return \Illuminate\View\View
     */
    function create() {
        return view('dashboard.pages.tickets.create');
    }

    /**
     * Pay a ticket.
     *
     * @return \Illuminate\View\View
     */
    function pay1() {
        return view('dashboard.pages.tickets.payment1');
    }
    function pay2() {
        $user = Auth::user();
        
        return view('dashboard.pages.tickets.payment2', ['user' => $user]);
    }
    function pay3() {
        return view('dashboard.pages.tickets.payment3');
    }

    /**
     * Display a listing of the ticket.
     *
     * @return \Illuminate\View\View
     */
    function edit(string $user_id) {
        // return view('dashboard.pages.users.edit');
    }
}
