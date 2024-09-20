<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'user_id',
        'document_autorise_id',
        'statuts',
        'path',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function document_autorise()
    {
        return $this->belongsTo(DocumentAutorise::class);
    }
}
