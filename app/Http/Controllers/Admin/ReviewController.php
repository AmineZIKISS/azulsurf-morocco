<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReviewResource;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index(): JsonResponse
    {
        $reviews = Review::latest()->get();
        return response()->json(['data' => ReviewResource::collection($reviews)]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'client_name' => 'required|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'review_text' => 'required',
            'is_approved' => 'boolean',
            'is_active' => 'boolean',
        ]);

        $review = Review::create($validated);

        return response()->json([
            'message' => 'Review created successfully.',
            'data' => new ReviewResource($review),
        ], 201);
    }

    public function show(Review $review): JsonResponse
    {
        return response()->json(['data' => new ReviewResource($review)]);
    }

    public function update(Request $request, Review $review): JsonResponse
    {
        $validated = $request->validate([
            'client_name' => 'sometimes|required|max:255',
            'rating' => 'sometimes|required|integer|min:1|max:5',
            'review_text' => 'sometimes|required',
            'is_approved' => 'boolean',
            'is_active' => 'boolean',
        ]);

        $review->update($validated);

        return response()->json([
            'message' => 'Review updated successfully.',
            'data' => new ReviewResource($review->fresh()),
        ]);
    }

    public function destroy(Review $review): JsonResponse
    {
        $review->delete();

        return response()->json(['message' => 'Review deleted successfully.']);
    }
}
