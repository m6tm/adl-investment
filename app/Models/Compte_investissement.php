<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compte_investissement extends Model
{
    protected $fillable = [
        'user_id',
        'montant_investi',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
