<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coefficients extends Model
{
    protected $fillable = [
        'valeur',
    ];

    public function ticketsJackpot()
    {
        return $this->hasMany(TicketJackpot::class);
    }

    public function ticketsDraw()
    {
        return $this->hasMany(TicketDraw::class);
    }
}
