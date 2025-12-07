<?php

namespace App\Http\Controllers\S3;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 

class DeleteController extends Controller
{
    public function delete($file)
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

        Storage::disk('s3')->delete($file);

        return response()->json([
            'success' => true,
            'message' => 'File deleted successfully.'
        ]);
    }
}
