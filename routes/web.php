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
Route::get('/login', [App\Http\Controllers\AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [App\Http\Controllers\AuthController::class, 'login'])->name('login.store');
Route::post('/logout', [App\Http\Controllers\AuthController::class, 'logout'])->name('logout');

Route::get('/register', function () {
    return Inertia::render('Auth/Register');
})->name('register');

Route::get('/forgot-password', function () {
    return Inertia::render('Auth/ForgotPassword');
})->name('forgot-password');

// Artist routes
Route::prefix('artist')->group(function () {
    // Public artist routes
    Route::get('/register', function () {
        return Inertia::render('Artist/Register');
    })->name('artist.register');
    
    Route::post('/register', [App\Http\Controllers\ArtistController::class, 'register'])->name('artist.register.store');
    
    
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
        
        Route::get('/arts/create', function () {
            $artFields = \App\Models\ArtField::active()->get();
            return Inertia::render('Artist/ArtCreate', ['artFields' => $artFields]);
        })->name('artist.arts.create');
        
        Route::post('/arts', [App\Http\Controllers\ArtController::class, 'store'])->name('artist.arts.store');
        
        Route::get('/arts/{art}/edit', function ($art) {
            return Inertia::render('Artist/ArtEdit', ['art' => $art]);
        })->name('artist.arts.edit');
        
        Route::patch('/arts/{art}', [App\Http\Controllers\ArtController::class, 'update'])->name('artist.arts.update');
        
        Route::delete('/arts/{art}', [App\Http\Controllers\ArtController::class, 'destroy'])->name('artist.arts.destroy');
        
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
    
    Route::get('/arts', function () {
        return Inertia::render('Admin/Arts');
    })->name('admin.arts');
    
    Route::get('/judges', function () {
        return Inertia::render('Admin/Judges');
    })->name('admin.judges');
    
    Route::get('/settings', function () {
        return Inertia::render('Admin/Settings');
    })->name('admin.settings');
    
    Route::get('/reports', function () {
        return Inertia::render('Admin/Reports');
    })->name('admin.reports');
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

require __DIR__.'/auth.php';
