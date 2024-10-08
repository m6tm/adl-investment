<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Enums\USER_VERIFICATION_STATUS;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'first_name',
        'email',
        'birth_date',
        'pseudo',
        'password',
        'verification_status',
        'country_id',
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

    /**
     * Get the address associated with the user.
     */
    public function address()
    {
        return $this->hasOne(Addresse::class);
    }

    public function discussions()
    {
        return $this->hasMany(DiscussionOwner::class);
    }

    public function messages()
    {
        return $this->hasMany(MessageOwner::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function pays()
    {
        return $this->belongsTo(Country::class, 'country_id');
    }

    public function gains()
    {
        return $this->hasMany(Gain::class);
    }

    public function compte()
    {
        return $this->hasOne(Compte::class);
    }

    public function phones()
    {
        return $this->hasMany(Telephone::class);
    }

    public function refere()
    {
        return $this->hasMany(Referal::class);
    }

    public function refere_to_me()
    {
        return $this->belongsTo(Referal::class);
    }


    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'verification_status' => USER_VERIFICATION_STATUS::class,
    ];
}
