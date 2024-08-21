<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pays extends Model
{
    protected $fillable = [
        'libelle',
        'libelle_court',
        'code_iso',
        'taxe',
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
