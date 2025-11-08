<?php

namespace App\Http\Controllers;

use App\Models\Art;
use App\Models\ArtField;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ArtController extends Controller
{
    public function index()
    {
        // Get artist from session
        $userType = request()->session()->get('user_type');
        $userId = request()->session()->get('user_id');
        
        if ($userType !== 'artist' || !$userId) {
            return redirect()->route('login');
        }
        
        $artist = \App\Models\Artist::find($userId);
        if (!$artist) {
            return redirect()->route('login');
        }
        
        $arts = $artist->arts()->with('artField')->latest()->get();
        
        return Inertia::render('Artist/Arts', [
            'arts' => $arts
        ]);
    }

    public function create()
    {
        $artFields = ArtField::active()->with(['requirements' => function($query) {
            $query->where('requirement_type', '!=', 'disabled')
                  ->orderBy('order')
                  ->orderBy('created_at');
        }])->get();
        
        return Inertia::render('Artist/ArtCreate', [
            'artFields' => $artFields
        ]);
    }

    public function store(Request $request)
    {
        // Get artist from session first
        $userType = $request->session()->get('user_type');
        $userId = $request->session()->get('user_id');
        
        if ($userType !== 'artist' || !$userId) {
            return back()->withErrors(['auth' => 'شما باید به عنوان هنرمند وارد شوید'])->withInput();
        }
        
        $artist = \App\Models\Artist::find($userId);
        if (!$artist) {
            return back()->withErrors(['auth' => 'هنرمند یافت نشد'])->withInput();
        }

        // Validate art_field_id
        $request->validate([
            'art_field_id' => 'required|exists:art_fields,id',
        ]);

        // Get field requirements for the selected art field
        $fieldRequirements = \App\Models\FieldRequirement::where('art_field_id', $request->art_field_id)
            ->where('requirement_type', '!=', 'disabled')
            ->orderBy('order')
            ->get();

        // Build dynamic validation rules based on field requirements
        $rules = [];
        $messages = [];

        foreach ($fieldRequirements as $requirement) {
            $fieldName = $requirement->field_name;
            $ruleString = $requirement->requirement_type === 'required' ? 'required' : 'nullable';

            // Add validation based on field type
            if (in_array($requirement->field_type, ['file', 'image', 'audio', 'video'])) {
                $ruleString .= '|file';
                
                // Add file type validation from validation_rules
                $validationRules = $requirement->validation_rules ?? [];
                if (isset($validationRules['allowed_formats'])) {
                    $mimes = implode(',', $validationRules['allowed_formats']);
                    $ruleString .= '|mimes:' . $mimes;
                }
                if (isset($validationRules['max_size'])) {
                    $ruleString .= '|max:' . $validationRules['max_size'];
                }
            } elseif ($requirement->field_type === 'number') {
                $ruleString .= '|numeric';
            } elseif ($requirement->field_type === 'email') {
                $ruleString .= '|email';
            } else {
                $ruleString .= '|string';
            }

            // Add max length from validation_rules
            $validationRules = $requirement->validation_rules ?? [];
            if (isset($validationRules['max_length'])) {
                $ruleString .= '|max:' . $validationRules['max_length'];
            }

            $rules[$fieldName] = $ruleString;
            $messages[$fieldName . '.required'] = ($requirement->display_name ?? $requirement->field_name) . ' الزامی است';
        }

        // Validate dynamic fields
        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Create the art with basic information
        // Note: We keep some basic fields in the arts table for backward compatibility
        $art = Art::create([
            'artist_id' => $artist->id,
            'art_field_id' => $request->art_field_id,
            'title' => $request->input('title', ''),
            'status' => 'pending',
        ]);

        // Save dynamic field values
        foreach ($fieldRequirements as $requirement) {
            $fieldName = $requirement->field_name;
            $value = null;
            $filePath = null;

            // Handle file fields
            if (in_array($requirement->field_type, ['file', 'image', 'audio', 'video'])) {
                if ($request->hasFile($fieldName)) {
                    $file = $request->file($fieldName);
                    $filePath = $file->store('arts/field_files/' . $fieldName, 'public');
                }
            } else {
                // Handle text fields
                $value = $request->input($fieldName);
            }

            // Only save if there's a value or it's required
            if ($value || $filePath || $requirement->requirement_type === 'required') {
                \App\Models\ArtFieldValue::create([
                    'art_id' => $art->id,
                    'field_requirement_id' => $requirement->id,
                    'value' => $value,
                    'file_path' => $filePath,
                ]);
            }
        }

        return redirect()->route('artist.arts')->with('success', 'اثر شما با موفقیت ثبت شد!');
    }

    public function show(Art $art)
    {
        $art->load(['artist', 'artField', 'evaluations.judge']);
        
        return Inertia::render('Artist/ArtShow', [
            'art' => $art
        ]);
    }

    public function edit(Art $art)
    {
        // Get artist from session
        $userType = request()->session()->get('user_type');
        $userId = request()->session()->get('user_id');
        
        if ($userType !== 'artist' || !$userId) {
            abort(403, 'شما مجاز به ویرایش این اثر نیستید');
        }
        
        // Check if the art belongs to the authenticated artist
        if ($art->artist_id !== $userId) {
            abort(403, 'شما مجاز به ویرایش این اثر نیستید');
        }

        $artFields = ArtField::active()->get();
        
        return Inertia::render('Artist/ArtEdit', [
            'art' => $art,
            'artFields' => $artFields
        ]);
    }

    public function update(Request $request, Art $art)
    {
        // Get artist from session
        $userType = $request->session()->get('user_type');
        $userId = $request->session()->get('user_id');
        
        if ($userType !== 'artist' || !$userId) {
            abort(403, 'شما مجاز به ویرایش این اثر نیستید');
        }
        
        // Check if the art belongs to the authenticated artist
        if ($art->artist_id !== $userId) {
            abort(403, 'شما مجاز به ویرایش این اثر نیستید');
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:2000',
            'art_field_id' => 'required|exists:art_fields,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
            'video_url' => 'nullable|url|max:500',
            'audio_url' => 'nullable|url|max:500',
            'tags' => 'nullable|string|max:500',
            'year_created' => 'nullable|integer|min:1300|max:1450',
        ], [
            'title.required' => 'عنوان اثر الزامی است',
            'description.required' => 'توضیحات اثر الزامی است',
            'art_field_id.required' => 'انتخاب رشته هنری الزامی است',
            'art_field_id.exists' => 'رشته هنری انتخاب شده معتبر نیست',
            'image.image' => 'فایل باید تصویر باشد',
            'image.mimes' => 'فرمت تصویر باید jpeg, png, jpg یا gif باشد',
            'image.max' => 'حجم تصویر نباید بیشتر از 10 مگابایت باشد',
            'video_url.url' => 'آدرس ویدیو باید معتبر باشد',
            'audio_url.url' => 'آدرس صدا باید معتبر باشد',
            'year_created.min' => 'سال ایجاد باید بعد از 1300 باشد',
            'year_created.max' => 'سال ایجاد باید قبل از 1450 باشد',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image
            if ($art->cover_image) {
                Storage::disk('public')->delete($art->cover_image);
            }
            
            $imagePath = $request->file('image')->store('arts/images', 'public');
        } else {
            $imagePath = $art->cover_image;
        }

        $art->update([
            'title' => $request->title,
            'description' => $request->description,
            'art_field_id' => $request->art_field_id,
            'cover_image' => $imagePath,
            'video_url' => $request->video_url,
            'audio_url' => $request->audio_url,
            'tags' => $request->tags,
            'year_created' => $request->year_created,
        ]);

        return redirect()->route('artist.arts')->with('success', 'اثر شما با موفقیت بروزرسانی شد!');
    }

    public function destroy(Art $art)
    {
        // Get artist from session
        $userType = request()->session()->get('user_type');
        $userId = request()->session()->get('user_id');
        
        if ($userType !== 'artist' || !$userId) {
            abort(403, 'شما مجاز به حذف این اثر نیستید');
        }
        
        // Check if the art belongs to the authenticated artist
        if ($art->artist_id !== $userId) {
            abort(403, 'شما مجاز به حذف این اثر نیستید');
        }

        // Delete image file
        if ($art->cover_image) {
            Storage::disk('public')->delete($art->cover_image);
        }

        $art->delete();

        return redirect()->route('artist.arts')->with('success', 'اثر شما با موفقیت حذف شد!');
    }
}
