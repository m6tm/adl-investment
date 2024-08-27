<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaysDocumentAutorise extends Model
{
    use HasFactory;

    function documents_autorise() {
        return $this->belongsTo(DocumentAutorise::class);
    }

    function pays() {
        return $this->belongsTo(Country::class);
    }
}