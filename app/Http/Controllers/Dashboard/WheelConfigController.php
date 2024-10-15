<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WheelConfigController extends Controller
{
    /**
     * Display the wheel.
     *
     * @return \Illuminate\View\View
     */
    function index() {
        return view('dashboard.pages.wheel-configs.index');
    }
}
