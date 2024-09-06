<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaysDocumentAutorise extends Model
{
    use HasFactory;

    protected $fillable = [
        'country_id',
        'document_autorise_id',
    ];

    function documents_autorise() {
        return $this->belongsTo(DocumentAutorise::class, 'document_autorise_id');
    }

    function pays() {
        return $this->belongsTo(Country::class);
    }
}
