<?php

namespace App\Models\CustomerSupport;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    function question()
    {
        return $this->belongsTo(Question::class);
    }
}
