<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\SurfLessonResource;
use App\Models\SurfLesson;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SurfLessonController extends Controller
{
    public function index(): JsonResponse
    {
        $lessons = SurfLesson::latest()->get();
        return response()->json(['data' => SurfLessonResource::collection($lessons)]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'level' => 'required|array',
            'description' => 'required|array',
            'duration' => 'required|max:255',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,webp|max:2048',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['level']['en'] ?? $validated['level']['fr'] ?? uniqid());

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('surf-lessons', 'public');
        }

        $lesson = SurfLesson::create($validated);

        return response()->json([
            'message' => 'Surf lesson created successfully.',
            'data' => new SurfLessonResource($lesson),
        ], 201);
    }

    public function show(SurfLesson $surfLesson): JsonResponse
    {
        return response()->json(['data' => new SurfLessonResource($surfLesson)]);
    }

    public function update(Request $request, SurfLesson $surfLesson): JsonResponse
    {
        $validated = $request->validate([
            'level' => 'sometimes|required|array',
            'description' => 'sometimes|required|array',
            'duration' => 'sometimes|required|max:255',
            'price' => 'sometimes|required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,webp|max:2048',
            'is_active' => 'boolean',
        ]);

        if (isset($validated['level'])) {
            $validated['slug'] = Str::slug($validated['level']['en'] ?? $validated['level']['fr'] ?? $surfLesson->slug);
        }

        if ($request->hasFile('image')) {
            if ($surfLesson->image) {
                Storage::disk('public')->delete($surfLesson->image);
            }
            $validated['image'] = $request->file('image')->store('surf-lessons', 'public');
        }

        $surfLesson->update($validated);

        return response()->json([
            'message' => 'Surf lesson updated successfully.',
            'data' => new SurfLessonResource($surfLesson->fresh()),
        ]);
    }

    public function destroy(SurfLesson $surfLesson): JsonResponse
    {
        if ($surfLesson->image) {
            Storage::disk('public')->delete($surfLesson->image);
        }

        $surfLesson->delete();

        return response()->json(['message' => 'Surf lesson deleted successfully.']);
    }
}
