<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ArtField extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'name_en',
        'icon_name',
        'description',
        'description_en',
        'metadata',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'metadata' => 'array',
    ];

    protected $appends = [
        'description_translated',
        'metadata_translated',
    ];

    public function requirements(): HasMany
    {
        return $this->hasMany(FieldRequirement::class);
    }

    public function artists(): HasMany
    {
        return $this->hasMany(Artist::class);
    }

    public function arts(): HasMany
    {
        return $this->hasMany(Art::class);
    }

    public function judgeAssignments(): HasMany
    {
        return $this->hasMany(JudgeAssignment::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function getDescriptionTranslatedAttribute(): ?string
    {
        $locale = app()->getLocale();
        if ($locale === 'en' && $this->description_en) {
            return $this->description_en;
        }

        return $this->description;
    }

    public function getMetadataTranslatedAttribute(): array
    {
        $metadata = $this->metadata ?? [];
        $locale = app()->getLocale();

        if (is_array($metadata)) {
            if (isset($metadata[$locale]) && is_array($metadata[$locale])) {
                return $metadata[$locale];
            }

            if ($locale === 'en' && isset($metadata['fa']) && is_array($metadata['fa'])) {
                return $metadata['fa'];
            }
        }

        return $metadata ?? [];
    }
}
