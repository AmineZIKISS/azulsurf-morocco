<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class SurfCampRoom extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'room_type',
        'slug',
        'description',
        'capacity',
        'price_per_night',
        'image',
        'is_active',
    ];

    protected $casts = [
        'room_type' => 'array',
        'description' => 'array',
        'capacity' => 'integer',
        'price_per_night' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class, 'room_id');
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}
