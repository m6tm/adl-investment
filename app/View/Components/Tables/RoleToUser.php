<?php

namespace App\View\Components\Tables;

use App\Models\User;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;
use Spatie\Permission\Models\Role;

class RoleToUser extends Component
{
    public $users;
    /**
     * Create a new component instance.
     */
    public function __construct(public Role $role)
    {
        $this->users = User::where('id', '!=', auth()->id())->get();
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.tables.role-to-user');
    }
}
