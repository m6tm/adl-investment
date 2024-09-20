<?php

namespace App\View\Components\Tables;

use App\Models\Country;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;
use Illuminate\Support\Collection;

class PermissionTable extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(public Collection $permissions)
    {
        // 
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.tables.permission-table');
    }
}
