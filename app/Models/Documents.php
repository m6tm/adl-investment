<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'type',
        'adresse',
        'statut',
        'fiche_document',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
