<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GuideResource;
use App\Models\Guide;
use Illuminate\Http\JsonResponse;

class GuideController extends Controller
{
    public function index(): JsonResponse
    {
        $guides = Guide::active()->latest()->get();
        return response()->json(['data' => GuideResource::collection($guides)]);
    }
}
