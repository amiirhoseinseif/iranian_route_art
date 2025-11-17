<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FestivalSettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            [
                'key' => 'festival_name',
                'value' => 'جشنواره بین المللی مسیر ایران',
                'type' => 'string',
                'description' => 'نام جشنواره',
                'is_public' => true,
            ],
            [
                'key' => 'festival_name_en',
                'value' => 'Iranian Route Art Festival',
                'type' => 'string',
                'description' => 'نام جشنواره به انگلیسی',
                'is_public' => true,
            ],
            [
                'key' => 'festival_description',
                'value' => 'دانشگاه ها و دانشکده های هنر سراسر کشور',
                'type' => 'text',
                'description' => 'توضیحات جشنواره',
                'is_public' => true,
            ],
            [
                'key' => 'festival_start_date',
                'value' => '2025-01-01',
                'type' => 'date',
                'description' => 'تاریخ شروع جشنواره',
                'is_public' => true,
            ],
            [
                'key' => 'festival_end_date',
                'value' => '2025-12-31',
                'type' => 'date',
                'description' => 'تاریخ پایان جشنواره',
                'is_public' => true,
            ],
            [
                'key' => 'submission_deadline',
                'value' => '2025-10-31',
                'type' => 'date',
                'description' => 'مهلت ارسال آثار',
                'is_public' => true,
            ],
            [
                'key' => 'max_file_size_mb',
                'value' => '100',
                'type' => 'integer',
                'description' => 'حداکثر اندازه فایل به مگابایت',
                'is_public' => true,
            ],
            [
                'key' => 'allowed_audio_formats',
                'value' => 'mp3,wav,flac,aac',
                'type' => 'string',
                'description' => 'فرمت‌های مجاز فایل صوتی',
                'is_public' => true,
            ],
            [
                'key' => 'allowed_video_formats',
                'value' => 'mp4,avi,mov,wmv',
                'type' => 'string',
                'description' => 'فرمت‌های مجاز فایل ویدیویی',
                'is_public' => true,
            ],
            [
                'key' => 'allowed_image_formats',
                'value' => 'jpg,jpeg,png,gif,webp',
                'type' => 'string',
                'description' => 'فرمت‌های مجاز تصویر',
                'is_public' => true,
            ],
            [
                'key' => 'contact_email',
                'value' => 'info@iranianrouteart.ir',
                'type' => 'string',
                'description' => 'ایمیل تماس',
                'is_public' => true,
            ],
            [
                'key' => 'contact_phone',
                'value' => '+98-21-12345678',
                'type' => 'string',
                'description' => 'شماره تماس',
                'is_public' => true,
            ],
        ];

        foreach ($settings as $setting) {
            DB::table('festival_settings')->insert($setting);
        }
    }
}
