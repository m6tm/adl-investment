<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Referal extends Model
{
    use HasFactory;

    function from() {
        return $this->belongsTo(User::class);
    }

    function to() {
        return $this->hasOne(User::class);
    }
}
