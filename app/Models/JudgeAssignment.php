<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JudgeAssignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'judge_id',
        'art_field_id',
        'is_active',
        'assigned_at',
        'assigned_by',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'assigned_at' => 'datetime',
    ];

    public function judge(): BelongsTo
    {
        return $this->belongsTo(Judge::class);
    }

    public function artField(): BelongsTo
    {
        return $this->belongsTo(ArtField::class);
    }

    public function assignedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_by');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
