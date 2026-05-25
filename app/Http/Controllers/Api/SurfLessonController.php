<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SurfLessonResource;
use App\Models\SurfLesson;
use Illuminate\Http\JsonResponse;

class SurfLessonController extends Controller
{
    public function index(): JsonResponse
    {
        $lessons = SurfLesson::active()->latest()->get();
        return response()->json(['data' => SurfLessonResource::collection($lessons)]);
    }

    public function show(SurfLesson $surfLesson): JsonResponse
    {
        return response()->json(['data' => new SurfLessonResource($surfLesson)]);
    }
}
