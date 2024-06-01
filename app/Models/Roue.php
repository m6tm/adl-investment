<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Roue extends Model
{
    protected $fillable = [
        'nom',
    ];

    public function jackpots()
    {
        return $this->hasMany(Jackpot::class);
    }
}
