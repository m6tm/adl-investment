<?php

namespace App\View\Components\Tables;

use App\Enums\USER_VERIFICATION_STATUS;
use App\Models\User;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\View\Component;

class VerificationAccountRequestsTable extends Component
{
    public Collection $users;
    /**
     * Create a new component instance.
     */
    public function __construct()
    {
        $this->users = User::where('verification_status', '!=', USER_VERIFICATION_STATUS::VERIFIED)
            ->get()
            ->filter(fn(User $user) => $user->documents->count() > 0);
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        $USER_VERIFICATION_STATUS = USER_VERIFICATION_STATUS::class;
        return view('components.tables.verification-account-requests-table', compact('USER_VERIFICATION_STATUS'));
    }
}
