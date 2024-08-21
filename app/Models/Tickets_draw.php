<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tickets_draw extends Model
{
    protected $fillable = [
        'nombre_tickets',
    ];

    public function coefficient()
    {
        return $this->belongsTo(Coefficient::class);
    }

    public function winning()
    {
        return $this->belongsTo(Winning::class);
    }
}
