<?php

namespace App\Http\Controllers\web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

// class StaticPagesController extends Controller
// {
//     // Fichier d'appel des différentes pages du site web
//     public function loadPage($page)
// {

//   switch($page) {

//     case 'home':
//       return view('web.pages.home.home');

//     public function tutoriel()
//     {
//         return view('web.pages.tutoriel.tutoriel');
//     }

//     case 'services-details':
//       return view('web.pages.services.service-details');

//     case 'portfolio-details':
//       return view('web.pages.portfolio.portfolio-details');

//     public function about()
//     {
//         return view('web.pages.home.about');
//     }

//     case 'conditions':
//       return view('web.pages.home.conditions');

//     case '404';
//         return view('web.pages.errors.404');
//     }
// }
// }

class StaticPagesController extends Controller
{
    // Fichier d'appel des différentes pages du site web
    public function loadPage($page)
    {
        switch($page) {
            case 'home':
                return view('web.pages.home.home');

            case 'services-details':
                return view('web.pages.services.service-details');

            case 'portfolio-details':
                return view('web.pages.portfolio.portfolio-details');

            case 'conditions':
                return view('web.pages.home.conditions');

            case '404':
                return view('web.pages.errors.404');

            default:
                return view('web.pages.errors.404');
        }
    }

    public function tutoriel()
    {
        return view('web.pages.tutoriel.tutoriel');
    }

    public function about()
    {
        return view('web.pages.home.about');
    }
}

