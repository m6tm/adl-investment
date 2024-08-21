<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketJackpot extends Model
{
    protected $fillable = [
        'date_creation',
        'date_mise_a_jour',
    ];
    public function jackpot()
    {
        return $this->belongsTo(Jackpot::class);
    }

    public function coefficient()
    {
        return $this->belongsTo(Coefficient::class);
    }
}
