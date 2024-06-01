<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    protected $fillable = [
        'user_id',
        'montant',
        'mode_paiement',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
