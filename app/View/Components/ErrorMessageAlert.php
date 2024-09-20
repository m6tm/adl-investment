<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class ErrorMessageAlert extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(public string $class = '')
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        $className =  'bg-rose-100 text-red-700 px-4 py-3 rounded relative mt-4';
        return view('components.error-message-alert', compact('className'));
    }
}
