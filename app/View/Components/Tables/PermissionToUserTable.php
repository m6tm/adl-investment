<?php

namespace App\View\Components\Tables;

use App\Models\User;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Collection;
use Illuminate\View\Component;

class PermissionToUserTable extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(public Collection $users)
    {
        $this->users = User::all();
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.tables.permission-to-user-table');
    }
}
