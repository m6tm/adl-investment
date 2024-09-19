<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tirage;
use App\Models\Gain;

class HistoryController extends Controller
{
    /**
     * Display a listing of the drawing.
     *
     * @return \Illuminate\View\View
     */
    function index() {
        $histories = Tirage::all();
        
        return view('dashboard.pages.histories.index', compact('histories'));
    }

    /**
     * Show a drawing.
     *
     * @return \Illuminate\View\View
     */
    function show() {
        $gains = Gain::with('user')->get();
        
        return view('dashboard.pages.histories.show', compact('gains'));
    }
}
