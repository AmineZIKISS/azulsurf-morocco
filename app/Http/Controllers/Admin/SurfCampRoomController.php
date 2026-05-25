<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\SurfCampRoomResource;
use App\Models\SurfCampRoom;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SurfCampRoomController extends Controller
{
    public function index(): JsonResponse
    {
        $rooms = SurfCampRoom::latest()->get();
        return response()->json(['data' => SurfCampRoomResource::collection($rooms)]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'room_type' => 'required|array',
            'description' => 'required|array',
            'capacity' => 'required|integer|min:1',
            'price_per_night' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,webp|max:2048',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['room_type']['en'] ?? $validated['room_type']['fr'] ?? uniqid());

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('surf-camp-rooms', 'public');
        }

        $room = SurfCampRoom::create($validated);

        return response()->json([
            'message' => 'Room created successfully.',
            'data' => new SurfCampRoomResource($room),
        ], 201);
    }

    public function show(SurfCampRoom $surfCampRoom): JsonResponse
    {
        return response()->json(['data' => new SurfCampRoomResource($surfCampRoom)]);
    }

    public function update(Request $request, SurfCampRoom $surfCampRoom): JsonResponse
    {
        $validated = $request->validate([
            'room_type' => 'sometimes|required|array',
            'description' => 'sometimes|required|array',
            'capacity' => 'sometimes|required|integer|min:1',
            'price_per_night' => 'sometimes|required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,webp|max:2048',
            'is_active' => 'boolean',
        ]);

        if (isset($validated['room_type'])) {
            $validated['slug'] = Str::slug($validated['room_type']['en'] ?? $validated['room_type']['fr'] ?? $surfCampRoom->slug);
        }

        if ($request->hasFile('image')) {
            if ($surfCampRoom->image) {
                Storage::disk('public')->delete($surfCampRoom->image);
            }
            $validated['image'] = $request->file('image')->store('surf-camp-rooms', 'public');
        }

        $surfCampRoom->update($validated);

        return response()->json([
            'message' => 'Room updated successfully.',
            'data' => new SurfCampRoomResource($surfCampRoom->fresh()),
        ]);
    }

    public function destroy(SurfCampRoom $surfCampRoom): JsonResponse
    {
        if ($surfCampRoom->image) {
            Storage::disk('public')->delete($surfCampRoom->image);
        }

        $surfCampRoom->delete();

        return response()->json(['message' => 'Room deleted successfully.']);
    }
}
