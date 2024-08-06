<?php

namespace App\View\Components\Ui;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class TableSecondary extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(public array $headers, public array $rows)
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.ui.table-secondary', ['headers' => $this->headers, 'rows' => $this->rows]);
    }
}
