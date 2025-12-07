<?php

namespace App\Http\Controllers\S3;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 

class DownloadController extends Controller
{
    public function download($file)
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

        // Generate a temporary presigned URL for download
        $url = Storage::disk('s3')->temporaryUrl($file, now()->addMinutes(5));
        
        return redirect($url);
    }
}