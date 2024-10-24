<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    const VERIFICATION_PENDING = 'Encours';
    const VERIFICATION_VERIFIED = 'Non_verifie';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password',
        'birt-day',
        'adresse',
        'verification_status'=> self::VERIFICATION_PENDING, // Par défaut, en attente
        'derniere_connexion',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function Documents()
    {
        return $this->hasMany(Document::class);
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function pays()
    {
        return $this->belongsTo(Pays::class);
    }

    public function gains()
    {
        return $this->hasMany(Gain::class);
    }

    public function user_types()
    {
        return $this->hasOne(user_type::class);
    }

    public function compte()
    {
        return $this->hasOne(Compte::class);
    }


    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getVerificationStatusAttribute()
    {
        return $this->verification_status;
    }
}
