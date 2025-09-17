<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class Judge extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'password',
        'bio',
        'profile_image',
        'expertise_areas',
        'qualification',
        'organization',
        'is_active',
        'verification_status',
        'rejection_reason',
        'verified_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'expertise_areas' => 'array',
        'is_active' => 'boolean',
        'verified_at' => 'datetime',
        'email_verified_at' => 'datetime',
    ];

    public function assignments(): HasMany
    {
        return $this->hasMany(JudgeAssignment::class);
    }

    public function evaluations(): HasMany
    {
        return $this->hasMany(ArtEvaluation::class);
    }

    public function getFullNameAttribute(): string
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function hasExpertiseIn($artFieldId): bool
    {
        return in_array($artFieldId, $this->expertise_areas ?? []);
    }

    public function isVerified(): bool
    {
        return $this->verification_status === 'approved';
    }

    public function isPending(): bool
    {
        return $this->verification_status === 'pending';
    }

    public function isRejected(): bool
    {
        return $this->verification_status === 'rejected';
    }

    public function scopeVerified($query)
    {
        return $query->where('verification_status', 'approved');
    }

    public function scopePending($query)
    {
        return $query->where('verification_status', 'pending');
    }

    public function scopeRejected($query)
    {
        return $query->where('verification_status', 'rejected');
    }
}
