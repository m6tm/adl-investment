<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portefeuille extends Model
{
    protected $table = 'portefeuilles';
    protected $fillable = [
        'id',
        'balance_libelle',
        'balance_numeric',
    ];

    public function compte()
    {
        return $this->belongsTo(Compte::class);
    }
}
