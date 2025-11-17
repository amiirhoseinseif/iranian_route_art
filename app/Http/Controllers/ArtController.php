<?php

namespace App\Http\Controllers;

use App\Models\Art;
use App\Models\ArtField;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
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
        $userType = request()->session()->get('user_type');
        $userId = request()->session()->get('user_id');

        if ($userType !== 'artist' || !$userId) {
            // Store the intended URL in session for redirect after login
            $intendedUrl = request()->fullUrl();
            request()->session()->put('url.intended', $intendedUrl);
            return redirect()->route('login');
        }

        $artist = \App\Models\Artist::find($userId);
        if (!$artist) {
            return redirect()->route('login');
        }

        // Get art_field_id from query parameter
        $selectedArtFieldId = request()->query('art_field_id');

        $artFields = ArtField::active()
            ->with(['requirements' => function ($query) {
                $query->where('requirement_type', '!=', 'disabled')
                      ->orderBy('order')
                      ->orderBy('created_at');
            }])
            ->get()
            ->map(function (ArtField $field) {
                return [
                    'id' => $field->id,
                    'name' => $field->name,
                    'name_en' => $field->name_en,
                    'icon_name' => $field->icon_name,
                    'description' => $field->description,
                    'description_en' => $field->description_en,
                    'description_translated' => $field->description_translated,
                    'is_active' => $field->is_active,
                    'metadata' => $field->metadata ?? [],
                    'metadata_translated' => $field->metadata_translated,
                    'requirements' => $field->requirements->map(function ($requirement) {
                        return [
                            'id' => $requirement->id,
                            'art_field_id' => $requirement->art_field_id,
                            'field_name' => $requirement->field_name,
                            'display_name' => $requirement->display_name,
                            'display_name_en' => $requirement->display_name_en,
                            'display_name_translated' => $requirement->display_name_translated,
                            'requirement_type' => $requirement->requirement_type,
                            'field_type' => $requirement->field_type,
                            'description' => $requirement->description,
                            'description_en' => $requirement->description_en,
                            'description_translated' => $requirement->description_translated,
                            'validation_rules' => $requirement->validation_rules ?? [],
                            'order' => $requirement->order,
                        ];
                    })->values(),
                ];
            });
        
        // Validate selectedArtFieldId if provided
        if ($selectedArtFieldId) {
            $selectedArtFieldExists = $artFields->contains('id', (int) $selectedArtFieldId);
            if (!$selectedArtFieldExists) {
                $selectedArtFieldId = null;
            }
        }
        
        return Inertia::render('Artist/ArtCreate', [
            'artFields' => $artFields,
            'artist' => $artist,
            'selectedArtFieldId' => $selectedArtFieldId ? (int) $selectedArtFieldId : null,
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
        $locale = app()->getLocale();

        foreach ($fieldRequirements as $requirement) {
            $fieldName = $requirement->field_name;
            $validationRules = $requirement->validation_rules ?? [];

            $fieldRules = [];
            $fieldRules[] = $requirement->requirement_type === 'required' ? 'required' : 'nullable';

            switch ($requirement->field_type) {
                case 'file':
                case 'image':
                case 'audio':
                case 'video':
                    $allowMultiple = (bool) ($validationRules['allow_multiple'] ?? false);
                    if ($allowMultiple) {
                        $fieldRules[] = 'array';
                        if (isset($validationRules['min_items'])) {
                            $fieldRules[] = 'min:' . (int) $validationRules['min_items'];
                        }
                        if (isset($validationRules['max_items'])) {
                            $fieldRules[] = 'max:' . (int) $validationRules['max_items'];
                        }

                        $fileRules = ['file'];
                        if (!empty($validationRules['allowed_formats'])) {
                            $fileRules[] = 'mimes:' . implode(',', $validationRules['allowed_formats']);
                        }
                        if (isset($validationRules['max_size'])) {
                            $fileRules[] = 'max:' . (int) $validationRules['max_size'];
                        }

                        $rules[$fieldName . '.*'] = implode('|', $fileRules);
                    } else {
                        $fieldRules[] = 'file';
                        if (!empty($validationRules['allowed_formats'])) {
                            $fieldRules[] = 'mimes:' . implode(',', $validationRules['allowed_formats']);
                        }
                        if (isset($validationRules['max_size'])) {
                            $fieldRules[] = 'max:' . (int) $validationRules['max_size'];
                        }
                    }
                    break;

                case 'number':
                    $fieldRules[] = 'numeric';
                    if (isset($validationRules['min'])) {
                        $fieldRules[] = 'min:' . $validationRules['min'];
                    }
                    if (isset($validationRules['max'])) {
                        $fieldRules[] = 'max:' . $validationRules['max'];
                    }
                    break;

                case 'email':
                    $fieldRules[] = 'email';
                    break;

                case 'select':
                    $fieldRules[] = 'string';
                    if (!empty($validationRules['options'])) {
                        $fieldRules[] = Rule::in(array_values($validationRules['options']));
                    }
                    break;

                case 'multi_select':
                    $fieldRules[] = 'array';
                    if (isset($validationRules['min_items'])) {
                        $fieldRules[] = 'min:' . (int) $validationRules['min_items'];
                    }
                    if (isset($validationRules['max_items'])) {
                        $fieldRules[] = 'max:' . (int) $validationRules['max_items'];
                    }
                    if (!empty($validationRules['options'])) {
                        $rules[$fieldName . '.*'] = Rule::in(array_values($validationRules['options']));
                    }
                    break;

                default:
                    $fieldRules[] = 'string';
                    if (isset($validationRules['max_length'])) {
                        $fieldRules[] = 'max:' . (int) $validationRules['max_length'];
                    }
                    if (isset($validationRules['min_length'])) {
                        $fieldRules[] = 'min:' . (int) $validationRules['min_length'];
                    }
                    break;
            }

            if ($requirement->field_type === 'select' && isset($validationRules['options_by_country'])) {
                $dependentField = $validationRules['dependent_on'] ?? null;
                $fieldRules[] = function ($attribute, $value, $fail) use ($request, $validationRules, $dependentField, $locale) {
                    if (!$value) {
                        return;
                    }
                    if (!$dependentField) {
                        $fail($locale === 'fa' ? 'تنظیمات این فیلد تکمیل نشده است.' : 'Configuration for this field is incomplete.');
                        return;
                    }
                    $selectedCountry = $request->input($dependentField);
                    if (!$selectedCountry) {
                        $fail($locale === 'fa' ? 'ابتدا کشور را انتخاب کنید.' : 'Please select a country first.');
                        return;
                    }
                    $allowedOptions = $validationRules['options_by_country'][$selectedCountry] ?? [];
                    if (!in_array($value, $allowedOptions)) {
                        $fail($locale === 'fa' ? 'گزینه انتخاب شده معتبر نیست.' : 'The selected option is invalid.');
                    }
                };
            }

            $rules[$fieldName] = $fieldRules;
            $label = $requirement->display_name_translated;
            $messages[$fieldName . '.required'] = $locale === 'fa'
                ? $label . ' الزامی است'
                : $label . ' is required.';
        }

        // Validate dynamic fields
        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $titleSourceRequirement = $fieldRequirements->first(function ($req) {
            $fieldKey = (string) ($req->field_name ?? '');
            $display = (string) ($req->display_name ?? '');
            return Str::contains($fieldKey, ['title', 'name']) || Str::contains($display, ['عنوان', 'نام']);
        }) ?? $fieldRequirements->firstWhere('field_type', 'text') ?? $fieldRequirements->first();

        $descriptionSourceRequirement = $fieldRequirements->first(function ($req) {
            $fieldKey = (string) ($req->field_name ?? '');
            return in_array($req->field_type, ['textarea', 'text'], true)
                && Str::contains($fieldKey, ['description', 'statement', 'summary']);
        }) ?? $fieldRequirements->firstWhere('field_type', 'textarea') ?? $fieldRequirements->first();

        $titleValue = $titleSourceRequirement
            ? $request->input($titleSourceRequirement->field_name)
            : null;

        if (is_array($titleValue)) {
            $titleValue = implode(' / ', array_filter($titleValue));
        }

        $descriptionValue = $descriptionSourceRequirement
            ? $request->input($descriptionSourceRequirement->field_name)
            : null;

        if (is_array($descriptionValue)) {
            $descriptionValue = implode('\n', array_filter($descriptionValue));
        }

        // Create the art with basic information
        // Note: We keep some basic fields in the arts table for backward compatibility
        $art = Art::create([
            'artist_id' => $artist->id,
            'art_field_id' => $request->art_field_id,
            'title' => $request->input('title', $titleValue ?: ($locale === 'fa' ? 'بدون عنوان' : 'Untitled')),
            'description' => $request->input('description', $descriptionValue ?: ($locale === 'fa' ? 'بدون توضیحات' : 'No description provided')),
            'status' => 'pending',
            'metadata' => [
                'fields' => [],
            ],
        ]);

        $fieldSummaries = [];

        // Save dynamic field values
        foreach ($fieldRequirements as $requirement) {
            $fieldName = $requirement->field_name;
            $validationRules = $requirement->validation_rules ?? [];

            $value = null;
            $filePath = null;
            $metadataValue = null;

            if (in_array($requirement->field_type, ['file', 'image', 'audio', 'video'])) {
                $allowMultiple = (bool) ($validationRules['allow_multiple'] ?? false);
                if ($allowMultiple) {
                    $storedPaths = [];
                    $files = $request->file($fieldName, []);
                    if (is_array($files)) {
                        foreach ($files as $file) {
                            if ($file) {
                                $storedPaths[] = $file->store('arts/field_files/' . $fieldName, 'public');
                            }
                        }
                    }
                    if (!empty($storedPaths)) {
                        $value = json_encode($storedPaths, JSON_UNESCAPED_UNICODE);
                        $metadataValue = array_map(function ($path) {
                            return Storage::disk('public')->url($path);
                        }, $storedPaths);
                    }
                } else {
                    if ($request->hasFile($fieldName)) {
                        $file = $request->file($fieldName);
                        $filePath = $file->store('arts/field_files/' . $fieldName, 'public');
                        $metadataValue = Storage::disk('public')->url($filePath);
                    }
                }
            } elseif ($requirement->field_type === 'multi_select') {
                $selectedOptions = $request->input($fieldName, []);
                if (is_array($selectedOptions) && !empty($selectedOptions)) {
                    $normalizedOptions = array_values($selectedOptions);
                    $value = json_encode($normalizedOptions, JSON_UNESCAPED_UNICODE);
                    $metadataValue = $normalizedOptions;
                }
            } else {
                $inputValue = $request->input($fieldName);
                if (is_array($inputValue)) {
                    $value = json_encode($inputValue, JSON_UNESCAPED_UNICODE);
                    $metadataValue = $inputValue;
                } else {
                    $value = $inputValue;
                    $metadataValue = $inputValue;
                }
            }

            if ($value || $filePath || $requirement->requirement_type === 'required') {
                $artFieldValue = \App\Models\ArtFieldValue::create([
                    'art_id' => $art->id,
                    'field_requirement_id' => $requirement->id,
                    'value' => $value,
                    'file_path' => $filePath,
                ]);

                $fieldSummaries[] = [
                    'id' => $artFieldValue->id,
                    'field_requirement_id' => $requirement->id,
                    'field_name' => $requirement->field_name,
                    'display_name' => $requirement->display_name_translated,
                    'display_name_en' => $requirement->display_name_en,
                    'field_type' => $requirement->field_type,
                    'requirement_type' => $requirement->requirement_type,
                    'value' => $metadataValue,
                    'file_path' => $filePath ? Storage::disk('public')->url($filePath) : null,
                    'raw_value' => $value,
                ];
            }
        }

        $art->update([
            'metadata' => array_merge($art->metadata ?? [], [
                'fields' => $fieldSummaries,
            ]),
        ]);

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
