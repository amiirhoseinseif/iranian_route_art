<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FieldRequirement extends Model
{
    use HasFactory;

    protected $fillable = [
        'art_field_id',
        'field_name',
        'requirement_type',
        'field_type',
        'description',
    ];

    public function artField(): BelongsTo
    {
        return $this->belongsTo(ArtField::class);
    }

    public function scopeRequired($query)
    {
        return $query->where('requirement_type', 'required');
    }

    public function scopeOptional($query)
    {
        return $query->where('requirement_type', 'optional');
    }

    public function scopeDisabled($query)
    {
        return $query->where('requirement_type', 'disabled');
    }
}
