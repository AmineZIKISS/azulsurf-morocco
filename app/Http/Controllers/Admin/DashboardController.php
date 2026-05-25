<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Gallery;
use App\Models\Guide;
use App\Models\GuidingService;
use App\Models\Package;
use App\Models\Reservation;
use App\Models\Review;
use App\Models\SurfCampRoom;
use App\Models\SurfLesson;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => [
                'total_packages' => Package::count(),
                'total_surf_lessons' => SurfLesson::count(),
                'total_rooms' => SurfCampRoom::count(),
                'total_guiding_services' => GuidingService::count(),
                'total_guides' => Guide::count(),
                'total_gallery_items' => Gallery::count(),
                'total_reviews' => Review::count(),
                'pending_reservations' => Reservation::pending()->count(),
                'confirmed_reservations' => Reservation::confirmed()->count(),
                'unread_contacts' => Contact::unread()->count(),
            ],
        ]);
    }
}
