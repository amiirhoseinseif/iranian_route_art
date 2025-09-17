<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArtEvaluation extends Model
{
    use HasFactory;

    protected $fillable = [
        'art_id',
        'judge_id',
        'score',
        'comments',
        'criteria_scores',
        'status',
        'submitted_at',
    ];

    protected $casts = [
        'score' => 'decimal:1',
        'criteria_scores' => 'array',
        'submitted_at' => 'datetime',
    ];

    public function art(): BelongsTo
    {
        return $this->belongsTo(Art::class);
    }

    public function judge(): BelongsTo
    {
        return $this->belongsTo(Judge::class);
    }

    public function scopeSubmitted($query)
    {
        return $query->where('status', 'submitted');
    }

    public function scopeFinal($query)
    {
        return $query->where('status', 'final');
    }

    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    public function getScorePercentageAttribute(): float
    {
        return ($this->score / 10) * 100;
    }
}
