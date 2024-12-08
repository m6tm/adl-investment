<?php

namespace App\Http\Controllers;

use App\Models\User;

class MessageController extends Controller
{
    public function index()
    {
        return redirect()->back();
        /**
         * @var User $user
         */
        $user = auth()->user();
        $discussions = $user->discussions->map(function ($discussion) {
            return $discussion->discussion->token;
        })->toArray();

        return view('dashboard.pages.messages.index', compact('user', 'discussions'));
    }
}
