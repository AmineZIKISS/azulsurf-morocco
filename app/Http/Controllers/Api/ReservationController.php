<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    /**
     * Store a new reservation request.
     */
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
            'check_in' => 'required|date',
            'check_out' => 'required|date|after_or_equal:check_in',
            'message' => 'nullable',
        ]);

        $reservation = Reservation::create($validated);

        return response()->json([
            'message' => 'Reservation submitted successfully.',
            'data' => new ReservationResource($reservation),
        ], 201);
    }

    /**
     * Return all booked (preferred) dates for Pending and Confirmed reservations.
     * Used by the frontend calendar to visually block unavailable dates.
     *
     * @return JsonResponse  { "booked_dates": ["YYYY-MM-DD", ...] }
     */
    public function bookedDates(): JsonResponse
    {
        $reservations = Reservation::whereIn('status', [
            'Confirmed',
            'Confirmé',
            'Blocked',
            'Bloqué'
        ])->get();

        $bookedDates = [];

        foreach ($reservations as $reservation) {
            if (!$reservation->check_in || !$reservation->check_out) {
                continue;
            }
            
            $period = \Carbon\CarbonPeriod::create($reservation->check_in, $reservation->check_out);
            
            foreach ($period as $date) {
                $bookedDates[] = $date->format('Y-m-d');
            }
        }

        return response()->json([
            'booked_dates' => array_values(array_unique($bookedDates)),
        ]);
    }
}
