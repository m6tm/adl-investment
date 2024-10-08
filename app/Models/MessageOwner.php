<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageOwner extends Model
{
    use HasFactory;

    function user() {
        return $this->belongsTo(User::class);
    }

    function message() {
        return $this->belongsTo(Message::class);
    }
}
