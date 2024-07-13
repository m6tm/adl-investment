<?php

namespace App\Livewire;

use Livewire\Component;

class Admin extends Component
{
    public $message = 'Bonjour, Livewire!';
    
    public function render()
    {
        return view('livewire.admin');
    }
}
