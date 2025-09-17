<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Art extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'artist_id',
        'art_field_id',
        'title',
        'description',
        'cover_image',
        'art_file',
        'art_file_type',
        'file_size',
        'duration',
        'metadata',
        'status',
        'rejection_reason',
        'approved_at',
        'approved_by',
    ];

    protected $casts = [
        'metadata' => 'array',
        'approved_at' => 'datetime',
        'file_size' => 'integer',
    ];

    public function artist(): BelongsTo
    {
        return $this->belongsTo(Artist::class);
    }

    public function artField(): BelongsTo
    {
        return $this->belongsTo(ArtField::class);
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function evaluations(): HasMany
    {
        return $this->hasMany(ArtEvaluation::class);
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }

    public function getAverageScoreAttribute(): float
    {
        return $this->evaluations()->avg('score') ?? 0;
    }

    public function getFileSizeInMBAttribute(): float
    {
        return $this->file_size ? round($this->file_size / 1024, 2) : 0;
    }
}
