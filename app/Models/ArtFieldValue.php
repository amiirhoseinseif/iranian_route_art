<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArtFieldValue extends Model
{
    use HasFactory;

    protected $fillable = [
        'art_id',
        'field_requirement_id',
        'value',
        'file_path',
    ];

    public function art(): BelongsTo
    {
        return $this->belongsTo(Art::class);
    }

    public function fieldRequirement(): BelongsTo
    {
        return $this->belongsTo(FieldRequirement::class);
    }
}
