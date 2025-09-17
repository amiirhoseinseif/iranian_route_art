<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Public API routes
Route::post('/login', [AuthController::class, 'apiLogin']);
Route::post('/logout', [AuthController::class, 'apiLogout'])->middleware('auth:api');

// Artist API routes
Route::middleware(['auth:artist'])->prefix('artist')->group(function () {
    Route::get('/profile', function (Request $request) {
        return $request->user();
    });
    
    Route::get('/arts', function (Request $request) {
        return $request->user()->arts()->with('artField')->get();
    });
    
    Route::post('/arts', [App\Http\Controllers\ArtController::class, 'store']);
    Route::put('/arts/{art}', [App\Http\Controllers\ArtController::class, 'update']);
    Route::delete('/arts/{art}', [App\Http\Controllers\ArtController::class, 'destroy']);
});

// Admin API routes
Route::middleware(['auth:admin'])->prefix('admin')->group(function () {
    Route::get('/profile', function (Request $request) {
        return $request->user();
    });
    
    Route::get('/artists', function () {
        return \App\Models\Artist::with('artField')->get();
    });
    
    Route::get('/arts', function () {
        return \App\Models\Art::with(['artist', 'artField'])->get();
    });
    
    // Admin management routes
    Route::get('/admins', [AdminController::class, 'index']);
    Route::post('/admins', [AdminController::class, 'store']);
    Route::get('/admins/{admin}', [AdminController::class, 'show']);
    Route::put('/admins/{admin}', [AdminController::class, 'update']);
    Route::delete('/admins/{admin}', [AdminController::class, 'destroy']);
    
    // Judge management routes
    Route::get('/judges', [AdminController::class, 'judges']);
    Route::get('/judges/pending', [AdminController::class, 'pendingJudges']);
    Route::post('/judges/{judge}/approve', [AdminController::class, 'approveJudge']);
    
    // Dashboard stats
    Route::get('/dashboard-stats', [AdminController::class, 'dashboardStats']);
    Route::get('/recent-activities', [AdminController::class, 'recentActivities']);
    
    // Enhanced data endpoints
    Route::get('/artists', [AdminController::class, 'getArtists']);
    Route::get('/arts', [AdminController::class, 'getArts']);
});

// Judge API routes
Route::middleware(['auth:judge', 'judge.verification'])->prefix('judge')->group(function () {
    Route::get('/profile', function (Request $request) {
        return $request->user();
    });
    
    Route::get('/dashboard-stats', [App\Http\Controllers\JudgeController::class, 'dashboardStats']);
    Route::get('/assigned-art-fields', [App\Http\Controllers\JudgeController::class, 'assignedArtFields']);
    Route::get('/pending-evaluations', [App\Http\Controllers\JudgeController::class, 'pendingEvaluations']);
    Route::get('/recent-evaluations', [App\Http\Controllers\JudgeController::class, 'recentEvaluations']);
    
    Route::get('/assignments', function (Request $request) {
        return $request->user()->assignments()->with(['art', 'art.artist'])->get();
    });
    
    Route::get('/evaluations', function (Request $request) {
        return $request->user()->evaluations()->with(['art', 'art.artist'])->get();
    });
});
