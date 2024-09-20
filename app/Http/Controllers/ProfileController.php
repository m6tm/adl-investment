<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Telephone;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\View\View;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(): View
    {
        return view('dashboard.pages.profile.index');
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        if (request('current_password') && !Hash::check(request('current_password'), auth()->user()->password))
            return redirect()->back()->with('error', __('users.password_not_same'));
        
        $telephone = Telephone::where('telephone', request('telephone'))->first();
        if ($telephone && $telephone->user_id !== auth()->id())
            return redirect()->back()->with('error', __('users.number_used'));

        /**
         * @var User $user
         */
        $user = auth()->user();
        $user->name = request('nom');
        $user->first_name = request('prenom');
        if (request('current_password')) $user->password = Hash::make(request('new_password'));
        $user->update();

        $telephone = Telephone::find($user->phones()->first()->id);
        $telephone->code = $user->pays->code;
        $telephone->telephone = request('telephone');
        $telephone->update();
        
        return redirect()->back()->with('success', __('settings.message_success'));
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validateWithBag('userDeletion', [
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->back()->with('status', __('dashboard/backend.user-destroyed'));
    }
}
