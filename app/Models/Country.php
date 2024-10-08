<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Country extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'countries';

    protected $fillable = [
        'name', 
        'dial_code', 
        'code'
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function ticket_prices()
    {
        return $this->hasMany(TicketPrice::class);
    }

    public function documents_autorises()
    {
        return $this->hasMany(PaysDocumentAutorise::class);
    }
}
