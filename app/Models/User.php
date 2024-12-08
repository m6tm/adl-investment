<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\USER_ROLE;
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
     * Get the user's address.
     */
    public function address()
    {
        return $this->hasOne(Addresse::class);
    }

    /**
     * Get the discussions owned by the user.
     */
    public function discussions()
    {
        return $this->hasMany(DiscussionOwner::class);
    }

    /**
     * Get the messages owned by the user.
     */
    public function messages()
    {
        return $this->hasMany(MessageOwner::class);
    }

    /**
     * Get the documents associated with the user.
     */
    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    /**
     * Get the tickets created by the user.
     */
    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    /**
     * Get the country associated with the user.
     */
    public function pays()
    {
        return $this->belongsTo(Country::class, 'country_id');
    }

    /**
     * Get the gains associated with the user.
     */
    public function gains()
    {
        return $this->hasMany(Gain::class);
    }

    /**
     * Get the user's account.
     */
    public function compte()
    {
        return $this->hasOne(Compte::class);
    }

    /**
     * Get the phone numbers associated with the user.
     */
    public function phones()
    {
        return $this->hasMany(Telephone::class);
    }

    /**
     * Get the referrals made by the user.
     */
    public function refere()
    {
        return $this->hasMany(Referal::class);
    }

    /**
     * Get the user who referred this user.
     */
    public function refere_to_me()
    {
        return $this->belongsTo(Referal::class);
    }

    /**
     * Check if the user is verified.
     * 
     * @return bool
     */
    function isVerified()
    {
        return $this->verification_status == USER_VERIFICATION_STATUS::VERIFIED;
    }

    /**
     * Check if the user has admin role.
     * 
     * @return bool
     */
    function isAdmin()
    {
        return $this->hasRole(USER_ROLE::ADMIN);
    }

    /**
     * Check if the user has player role.
     * 
     * @return bool
     */
    function isPlayer()
    {
        return $this->hasRole(USER_ROLE::PLAYER);
    }

    /**
     * Check if the user has super admin role.
     * 
     * @return bool
     */
    function isSuperAdmin()
    {
        return $this->hasRole(USER_ROLE::SUPER_ADMIN);
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
