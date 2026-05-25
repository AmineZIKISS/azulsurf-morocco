<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\GalleryResource;
use App\Models\Gallery;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index(): JsonResponse
    {
        $items = Gallery::latest()->get();
        return response()->json(['data' => GalleryResource::collection($items)]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'nullable|array',
            'category' => 'required|in:Surf,Camp,Activities,Trips,Food',
            'image_path' => 'required|image|mimes:jpeg,png,webp|max:2048',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image_path')) {
            $validated['image_path'] = $request->file('image_path')->store('gallery', 'public');
        }

        $item = Gallery::create($validated);

        return response()->json([
            'message' => 'Gallery item created successfully.',
            'data' => new GalleryResource($item),
        ], 201);
    }

    public function show(Gallery $gallery): JsonResponse
    {
        return response()->json(['data' => new GalleryResource($gallery)]);
    }

    public function update(Request $request, Gallery $gallery): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'nullable|array',
            'category' => 'sometimes|required|in:Surf,Camp,Activities,Trips,Food',
            'image_path' => 'nullable|image|mimes:jpeg,png,webp|max:2048',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image_path')) {
            if ($gallery->image_path) {
                Storage::disk('public')->delete($gallery->image_path);
            }
            $validated['image_path'] = $request->file('image_path')->store('gallery', 'public');
        }

        $gallery->update($validated);

        return response()->json([
            'message' => 'Gallery item updated successfully.',
            'data' => new GalleryResource($gallery->fresh()),
        ]);
    }

    public function destroy(Gallery $gallery): JsonResponse
    {
        if ($gallery->image_path) {
            Storage::disk('public')->delete($gallery->image_path);
        }

        $gallery->delete();

        return response()->json(['message' => 'Gallery item deleted successfully.']);
    }
}
