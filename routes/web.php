<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\web\StaticPagesController;
use App\Http\Controllers\auth\AuthenticatedSessionController;
use App\Http\Controllers\auth\RegisteredUserController;
use App\Http\Controllers\Dashboard\NotificationController;
use App\Http\Controllers\Dashboard\UserController;
use App\Http\Controllers\LanguageController;
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

Route::get('locale/{lang}', [LanguageController::class, 'setLocale'])->name('set.locale');
Route::get('', function () {
    return view('welcome');
})->name('home');

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
Route::post('contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
Route::get('register', [RegisteredUserController::class, 'create'])->name('register');

Route::prefix('dashboard')->group(function() {
    Route::get('', function () {
        return view('dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::get('users', [UserController::class, 'index'])->name('dashboard.user.list');
    Route::get('users/create', [UserController::class, 'create'])->name('dashboard.user.create');
    Route::get('users/edit-{user_id}', [UserController::class, 'edit'])->name('dashboard.user.edit')->whereAlpha('user_id');
    // Notifications
    Route::get('notifications', [NotificationController::class, 'index'])->name('dashboard.notifications');
});

require __DIR__.'/auth.php';
