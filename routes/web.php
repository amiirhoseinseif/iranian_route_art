<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;

Route::get('/', function () {
    $artFields = \App\Models\ArtField::active()->orderBy('name')->get()->map(function ($field) {
        return [
            'id' => $field->id,
            'name' => $field->name,
            'name_en' => $field->name_en,
            'description' => $field->description,
            'description_en' => $field->description_en,
            'description_translated' => $field->description_translated,
            'icon_name' => $field->icon_name,
        ];
    });
    
    return Inertia::render('Home', [
        'artFields' => $artFields,
    ]);
})->name('home');

// Public pages
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

// PDF Download Routes - فراخوان
Route::get('/farakhan-farsi.pdf', function () {
    $filePath = public_path('فراخوان سایت فارسی.pdf');
    if (file_exists($filePath)) {
        return response()->download($filePath, 'فراخوان-جشنواره-مسیر-ایران-فارسی.pdf');
    }
    abort(404);
})->name('farakhan.farsi.download');

Route::get('/farakhan-english.pdf', function () {
    $filePath = public_path('فراخوان سایت انگلیسی.pdf');
    if (file_exists($filePath)) {
        return response()->download($filePath, 'iranian-route-festival-call-for-artworks-english.pdf');
    }
    abort(404);
})->name('farakhan.english.download');

// Keep old route for backward compatibility
Route::get('/farakhan.pdf', [App\Http\Controllers\FarakhanController::class, 'download'])->name('farakhan.download');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/artists', function () {
    return Inertia::render('Artists');
})->name('artists');

// Arts route removed - only accessible to admins via /admin/arts

// Auth pages
Route::get('/login', [App\Http\Controllers\AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [App\Http\Controllers\AuthController::class, 'login'])->name('login.store');
Route::post('/logout', [App\Http\Controllers\AuthController::class, 'logout'])->name('logout');

// Clear session route (for fixing oversized session cookies)
Route::get('/clear-session', function (Illuminate\Http\Request $request) {
    // Remove old user_data if exists
    $request->session()->forget('user_data');
    // Invalidate and regenerate session to get a fresh cookie
    $request->session()->invalidate();
    $request->session()->regenerate();
    
    // Return a simple HTML page that clears cookies and redirects
    return response()->view('clear-session', [], 200)
        ->header('Clear-Site-Data', '"cache", "cookies", "storage"');
})->name('clear.session');

Route::get('/forgot-password', function () {
    return Inertia::render('Auth/ForgotPassword');
})->name('forgot-password');

// Artist routes
Route::prefix('artist')->group(function () {
    // Public artist routes
    Route::get('/register', [App\Http\Controllers\ArtistController::class, 'showRegistrationForm'])->name('artist.register');
    
    Route::post('/register', [App\Http\Controllers\ArtistController::class, 'register'])->name('artist.register.store');
    
    // Public route for viewing art submission guide (accessible without login)
    Route::get('/arts/create', [\App\Http\Controllers\ArtController::class, 'create'])->name('artist.arts.create');
    
    // Protected artist routes (require authentication)
    Route::middleware(['auth.artist'])->group(function () {
        Route::get('/dashboard', function () {
            $userId = session('user_id');
            $artist = \App\Models\Artist::find($userId);
            if (!$artist) {
                return redirect()->route('login');
            }
            
            // Get artist's arts with related data
            $arts = $artist->arts()->with('artField', 'evaluations')->latest()->get();
            
            // Calculate statistics
            $totalArts = $arts->count();
            $approvedArts = $arts->where('status', 'approved')->count();
            $pendingArts = $arts->where('status', 'pending')->count();
            $rejectedArts = $arts->where('status', 'rejected')->count();
            
            // Calculate average score from evaluations
            $evaluatedArts = $arts->where('status', 'approved')->filter(function($art) {
                return $art->evaluations->count() > 0;
            });
            
            $averageScore = $evaluatedArts->count() > 0 
                ? $evaluatedArts->avg(function($art) {
                    return $art->evaluations->avg('score');
                })
                : 0;
            
            // Get recent arts (last 6)
            $recentArts = $arts->take(6)->map(function($art) {
                return [
                    'id' => $art->id,
                    'title' => $art->title,
                    'status' => $art->status,
                    'created_at' => $art->created_at,
                    'art_field' => $art->artField->name,
                    'average_score' => $art->evaluations->count() > 0 
                        ? round($art->evaluations->avg('score'), 1) 
                        : null,
                    'image_url' => $art->image_url,
                ];
            });
            
            // Get festival settings for deadlines
            $festivalSettings = \App\Models\FestivalSetting::first();
            
            // Generate dynamic notifications based on artist's arts
            $notifications = [];
            
            // Check for recently approved arts
            $recentlyApproved = $arts->where('status', 'approved')
                ->where('approved_at', '>=', now()->subDays(7))
                ->take(3);
            
            foreach ($recentlyApproved as $art) {
                $notifications[] = [
                    'message' => "اثر \"{$art->title}\" شما تایید شد" . 
                        ($art->evaluations->count() > 0 ? " و امتیاز " . round($art->evaluations->avg('score'), 1) . " دریافت کرد" : ""),
                    'time' => $art->approved_at->diffForHumans(),
                    'type' => 'success'
                ];
            }
            
            // Check for pending arts
            $pendingArtsCount = $pendingArts;
            if ($pendingArtsCount > 0) {
                $notifications[] = [
                    'message' => "شما {$pendingArtsCount} اثر در انتظار تایید دارید",
                    'time' => 'همیشه',
                    'type' => 'info'
                ];
            }
            
            // Check for rejected arts
            $recentlyRejected = $arts->where('status', 'rejected')
                ->where('updated_at', '>=', now()->subDays(7))
                ->take(2);
            
            foreach ($recentlyRejected as $art) {
                $notifications[] = [
                    'message' => "اثر \"{$art->title}\" شما رد شد" . 
                        ($art->rejection_reason ? " - دلیل: {$art->rejection_reason}" : ""),
                    'time' => $art->updated_at->diffForHumans(),
                    'type' => 'error'
                ];
            }
            
            // Add festival deadline notification
            if ($festivalSettings && $festivalSettings->submission_deadline) {
                $deadline = \Carbon\Carbon::parse($festivalSettings->submission_deadline);
                if ($deadline->isFuture()) {
                    $daysLeft = now()->diffInDays($deadline, false);
                    if ($daysLeft <= 7 && $daysLeft > 0) {
                        $notifications[] = [
                            'message' => "مهلت ارسال آثار تا {$daysLeft} روز دیگر به پایان می‌رسد",
                            'time' => 'فوری',
                            'type' => 'warning'
                        ];
                    }
                }
            }
            
            // If no notifications, add a welcome message
            if (empty($notifications)) {
                $notifications[] = [
                    'message' => 'خوش آمدید! اولین اثر هنری خود را ارسال کنید',
                    'time' => 'همیشه',
                    'type' => 'info'
                ];
            }
            
            return Inertia::render('Artist/Dashboard', [
                'artist' => $artist,
                'arts' => $arts,
                'statistics' => [
                    'total_arts' => $totalArts,
                    'approved_arts' => $approvedArts,
                    'pending_arts' => $pendingArts,
                    'rejected_arts' => $rejectedArts,
                    'average_score' => round($averageScore, 1),
                ],
                'recent_arts' => $recentArts,
                'festival_settings' => $festivalSettings,
                'notifications' => $notifications,
            ]);
        })->name('artist.dashboard');
        
        Route::get('/profile', function () {
            $userId = session('user_id');
            $artist = \App\Models\Artist::find($userId);
            if (!$artist) {
                return redirect()->route('login');
            }
            return Inertia::render('Artist/Profile', ['artist' => $artist]);
        })->name('artist.profile');
        
        Route::patch('/profile', [App\Http\Controllers\ArtistController::class, 'updateProfile'])->name('artist.profile.update');
        
        Route::get('/arts', function () {
            $userId = session('user_id');
            $artist = \App\Models\Artist::find($userId);
            if (!$artist) {
                return redirect()->route('login');
            }
            $arts = $artist->arts()->with('artField')->latest()->get();
            return Inertia::render('Artist/Arts', ['arts' => $arts]);
        })->name('artist.arts');
        
        Route::post('/arts', [App\Http\Controllers\ArtController::class, 'store'])->name('artist.arts.store');
        
        Route::get('/arts/{art}', [App\Http\Controllers\ArtController::class, 'show'])->name('artist.arts.show');
        
        Route::get('/arts/{art}/edit', [App\Http\Controllers\ArtController::class, 'edit'])->name('artist.arts.edit');
        
        Route::patch('/arts/{art}', [App\Http\Controllers\ArtController::class, 'update'])->name('artist.arts.update');
        
        // Route delete removed - حذف آثار مجاز نیست
        // Route::delete('/arts/{art}', [App\Http\Controllers\ArtController::class, 'destroy'])->name('artist.arts.destroy');
        
        Route::get('/submissions', function () {
            return Inertia::render('Artist/Submissions');
        })->name('artist.submissions');
        
        Route::get('/notifications', function () {
            return Inertia::render('Artist/Notifications');
        })->name('artist.notifications');
        
        Route::get('/settings', function () {
            return Inertia::render('Artist/Settings');
        })->name('artist.settings');
    });
});

// Admin routes
Route::prefix('admin')->middleware(['auth.admin'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');
    
    Route::get('/artists', function () {
        return Inertia::render('Admin/Artists');
    })->name('admin.artists');
    
    Route::get('/arts', [AdminController::class, 'indexArts'])->name('admin.arts');

    Route::get('/arts/{art}', [AdminController::class, 'viewArt'])->name('admin.arts.show');
    
    Route::get('/arts/files/download', [AdminController::class, 'downloadFile'])->name('admin.arts.files.download');
    
    Route::get('/judges', function () {
        return Inertia::render('Admin/Judges');
    })->name('admin.judges');
    
    Route::get('/art-fields', function () {
        $artFields = \App\Models\ArtField::orderBy('name')->get();
        return Inertia::render('Admin/ArtFields', [
            'artFields' => $artFields,
        ]);
    })->name('admin.art-fields');
    
    Route::get('/settings', function () {
        return Inertia::render('Admin/Settings');
    })->name('admin.settings');
    
    Route::get('/reports', function () {
        return Inertia::render('Admin/Reports');
    })->name('admin.reports');
    
    Route::get('/field-requirements', function () {
        $artFields = \App\Models\ArtField::active()->get();
        return Inertia::render('Admin/FieldRequirements', [
            'artFields' => $artFields
        ]);
    })->name('admin.field-requirements');
});

// Judge routes
Route::prefix('judge')->group(function () {
    // Public judge routes
    Route::get('/register', function () {
        return Inertia::render('Judge/Register');
    })->name('judge.register');
    
    Route::post('/register', [App\Http\Controllers\JudgeController::class, 'register'])->name('judge.register.store');
    
    // Protected judge routes (require authentication and verification)
    Route::middleware(['auth.judge', 'judge.verification'])->group(function () {
    Route::get('/dashboard', function () {
        $userId = session('user_id');
        $judge = \App\Models\Judge::find($userId);
        if (!$judge) {
            return redirect()->route('login');
        }
        
        // Get judge's assigned art fields
        $assignedArtFields = $judge->assignments()->with('artField')->get();
        
        // Get arts in assigned fields that haven't been evaluated by this judge
        $assignedFieldIds = $assignedArtFields->pluck('art_field_id');
        $evaluatedArtIds = $judge->evaluations()->pluck('art_id');
        
        $pendingArts = \App\Models\Art::whereIn('art_field_id', $assignedFieldIds)
            ->whereNotIn('id', $evaluatedArtIds)
            ->where('status', 'approved')
            ->with(['artist', 'artField'])
            ->orderBy('created_at', 'desc')
            ->get();
        
        // Calculate statistics
        $totalAssignments = $assignedArtFields->count();
        $pendingEvaluations = $pendingArts->count();
        $completedEvaluations = $judge->evaluations()->count();
        $averageScore = $judge->evaluations()->avg('score') ?? 0;
        
        // Get assigned art fields with counts
        $assignedArtFieldsData = $assignedArtFields->map(function ($assignment) use ($evaluatedArtIds) {
            $fieldArtsCount = \App\Models\Art::where('art_field_id', $assignment->art_field_id)
                ->where('status', 'approved')
                ->count();
            $fieldPendingCount = \App\Models\Art::where('art_field_id', $assignment->art_field_id)
                ->where('status', 'approved')
                ->whereNotIn('id', $evaluatedArtIds)
                ->count();
            
            return [
                'name' => $assignment->artField->name,
                'count' => $fieldArtsCount,
                'pending' => $fieldPendingCount,
            ];
        });
        
        // Get pending evaluations
        $pendingEvaluationsList = $pendingArts->map(function ($art) {
            $daysSinceSubmission = now()->diffInDays($art->created_at);
            $priority = $daysSinceSubmission >= 7 ? 'high' : ($daysSinceSubmission >= 3 ? 'medium' : 'low');
            
            return [
                'id' => $art->id,
                'art_id' => $art->id,
                'title' => $art->title,
                'artist' => $art->artist->first_name . ' ' . $art->artist->last_name,
                'field' => $art->artField->name,
                'submitted_at' => $art->created_at,
                'priority' => $priority,
            ];
        });
        
        // Get recent evaluations
        $recentEvaluations = $judge->evaluations()->with(['art', 'art.artist'])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($evaluation) {
                return [
                    'id' => $evaluation->id,
                    'art_title' => $evaluation->art->title,
                    'artist' => $evaluation->art->artist->first_name . ' ' . $evaluation->art->artist->last_name,
                    'score' => $evaluation->score,
                    'evaluated_at' => $evaluation->created_at,
                ];
            });
        
        return Inertia::render('Judge/Dashboard', [
            'judge' => $judge,
            'statistics' => [
                'total_assignments' => $totalAssignments,
                'pending_evaluations' => $pendingEvaluations,
                'completed_evaluations' => $completedEvaluations,
                'average_score' => round($averageScore, 1),
            ],
            'assigned_art_fields' => $assignedArtFieldsData,
            'pending_evaluations' => $pendingEvaluationsList,
            'recent_evaluations' => $recentEvaluations,
        ]);
    })->name('judge.dashboard');
    
    Route::get('/assignments', function () {
        return Inertia::render('Judge/Assignments');
    })->name('judge.assignments');
    
    Route::get('/evaluations', function () {
        return Inertia::render('Judge/Evaluations');
    })->name('judge.evaluations');
    
    Route::get('/profile', function () {
        return Inertia::render('Judge/Profile');
    })->name('judge.profile');
    
    Route::patch('/profile', [App\Http\Controllers\JudgeController::class, 'updateProfile'])->name('judge.profile.update');
    
    Route::get('/settings', function () {
        return Inertia::render('Judge/Settings');
    })->name('judge.settings');
    
    // View artwork details for evaluation
    Route::get('/art/{art}', function ($artId) {
        $userId = session('user_id');
        $judge = \App\Models\Judge::find($userId);
        if (!$judge) {
            return redirect()->route('login');
        }
        
        $art = \App\Models\Art::with(['artist', 'artField', 'evaluations.judge'])
            ->findOrFail($artId);
        
        // Check if judge is assigned to this art field
        $assignedFieldIds = $judge->assignments()->pluck('art_field_id');
        if (!$assignedFieldIds->contains($art->art_field_id)) {
            return redirect()->route('judge.dashboard')->with('error', 'شما مجاز به ارزیابی این اثر نیستید');
        }
        
        // Check if already evaluated
        $existingEvaluation = $judge->evaluations()->where('art_id', $art->id)->first();
        
        return Inertia::render('Judge/ArtEvaluation', [
            'art' => $art,
            'existingEvaluation' => $existingEvaluation,
        ]);
    })->name('judge.art.evaluate');
    
    // Store evaluation
    Route::post('/art/{art}/evaluate', [App\Http\Controllers\JudgeController::class, 'storeEvaluation'])->name('judge.evaluation.store');
    
    // Update evaluation
    Route::patch('/evaluation/{evaluation}', [App\Http\Controllers\JudgeController::class, 'updateEvaluation'])->name('judge.evaluation.update');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // DatePicker Demo
    Route::get('/datepicker-demo', function () {
        return Inertia::render('DatePickerDemo');
    })->name('datepicker.demo');
});

// S3 Storage Routes
Route::prefix('s3')->group(function () {
    Route::get('/download/{file}', [App\Http\Controllers\S3\DownloadController::class, 'download'])
        ->where('file', '.*')
        ->name('s3.download');
    
    Route::get('/presigned/{file}', [App\Http\Controllers\S3\PresignedController::class, 'generatePresignedUrl'])
        ->where('file', '.*')
        ->name('s3.presigned');
    
    Route::post('/upload', [App\Http\Controllers\S3\UploadController::class, 'upload'])
        ->name('s3.upload');
    
    Route::delete('/delete/{file}', [App\Http\Controllers\S3\DeleteController::class, 'delete'])
        ->where('file', '.*')
        ->name('s3.delete');
    
    // Test routes for S3
    Route::get('/test', [App\Http\Controllers\S3\TestController::class, 'showTestForm'])
        ->name('s3.test.form');
    Route::post('/test', [App\Http\Controllers\S3\TestController::class, 'testUpload'])
        ->name('s3.test');
});

require __DIR__.'/auth.php';
