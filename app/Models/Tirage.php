<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tirage extends Model
{
    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function gains()
    {
        return $this->hasMany(Gain::class);
    }

}
