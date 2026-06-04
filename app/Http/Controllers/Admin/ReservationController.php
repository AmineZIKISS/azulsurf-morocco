<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    /**
     * Display a listing of all reservations.
     */
    public function index(): JsonResponse
    {
        $reservations = Reservation::with(['package', 'surfLesson', 'room', 'guidingService'])->latest()->get();

        return response()->json(['data' => ReservationResource::collection($reservations)]);
    }

    /**
     * Display the specified reservation.
     */
    public function show(Reservation $reservation): JsonResponse
    {
        $reservation->load(['package', 'surfLesson', 'room', 'guidingService']);
        return response()->json(['data' => new ReservationResource($reservation)]);
    }

    /**
     * Update the status of a reservation.
     */
    public function updateStatus(Request $request, Reservation $reservation): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|string',
        ]);

        $normalizedStatus = mb_convert_case(trim($validated['status']), MB_CASE_TITLE, "UTF-8");
        $allowedStatuses = ['Pending', 'Confirmed', 'Cancelled', 'Blocked', 'Confirmé', 'Bloqué', 'En attente', 'Annulé'];
        if (!in_array($normalizedStatus, $allowedStatuses)) {
            return response()->json([
                'message' => 'Le statut fourni est invalide.'
            ], 422);
        }

        $reservation->update(['status' => $normalizedStatus]);

        $reservation->load(['package', 'surfLesson', 'room', 'guidingService']);

        return response()->json([
            'message' => 'Reservation status updated successfully.',
            'data' => new ReservationResource($reservation),
        ]);
    }

    /**
     * Remove the specified reservation from storage.
     */
    public function destroy(Reservation $reservation): JsonResponse
    {
        $reservation->delete();

        return response()->json([
            'message' => 'Reservation deleted successfully.',
        ]);
    }
}

