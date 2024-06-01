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

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'prenom',
        'pseudo',
        'email',
        'password',
        'localisation',
        'numero_telephone',
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

    public function DocumentVerification()
    {
        return $this->hasMany(Documents_verification::class);
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function paiements()
    {
        return $this->hasMany(Paiement::class);
    }

    public function gains()
    {
        return $this->hasMany(Gain::class);
    }

    public function portefeuille()
    {
        return $this->hasOne(Portefeuille::class);
    }

    public function compteInvestissement()
    {
        return $this->hasOne(Compte_investissement::class);
    }


    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}

