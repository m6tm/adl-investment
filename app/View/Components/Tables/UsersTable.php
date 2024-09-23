<?php

namespace App\View\Components\Tables;

use App\Enums\USER_ROLE;
use App\Enums\USER_VERIFICATION_STATUS;
use App\Helpers\AuthHelper;
use App\Models\User;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Collection;
use Illuminate\View\Component;

class UsersTable extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(public Collection $users)
    {
        if (AuthHelper::hasRole(USER_ROLE::ADMIN)) {
            $this->users = $this->users->filter(function(User $user) {
                if ($user->hasAnyRole(USER_ROLE::PLAYER)) return $user;
            });
        }
        if (AuthHelper::hasRole(USER_ROLE::SUPER_ADMIN)) {
            $this->users = $this->users->filter(function(User $user) {
                if ($user->hasAnyRole([USER_ROLE::PLAYER, USER_ROLE::ADMIN])) return $user;
            });
        }
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        $USER_VERIFICATION_STATUS = USER_VERIFICATION_STATUS::class;
        $USER_ROLE = USER_ROLE::class;
        return view('components.tables.users-table', compact('USER_VERIFICATION_STATUS', 'USER_ROLE'));
    }
}
