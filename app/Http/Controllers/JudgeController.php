<?php

namespace App\Http\Controllers;

use App\Models\Judge;
use App\Models\ArtEvaluation;
use App\Models\JudgeAssignment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JudgeController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:judges',
            'phone' => 'required|string|max:20|unique:judges',
            'password' => 'required|string|min:8|confirmed',
            'bio' => 'nullable|string|max:1000',
            'expertise_areas' => 'nullable|array',
            'qualification' => 'nullable|string|max:500',
            'organization' => 'nullable|string|max:255',
        ], [
            'first_name.required' => 'نام الزامی است',
            'last_name.required' => 'نام خانوادگی الزامی است',
            'email.required' => 'ایمیل الزامی است',
            'email.email' => 'فرمت ایمیل صحیح نیست',
            'email.unique' => 'این ایمیل قبلاً ثبت شده است',
            'phone.required' => 'شماره تماس الزامی است',
            'phone.unique' => 'این شماره تماس قبلاً ثبت شده است',
            'password.required' => 'رمز عبور الزامی است',
            'password.min' => 'رمز عبور باید حداقل 8 کاراکتر باشد',
            'password.confirmed' => 'تکرار رمز عبور مطابقت ندارد',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $judge = Judge::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => bcrypt($request->password),
            'bio' => $request->bio,
            'expertise_areas' => $request->expertise_areas,
            'qualification' => $request->qualification,
            'organization' => $request->organization,
            'verification_status' => 'pending', // Judges need admin approval
        ]);

        // Create access token
        $token = $judge->createToken('judge-token')->accessToken;

        // Store in session
        session([
            'user_type' => 'judge',
            'user_id' => $judge->id,
            'user_data' => $judge,
            'access_token' => $token,
        ]);

        return redirect()->route('judge.dashboard')->with('success', 'ثبت نام با موفقیت انجام شد. منتظر تایید مدیر باشید.');
    }

    public function updateProfile(Request $request)
    {
        $judge = auth()->guard('judge')->user();
        
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:judges,email,' . $judge->id,
            'phone' => 'required|string|max:20|unique:judges,phone,' . $judge->id,
            'bio' => 'nullable|string|max:1000',
            'expertise_areas' => 'nullable|array',
            'qualification' => 'nullable|string|max:500',
            'organization' => 'nullable|string|max:255',
        ], [
            'first_name.required' => 'نام الزامی است',
            'last_name.required' => 'نام خانوادگی الزامی است',
            'email.required' => 'ایمیل الزامی است',
            'email.email' => 'فرمت ایمیل صحیح نیست',
            'email.unique' => 'این ایمیل قبلاً ثبت شده است',
            'phone.required' => 'شماره تماس الزامی است',
            'phone.unique' => 'این شماره تماس قبلاً ثبت شده است',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $judge->update($request->only([
            'first_name', 'last_name', 'email', 'phone', 'bio',
            'expertise_areas', 'qualification', 'organization'
        ]));

        return back()->with('success', 'اطلاعات پروفایل با موفقیت بروزرسانی شد');
    }

    /**
     * Get judge dashboard statistics.
     */
    public function dashboardStats(Request $request)
    {
        $judge = $request->user();
        
        $assignedArtFields = $judge->assignments()->with('artField')->get();
        $assignedFieldIds = $assignedArtFields->pluck('art_field_id');
        $evaluatedArtIds = $judge->evaluations()->pluck('art_id');
        
        $pendingArtsCount = \App\Models\Art::whereIn('art_field_id', $assignedFieldIds)
            ->whereNotIn('id', $evaluatedArtIds)
            ->where('status', 'approved')
            ->count();
        
        $stats = [
            'total_assignments' => $assignedArtFields->count(),
            'pending_evaluations' => $pendingArtsCount,
            'completed_evaluations' => $judge->evaluations()->count(),
            'average_score' => $judge->evaluations()->avg('score') ?? 0,
        ];

        return response()->json($stats);
    }

    /**
     * Get assigned art fields for judge.
     */
    public function assignedArtFields(Request $request)
    {
        $judge = $request->user();
        
        $assignedArtFields = $judge->assignments()->with('artField')->get();
        $evaluatedArtIds = $judge->evaluations()->pluck('art_id');
        
        $artFields = $assignedArtFields->map(function ($assignment) use ($evaluatedArtIds) {
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

        return response()->json($artFields);
    }

    /**
     * Get pending evaluations for judge.
     */
    public function pendingEvaluations(Request $request)
    {
        $judge = $request->user();
        
        $assignedArtFields = $judge->assignments()->with('artField')->get();
        $assignedFieldIds = $assignedArtFields->pluck('art_field_id');
        $evaluatedArtIds = $judge->evaluations()->pluck('art_id');
        
        $pendingArts = \App\Models\Art::whereIn('art_field_id', $assignedFieldIds)
            ->whereNotIn('id', $evaluatedArtIds)
            ->where('status', 'approved')
            ->with(['artist', 'artField'])
            ->orderBy('created_at', 'desc')
            ->get();
        
        $pendingEvaluations = $pendingArts->map(function ($art) {
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

        return response()->json($pendingEvaluations);
    }

    /**
     * Get recent evaluations by judge.
     */
    public function recentEvaluations(Request $request)
    {
        $judge = $request->user();
        
        $recentEvaluations = $judge->evaluations()
            ->with(['art', 'art.artist'])
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

        return response()->json($recentEvaluations);
    }

    /**
     * Store evaluation for an artwork.
     */
    public function storeEvaluation(Request $request, $artId)
    {
        $userId = $request->session()->get('user_id');
        $judge = \App\Models\Judge::find($userId);
        
        if (!$judge) {
            return redirect()->route('login');
        }
        
        $art = \App\Models\Art::findOrFail($artId);
        
        // Check if judge is assigned to this art field
        $assignedFieldIds = $judge->assignments()->pluck('art_field_id');
        if (!$assignedFieldIds->contains($art->art_field_id)) {
            return back()->withErrors(['error' => 'شما مجاز به ارزیابی این اثر نیستید']);
        }
        
        // Check if already evaluated
        $existingEvaluation = $judge->evaluations()->where('art_id', $art->id)->first();
        if ($existingEvaluation) {
            return back()->withErrors(['error' => 'این اثر قبلاً ارزیابی شده است']);
        }
        
        $validator = \Validator::make($request->all(), [
            'score' => 'required|numeric|min:0|max:10',
            'comments' => 'nullable|string|max:2000',
            'criteria_scores' => 'nullable|array',
            'criteria_scores.*' => 'nullable|numeric|min:0|max:10',
        ], [
            'score.required' => 'امتیاز کلی الزامی است',
            'score.numeric' => 'امتیاز باید عدد باشد',
            'score.min' => 'امتیاز نباید کمتر از 0 باشد',
            'score.max' => 'امتیاز نباید بیشتر از 10 باشد',
        ]);
        
        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }
        
        $evaluation = \App\Models\ArtEvaluation::create([
            'art_id' => $art->id,
            'judge_id' => $judge->id,
            'score' => $request->score,
            'comments' => $request->comments,
            'criteria_scores' => $request->criteria_scores,
            'status' => 'submitted',
            'submitted_at' => now(),
        ]);
        
        return redirect()->route('judge.dashboard')->with('success', 'ارزیابی با موفقیت ثبت شد!');
    }
    
    /**
     * Update existing evaluation.
     */
    public function updateEvaluation(Request $request, $evaluationId)
    {
        $userId = $request->session()->get('user_id');
        $judge = \App\Models\Judge::find($userId);
        
        if (!$judge) {
            return redirect()->route('login');
        }
        
        $evaluation = \App\Models\ArtEvaluation::where('id', $evaluationId)
            ->where('judge_id', $judge->id)
            ->firstOrFail();
        
        $validator = \Validator::make($request->all(), [
            'score' => 'required|numeric|min:0|max:10',
            'comments' => 'nullable|string|max:2000',
            'criteria_scores' => 'nullable|array',
            'criteria_scores.*' => 'nullable|numeric|min:0|max:10',
        ], [
            'score.required' => 'امتیاز کلی الزامی است',
            'score.numeric' => 'امتیاز باید عدد باشد',
            'score.min' => 'امتیاز نباید کمتر از 0 باشد',
            'score.max' => 'امتیاز نباید بیشتر از 10 باشد',
        ]);
        
        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }
        
        $evaluation->update([
            'score' => $request->score,
            'comments' => $request->comments,
            'criteria_scores' => $request->criteria_scores,
            'status' => 'submitted',
            'submitted_at' => now(),
        ]);
        
        return redirect()->route('judge.dashboard')->with('success', 'ارزیابی با موفقیت به‌روزرسانی شد!');
    }

    /**
     * Calculate priority based on submission date.
     */
    private function calculatePriority($submittedAt)
    {
        $daysSinceSubmission = now()->diffInDays($submittedAt);
        
        if ($daysSinceSubmission >= 7) {
            return 'high';
        } elseif ($daysSinceSubmission >= 3) {
            return 'medium';
        } else {
            return 'low';
        }
    }
}
