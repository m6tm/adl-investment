<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    protected $fillable = [
        'user_id',
        'montant',
        'statut',  // Ex: "reussir" , "echoué"
        'mode_paiement',
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
