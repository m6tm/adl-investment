<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 
        'dial_code', 
        'code'
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function documents_autorises()
    {
        return $this->hasMany(PaysDocumentAutorise::class);
    }
}
