<?php

namespace App\Http\Controllers\S3;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 

class PresignedController extends Controller
{
    public function generatePresignedUrl($file)
    {
        // Decode URL-encoded file path
        $file = urldecode($file);
        
        // Validate file path is not empty
        if (empty($file) || trim($file) === '') {
            return response()->json([
                'success' => false,
                'error' => 'File path is required.'
            ], 400);
        }
        
        if (!Storage::disk('s3')->exists($file)) {
            return response()->json([
                'success' => false,
                'error' => 'File not found.'
            ], 404);
        }

        // Generate presigned URL valid for 1 hour
        $url = Storage::disk('s3')->temporaryUrl($file, now()->addHours(1));

        return response()->json([
            'success' => true,
            'url' => $url,
            'expires_at' => now()->addHours(1)->toIso8601String()
        ]);
    }
}
