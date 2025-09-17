<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EducationalBackground extends Model
{
    use HasFactory;

    protected $fillable = [
        'artist_id',
        'level',
        'field_of_study',
        'institution',
        'graduation_year',
        'gpa',
        'description',
    ];

    protected $casts = [
        'graduation_year' => 'integer',
        'gpa' => 'decimal:2',
    ];

    public function artist(): BelongsTo
    {
        return $this->belongsTo(Artist::class);
    }

    public function getLevelNameAttribute(): string
    {
        return match($this->level) {
            'diploma' => 'دیپلم',
            'associate' => 'کاردانی',
            'bachelor' => 'کارشناسی',
            'master' => 'کارشناسی ارشد',
            'phd' => 'دکترا',
            'other' => 'سایر',
            default => $this->level,
        };
    }
}
