<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portefeuille extends Model
{
    protected $fillable = [
        'user_id',
        'solde',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
