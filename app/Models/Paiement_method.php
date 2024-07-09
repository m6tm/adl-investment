<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement_method extends Model
{
    protected $fillable = [
        'libelle',
    ];

    public function paiements()
    {
        return $this->belongsTo(Paiement::class);
    }

}
