<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\web\StaticPagesController;


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

// Appel des pages web
Route::get('/{page}', [StaticPagesController::class, 'loadPage'])->name('load.page');



Route::get('/', function () {
    return view('web.layout.app');
})->name('welcome');

Route::get('/', function () {
    return view('web.pages.home.home');
})->name('home');

Route::middleware(['auth.dashboard'])->group(function () {
});


Route::get('/contact', [ContactController::class, 'create'])->name('contact.create');
Route::post('/contact', [ContactController::class, 'store'])->name('Contact.store');
