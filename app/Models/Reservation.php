<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reservation extends Model
{
    use HasFactory, SoftDeletes;

    public const STATUS_PENDING = 'Pending';
    public const STATUS_CONFIRMED = 'Confirmed';
    public const STATUS_CANCELLED = 'Cancelled';

    public const SERVICE_PACKAGE = 'package';
    public const SERVICE_SURF_LESSON = 'surf_lesson';
    public const SERVICE_ROOM = 'room';
    public const SERVICE_GUIDING = 'guiding';

    protected $fillable = [
        'name',
        'phone',
        'email',
        'service_type',
        'package_id',
        'surf_lesson_id',
        'room_id',
        'guiding_service_id',
        'number_of_people',
        'check_in',
        'check_out',
        'message',
        'status',
    ];

    protected $casts = [
        'number_of_people' => 'integer',
        'check_in' => 'date',
        'check_out' => 'date',
    ];

    public function package(): BelongsTo
    {
        return $this->belongsTo(Package::class)->withTrashed();
    }

    public function surfLesson(): BelongsTo
    {
        return $this->belongsTo(SurfLesson::class)->withTrashed();
    }

    public function room(): BelongsTo
    {
        return $this->belongsTo(SurfCampRoom::class, 'room_id')->withTrashed();
    }

    public function guidingService(): BelongsTo
    {
        return $this->belongsTo(GuidingService::class)->withTrashed();
    }

    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_PENDING);
    }

    public function scopeConfirmed(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_CONFIRMED);
    }

    public function scopeCancelled(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_CANCELLED);
    }
}
