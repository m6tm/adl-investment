<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

/*route d'appel du fichier de configuration de l'application */
Route::get('/', function () {
    return view('layout.app');
});

Route::get('/home', function () {
    return view('pages.home.home');
});

Route::get('/', function () {
    return view('pages.home.home');
});


// Route vers les fichiers du site
Route::get('/blog', function () {
    return view('pages.blog.blog');
});

Route::get('/blog-details', function () {
    return view('pages.blog.blog-details');
});

Route::get('/service-details', function () {
    return view('pages.service-details');
});

Route::get('/portfolio-details', function () {
    return view('pages.portfolio-details');
});