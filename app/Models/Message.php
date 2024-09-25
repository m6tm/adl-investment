<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    function discussion() {
        return $this->belongsTo(Discussion::class);
    }

    function users() {
        return $this->hasMany(MessageOwner::class);
    }
}
