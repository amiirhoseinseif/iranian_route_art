<?php

namespace App\Http\Controllers;

use App\Models\Art;
use App\Models\ArtField;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
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
        $isAuthenticated = ($userType === 'artist' && $userId);
        
        $artist = null;
        if ($isAuthenticated) {
            $artist = \App\Models\Artist::find($userId);
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
            'isAuthenticated' => $isAuthenticated,
            'selectedArtFieldId' => $selectedArtFieldId ? (int) $selectedArtFieldId : null,
        ]);
    }

    public function store(Request $request)
    {
        // Log PHP upload settings for debugging
        Log::info('PHP Upload Settings', [
            'upload_max_filesize' => ini_get('upload_max_filesize'),
            'post_max_size' => ini_get('post_max_size'),
            'max_execution_time' => ini_get('max_execution_time'),
            'max_input_time' => ini_get('max_input_time'),
            'memory_limit' => ini_get('memory_limit'),
            'content_length' => $request->header('Content-Length'),
        ]);

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
        
        // Verify S3 configuration
        $bucket = config('filesystems.disks.s3.bucket');
        $key = config('filesystems.disks.s3.key');
        $secret = config('filesystems.disks.s3.secret');
        
        if (empty($bucket) || empty($key) || empty($secret)) {
            Log::error('S3 configuration is incomplete', [
                'bucket_set' => !empty($bucket),
                'key_set' => !empty($key),
                'secret_set' => !empty($secret)
            ]);
            return back()->withErrors(['general' => 'خطا در پیکربندی ذخیره‌سازی فایل. لطفاً با مدیر سیستم تماس بگیرید.'])->withInput();
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

        // Check for PHP upload errors before validation
        $phpUploadErrors = [];
        foreach ($fieldRequirements as $requirement) {
            if (in_array($requirement->field_type, ['file', 'image', 'audio', 'video'])) {
                $fieldName = $requirement->field_name;
                
                // Check if file was uploaded
                if ($request->hasFile($fieldName)) {
                    $file = $request->file($fieldName);
                    if ($file && $file->isValid()) {
                        // File is valid, continue
                        continue;
                    } elseif ($file) {
                        // File exists but has an error
                        $errorCode = $file->getError();
                        if ($errorCode !== UPLOAD_ERR_OK) {
                            $errorMessage = $this->getUploadErrorMessage($errorCode, $requirement->display_name_translated);
                            $phpUploadErrors[$fieldName] = $errorMessage;
                        }
                    }
                } elseif ($request->has($fieldName)) {
                    // Field was sent but no file - check $_FILES for error
                    if (isset($_FILES[$fieldName]) && isset($_FILES[$fieldName]['error'])) {
                        $errorCode = $_FILES[$fieldName]['error'];
                        if ($errorCode !== UPLOAD_ERR_OK && $errorCode !== UPLOAD_ERR_NO_FILE) {
                            $errorMessage = $this->getUploadErrorMessage($errorCode, $requirement->display_name_translated);
                            $phpUploadErrors[$fieldName] = $errorMessage;
                        }
                    }
                }
            }
        }

        if (!empty($phpUploadErrors)) {
            return back()->withErrors($phpUploadErrors)->withInput();
        }

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
                        
                        // Add custom error messages for array file uploads
                        $label = $requirement->display_name_translated;
                        $maxSizeKB = (int) ($validationRules['max_size'] ?? 0);
                        $maxSizeMB = round($maxSizeKB / 1024, 2);
                        $messages[$fieldName . '.*.file'] = $locale === 'fa'
                            ? $label . ' باید یک فایل معتبر باشد.'
                            : $label . ' must be a valid file.';
                        $messages[$fieldName . '.*.mimes'] = $locale === 'fa'
                            ? $label . ' باید یکی از فرمت‌های مجاز باشد: ' . implode(', ', $validationRules['allowed_formats'] ?? [])
                            : $label . ' must be one of the allowed formats: ' . implode(', ', $validationRules['allowed_formats'] ?? []);
                        $messages[$fieldName . '.*.max'] = $locale === 'fa'
                            ? $label . ' نباید بیشتر از ' . $maxSizeMB . ' مگابایت باشد.'
                            : $label . ' must not be larger than ' . $maxSizeMB . ' MB.';
                    } else {
                        $fieldRules[] = 'file';
                        if (!empty($validationRules['allowed_formats'])) {
                            $fieldRules[] = 'mimes:' . implode(',', $validationRules['allowed_formats']);
                        }
                        if (isset($validationRules['max_size'])) {
                            $fieldRules[] = 'max:' . (int) $validationRules['max_size'];
                        }
                        
                        // Add custom error messages for single file uploads
                        $label = $requirement->display_name_translated;
                        $maxSizeKB = (int) ($validationRules['max_size'] ?? 0);
                        $maxSizeMB = round($maxSizeKB / 1024, 2);
                        $messages[$fieldName . '.file'] = $locale === 'fa'
                            ? $label . ' باید یک فایل معتبر باشد.'
                            : $label . ' must be a valid file.';
                        $messages[$fieldName . '.mimes'] = $locale === 'fa'
                            ? $label . ' باید یکی از فرمت‌های مجاز باشد: ' . implode(', ', $validationRules['allowed_formats'] ?? [])
                            : $label . ' must be one of the allowed formats: ' . implode(', ', $validationRules['allowed_formats'] ?? []);
                        $messages[$fieldName . '.max'] = $locale === 'fa'
                            ? $label . ' نباید بیشتر از ' . $maxSizeMB . ' مگابایت باشد.'
                            : $label . ' must not be larger than ' . $maxSizeMB . ' MB.';
                        $messages[$fieldName . '.uploaded'] = $locale === 'fa'
                            ? $label . ' آپلود نشد. لطفاً بررسی کنید که فایل خیلی بزرگ نباشد و دوباره تلاش کنید.'
                            : $label . ' failed to upload. Please check that the file is not too large and try again.';
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

        // Log validation rules for debugging
        Log::info('File Upload Validation Rules', [
            'rules' => $rules,
            'messages' => $messages,
        ]);

        // Validate dynamic fields
        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            Log::error('Validation Failed', [
                'errors' => $validator->errors()->toArray(),
                'input' => array_keys($request->all()),
                'files' => array_keys($request->allFiles()),
            ]);
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
                                try {
                                    // Try to store in S3
                                    $storedPath = $file->store('arts/field_files/' . $fieldName, 's3');
                                    
                                    if (!empty($storedPath) && trim($storedPath) !== '') {
                                        // If store() returned a path, assume it's stored successfully
                                        // Don't check exists() as it might fail even if file is stored
                                        $storedPaths[] = $storedPath;
                                        Log::info('File stored in S3', [
                                            'path' => $storedPath,
                                            'field' => $fieldName,
                                            'file' => $file->getClientOriginalName()
                                        ]);
                                    } else {
                                        // If store() returned empty, try public disk
                                        Log::warning('S3 store returned empty path, trying public disk', [
                                            'field' => $fieldName
                                        ]);
                                        $publicPath = $file->store('arts/field_files/' . $fieldName, 'public');
                                        if ($publicPath) {
                                            $storedPaths[] = $publicPath;
                                        }
                                    }
                                } catch (\Exception $e) {
                                    Log::error('Failed to store file in S3, trying public disk', [
                                        'error' => $e->getMessage(),
                                        'field' => $fieldName,
                                        'file' => $file->getClientOriginalName(),
                                        'trace' => $e->getTraceAsString()
                                    ]);
                                    // Fallback to public disk
                                    try {
                                        $publicPath = $file->store('arts/field_files/' . $fieldName, 'public');
                                        if ($publicPath) {
                                            $storedPaths[] = $publicPath;
                                            Log::info('File stored in public disk as fallback', [
                                                'path' => $publicPath,
                                                'field' => $fieldName
                                            ]);
                                        }
                                    } catch (\Exception $e2) {
                                        Log::error('Failed to store file in public disk as well', [
                                            'error' => $e2->getMessage()
                                        ]);
                                    }
                                }
                            }
                        }
                    }
                    if (!empty($storedPaths)) {
                        // Filter out empty paths
                        $storedPaths = array_filter($storedPaths, function($path) {
                            return !empty($path) && trim($path) !== '';
                        });
                        
                        if (!empty($storedPaths)) {
                            $value = json_encode(array_values($storedPaths), JSON_UNESCAPED_UNICODE);
                            $metadataValue = array_map(function ($path) {
                                if (empty($path) || trim($path) === '') {
                                    return null;
                                }
                                try {
                                    return Storage::disk('s3')->url($path);
                                } catch (\Exception $e) {
                                    Log::error('Failed to generate S3 URL', [
                                        'path' => $path,
                                        'error' => $e->getMessage(),
                                        'bucket' => config('filesystems.disks.s3.bucket')
                                    ]);
                                    return null;
                                }
                            }, array_values($storedPaths));
                            $metadataValue = array_filter($metadataValue); // Remove null values
                        }
                    }
                } else {
                    if ($request->hasFile($fieldName)) {
                        $file = $request->file($fieldName);
                        try {
                            // Try to store in S3
                            $filePath = $file->store('arts/field_files/' . $fieldName, 's3');
                            
                            // Validate filePath is not empty
                            if (!empty($filePath) && trim($filePath) !== '') {
                                // If store() returned a path, assume it's stored successfully
                                // Try to generate URL (don't check exists as it might fail)
                                try {
                                    $metadataValue = Storage::disk('s3')->url($filePath);
                                    Log::info('File stored in S3', [
                                        'path' => $filePath,
                                        'field' => $fieldName,
                                        'file' => $file->getClientOriginalName(),
                                        'url' => $metadataValue
                                    ]);
                                } catch (\Exception $e) {
                                    // If URL generation fails, try public disk
                                    Log::warning('S3 URL generation failed, trying public disk', [
                                        'path' => $filePath,
                                        'error' => $e->getMessage()
                                    ]);
                                    $publicPath = $file->store('arts/field_files/' . $fieldName, 'public');
                                    if ($publicPath) {
                                        $filePath = $publicPath;
                                        $metadataValue = Storage::disk('public')->url($publicPath);
                                    } else {
                                        $filePath = null;
                                        $metadataValue = null;
                                    }
                                }
                            } else {
                                // If store() returned empty, try public disk
                                Log::warning('S3 store returned empty path, trying public disk', [
                                    'field' => $fieldName
                                ]);
                                $publicPath = $file->store('arts/field_files/' . $fieldName, 'public');
                                if ($publicPath) {
                                    $filePath = $publicPath;
                                    $metadataValue = Storage::disk('public')->url($publicPath);
                                } else {
                                    $filePath = null;
                                    $metadataValue = null;
                                }
                            }
                        } catch (\Exception $e) {
                            Log::error('Failed to store file in S3, trying public disk', [
                                'error' => $e->getMessage(),
                                'field' => $fieldName,
                                'file' => $file->getClientOriginalName(),
                                'trace' => $e->getTraceAsString()
                            ]);
                            // Fallback to public disk
                            try {
                                $publicPath = $file->store('arts/field_files/' . $fieldName, 'public');
                                if ($publicPath) {
                                    $filePath = $publicPath;
                                    $metadataValue = Storage::disk('public')->url($publicPath);
                                    Log::info('File stored in public disk as fallback', [
                                        'path' => $publicPath,
                                        'field' => $fieldName
                                    ]);
                                } else {
                                    $filePath = null;
                                    $metadataValue = null;
                                }
                            } catch (\Exception $e2) {
                                Log::error('Failed to store file in public disk as well', [
                                    'error' => $e2->getMessage()
                                ]);
                                $filePath = null;
                                $metadataValue = null;
                            }
                        }
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
                    'file_path' => $filePath ? Storage::disk('s3')->url($filePath) : null,
                    'raw_value' => $value,
                ];
            }
        }

        $art->update([
            'metadata' => array_merge($art->metadata ?? [], [
                'fields' => $fieldSummaries,
            ]),
        ]);

        // Prepare success messages for art registration
        if (app()->getLocale() === 'fa') {
            $artRegistrationMessages = [
                'هنرمند گرامی، اثر هنری شما در جشنواره مسیر ایران ثبت شد.',
                'اثر شما به همراه مشخصات، برای هیئت بازبین جشنواره در رشته مربوطه ارسال میشود.',
                'درصورت پذیرفته شدن اثر، از طرف جشنواره پیام تبریک به آدرس ایمیل شما ارسال خواهد شد.',
            ];
        } else {
            $artRegistrationMessages = [
                'Dear artist, your artwork has been registered in the Iran Route Festival.',
                'Your artwork along with its details will be sent to the festival\'s review committee in the relevant field.',
                'If your artwork is accepted, a congratulatory message will be sent to your email address from the festival.',
            ];
        }

        return redirect()->route('artist.arts')
            ->with('success', app()->getLocale() === 'fa' 
                ? 'اثر شما با موفقیت ثبت شد!' 
                : 'Your artwork has been successfully submitted!')
            ->with('art_registration_success', $artRegistrationMessages);
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
            if ($art->cover_image && !empty(trim($art->cover_image))) {
                try {
                    if (Storage::disk('s3')->exists($art->cover_image)) {
                        Storage::disk('s3')->delete($art->cover_image);
                    } elseif (Storage::disk('public')->exists($art->cover_image)) {
                        Storage::disk('public')->delete($art->cover_image);
                    }
                } catch (\Exception $e) {
                    // Log error but continue
                    Log::warning('Failed to delete old cover_image: ' . $e->getMessage());
                }
            }
            
            try {
                // Check S3 configuration before storing
                $bucket = config('filesystems.disks.s3.bucket');
                if (empty($bucket)) {
                    Log::error('S3 bucket not configured');
                    return back()->withErrors(['image' => 'خطا در پیکربندی S3'])->withInput();
                }
                
                $imagePath = $request->file('image')->store('arts/images', 's3');
                
                // Validate imagePath is not empty and file exists
                if (empty($imagePath) || trim($imagePath) === '') {
                    Log::error('Image path is empty after store', [
                        'bucket' => $bucket
                    ]);
                    return back()->withErrors(['image' => 'خطا در ذخیره تصویر'])->withInput();
                }
                
                // Verify file was actually stored
                if (!Storage::disk('s3')->exists($imagePath)) {
                    Log::error('Image stored but not found in S3', [
                        'path' => $imagePath,
                        'bucket' => $bucket
                    ]);
                    return back()->withErrors(['image' => 'خطا در ذخیره تصویر در S3'])->withInput();
                }
                
                Log::info('Image successfully stored in S3', [
                    'path' => $imagePath,
                    'bucket' => $bucket
                ]);
            } catch (\Exception $e) {
                Log::error('Failed to store image in S3', [
                    'error' => $e->getMessage(),
                    'file' => $request->file('image')->getClientOriginalName(),
                    'bucket' => config('filesystems.disks.s3.bucket'),
                    'trace' => $e->getTraceAsString()
                ]);
                return back()->withErrors(['image' => 'خطا در ذخیره تصویر: ' . $e->getMessage()])->withInput();
            }
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
        if ($art->cover_image && !empty(trim($art->cover_image))) {
            try {
                if (Storage::disk('s3')->exists($art->cover_image)) {
                    Storage::disk('s3')->delete($art->cover_image);
                } elseif (Storage::disk('public')->exists($art->cover_image)) {
                    Storage::disk('public')->delete($art->cover_image);
                }
            } catch (\Exception $e) {
                // Log error but continue
                Log::warning('Failed to delete cover_image: ' . $e->getMessage());
            }
        }

        $art->delete();

        return redirect()->route('artist.arts')->with('success', 'اثر شما با موفقیت حذف شد!');
    }

    /**
     * Get user-friendly error message for PHP upload errors
     */
    private function getUploadErrorMessage($errorCode, $fieldLabel)
    {
        $locale = app()->getLocale();
        
        switch ($errorCode) {
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                return $locale === 'fa'
                    ? $fieldLabel . ' خیلی بزرگ است. حداکثر اندازه مجاز: ' . $this->formatBytes(ini_get('upload_max_filesize'))
                    : $fieldLabel . ' is too large. Maximum allowed size: ' . $this->formatBytes(ini_get('upload_max_filesize'));
            
            case UPLOAD_ERR_PARTIAL:
                return $locale === 'fa'
                    ? $fieldLabel . ' به صورت ناقص آپلود شد. لطفاً دوباره تلاش کنید.'
                    : $fieldLabel . ' was only partially uploaded. Please try again.';
            
            case UPLOAD_ERR_NO_FILE:
                return $locale === 'fa'
                    ? $fieldLabel . ' انتخاب نشده است.'
                    : $fieldLabel . ' was not selected.';
            
            case UPLOAD_ERR_NO_TMP_DIR:
                return $locale === 'fa'
                    ? 'خطا در سرور: پوشه موقت برای آپلود فایل وجود ندارد. لطفاً با مدیر سیستم تماس بگیرید.'
                    : 'Server error: Missing temporary folder for file upload. Please contact the administrator.';
            
            case UPLOAD_ERR_CANT_WRITE:
                return $locale === 'fa'
                    ? 'خطا در سرور: نتوانست فایل را روی دیسک ذخیره کند. لطفاً با مدیر سیستم تماس بگیرید.'
                    : 'Server error: Failed to write file to disk. Please contact the administrator.';
            
            case UPLOAD_ERR_EXTENSION:
                return $locale === 'fa'
                    ? 'خطا در سرور: یک افزونه PHP آپلود فایل را متوقف کرد. لطفاً با مدیر سیستم تماس بگیرید.'
                    : 'Server error: A PHP extension stopped the file upload. Please contact the administrator.';
            
            default:
                return $locale === 'fa'
                    ? $fieldLabel . ' آپلود نشد. لطفاً دوباره تلاش کنید.'
                    : $fieldLabel . ' failed to upload. Please try again.';
        }
    }

    /**
     * Format bytes to human-readable format
     */
    private function formatBytes($bytes)
    {
        if (is_numeric($bytes)) {
            $bytes = (int) $bytes;
        } else {
            // Handle string values like "500M"
            $bytes = trim($bytes);
            $last = strtolower($bytes[strlen($bytes) - 1]);
            $bytes = (int) $bytes;
            switch ($last) {
                case 'g':
                    $bytes *= 1024;
                case 'm':
                    $bytes *= 1024;
                case 'k':
                    $bytes *= 1024;
            }
        }
        
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= pow(1024, $pow);
        
        return round($bytes, 2) . ' ' . $units[$pow];
    }
}
