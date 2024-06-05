<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compte extends Model
{
    protected $table = 'comptes';

    protected $fillable = [
        'statut', // Ex: "inactif", "actif"
        'solde',
        'devise',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function portefeuille()
    {
        return $this->hasOne(Portefeuille::class);
    }

    public function portefeuille_Investissement()
    {
        return $this->hasOne(Portefeuille_Investissement::class);
    }

}
