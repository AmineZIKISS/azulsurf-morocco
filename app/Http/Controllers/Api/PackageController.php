<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PackageResource;
use App\Models\Package;
use Illuminate\Http\JsonResponse;

class PackageController extends Controller
{
    public function index(): JsonResponse
    {
        $packages = Package::active()->latest()->get();
        return response()->json(['data' => PackageResource::collection($packages)]);
    }

    public function show(Package $package): JsonResponse
    {
        return response()->json(['data' => new PackageResource($package)]);
    }
}
