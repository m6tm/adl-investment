<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tirage extends Model
{
    protected $fillable = [
        'type',  // Ex: normal, bonus
        'date_tirage',
        'heure_tirage',
        'statut', // EX: encours , terminé , attente
    ];

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function gains()
    {
        return $this->hasMany(Gain::class);
    }

    public function roue()
    {
        return $this->belongsTo(Roue::class);
    }

}
