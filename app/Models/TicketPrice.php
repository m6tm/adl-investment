<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketPrice extends Model
{
    use HasFactory;
    protected $fillable = [
        'libelle',
        'prix',
        'devise',
        'is_promotion',
        'country_id',
    ];

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class, 'country_id');
    }
}
