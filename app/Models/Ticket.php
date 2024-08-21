<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable = [
        'type', // EX: normal,bonus
        'statut', //Ex: actif, expiré, utilisé
        'gagnant',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    function payment() {
        return $this->belongsTo(Payment::class);
    }

    public function tirage()
    {
        return $this->belongsTo(Tirage::class);
    }

    public function ticket_price()
    {
        return $this->belongsTo(TicketPrice::class);
    }

    public function ticket_category()
    {
        return $this->belongsTo(TicketCategory::class);
    }
}
