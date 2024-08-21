<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coefficient extends Model
{
    protected $fillable = [
        'valeur',
    ];

    public function tickets_jackpot()
    {
        return $this->hasMany(TicketJackpot::class);
    }

    public function tickets_draw()
    {
        return $this->hasMany(TicketsDraw::class);
    }
}
