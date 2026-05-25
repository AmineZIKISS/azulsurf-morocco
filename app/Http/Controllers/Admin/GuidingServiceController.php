<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\GuidingServiceResource;
use App\Models\GuidingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class GuidingServiceController extends Controller
{
    public function index(): JsonResponse
    {
        $services = GuidingService::latest()->get();
        return response()->json(['data' => GuidingServiceResource::collection($services)]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|array',
            'description' => 'required|array',
            'type' => 'required|in:Surf Guiding,Local Area Guiding,Adventure Guiding',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,webp|max:2048',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']['en'] ?? $validated['title']['fr'] ?? uniqid());

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('guiding-services', 'public');
        }

        $service = GuidingService::create($validated);

        return response()->json([
            'message' => 'Guiding service created successfully.',
            'data' => new GuidingServiceResource($service),
        ], 201);
    }

    public function show(GuidingService $guidingService): JsonResponse
    {
        return response()->json(['data' => new GuidingServiceResource($guidingService)]);
    }

    public function update(Request $request, GuidingService $guidingService): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|array',
            'description' => 'sometimes|required|array',
            'type' => 'sometimes|required|in:Surf Guiding,Local Area Guiding,Adventure Guiding',
            'price' => 'sometimes|required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,webp|max:2048',
            'is_active' => 'boolean',
        ]);

        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']['en'] ?? $validated['title']['fr'] ?? $guidingService->slug);
        }

        if ($request->hasFile('image')) {
            if ($guidingService->image) {
                Storage::disk('public')->delete($guidingService->image);
            }
            $validated['image'] = $request->file('image')->store('guiding-services', 'public');
        }

        $guidingService->update($validated);

        return response()->json([
            'message' => 'Guiding service updated successfully.',
            'data' => new GuidingServiceResource($guidingService->fresh()),
        ]);
    }

    public function destroy(GuidingService $guidingService): JsonResponse
    {
        if ($guidingService->image) {
            Storage::disk('public')->delete($guidingService->image);
        }

        $guidingService->delete();

        return response()->json(['message' => 'Guiding service deleted successfully.']);
    }
}
