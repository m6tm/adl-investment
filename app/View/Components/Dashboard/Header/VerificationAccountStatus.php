<?php

namespace App\View\Components\Dashboard\Header;

use App\Enums\DOCUMENT_STATUS;
use App\Enums\USER_ROLE;
use App\Enums\USER_VERIFICATION_STATUS;
use App\Helpers\AuthHelper;
use App\Models\Document;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class VerificationAccountStatus extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        $USER_ROLE = USER_ROLE::class;
        extract(AuthHelper::accountVerificationStatus());
        return view('components.dashboard.header.verification-account-status', compact('USER_ROLE', 'account_ready_verified', 'account_pending_verification', 'account_failled_verification', 'account_unverified'));
    }
}
