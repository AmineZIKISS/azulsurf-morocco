<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Reservation;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    /**
     * Authenticate an admin user and issue a Sanctum token.
     */
    public function adminLogin(\Illuminate\Http\Request $request)
    {
        $request->validate(['email' => 'required|email', 'password' => 'required']);
        
        $user = \App\Models\User::where('email', $request->email)->first();

        if (!$user || !\Illuminate\Support\Facades\Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Identifiants de connexion invalides.'], 401);
        }
        
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Rôle insuffisant.'], 403);
        }

        return response()->json([
            'token' => $user->createToken('admin-token')->plainTextToken,
            'user' => $user
        ]);
    }

    /**
     * Retrieve all reservations ordered by latest.
     */
    public function getReservations()
    {
        $reservations = Reservation::with(['package', 'surfLesson', 'room', 'guidingService'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($reservations);
    }

    /**
     * Update the status of a specific reservation.
     */
    public function updateReservationStatus(Request $request, $id)
    {
        $request->validate([
            'status' => ['required', 'string'],
        ]);

        $status = mb_convert_case(trim($request->status), MB_CASE_TITLE, "UTF-8");
        $allowedStatuses = ['Pending', 'Confirmed', 'Cancelled', 'Blocked', 'Confirmé', 'Bloqué', 'En attente', 'Annulé'];
        if (!in_array($status, $allowedStatuses)) {
            return response()->json([
                'message' => 'Le statut fourni est invalide (doit être Pending, Confirmed, Cancelled, Blocked, Confirmé ou Bloqué).'
            ], 422);
        }

        $reservation = Reservation::findOrFail($id);
        $reservation->status = $status;
        $reservation->save();

        if ($status === 'Confirmed' || $status === 'Confirmé') {
            \Illuminate\Support\Facades\Mail::to($reservation->email)->send(new \App\Mail\ReservationConfirmed($reservation));
        } elseif ($status === 'Cancelled' || $status === 'Annulé') {
            \Illuminate\Support\Facades\Mail::to($reservation->email)->send(new \App\Mail\ReservationCancelled($reservation));
        }

        return response()->json([
            'message' => 'Statut de la réservation mis à jour avec succès.',
            'reservation' => $reservation->load(['package', 'surfLesson', 'room', 'guidingService'])
        ]);
    }
}
