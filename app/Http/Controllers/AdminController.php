<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Judge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
    /**
     * Display a listing of admins.
     */
    public function index()
    {
        $admins = Admin::orderBy('created_at', 'desc')->paginate(10);
        return response()->json($admins);
    }

    /**
     * Store a newly created admin.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:admins,email',
            'phone' => 'required|string|max:20',
            'password' => 'required|string|min:8',
            'role' => ['required', Rule::in(['super_admin', 'admin', 'moderator'])],
            'permissions' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'خطا در اعتبارسنجی داده‌ها',
                'errors' => $validator->errors()
            ], 422);
        }

        $admin = Admin::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'permissions' => $request->permissions ?? [],
            'is_active' => true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'مدیر جدید با موفقیت اضافه شد',
            'data' => $admin
        ], 201);
    }

    /**
     * Display the specified admin.
     */
    public function show(Admin $admin)
    {
        return response()->json($admin);
    }

    /**
     * Update the specified admin.
     */
    public function update(Request $request, Admin $admin)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('admins')->ignore($admin->id)],
            'phone' => 'required|string|max:20',
            'password' => 'nullable|string|min:8',
            'role' => ['required', Rule::in(['super_admin', 'admin', 'moderator'])],
            'permissions' => 'nullable|array',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'خطا در اعتبارسنجی داده‌ها',
                'errors' => $validator->errors()
            ], 422);
        }

        $updateData = [
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'role' => $request->role,
            'permissions' => $request->permissions ?? $admin->permissions,
            'is_active' => $request->has('is_active') ? $request->is_active : $admin->is_active,
        ];

        if ($request->filled('password')) {
            $updateData['password'] = Hash::make($request->password);
        }

        $admin->update($updateData);

        return response()->json([
            'success' => true,
            'message' => 'اطلاعات مدیر با موفقیت به‌روزرسانی شد',
            'data' => $admin
        ]);
    }

    /**
     * Remove the specified admin.
     */
    public function destroy(Admin $admin)
    {
        // Prevent deletion of super admin
        if ($admin->role === 'super_admin') {
            return response()->json([
                'success' => false,
                'message' => 'امکان حذف مدیر اصلی وجود ندارد'
            ], 403);
        }

        $admin->delete();

        return response()->json([
            'success' => true,
            'message' => 'مدیر با موفقیت حذف شد'
        ]);
    }

    /**
     * Get pending judges for approval.
     */
    public function pendingJudges()
    {
        $judges = Judge::pending()->with(['assignments', 'evaluations'])->paginate(10);
        return response()->json($judges);
    }

    /**
     * Approve a judge.
     */
    public function approveJudge(Request $request, Judge $judge)
    {
        $validator = Validator::make($request->all(), [
            'verification_status' => ['required', Rule::in(['approved', 'rejected'])],
            'rejection_reason' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'خطا در اعتبارسنجی داده‌ها',
                'errors' => $validator->errors()
            ], 422);
        }

        $judge->update([
            'verification_status' => $request->verification_status,
            'rejection_reason' => $request->rejection_reason,
            'verified_at' => $request->verification_status === 'approved' ? now() : null,
        ]);

        $message = $request->verification_status === 'approved' 
            ? 'داور با موفقیت تایید شد' 
            : 'داور رد شد';

        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $judge
        ]);
    }

    /**
     * Get all judges with their verification status.
     */
    public function judges()
    {
        $judges = Judge::with(['assignments', 'evaluations'])
            ->orderBy('verification_status')
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        
        return response()->json($judges);
    }

    /**
     * Get dashboard statistics.
     */
    public function dashboardStats()
    {
        $stats = [
            'total_artists' => \App\Models\Artist::count(),
            'total_arts' => \App\Models\Art::count(),
            'total_judges' => Judge::count(),
            'pending_judges' => Judge::pending()->count(),
            'verified_judges' => Judge::verified()->count(),
            'rejected_judges' => Judge::rejected()->count(),
            'total_admins' => Admin::count(),
            'pending_arts' => \App\Models\Art::where('status', 'pending')->count(),
            'approved_arts' => \App\Models\Art::where('status', 'approved')->count(),
            'rejected_arts' => \App\Models\Art::where('status', 'rejected')->count(),
        ];

        return response()->json($stats);
    }

    /**
     * Get recent activities.
     */
    public function recentActivities()
    {
        $activities = collect();

        // Recent artists
        $recentArtists = \App\Models\Artist::with('artField')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($artist) {
                return [
                    'type' => 'artist_registered',
                    'message' => 'هنرمند جدید ثبت نام کرد',
                    'user' => $artist->first_name . ' ' . $artist->last_name,
                    'time' => $artist->created_at,
                    'status' => 'success'
                ];
            });

        // Recent arts
        $recentArts = \App\Models\Art::with(['artist', 'artField'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($art) {
                return [
                    'type' => 'art_submitted',
                    'message' => 'اثر جدید ارسال شد',
                    'user' => $art->artist->first_name . ' ' . $art->artist->last_name,
                    'art_title' => $art->title,
                    'time' => $art->created_at,
                    'status' => 'info'
                ];
            });

        // Recent judges
        $recentJudges = Judge::orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($judge) {
                return [
                    'type' => 'judge_registered',
                    'message' => 'داور جدید ثبت نام کرد',
                    'user' => $judge->first_name . ' ' . $judge->last_name,
                    'time' => $judge->created_at,
                    'status' => 'warning'
                ];
            });

        // Recent art evaluations
        $recentEvaluations = \App\Models\ArtEvaluation::with(['art', 'art.artist', 'judge'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($evaluation) {
                return [
                    'type' => 'art_evaluated',
                    'message' => 'اثر ارزیابی شد',
                    'user' => $evaluation->judge->first_name . ' ' . $evaluation->judge->last_name,
                    'art_title' => $evaluation->art->title,
                    'score' => $evaluation->score,
                    'time' => $evaluation->created_at,
                    'status' => 'success'
                ];
            });

        // Merge all activities and sort by time
        $allActivities = $activities
            ->merge($recentArtists)
            ->merge($recentArts)
            ->merge($recentJudges)
            ->merge($recentEvaluations)
            ->sortByDesc('time')
            ->take(10)
            ->values();

        return response()->json($allActivities);
    }

    /**
     * Get artists with pagination and filters.
     */
    public function getArtists(Request $request)
    {
        $query = \App\Models\Artist::with('artField');

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->has('art_field_id')) {
            $query->where('art_field_id', $request->art_field_id);
        }

        $artists = $query->orderBy('created_at', 'desc')->paginate(15);

        return response()->json($artists);
    }

    /**
     * Get arts with pagination and filters.
     */
    public function getArts(Request $request)
    {
        $query = \App\Models\Art::with(['artist', 'artField']);

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhereHas('artist', function ($artistQuery) use ($search) {
                      $artistQuery->where('first_name', 'like', "%{$search}%")
                                 ->orWhere('last_name', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('art_field_id')) {
            $query->where('art_field_id', $request->art_field_id);
        }

        $arts = $query->orderBy('created_at', 'desc')->paginate(15);

        return response()->json($arts);
    }

    /**
     * Get field requirements for an art field
     */
    public function getFieldRequirements(Request $request, $artFieldId)
    {
        $requirements = \App\Models\FieldRequirement::where('art_field_id', $artFieldId)
            ->orderBy('order')
            ->orderBy('created_at')
            ->get();

        return response()->json($requirements);
    }

    /**
     * Store a new field requirement
     */
    public function storeFieldRequirement(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'art_field_id' => 'required|exists:art_fields,id',
            'field_name' => 'required|string|max:255',
            'display_name' => 'required|string|max:255',
            'requirement_type' => 'required|in:required,optional,disabled',
            'field_type' => 'required|string|max:50',
            'description' => 'nullable|string',
            'validation_rules' => 'nullable|array',
            'order' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'خطا در اعتبارسنجی داده‌ها',
                'errors' => $validator->errors()
            ], 422);
        }

        $requirement = \App\Models\FieldRequirement::create([
            'art_field_id' => $request->art_field_id,
            'field_name' => $request->field_name,
            'display_name' => $request->display_name,
            'requirement_type' => $request->requirement_type,
            'field_type' => $request->field_type,
            'description' => $request->description,
            'validation_rules' => $request->validation_rules ?? [],
            'order' => $request->order ?? 0,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'فیلد با موفقیت اضافه شد',
            'data' => $requirement
        ], 201);
    }

    /**
     * Update a field requirement
     */
    public function updateFieldRequirement(Request $request, $id)
    {
        $requirement = \App\Models\FieldRequirement::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'display_name' => 'required|string|max:255',
            'requirement_type' => 'required|in:required,optional,disabled',
            'field_type' => 'required|string|max:50',
            'description' => 'nullable|string',
            'validation_rules' => 'nullable|array',
            'order' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'خطا در اعتبارسنجی داده‌ها',
                'errors' => $validator->errors()
            ], 422);
        }

        $requirement->update([
            'display_name' => $request->display_name,
            'requirement_type' => $request->requirement_type,
            'field_type' => $request->field_type,
            'description' => $request->description,
            'validation_rules' => $request->validation_rules ?? [],
            'order' => $request->order ?? $requirement->order,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'فیلد با موفقیت بروزرسانی شد',
            'data' => $requirement
        ]);
    }

    /**
     * Delete a field requirement
     */
    public function deleteFieldRequirement($id)
    {
        $requirement = \App\Models\FieldRequirement::findOrFail($id);
        $requirement->delete();

        return response()->json([
            'success' => true,
            'message' => 'فیلد با موفقیت حذف شد'
        ]);
    }
}