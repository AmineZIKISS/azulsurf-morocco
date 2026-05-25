<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PackageResource;
use App\Models\Package;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PackageController extends Controller
{
    public function index(): JsonResponse
    {
        $packages = Package::latest()->get();
        return response()->json(['data' => PackageResource::collection($packages)]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|array',
            'description' => 'required|array',
            'duration' => 'required|max:255',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,webp|max:2048',
            'included_services' => 'nullable|array',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']['en'] ?? $validated['title']['fr'] ?? uniqid());

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('packages', 'public');
        }

        $package = Package::create($validated);

        return response()->json([
            'message' => 'Package created successfully.',
            'data' => new PackageResource($package),
        ], 201);
    }

    public function show(Package $package): JsonResponse
    {
        return response()->json(['data' => new PackageResource($package)]);
    }

    public function update(Request $request, Package $package): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|array',
            'description' => 'sometimes|required|array',
            'duration' => 'sometimes|required|max:255',
            'price' => 'sometimes|required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,webp|max:2048',
            'included_services' => 'nullable|array',
            'is_active' => 'boolean',
        ]);

        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']['en'] ?? $validated['title']['fr'] ?? $package->slug);
        }

        if ($request->hasFile('image')) {
            if ($package->image) {
                Storage::disk('public')->delete($package->image);
            }
            $validated['image'] = $request->file('image')->store('packages', 'public');
        }

        $package->update($validated);

        return response()->json([
            'message' => 'Package updated successfully.',
            'data' => new PackageResource($package->fresh()),
        ]);
    }

    public function destroy(Package $package): JsonResponse
    {
        if ($package->image) {
            Storage::disk('public')->delete($package->image);
        }

        $package->delete();

        return response()->json(['message' => 'Package deleted successfully.']);
    }
}
