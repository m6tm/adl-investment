<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portefeuille_Investissement extends Model
{

    protected $fillable = [
        'balance_libelle',
        'balance_numeric',
    ];

    public function compte()
    {
        return $this->belongsTo(Compte::class);
    }
}
