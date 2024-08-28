<?php

namespace App\View\Components\Tables;

use App\Models\User;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Collection;
use Illuminate\View\Component;
use Spatie\Permission\Models\Role;

class PermissionToRoleTable extends Component
{
    public Collection $roles;
    /**
     * Create a new component instance.
     */
    public function __construct()
    {
        $this->roles = Role::all();
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.tables.permission-to-role-table');
    }
}
