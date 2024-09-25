<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discussion extends Model
{
    use HasFactory;

    function owners() {
        return $this->hasMany(DiscussionOwner::class);
    }

    function messages() {
        return $this->hasMany(Message::class);
    }
}
