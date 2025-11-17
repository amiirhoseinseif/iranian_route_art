<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FieldRequirement extends Model
{
    use HasFactory;

    protected $fillable = [
        'art_field_id',
        'field_name',
        'display_name',
        'display_name_en',
        'requirement_type',
        'field_type',
        'description',
        'description_en',
        'validation_rules',
        'order',
    ];

    protected $casts = [
        'validation_rules' => 'array',
    ];

    protected $appends = [
        'display_name_translated',
        'description_translated',
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

    public function fieldValues(): HasMany
    {
        return $this->hasMany(ArtFieldValue::class);
    }

    public function getDisplayNameTranslatedAttribute(): string
    {
        $locale = app()->getLocale();

        if ($locale === 'en' && $this->display_name_en) {
            return $this->display_name_en;
        }

        return $this->display_name ?? $this->field_name;
    }

    public function getDescriptionTranslatedAttribute(): ?string
    {
        $locale = app()->getLocale();

        if ($locale === 'en' && $this->description_en) {
            return $this->description_en;
        }

        return $this->description;
    }
}
