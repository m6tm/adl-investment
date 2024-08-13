<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SigninController extends Controller
{
    function index() {
        return view('auth.signin');
    }
}
