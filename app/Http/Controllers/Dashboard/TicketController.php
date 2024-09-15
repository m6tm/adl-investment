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
     * 1st process to buy a ticket.
     *
     * @return \Illuminate\View\View
     */
    function buy() {
        return view('dashboard.pages.tickets.buy');
    }

    /**
     * Edit a ticket.
     *
     * @return \Illuminate\View\View
     */
    function edit() {
        return view('dashboard.pages.tickets.edit');
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
}
