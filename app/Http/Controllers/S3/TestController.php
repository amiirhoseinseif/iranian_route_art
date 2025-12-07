<?php

namespace App\Http\Controllers\S3;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TestController extends Controller
{
    public function showTestForm()
    {
        return view('s3-test');
    }

    public function testUpload(Request $request)
    {
        // Log request details for debugging
        Log::info('S3 Test Upload Request', [
            'has_file' => $request->hasFile('test_file'),
            'has_token' => $request->has('_token'),
            'token_from_header' => $request->header('X-CSRF-TOKEN'),
            'token_from_input' => $request->input('_token'),
        ]);
        
        try {
            // Check S3 configuration
            $bucket = config('filesystems.disks.s3.bucket');
            $key = config('filesystems.disks.s3.key');
            $secret = config('filesystems.disks.s3.secret');
            $region = config('filesystems.disks.s3.region');
            $endpoint = config('filesystems.disks.s3.endpoint');

            $usePathStyle = config('filesystems.disks.s3.use_path_style_endpoint', false);
            
            $configStatus = [
                'bucket' => !empty($bucket) ? '✓ Set: ' . $bucket : '✗ Missing',
                'key' => !empty($key) ? '✓ Set (length: ' . strlen($key) . ', value: ' . substr($key, 0, 10) . '...)' : '✗ Missing',
                'secret' => !empty($secret) ? '✓ Set (length: ' . strlen($secret) . ', value: ' . substr($secret, 0, 8) . '...)' : '✗ Missing',
                'region' => !empty($region) ? '✓ Set: ' . $region : '✗ Missing',
                'endpoint' => $endpoint ? '✓ Set: ' . $endpoint : '✗ Not set (using default)',
                'use_path_style_endpoint' => $usePathStyle ? '✓ Enabled (required for Liara)' : '✗ Disabled',
            ];

            // Test 1: Check if we can access S3 disk
            $s3Accessible = false;
            $s3Error = null;
            $s3ErrorCode = null;
            
            // Log the actual credentials being used (first few chars for security)
            Log::info('S3 Configuration Check', [
                'key_prefix' => substr($key, 0, 10) . '...',
                'key_length' => strlen($key),
                'secret_prefix' => substr($secret, 0, 8) . '...',
                'secret_length' => strlen($secret),
                'bucket' => $bucket,
                'endpoint' => $endpoint,
                'use_path_style' => config('filesystems.disks.s3.use_path_style_endpoint'),
            ]);
            
            try {
                // Try to list files (this will fail if credentials are wrong)
                Storage::disk('s3')->files('');
                $s3Accessible = true;
            } catch (\Exception $e) {
                $s3Error = $e->getMessage();
                
                // Extract error code from message
                if (preg_match('/<Code>(.*?)<\/Code>/', $s3Error, $matches)) {
                    $s3ErrorCode = $matches[1];
                }
                
                Log::error('S3 access test failed', [
                    'error' => $e->getMessage(),
                    'error_code' => $s3ErrorCode,
                    'bucket' => $bucket,
                    'endpoint' => $endpoint,
                    'use_path_style' => config('filesystems.disks.s3.use_path_style_endpoint'),
                    'key_used' => substr($key, 0, 10) . '...',
                    'trace' => $e->getTraceAsString()
                ]);
            }

            // Test 2: Try to upload a test file
            $uploadTest = null;
            if ($request->hasFile('test_file')) {
                try {
                    $file = $request->file('test_file');
                    $testPath = 'test/' . time() . '_' . $file->getClientOriginalName();
                    
                    Log::info('Attempting to upload test file to S3', [
                        'path' => $testPath,
                        'size' => $file->getSize(),
                        'mime' => $file->getMimeType()
                    ]);

                    // Try to upload file
                    Log::info('Attempting storeAs to S3', [
                        'directory' => 'test',
                        'filename' => time() . '_' . $file->getClientOriginalName(),
                        'bucket' => $bucket,
                        'endpoint' => $endpoint
                    ]);
                    
                    $storedPath = $file->storeAs('test', time() . '_' . $file->getClientOriginalName(), 's3');
                    
                    Log::info('storeAs result', [
                        'stored_path' => $storedPath,
                        'is_empty' => empty($storedPath)
                    ]);
                    
                    if ($storedPath) {
                        // Verify file exists
                        try {
                            $exists = Storage::disk('s3')->exists($storedPath);
                            $url = Storage::disk('s3')->url($storedPath);
                            
                            $uploadTest = [
                                'success' => true,
                                'path' => $storedPath,
                                'exists' => $exists,
                                'url' => $url,
                                'message' => 'File uploaded successfully!'
                            ];
                            
                            Log::info('Test file uploaded successfully', [
                                'path' => $storedPath,
                                'url' => $url
                            ]);
                        } catch (\Exception $e) {
                            $uploadTest = [
                                'success' => false,
                                'path' => $storedPath,
                                'error' => 'File uploaded but cannot verify: ' . $e->getMessage()
                            ];
                        }
                    } else {
                        $uploadTest = [
                            'success' => false,
                            'error' => 'store() returned empty path'
                        ];
                    }
                } catch (\Exception $e) {
                    $uploadTest = [
                        'success' => false,
                        'error' => $e->getMessage(),
                        'trace' => $e->getTraceAsString()
                    ];
                    
                    Log::error('Test file upload failed', [
                        'error' => $e->getMessage(),
                        'trace' => $e->getTraceAsString()
                    ]);
                }
            }

            // Test 3: Try to create a simple text file
            $textFileTest = null;
            try {
                $testContent = 'This is a test file created at ' . now()->toDateTimeString();
                $testFilePath = 'test/test_' . time() . '.txt';
                
                Log::info('Attempting put to S3', [
                    'path' => $testFilePath,
                    'bucket' => $bucket,
                    'endpoint' => $endpoint
                ]);
                
                $saved = Storage::disk('s3')->put($testFilePath, $testContent);
                
                Log::info('put result', [
                    'saved' => $saved,
                    'is_false' => ($saved === false)
                ]);
                
                if ($saved) {
                    $exists = Storage::disk('s3')->exists($testFilePath);
                    $url = Storage::disk('s3')->url($testFilePath);
                    $content = Storage::disk('s3')->get($testFilePath);
                    
                    $textFileTest = [
                        'success' => true,
                        'path' => $testFilePath,
                        'exists' => $exists,
                        'url' => $url,
                        'content_matches' => $content === $testContent,
                        'message' => 'Text file created successfully!'
                    ];
                } else {
                    $textFileTest = [
                        'success' => false,
                        'error' => 'put() returned false'
                    ];
                }
            } catch (\Exception $e) {
                $textFileTest = [
                    'success' => false,
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ];
                
                Log::error('Text file test failed', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
            }

            // Provide helpful error messages
            $helpMessage = null;
            $troubleshootingSteps = [];
            
            if (!$s3Accessible && $s3Error) {
                if (str_contains($s3Error, 'InvalidAccessKeyId') || ($s3ErrorCode === 'InvalidAccessKeyId')) {
                    $helpMessage = 'Access Key ID اشتباه است یا در records وجود ندارد.';
                    $troubleshootingSteps = [
                        '1. به پنل Liara بروید: https://console.liara.ir',
                        '2. به بخش Storage بروید',
                        '3. روی bucket خود کلیک کنید',
                        '4. به بخش "Access Keys" بروید',
                        '5. Access Key و Secret Key را کپی کنید',
                        '6. در فایل config/filesystems.php این مقادیر را قرار دهید:',
                        '   در بخش \'s3\' => [',
                        '   \'key\' => \'<access_key_from_liara>\',',
                        '   \'secret\' => \'<secret_key_from_liara>\',',
                        '   ...',
                        '   ]',
                        '7. دستور زیر را اجرا کنید:',
                        '   php artisan config:clear',
                        '8. صفحه را refresh کنید و دوباره تست کنید',
                        '',
                        'نکته: اگر Access Key در پنل Liara با "liara-" شروع می‌شود،',
                        '      در config هم با "liara-" استفاده کنید، وگرنه بدون prefix استفاده کنید.'
                    ];
                } elseif (str_contains($s3Error, '403 Forbidden') || ($s3ErrorCode === 'AccessDenied')) {
                    $helpMessage = 'دسترسی به bucket رد شده است.';
                    $troubleshootingSteps = [
                        '1. بررسی کنید که Access Key مربوط به همین bucket باشد',
                        '2. بررسی کنید که bucket name درست باشد: ' . $bucket,
                        '3. در پنل Liara، permissions bucket را بررسی کنید'
                    ];
                } elseif (str_contains($s3Error, 'Could not resolve host')) {
                    $helpMessage = 'Endpoint قابل دسترسی نیست.';
                    $troubleshootingSteps = [
                        '1. بررسی کنید که AWS_ENDPOINT درست باشد: ' . ($endpoint ?: 'not set'),
                        '2. برای Liara Storage باید باشد: https://storage.iran.liara.space',
                        '3. اتصال اینترنت را بررسی کنید'
                    ];
                } else {
                    $helpMessage = 'خطا در اتصال به S3.';
                    $troubleshootingSteps = [
                        '1. تمام تنظیمات config/filesystems.php را بررسی کنید',
                        '2. cache را پاک کنید: php artisan config:clear',
                        '3. لاگ‌ها را بررسی کنید: storage/logs/laravel.log',
                        '4. مطمئن شوید که credentials در config/filesystems.php درست تنظیم شده‌اند'
                    ];
                }
            }
            
            return response()->json([
                'config' => $configStatus,
                's3_accessible' => $s3Accessible,
                's3_error' => $s3Error,
                's3_error_code' => $s3ErrorCode,
                'upload_test' => $uploadTest,
                'text_file_test' => $textFileTest,
                'bucket_name' => $bucket,
                'region' => $region,
                'endpoint' => $endpoint,
                'help_message' => $helpMessage,
                'troubleshooting_steps' => $troubleshootingSteps,
                'current_config_values' => [
                    'key' => substr($key, 0, 10) . '...' . substr($key, -4),
                    'secret' => substr($secret, 0, 8) . '...' . substr($secret, -4),
                    'bucket' => $bucket,
                    'endpoint' => $endpoint,
                    'region' => $region,
                    'use_path_style_endpoint' => $usePathStyle ? 'true' : 'false',
                    'note' => 'این مقادیر از config/filesystems.php خوانده می‌شوند (نه از .env)'
                ]
            ], 200, [], JSON_PRETTY_PRINT);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }
}

