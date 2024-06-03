<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Roue extends Model
{
    protected $fillable = [
        'id',
        'intitule',
        'description',
    ];

    public function jackpots()
    {
        return $this->hasMany(Jackpot::class);
    }

    public function tirages()
    {
        return $this->hasMany(Tirage::class);
    }
}
