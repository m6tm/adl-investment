<?php

namespace App\Http\Controllers\Dashboard;

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
    function pay() {
        return view('dashboard.pages.tickets.payment');
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
