<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiscussionOwner extends Model
{
    use HasFactory;

    function user() {
        return $this->belongsTo(User::class);
    }

    function discussion() {
        return $this->belongsTo(Discussion::class);
    }
}
