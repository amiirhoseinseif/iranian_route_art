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

    protected $table = 'arts';

    protected $fillable = [
        'artist_id',
        'art_field_id',
        'title',
        'director_name',
        'writer_name',
        'technique',
        'story_summary',
        'artist_statement',
        'description',
        'cover_image',
        'art_file',
        'main_file',
        'poster',
        'art_file_type',
        'file_size',
        'duration',
        'dimensions',
        'materials',
        'weight',
        'software_used',
        'subcategory',
        'metadata',
        'status',
        'rejection_reason',
        'approved_at',
        'approved_by',
        'video_url',
        'audio_url',
        'tags',
        'year_created',
        'resume',
        'location',
        'additional_files',
        'production_photos',
    ];

    protected $casts = [
        'metadata' => 'array',
        'additional_files' => 'array',
        'production_photos' => 'array',
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

    public function fieldValues(): HasMany
    {
        return $this->hasMany(ArtFieldValue::class);
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
