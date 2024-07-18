<?php

namespace App\Http\Controllers\web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StaticPagesController extends Controller
{
    // Fichier d'appel des différentes pages du site web
    public function home()
    {
        return view('web.pages.home.home');
    }

    public function tutoriel()
    {
        return view('web.pages.tutoriel.tutoriel');
    }

    public function tutorielDetails()
    {
        return view('web.pages.tutoriel.tutoriel-details');
    }

    public function servicesDetails()
    {
        return view('web.pages.services.service-details');
    }

    public function portfolioDetails()
    {
        return view('web.pages.portfolio.portfolio-details');
    }

    public function about()
    {
        return view('web.pages.home.about');
    }

    public function conditions()
    {
        return view('web.pages.home.conditions');
    }

    public function notFound()
    {
        return view('web.pages.errors.404');
    }
}
