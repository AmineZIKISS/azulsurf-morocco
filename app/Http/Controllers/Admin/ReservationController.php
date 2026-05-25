<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ReservationController extends Controller
{
    /**
     * Display a listing of all reservations with their packages.
     */
    public function index(): View
    {
        $reservations = Reservation::with('package')->latest()->get();

        return view('admin.reservations.index', compact('reservations'));
    }

    /**
     * Update the status of a reservation.
     */
    public function updateStatus(Request $request, Reservation $reservation): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        $reservation->update($validated);

        return redirect()->back()
            ->with('success', 'Reservation status updated successfully.');
    }
}
