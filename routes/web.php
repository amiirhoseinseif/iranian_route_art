<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

// Public pages
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/artists', function () {
    return Inertia::render('Artists');
})->name('artists');

Route::get('/arts', function () {
    return Inertia::render('Arts');
})->name('arts');

// Auth pages
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::get('/register', function () {
    return Inertia::render('Auth/Register');
})->name('register');

Route::get('/forgot-password', function () {
    return Inertia::render('Auth/ForgotPassword');
})->name('forgot-password');

// Artist routes
Route::prefix('artist')->group(function () {
    Route::get('/register', function () {
        return Inertia::render('Artist/Register');
    })->name('artist.register');
    
    Route::post('/register', [App\Http\Controllers\ArtistController::class, 'register'])->name('artist.register.store');
    
    Route::get('/dashboard', function () {
        return Inertia::render('Artist/Dashboard');
    })->name('artist.dashboard')->middleware('auth:artist');
});

// Admin routes
Route::prefix('admin')->middleware(['auth:admin'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');
});

// Judge routes
Route::prefix('judge')->middleware(['auth:judge'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Judge/Dashboard');
    })->name('judge.dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
