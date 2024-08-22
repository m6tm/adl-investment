<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class LanguageController extends Controller
{
    function setLocale(string $lang) {
        Session::put('locale', $lang);
        App::setLocale($lang);
        return redirect()->route('home');
    }
}
