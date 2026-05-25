<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\GuideResource;
use App\Models\Guide;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GuideController extends Controller
{
    public function index(): JsonResponse
    {
        $guides = Guide::latest()->get();
        return response()->json(['data' => GuideResource::collection($guides)]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'guide_type' => 'required|array',
            'bio' => 'nullable|array',
            'image' => 'nullable|image|mimes:jpeg,png,webp|max:2048',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('guides', 'public');
        }

        $guide = Guide::create($validated);

        return response()->json([
            'message' => 'Guide created successfully.',
            'data' => new GuideResource($guide),
        ], 201);
    }

    public function show(Guide $guide): JsonResponse
    {
        return response()->json(['data' => new GuideResource($guide)]);
    }

    public function update(Request $request, Guide $guide): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|max:255',
            'guide_type' => 'sometimes|required|array',
            'bio' => 'nullable|array',
            'image' => 'nullable|image|mimes:jpeg,png,webp|max:2048',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($guide->image) {
                Storage::disk('public')->delete($guide->image);
            }
            $validated['image'] = $request->file('image')->store('guides', 'public');
        }

        $guide->update($validated);

        return response()->json([
            'message' => 'Guide updated successfully.',
            'data' => new GuideResource($guide->fresh()),
        ]);
    }

    public function destroy(Guide $guide): JsonResponse
    {
        if ($guide->image) {
            Storage::disk('public')->delete($guide->image);
        }

        $guide->delete();

        return response()->json(['message' => 'Guide deleted successfully.']);
    }
}
