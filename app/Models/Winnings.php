<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Winnings extends Model
{
    protected $fillable = [
        'montant_total_libelle',
        'montant_total_numeric',
    ];

    public function ticketsDraw()
    {
        return $this->hasMany(TicketDraw::class);
    }
}
