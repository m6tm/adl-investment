<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket_category extends Model
{
    protected $fillable = [
        'categorie',
    ];

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

}
