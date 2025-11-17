<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\ArtField;
use App\Models\FieldRequirement;
use App\Models\Judge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;
use Inertia\Inertia;

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
     * Get list of art fields with metadata.
     */
    public function artFields()
    {
        $artFields = ArtField::orderBy('name')->get();

        return response()->json([
            'success' => true,
            'data' => $artFields,
        ]);
    }

    /**
     * Create a new art field with shared requirements.
     */
    public function storeArtField(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:art_fields,name',
            'name_en' => 'nullable|string|max:255',
            'icon_name' => 'nullable|string|max:255',
            'description' => 'required|string',
            'description_en' => 'nullable|string',
            'is_active' => 'boolean',
            'metadata' => 'nullable|array',
            'metadata.fa' => 'nullable|array',
            'metadata.en' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'خطا در اعتبارسنجی داده‌ها',
                'errors' => $validator->errors(),
            ], 422);
        }

        $metadata = $this->normalizeMetadata($request->input('metadata', []));

        $artField = ArtField::create([
            'name' => $request->name,
            'name_en' => $request->name_en,
            'icon_name' => $request->icon_name,
            'description' => $request->description,
            'description_en' => $request->description_en,
            'is_active' => $request->has('is_active') ? (bool) $request->is_active : true,
            'metadata' => $metadata,
        ]);

        $this->createSharedFieldRequirements($artField);

        return response()->json([
            'success' => true,
            'message' => 'رشته هنری جدید با موفقیت ایجاد شد',
            'data' => $artField->fresh(),
        ], 201);
    }

    /**
     * Update an art field basic info and metadata.
     */
    public function updateArtField(Request $request, ArtField $artField)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'name_en' => 'nullable|string|max:255',
            'icon_name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_en' => 'nullable|string',
            'is_active' => 'boolean',
            'metadata' => 'nullable|array',
            'metadata.fa' => 'nullable|array',
            'metadata.en' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'خطا در اعتبارسنجی داده‌ها',
                'errors' => $validator->errors(),
            ], 422);
        }

        $artField->update([
            'name' => $request->name,
            'name_en' => $request->name_en,
            'icon_name' => $request->icon_name,
            'description' => $request->description,
            'description_en' => $request->description_en,
            'is_active' => $request->has('is_active') ? (bool) $request->is_active : $artField->is_active,
            'metadata' => $this->normalizeMetadata($request->input('metadata', [])),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'اطلاعات رشته هنری با موفقیت بروزرسانی شد',
            'data' => $artField->fresh(),
        ]);
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
            'display_name_en' => 'nullable|string|max:255',
            'requirement_type' => 'required|in:required,optional,disabled',
            'field_type' => 'required|string|max:50',
            'description' => 'nullable|string',
            'description_en' => 'nullable|string',
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
            'display_name_en' => $request->display_name_en,
            'requirement_type' => $request->requirement_type,
            'field_type' => $request->field_type,
            'description' => $request->description,
            'description_en' => $request->description_en,
            'validation_rules' => $request->input('validation_rules', []),
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
            'display_name_en' => 'nullable|string|max:255',
            'requirement_type' => 'required|in:required,optional,disabled',
            'field_type' => 'required|string|max:50',
            'description' => 'nullable|string',
            'description_en' => 'nullable|string',
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
            'display_name_en' => $request->display_name_en,
            'requirement_type' => $request->requirement_type,
            'field_type' => $request->field_type,
            'description' => $request->description,
            'description_en' => $request->description_en,
            'validation_rules' => $request->input('validation_rules', []),
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
        $query = \App\Models\Art::with([
            'artist:id,first_name,last_name,email,phone',
            'artField:id,name,name_en,icon_name,description,description_en,metadata',
            'fieldValues.fieldRequirement'
        ]);

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhereHas('artist', function ($artistQuery) use ($search) {
                        $artistQuery->where('first_name', 'like', "%{$search}%")
                            ->orWhere('last_name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
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

        $arts->getCollection()->transform(function ($art) {
            return $this->prepareArtResource($art);
        });

        return response()->json($arts);
    }

    /**
     * Get single art with dynamic field values.
     */
    public function getArt(Request $request, \App\Models\Art $art)
    {
        $art->load([
            'artist:id,first_name,last_name,email,phone',
            'artField:id,name,name_en,icon_name,description,description_en,metadata',
            'fieldValues.fieldRequirement'
        ]);

        return response()->json([
            'data' => $this->prepareArtResource($art),
        ]);
    }

    /**
     * Update art status (approve / reject / pending).
     */
    public function updateArtStatus(Request $request, \App\Models\Art $art)
    {
        $validator = Validator::make($request->all(), [
            'status' => ['required', Rule::in(['pending', 'approved', 'rejected'])],
            'rejection_reason' => 'nullable|string|max:2000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'خطا در اعتبارسنجی داده‌ها',
                'errors' => $validator->errors(),
            ], 422);
        }

        $status = $request->status;
        $rejectionReason = $request->rejection_reason;
        $admin = $request->user('admin');

        $art->status = $status;

        if ($status === 'approved') {
            $art->rejection_reason = null;
            $art->approved_at = now();
            $art->approved_by = $admin?->id;
        } elseif ($status === 'rejected') {
            $art->rejection_reason = $rejectionReason;
            $art->approved_at = null;
            $art->approved_by = null;
        } else {
            $art->rejection_reason = null;
            $art->approved_at = null;
            $art->approved_by = null;
        }

        $art->save();

        $art->load([
            'artist:id,first_name,last_name,email,phone',
            'artField:id,name,name_en,icon_name,description,description_en,metadata',
            'fieldValues.fieldRequirement'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'وضعیت اثر با موفقیت بروزرسانی شد',
            'data' => $this->prepareArtResource($art),
        ]);
    }

    /**
     * Delete an art with its associated resources.
     */
    public function deleteArt(Request $request, \App\Models\Art $art)
    {
        $art->load('fieldValues');

        if ($art->cover_image) {
            Storage::disk('public')->delete($art->cover_image);
        }
        if ($art->art_file) {
            Storage::disk('public')->delete($art->art_file);
        }

        foreach ($art->fieldValues as $fieldValue) {
            if ($fieldValue->file_path) {
                Storage::disk('public')->delete($fieldValue->file_path);
            }
            $decoded = $this->normalizeFieldValueForResponse($fieldValue->value);
            foreach ($this->extractStoragePaths($decoded) as $path) {
                Storage::disk('public')->delete($path);
            }
        }

        $art->delete();

        return response()->json([
            'success' => true,
            'message' => 'اثر با موفقیت حذف شد',
        ]);
    }

    /**
     * Render detailed art view for admin dashboard.
     */
    public function viewArt(Request $request, \App\Models\Art $art)
    {
        $art->load([
            'artist:id,first_name,last_name,email,phone',
            'artField:id,name,name_en,icon_name,description,description_en,metadata',
            'fieldValues.fieldRequirement'
        ]);

        return Inertia::render('Admin/ArtShow', [
            'art' => $this->prepareArtResource($art),
        ]);
    }

    private function normalizeMetadata(array $metadata): array
    {
        $defaults = [
            'headline' => '',
            'submission_deadline' => '',
            'guidelines' => '',
            'notes' => '',
        ];

        $fa = $metadata['fa'] ?? $metadata ?? [];
        $en = $metadata['en'] ?? [];

        return [
            'fa' => array_merge($defaults, is_array($fa) ? $fa : []),
            'en' => array_merge($defaults, is_array($en) ? $en : []),
        ];
    }

    private function normalizeFieldValueForResponse($value)
    {
        if (is_null($value) || $value === '') {
            return null;
        }

        if (is_array($value)) {
            return $value;
        }

        if (is_string($value)) {
            $decoded = json_decode($value, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                return $decoded;
            }
        }

        return $value;
    }

    private function createSharedFieldRequirements(ArtField $artField): void
    {
        $shared = [
            [
                'field_name' => 'artist_statement',
                'display_name' => 'سخن هنرمند',
                'display_name_en' => 'Artist Statement',
                'requirement_type' => 'required',
                'field_type' => 'textarea',
                'description' => 'انگیزه‌ها و الهام‌های خود را حداکثر در ۳۵۰ کلمه بیان کنید.',
                'description_en' => 'Share your motivation and inspiration (max 350 words).',
                'validation_rules' => ['max_length' => 2000, 'rows' => 6],
                'order' => 900,
            ],
            [
                'field_name' => 'short_resume',
                'display_name' => 'رزومه کوتاه',
                'display_name_en' => 'Short Résumé',
                'requirement_type' => 'optional',
                'field_type' => 'textarea',
                'description' => 'سوابق هنری خود را حداکثر در ۱۵۰ کلمه بنویسید.',
                'description_en' => 'Summarise your artistic background (max 150 words).',
                'validation_rules' => ['max_length' => 1200, 'rows' => 4],
                'order' => 910,
            ],
            [
                'field_name' => 'country',
                'display_name' => 'کشور محل زندگی',
                'display_name_en' => 'Country of Residence',
                'requirement_type' => 'optional',
                'field_type' => 'select',
                'description' => 'کشوری که اکنون در آن زندگی می‌کنید.',
                'description_en' => 'The country you currently live in.',
                'validation_rules' => [
                    'options' => ['ایران', 'آلمان', 'فرانسه', 'ژاپن', 'ایالات متحده', 'کانادا', 'استرالیا'],
                ],
                'order' => 920,
            ],
            [
                'field_name' => 'city',
                'display_name' => 'شهر',
                'display_name_en' => 'City',
                'requirement_type' => 'optional',
                'field_type' => 'select',
                'description' => 'پس از انتخاب کشور، شهر محل زندگی خود را مشخص کنید.',
                'description_en' => 'Select your city after choosing the country.',
                'validation_rules' => [
                    'dependent_on' => 'country',
                    'options_by_country' => [
                        'ایران' => ['تهران', 'اصفهان', 'شیراز', 'تبریز', 'مشهد', 'رشت', 'اهواز'],
                        'آلمان' => ['برلین', 'مونیخ', 'هامبورگ', 'کلن'],
                        'فرانسه' => ['پاریس', 'لیون', 'مارسی', 'لیل'],
                        'ژاپن' => ['توکیو', 'اوزاکا', 'کیوتو', 'یوکوهاما'],
                        'ایالات متحده' => ['نیویورک', 'لس‌آنجلس', 'شیکاگو', 'سان‌فرانسیسکو'],
                        'کانادا' => ['تورنتو', 'ونکوور', 'مونترآل', 'اتاوا'],
                        'استرالیا' => ['سیدنی', 'ملبورن', 'بریزبین', 'ادلیید'],
                    ],
                ],
                'order' => 930,
            ],
        ];

        foreach ($shared as $config) {
            FieldRequirement::updateOrCreate(
                [
                    'art_field_id' => $artField->id,
                    'field_name' => $config['field_name'],
                ],
                [
                    'display_name' => $config['display_name'],
                    'display_name_en' => $config['display_name_en'],
                    'requirement_type' => $config['requirement_type'],
                    'field_type' => $config['field_type'],
                    'description' => $config['description'],
                    'description_en' => $config['description_en'],
                    'validation_rules' => $config['validation_rules'],
                    'order' => $config['order'],
                ]
            );
        }
    }

    private function prepareArtResource(\App\Models\Art $art): array
    {
        $art->loadMissing([
            'artist:id,first_name,last_name,email,phone',
            'artField:id,name,name_en,icon_name,description,description_en,metadata',
            'fieldValues.fieldRequirement'
        ]);

        $fieldValues = $art->fieldValues->map(function ($fieldValue) {
            $requirement = $fieldValue->fieldRequirement;
            $normalizedValue = $this->normalizeFieldValueForResponse($fieldValue->value);

            $files = [];
            if ($fieldValue->file_path) {
                $files[] = $this->resolveFileUrl($fieldValue->file_path);
            }

            $displayValue = $this->convertValueAndCollectFiles($normalizedValue, $files);

            $files = array_values(array_unique(array_filter($files)));

            $displayNameFa = $requirement?->display_name;
            $displayNameEn = $requirement?->display_name_en;

            return [
                'id' => $fieldValue->id,
                'field_requirement_id' => $fieldValue->field_requirement_id,
                'field_name' => $requirement?->field_name,
                'display_name' => $requirement?->display_name_translated ?? $displayNameFa ?? $displayNameEn ?? $requirement?->field_name,
                'display_name_fa' => $displayNameFa,
                'display_name_en' => $displayNameEn,
                'field_type' => $requirement?->field_type,
                'requirement_type' => $requirement?->requirement_type,
                'value' => $displayValue,
                'raw_value' => $fieldValue->value,
                'files' => $files,
            ];
        })->values();

        $fieldsArray = $fieldValues->toArray();

        $countryField = $fieldValues->firstWhere('field_name', 'country');
        $cityField = $fieldValues->firstWhere('field_name', 'city');

        $countryValue = $countryField['value'] ?? null;
        $cityValue = $cityField['value'] ?? null;

        $country = $this->flattenValueToString($countryValue);
        $city = $this->flattenValueToString($cityValue);

        return [
            'id' => $art->id,
            'artist_id' => $art->artist_id,
            'art_field_id' => $art->art_field_id,
            'title' => $art->title,
            'description' => $art->description,
            'status' => $art->status,
            'rejection_reason' => $art->rejection_reason,
            'approved_at' => $art->approved_at,
            'approved_by' => $art->approved_by,
            'created_at' => $art->created_at,
            'updated_at' => $art->updated_at,
            'metadata' => $art->metadata ?? [],
            'artist' => $art->artist ? [
                'id' => $art->artist->id,
                'first_name' => $art->artist->first_name,
                'last_name' => $art->artist->last_name,
                'email' => $art->artist->email,
                'phone' => $art->artist->phone,
                'country' => $country,
                'city' => $city,
            ] : null,
            'art_field' => $art->artField ? [
                'id' => $art->artField->id,
                'name' => $art->artField->name,
                'name_en' => $art->artField->name_en,
                'icon_name' => $art->artField->icon_name,
                'description' => $art->artField->description,
                'description_en' => $art->artField->description_en,
                'description_translated' => $art->artField->description_translated,
                'metadata' => $art->artField->metadata,
                'metadata_translated' => $art->artField->metadata_translated,
            ] : null,
            'field_values' => $fieldValues,
            'field_details' => $fieldValues,
        ];
    }

    private function resolveFileUrl(?string $path): ?string
    {
        if (!$path) {
            return null;
        }

        if (Str::startsWith($path, ['http://', 'https://', '/storage/'])) {
            return $path;
        }

        return Storage::disk('public')->url($path);
    }

    private function convertValueAndCollectFiles($value, array &$files)
    {
        if (is_array($value)) {
            return array_map(function ($item) use (&$files) {
                return $this->convertValueAndCollectFiles($item, $files);
            }, $value);
        }

        if (is_string($value) && Str::startsWith($value, ['arts/'])) {
            $url = $this->resolveFileUrl($value);
            $files[] = $url;
            return $url;
        }

        return $value;
    }

    private function flattenValueToString($value): ?string
    {
        if (is_null($value)) {
            return null;
        }

        if (is_string($value)) {
            return $value;
        }

        if (is_array($value)) {
            $flattened = array_filter(array_map(function ($item) {
                return $this->flattenValueToString($item);
            }, $value));

            return !empty($flattened) ? implode(' / ', $flattened) : null;
        }

        return (string) $value;
    }

    private function extractStoragePaths($value): array
    {
        $paths = [];

        if (is_array($value)) {
            foreach ($value as $item) {
                $paths = array_merge($paths, $this->extractStoragePaths($item));
            }
        } elseif (is_string($value) && Str::startsWith($value, ['arts/'])) {
            $paths[] = $value;
        }

        return $paths;
    }
}