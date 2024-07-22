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

    public function team()
    {
        return view('web.pages.home.team');
    }

    public function privacy()
    {
        return view('web.pages.home.privacy');
    }

}

// class StaticPagesController extends Controller
// {
//     // Fichier d'appel des différentes pages du site web
//     public function loadPage($page)
// {
//     public function tutoriel()
//     {
//         return view('web.pages.tutoriel.tutoriel');
//     }

//     public function about()
//     {
//         return view('web.pages.home.about');
//     }


//   switch($page) {

//     case 'home':
//       return view('web.pages.home.home');

//     case 'services-details';
//       return view('web.pages.services.service-details');

//     case 'portfolio-details';
//       return view('web.pages.portfolio.portfolio-details');

//     case 'conditions';
//       return view('web.pages.home.conditions');

//     case '404';
//         return view('web.pages.errors.404');

//     case 'team';
//         return view('web.pages.home.team');
//     break;

//     case 'privacy';
//         return view('web.pages.home.privacy');
//     }

// }
// }

// class StaticPagesController extends Controller
// {
//     // Fichier d'appel des différentes pages du site web
//     public function loadPage($page)
//     {
//         switch($page) {
//             case 'home':
//                 return view('web.pages.home.home');

//             case 'services-details':
//                 return view('web.pages.services.service-details');

//             case 'portfolio-details':
//                 return view('web.pages.portfolio.portfolio-details');

//             case 'conditions':
//                 return view('web.pages.home.conditions');

//                 case 'team':
//                     return view('web.pages.home.team');

//                 case 'privacy':
//                     return view('web.pages.home.privacy');

//             case '404':
//                 return view('web.pages.errors.404');

//             default:
//                 return view('web.pages.errors.404');
//         }
//     }

//     public function tutoriel()
//     {
//         return view('web.pages.tutoriel.tutoriel');
//     }

//     public function about()
//     {
//         return view('web.pages.home.about');
//     }
// }

