<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default filesystem disk that should be used
    | by the framework. The "local" disk, as well as a variety of cloud
    | based disks are available to your application for file storage.
    |
    */

    'default' => env('FILESYSTEM_DISK', 'local'),

    /*
    |--------------------------------------------------------------------------
    | Filesystem Disks
    |--------------------------------------------------------------------------
    |
    | Below you may configure as many filesystem disks as necessary, and you
    | may even configure multiple disks for the same driver. Examples for
    | most supported storage drivers are configured here for reference.
    |
    | Supported drivers: "local", "ftp", "sftp", "s3"
    |
    */

    'disks' => [

        'local' => [
            'driver' => 'local',
            'root' => storage_path('app/private'),
            'serve' => true,
            'throw' => false,
            'report' => false,
        ],

        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
            'throw' => false,
            'report' => false,
        ],

        's3' => [
            'driver' => 's3',
            // Hardcoded credentials from Liara
            // IMPORTANT: Try both with and without "liara-" prefix
            // If Access Key from Liara is "s6mlbavgakuuuq2g", try:
            // 1. Without prefix: 's6mlbavgakuuuq2g'
            // 2. With prefix: 'liara-s6mlbavgakuuuq2g'
            'key' => 's6mlbavgakuuuq2g', // Try with prefix
            'secret' => '02ab58f9-531d-4930-975e-b017b4356892',
            'region' => 'default',
            'bucket' => 'iranian-route', // Changed from 'iranian-route' to 'arts' based on error message
            'url' => 'https://storage.c2.liara.space',
            'endpoint' => 'https://storage.c2.liara.space',
            // For Liara Storage and S3-compatible services, use path style
            'use_path_style_endpoint' => true,
            'throw' => false,
            'report' => false,
            'visibility' => 'private',
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Symbolic Links
    |--------------------------------------------------------------------------
    |
    | Here you may configure the symbolic links that will be created when the
    | `storage:link` Artisan command is executed. The array keys should be
    | the locations of the links and the values should be their targets.
    |
    */

    'links' => [
        public_path('storage') => storage_path('app/public'),
    ],

];
