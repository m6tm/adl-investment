<?php

use App\Http\Controllers\AccountVerificationController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\web\StaticPagesController;
use App\Http\Controllers\auth\AuthenticatedSessionController;
use App\Http\Controllers\auth\RegisteredUserController;
use App\Http\Controllers\Dashboard\NotificationController;
use App\Http\Controllers\Dashboard\UserController;
use App\Http\Controllers\Dashboard\TicketController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;

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

// Route::middleware('auth')->group(function () {
//     Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

Route::get('test-email', function () {
    Mail::raw('This is a test email', function ($message) {
        $message->to('your_email@example.com') // Replace with your email
                ->subject('Test Email');
    });
    return 'Test email sent!';
});

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

Route::prefix('dashboard')->middleware(['auth', 'verified'])->group(function() {
    Route::get('', [UserController::class, 'index'])->name('dashboard');
    // Users
    Route::get('users', [UserController::class, 'index'])->name('dashboard.user.list');
    Route::get('users/create', [UserController::class, 'create'])->name('dashboard.user.create');
    Route::get('users/edit/{user_id}', [UserController::class, 'edit'])->name('dashboard.user.edit')->whereNumber('user_id');
    // Profiles
    Route::get('profil', [ProfileController::class, 'edit'])->name('dashboard.profile.edit');
    Route::get('profil/update', [ProfileController::class, 'update'])->name('dashboard.profile.update');
    // Notifications
    Route::get('notifications', [NotificationController::class, 'index'])->name('dashboard.notifications');
    // Account verification
    Route::get('account-verification', [AccountVerificationController::class, 'index'])->name('dashboard.account-verification');
    Route::post('account-verification', [AccountVerificationController::class, 'verificationAccount'])->name('dashboard.account-verification-post');
    Route::get('account-verifications', [AccountVerificationController::class, 'adminVerifications'])->name('dashboard.admin.account-verification');
    Route::get('account-verifications/{player_id}', [AccountVerificationController::class, 'adminVerificationsCheck'])->name('dashboard.admin.account-verification.check')->whereNumber('player_id');
    // Tickets
    Route::get('tickets', [TicketController::class, 'index'])->name('dashboard.tickets');
    Route::get('tickets/create', [TicketController::class, 'create'])->name('dashboard.tickets.create');
    Route::get('tickets/pay', [TicketController::class, 'pay'])->name('dashboard.tickets.pay');
    Route::get('tickets/pay1', [TicketController::class, 'pay1'])->name('dashboard.tickets.pay1');
    Route::get('tickets/pay2', [TicketController::class, 'pay2'])->name('dashboard.tickets.pay2');
    Route::get('tickets/pay3', [TicketController::class, 'pay3'])->name('dashboard.tickets.pay3');
    // Permissions
    Route::get('permissions', [PermissionController::class, 'index'])->name('dashboard.permissions');
    Route::post('permissions/assign-to-user/{permisison_id}', [PermissionController::class, 'permissionToUser'])->name('dashboard.permissions.to.user')->whereNumber('permisison_id');
    Route::post('permissions/assign-to-role/{permisison_id}', [PermissionController::class, 'permissionToRole'])->name('dashboard.permissions.to.role')->whereNumber('permisison_id');
    // Roles
    Route::get('roles', [RoleController::class, 'index'])->name('dashboard.roles');
    Route::post('roles/assign-to-user/{role_id}', [RoleController::class, 'roleToUser'])->name('dashboard.roles.to.user')->whereNumber('role_id');
    // Settings
    Route::get('settings', [SettingController::class, 'index'])->name('dashboard.settings');
    // Settings Countries autorised to use the app
    Route::post('settings/add-country', [SettingController::class, 'addCountry'])->name('dashboard.settings.add-country');
    Route::get('settings/rm-country/{country_id}', [SettingController::class, 'removeCountry'])->name('dashboard.settings.remove-country')->whereNumber('country_id');
    // Settings Countries Assigned a document type
    Route::post('settings/document-assigment', [SettingController::class, 'assignDocument'])->name('dashboard.settings.document-assigment');
});

require __DIR__ . '/auth.php';
