<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\SettingResource;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /**
     * Display a listing of all settings.
     */
    public function index(): JsonResponse
    {
        $settings = Setting::latest()->get();
        return response()->json(['data' => SettingResource::collection($settings)]);
    }

    /**
     * Store a newly created setting in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'key' => 'required|max:255|unique:settings,key',
            'value' => 'nullable',
        ]);

        $setting = Setting::create($validated);

        return response()->json([
            'message' => 'Setting created successfully.',
            'data' => new SettingResource($setting),
        ], 201);
    }

    /**
     * Display the specified setting.
     */
    public function show(Setting $setting): JsonResponse
    {
        return response()->json(['data' => new SettingResource($setting)]);
    }

    /**
     * Update the specified setting in storage.
     */
    public function update(Request $request, Setting $setting): JsonResponse
    {
        $validated = $request->validate([
            'key' => 'sometimes|required|max:255|unique:settings,key,' . $setting->id,
            'value' => 'nullable',
        ]);

        $setting->update($validated);

        return response()->json([
            'message' => 'Setting updated successfully.',
            'data' => new SettingResource($setting->fresh()),
        ]);
    }

    /**
     * Remove the specified setting from storage.
     */
    public function destroy(Setting $setting): JsonResponse
    {
        $setting->delete();

        return response()->json([
            'message' => 'Setting deleted successfully.',
        ]);
    }
}
