<?php

namespace App\Http\Controllers\S3;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file',
            'path' => 'nullable|string', // Optional path prefix (e.g., 'arts/field_files/')
        ]);

        $file = $request->file('file');
        $pathPrefix = $request->input('path', '');
        
        // Generate a unique filename
        $filename = time() . '_' . $file->getClientOriginalName();
        $path = $pathPrefix ? $pathPrefix . '/' . $filename : $filename;
        
        $storedPath = $file->storeAs($pathPrefix ?: '', $filename, 's3');
        
        $permanentLink = Storage::disk('s3')->url($storedPath);

        return response()->json([
            'success' => true,
            'message' => 'File uploaded successfully.',
            'path' => $storedPath,
            'url' => $permanentLink,
        ]);
    }
}