<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    protected $fillable = [
        'montant',
        'statut',  // Ex: "reussir" , "echoué"
    ];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }

    public function paiement_method()
    {
        return $this->hasMany(Paiement_method::class);
    }
}
