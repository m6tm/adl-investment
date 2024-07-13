<?php

use App\Http\Controllers\HomeController;
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
})->name('welcome');

Route::get('/home', function () {
    return view('pages.home.home');
});

Route::get('/', function () {
    return view('pages.home.home');
});

Route::middleware(['auth.dashboard'])->group(function () {
});

<<<<<<< HEAD
// Route vers les fichiers du site

Route::get('/service-details', function () {
    return view('pages.service-details');
});
=======
>>>>>>> e7f35cc91329ac1cefc7a097c89de7748f0d9a0e
