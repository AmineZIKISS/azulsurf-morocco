<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SettingResource;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;

class SettingController extends Controller
{
    public function show(string $key): JsonResponse
    {
        $setting = Setting::where('key', $key)->firstOrFail();
        return response()->json(['data' => new SettingResource($setting)]);
    }
}
