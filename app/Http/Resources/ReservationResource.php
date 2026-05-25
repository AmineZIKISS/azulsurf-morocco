<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'phone' => $this->phone,
            'email' => $this->email,
            'service_type' => $this->service_type,
            'package' => new PackageResource($this->whenLoaded('package')),
            'surf_lesson' => new SurfLessonResource($this->whenLoaded('surfLesson')),
            'room' => new SurfCampRoomResource($this->whenLoaded('room')),
            'guiding_service' => new GuidingServiceResource($this->whenLoaded('guidingService')),
            'number_of_people' => $this->number_of_people,
            'preferred_date' => $this->preferred_date?->toDateString(),
            'message' => $this->message,
            'status' => $this->status,
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
