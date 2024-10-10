<?php

namespace App\View\Components\Account;

use App\Enums\DOCUMENT_STATUS;
use App\Enums\DOCUMENT_TYPE;
use App\Models\User;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class VerificationAdminSide extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(public User $user)
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        $DOCUMENT_TYPE = DOCUMENT_TYPE::class;
        $DOCUMENT_STATUS = DOCUMENT_STATUS::class;
        return view('components.account.verification-admin-side', compact('DOCUMENT_TYPE', 'DOCUMENT_STATUS'));
    }
}