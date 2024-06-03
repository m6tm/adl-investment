<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket_price extends Model
{
    protected $fillable = [
        'libelle',
        'prix',
        'device',
        'is_promotion',
    ];

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

}
