<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentAutorise extends Model
{
    use HasFactory;

    function pays() {
        return $this->hasMany(PaysDocumentAutorise::class);
    }

    function documents() {
        return $this->hasMany(Document::class);
    }
}
