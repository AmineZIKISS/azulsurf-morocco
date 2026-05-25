<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'phone' => 'required|max:20',
            'email' => 'required|email',
            'service_type' => 'required|in:package,surf_lesson,room,guiding',
            'package_id' => 'nullable|exists:packages,id',
            'surf_lesson_id' => 'nullable|exists:surf_lessons,id',
            'room_id' => 'nullable|exists:surf_camp_rooms,id',
            'guiding_service_id' => 'nullable|exists:guiding_services,id',
            'number_of_people' => 'required|integer|min:1',
            'preferred_date' => 'required|date|after_or_equal:today',
            'message' => 'nullable',
        ]);

        $reservation = Reservation::create($validated);

        return response()->json([
            'message' => 'Reservation submitted successfully.',
            'data' => new ReservationResource($reservation),
        ], 201);
    }
}
