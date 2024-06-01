<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jackpot extends Model
{
    protected $fillable = [
        'roue_id',
        'montant',
    ];

    public function roue()
    {
        return $this->belongsTo(Roue::class);
    }

    public function ticketsJackpot()
    {
        return $this->hasMany(TicketJackpot::class);
    }
}
