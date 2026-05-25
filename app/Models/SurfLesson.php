<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class SurfLesson extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'level',
        'slug',
        'description',
        'duration',
        'price',
        'image',
        'is_active',
    ];

    protected $casts = [
        'level' => 'array',
        'description' => 'array',
        'price' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}
