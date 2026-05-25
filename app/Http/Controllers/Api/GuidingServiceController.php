<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GuidingServiceResource;
use App\Models\GuidingService;
use Illuminate\Http\JsonResponse;

class GuidingServiceController extends Controller
{
    public function index(): JsonResponse
    {
        $services = GuidingService::active()->latest()->get();
        return response()->json(['data' => GuidingServiceResource::collection($services)]);
    }

    public function show(GuidingService $guidingService): JsonResponse
    {
        return response()->json(['data' => new GuidingServiceResource($guidingService)]);
    }
}
