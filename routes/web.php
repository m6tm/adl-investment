<?php

use App\Http\Controllers\SigninController;
use App\Http\Controllers\SignUpController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Dashboard\NotificationController;
use App\Http\Controllers\Dashboard\UserController;
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

/*route d'appel du fichier de configuration de l'application */

// Appel des pages web

Route::get('tutoriel', [StaticPagesController::class, 'tutoriel'])->name('tutoriel');
Route::get('tutoriel-details', [StaticPagesController::class, 'tutorielDetails'])->name('tutoriel-details');
Route::get('services-details', [StaticPagesController::class, 'servicesDetails'])->name('services-details');
Route::get('portfolio-details', [StaticPagesController::class, 'portfolioDetails'])->name('portfolio-details');
Route::get('about', [StaticPagesController::class, 'about'])->name('about');
Route::get('team', [StaticPagesController::class, 'team'])->name('team');
Route::get('privacy', [StaticPagesController::class, 'privacy'])->name('privacy');
Route::get('conditions', [StaticPagesController::class, 'conditions'])->name('conditions');
Route::get('privacy', [StaticPagesController::class, 'privacy'])->name('privacy');
Route::get('contact', [ContactController::class, 'create'])->name('contact.create');
Route::post('contact', [ContactController::class, 'store'])->name('Contact.store');

// Route::get('/', function () {
//     return view('welcome');
// })->name('welcome');

// Route::get('/', function () {
//     return view('welcome');
// })->name('welcome');


Route::get('app', function () {
    return view('web.layout.app');
})->name('welcome');

Route::get('', function () {
    return view('web.pages.home.home');
})->name('home');

Route::get('signin', [SigninController::class, 'index'])->name('signin');
Route::get('signup', [SignUpController::class, 'index'])->name('signup');

Route::prefix('dashboard')->group(function() {
    Route::get('users', [UserController::class, 'index'])->name('user.list');
    Route::get('users/create', [UserController::class, 'create'])->name('user.create');
    Route::get('users/edit-{user_id}', [UserController::class, 'edit'])->name('user.edit')->whereAlpha('user_id');
    // Notifications
    Route::get('notifications', [NotificationController::class, 'index'])->name('notifications');
});
// Route::middleware(['auth.dashboard'])->group(function () {
// })->prefix('dashboard');
