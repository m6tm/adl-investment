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

    public function tirage()
    {
        return $this->belongsTo(Tirage::class);
    }

    public function ticket_prices()
    {
        return $this->belongsTo(Ticket_prices::class);
    }

    public function ticket_categories()
    {
        return $this->belongsTo(Ticket_categories::class);
    }
}
