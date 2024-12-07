<?php

namespace App\Models\CustomerSupport;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    function answers()
    {
        return $this->hasMany(Answer::class);
    }
}
