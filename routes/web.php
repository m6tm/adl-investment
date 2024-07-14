<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\SigninController;
use App\Http\Controllers\SignUpController;
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

/*route d'appel du fichier de configuration de l'application */
Route::get('/', function () {
    return view('layout.app');
})->name('welcome');

Route::get('/home', function () {
    return view('pages.home.home');
});

// Route::get('/', function () {
//     return view('pages.home.home');
// });

Route::get('/signin', [SigninController::class, 'index'])->name('signin');
Route::get('/signup', [SignUpController::class, 'index'])->name('signup');

Route::middleware(['auth.dashboard'])->group(function () {
});

