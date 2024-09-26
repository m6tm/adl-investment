<?php

namespace App\Http\Controllers;

use App\Models\User;

class MessageController extends Controller
{
    public function index()
    {
        /**
         * @var User $user
         */
        $user = auth()->user();
        $user->load(
            'discussions',
            'discussions.discussion',
            'discussions.discussion.owners',
            'discussions.discussion.messages',
        );
        dd($user);
        return view('dashboard.pages.messages.index');
    }
}
