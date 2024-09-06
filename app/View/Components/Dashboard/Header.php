<?php

namespace App\View\Components\Dashboard;

use App\Enums\USER_ROLE;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class Header extends Component
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
        return view('components.dashboard.header', compact('USER_ROLE'));
    }
}
