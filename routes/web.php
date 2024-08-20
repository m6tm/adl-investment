<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\web\StaticPagesController;
use App\Http\Controllers\auth\AuthenticatedSessionController;
use App\Http\Controllers\auth\RegisteredUserController;
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

// Appel des pages web

/* Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
}); */

/* Route::get('/', function () {
    return view('welcome');
})->name('home'); */

Route::middleware(['language'])->group(function() {
    Route::get('/', function () {
        return view('welcome');
    });
    Route::get('{lang}', function () {
        return view('welcome');
    })->name('home');
    
    /* Route::get('', [HomeController::class, 'index']);
    Route::get('{lang}', [HomeController::class, 'index'])->name('home'); */

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
    
    Route::get('{lang}/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::get('{lang}/register', [RegisteredUserController::class, 'create'])->name('register');
    
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->middleware(['auth', 'verified']);

    /* Route::prefix('dashboard')->group(function() {
        Route::get('{lang}/users', [UserController::class, 'index'])->name('user.list');
        Route::get('{lang}/users/create', [UserController::class, 'create'])->name('user.create');
        Route::get('{lang}/users/edit-{user_id}', [UserController::class, 'edit'])->name('user.edit')->whereAlpha('user_id');
        // Notifications
        Route::get('{lang}/notifications', [NotificationController::class, 'index'])->name('notifications');
    }); */
});
require __DIR__.'/auth.php';
