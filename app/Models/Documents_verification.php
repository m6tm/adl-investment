<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Documents_verification extends Model
{
    protected $fillable = [
        'user_id',
        'type_document',
        'chemin_document',
        'date_soumission',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
