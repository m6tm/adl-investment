<?php

namespace App\View\Components;

use App\Enums\DOCUMENT_STATUS;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class AccountVerificationStepper extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(public string $document, public string|null $status = null)
    {
        if (!is_null($status) && !in_array($status, DOCUMENT_STATUS::getValues())) {
            throw new \InvalidArgumentException('Invalid status: ' . $status . ". Expected one of: " . implode(', ', DOCUMENT_STATUS::getValues()));
        }
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        $DOCUMENT_STATUS = DOCUMENT_STATUS::class;
        return view('components.account-verification-stepper', compact('DOCUMENT_STATUS'));
    }
}
