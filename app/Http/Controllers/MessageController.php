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
        // $user->load(
        //     'discussions',
        //     'discussions.discussion',
        //     'discussions.discussion.owners',
        //     'discussions.discussion.messages',
        //     'discussions.discussion.messages.users',
        //     'discussions.discussion.messages.users.user',
        // );
        $discussions = $user->discussions->map(function ($discussion) {
            return $discussion->discussion->token;
        })->toArray();

        return view('dashboard.pages.messages.index', compact('user', 'discussions'));
    }
}
