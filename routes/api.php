<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — Azul Surf Morocco
|--------------------------------------------------------------------------
|
| Public routes: no authentication required
| Admin routes: protected by auth:sanctum
|
*/

// ─── Public Routes ───────────────────────────────────────────────

Route::post('/login', [App\Http\Controllers\Api\AuthController::class, 'login']);
Route::post('/admin/login', [App\Http\Controllers\Api\AdminController::class, 'adminLogin']);

Route::post('/contact', [App\Http\Controllers\Api\ContactController::class, 'store']);
Route::post('/reservations', [App\Http\Controllers\Api\ReservationController::class, 'store']);
Route::get('/reservations/booked-dates', [App\Http\Controllers\Api\ReservationController::class, 'bookedDates']);

Route::get('/packages', [App\Http\Controllers\Api\PackageController::class, 'index']);
Route::get('/packages/{package:slug}', [App\Http\Controllers\Api\PackageController::class, 'show']);

Route::get('/surf-lessons', [App\Http\Controllers\Api\SurfLessonController::class, 'index']);
Route::get('/surf-lessons/{surfLesson:slug}', [App\Http\Controllers\Api\SurfLessonController::class, 'show']);

Route::get('/surf-camp-rooms', [App\Http\Controllers\Api\SurfCampRoomController::class, 'index']);
Route::get('/surf-camp-rooms/{surfCampRoom:slug}', [App\Http\Controllers\Api\SurfCampRoomController::class, 'show']);

Route::get('/guiding-services', [App\Http\Controllers\Api\GuidingServiceController::class, 'index']);
Route::get('/guiding-services/{guidingService:slug}', [App\Http\Controllers\Api\GuidingServiceController::class, 'show']);

Route::get('/gallery', [App\Http\Controllers\Api\GalleryController::class, 'index']);
Route::get('/guides', [App\Http\Controllers\Api\GuideController::class, 'index']);
Route::get('/reviews', [App\Http\Controllers\Api\ReviewController::class, 'index']);
Route::get('/settings/{key}', [App\Http\Controllers\Api\SettingController::class, 'show']);

// ─── Admin Routes (auth:sanctum) ────────────────────────────────

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [App\Http\Controllers\Api\AuthController::class, 'logout']);
    Route::get('/user', [App\Http\Controllers\Api\AuthController::class, 'user']);

    Route::prefix('admin')->group(function () {

        Route::get('/dashboard', [App\Http\Controllers\Admin\DashboardController::class, 'index']);

        Route::apiResource('packages', App\Http\Controllers\Admin\PackageController::class);
        Route::apiResource('surf-lessons', App\Http\Controllers\Admin\SurfLessonController::class);
        Route::apiResource('surf-camp-rooms', App\Http\Controllers\Admin\SurfCampRoomController::class);
        Route::apiResource('guiding-services', App\Http\Controllers\Admin\GuidingServiceController::class);
        Route::apiResource('gallery', App\Http\Controllers\Admin\GalleryController::class);
        Route::apiResource('guides', App\Http\Controllers\Admin\GuideController::class);
        Route::apiResource('reviews', App\Http\Controllers\Admin\ReviewController::class);
        Route::apiResource('settings', App\Http\Controllers\Admin\SettingController::class);

        Route::get('/reservations', [App\Http\Controllers\Api\AdminController::class, 'getReservations']);
        Route::get('/reservations/{reservation}', [App\Http\Controllers\Admin\ReservationController::class, 'show']);
        Route::patch('/reservations/{reservation}/status', [App\Http\Controllers\Admin\ReservationController::class, 'updateStatus']);
        Route::put('/reservations/{id}/status', [App\Http\Controllers\Api\AdminController::class, 'updateReservationStatus']);
        Route::delete('/reservations/{reservation}', [App\Http\Controllers\Admin\ReservationController::class, 'destroy']);

        Route::get('/contacts', [App\Http\Controllers\Admin\ContactController::class, 'index']);
        Route::get('/contacts/{contact}', [App\Http\Controllers\Admin\ContactController::class, 'show']);
        Route::delete('/contacts/{contact}', [App\Http\Controllers\Admin\ContactController::class, 'destroy']);
    });
});
