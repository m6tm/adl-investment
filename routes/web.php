<?php

use App\Enums\APP_LANGUAGE;
use App\Http\Controllers\SigninController;
use App\Http\Controllers\SignUpController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Dashboard\NotificationController;
use App\Http\Controllers\Dashboard\UserController;
use App\Http\Controllers\HomeController;
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

Route::middleware(['language'])->group(function() {
    Route::get('{lang}/tutoriel', [StaticPagesController::class, 'tutoriel'])->name('tutoriel');
    Route::get('{lang}/tutoriel-details', [StaticPagesController::class, 'tutorielDetails'])->name('tutoriel-details');
    Route::get('{lang}/services-details', [StaticPagesController::class, 'servicesDetails'])->name('services-details');
    Route::get('{lang}/portfolio-details', [StaticPagesController::class, 'portfolioDetails'])->name('portfolio-details');
    Route::get('{lang}/about', [StaticPagesController::class, 'about'])->name('about');
    Route::get('{lang}/team', [StaticPagesController::class, 'team'])->name('team');
    Route::get('{lang}/privacy', [StaticPagesController::class, 'privacy'])->name('privacy');
    Route::get('{lang}/conditions', [StaticPagesController::class, 'conditions'])->name('conditions');
    Route::get('{lang}/privacy', [StaticPagesController::class, 'privacy'])->name('privacy');
    Route::get('{lang}/contact', [ContactController::class, 'create'])->name('contact.create');
    Route::post('contact', [ContactController::class, 'store'])->name('Contact.store');
    
    Route::get('', [HomeController::class, 'index']);
    Route::get('{lang}', [HomeController::class, 'index'])->name('home');
    
    Route::get('{lang}/signin', [SigninController::class, 'index'])->name('signin');
    Route::get('{lang}/signup', [SignUpController::class, 'index'])->name('signup');
    
    Route::prefix('dashboard')->group(function() {
        Route::get('{lang}/users', [UserController::class, 'index'])->name('user.list');
        Route::get('{lang}/users/create', [UserController::class, 'create'])->name('user.create');
        Route::get('{lang}/users/edit-{user_id}', [UserController::class, 'edit'])->name('user.edit')->whereAlpha('user_id');
        // Notifications
        Route::get('{lang}/notifications', [NotificationController::class, 'index'])->name('notifications');
    });
});
// Route::middleware(['auth.dashboard'])->group(function () {
// })->prefix('dashboard');
