<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SurfCampRoomResource;
use App\Models\SurfCampRoom;
use Illuminate\Http\JsonResponse;

class SurfCampRoomController extends Controller
{
    public function index(): JsonResponse
    {
        $rooms = SurfCampRoom::active()->latest()->get();
        return response()->json(['data' => SurfCampRoomResource::collection($rooms)]);
    }

    public function show(SurfCampRoom $surfCampRoom): JsonResponse
    {
        return response()->json(['data' => new SurfCampRoomResource($surfCampRoom)]);
    }
}
