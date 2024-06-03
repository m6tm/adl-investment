<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gain extends Model
{
    protected $fillable = [
        'id',
        'montant',
        'montant_numeric',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tirage()
    {
        return $this->belongsTo(Tirage::class);
    }
}
