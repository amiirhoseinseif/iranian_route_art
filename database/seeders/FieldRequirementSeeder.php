<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FieldRequirementSeeder extends Seeder
{
    public function run(): void
    {
        // Get art field IDs
        $musicId = DB::table('art_fields')->where('name', 'موسیقی')->first()->id;
        $paintingId = DB::table('art_fields')->where('name', 'نقاشی')->first()->id;
        $filmmakingId = DB::table('art_fields')->where('name', 'فیلم کوتاه')->first()->id;
        $sculptureId = DB::table('art_fields')->where('name', 'مجسمه‌سازی')->first()->id;
        $graphicId = DB::table('art_fields')->where('name', 'گرافیک و تصویرسازی')->first()->id;
        $calligraphyId = DB::table('art_fields')->where('name', 'خوشنویسی')->first()->id;
        $photographyId = DB::table('art_fields')->where('name', 'عکاسی')->first()->id;
        $architectureId = DB::table('art_fields')->where('name', 'معماری')->first()->id;

        $requirements = [
            // موسیقی
            ['art_field_id' => $musicId, 'field_name' => 'audio_file', 'requirement_type' => 'required', 'field_type' => 'file', 'description' => 'فایل صوتی اثر موسیقی'],
            ['art_field_id' => $musicId, 'field_name' => 'cover_image', 'requirement_type' => 'required', 'field_type' => 'image', 'description' => 'تصویر کاور موسیقی'],
            ['art_field_id' => $musicId, 'field_name' => 'description', 'requirement_type' => 'required', 'field_type' => 'text', 'description' => 'توضیحات اثر'],
            ['art_field_id' => $musicId, 'field_name' => 'duration', 'requirement_type' => 'required', 'field_type' => 'text', 'description' => 'مدت زمان موسیقی'],
            ['art_field_id' => $musicId, 'field_name' => 'lyrics', 'requirement_type' => 'optional', 'field_type' => 'text', 'description' => 'متن ترانه (اختیاری)'],

            // نقاشی
            ['art_field_id' => $paintingId, 'field_name' => 'art_image', 'requirement_type' => 'required', 'field_type' => 'image', 'description' => 'تصویر نقاشی'],
            ['art_field_id' => $paintingId, 'field_name' => 'description', 'requirement_type' => 'required', 'field_type' => 'text', 'description' => 'توضیحات اثر'],
            ['art_field_id' => $paintingId, 'field_name' => 'technique', 'requirement_type' => 'required', 'field_type' => 'text', 'description' => 'تکنیک نقاشی'],
            ['art_field_id' => $paintingId, 'field_name' => 'dimensions', 'requirement_type' => 'optional', 'field_type' => 'text', 'description' => 'ابعاد نقاشی'],

            // فیلم‌سازی
            ['art_field_id' => $filmmakingId, 'field_name' => 'video_file', 'requirement_type' => 'required', 'field_type' => 'file', 'description' => 'فایل ویدیویی'],
            ['art_field_id' => $filmmakingId, 'field_name' => 'cover_image', 'requirement_type' => 'required', 'field_type' => 'image', 'description' => 'تصویر کاور فیلم'],
            ['art_field_id' => $filmmakingId, 'field_name' => 'description', 'requirement_type' => 'required', 'field_type' => 'text', 'description' => 'توضیحات فیلم'],
            ['art_field_id' => $filmmakingId, 'field_name' => 'duration', 'requirement_type' => 'required', 'field_type' => 'text', 'description' => 'مدت زمان فیلم'],
            ['art_field_id' => $filmmakingId, 'field_name' => 'script', 'requirement_type' => 'optional', 'field_type' => 'file', 'description' => 'فیلمنامه (اختیاری)'],

            // مجسمه‌سازی
            ['art_field_id' => $sculptureId, 'field_name' => 'art_image', 'requirement_type' => 'required', 'field_type' => 'image', 'description' => 'تصویر مجسمه'],
            ['art_field_id' => $sculptureId, 'field_name' => 'description', 'requirement_type' => 'required', 'field_type' => 'text', 'description' => 'توضیحات اثر'],
            ['art_field_id' => $sculptureId, 'field_name' => 'material', 'requirement_type' => 'required', 'field_type' => 'text', 'description' => 'جنس مجسمه'],
            ['art_field_id' => $sculptureId, 'field_name' => 'dimensions', 'requirement_type' => 'optional', 'field_type' => 'text', 'description' => 'ابعاد مجسمه'],

            // گرافیک
            ['art_field_id' => $graphicId, 'field_name' => 'art_image', 'requirement_type' => 'required', 'field_type' => 'image', 'description' => 'تصویر طراحی گرافیک'],
            ['art_field_id' => $graphicId, 'field_name' => 'description', 'requirement_type' => 'required', 'field_type' => 'text', 'description' => 'توضیحات اثر'],
            ['art_field_id' => $graphicId, 'field_name' => 'software_used', 'requirement_type' => 'optional', 'field_type' => 'text', 'description' => 'نرم‌افزار استفاده شده'],

            // خوشنویسی
            ['art_field_id' => $calligraphyId, 'field_name' => 'art_image', 'requirement_type' => 'required', 'field_type' => 'image', 'description' => 'تصویر خوشنویسی'],
            ['art_field_id' => $calligraphyId, 'field_name' => 'description', 'requirement_type' => 'required', 'field_type' => 'text', 'description' => 'توضیحات اثر'],
            ['art_field_id' => $calligraphyId, 'field_name' => 'style', 'requirement_type' => 'required', 'field_type' => 'text', 'description' => 'سبک خوشنویسی'],
            ['art_field_id' => $calligraphyId, 'field_name' => 'text_content', 'requirement_type' => 'optional', 'field_type' => 'text', 'description' => 'متن خوشنویسی شده'],

            // عکاسی
            ['art_field_id' => $photographyId, 'field_name' => 'art_image', 'requirement_type' => 'required', 'field_type' => 'image', 'description' => 'تصویر عکس'],
            ['art_field_id' => $photographyId, 'field_name' => 'description', 'requirement_type' => 'required', 'field_type' => 'text', 'description' => 'توضیحات عکس'],
            ['art_field_id' => $photographyId, 'field_name' => 'camera_info', 'requirement_type' => 'optional', 'field_type' => 'text', 'description' => 'اطلاعات دوربین'],
            ['art_field_id' => $photographyId, 'field_name' => 'location', 'requirement_type' => 'optional', 'field_type' => 'text', 'description' => 'محل عکسبرداری'],

            // معماری
            ['art_field_id' => $architectureId, 'field_name' => 'art_image', 'requirement_type' => 'required', 'field_type' => 'image', 'description' => 'تصویر طرح معماری'],
            ['art_field_id' => $architectureId, 'field_name' => 'description', 'requirement_type' => 'required', 'field_type' => 'text', 'description' => 'توضیحات طرح'],
            ['art_field_id' => $architectureId, 'field_name' => 'blueprint', 'requirement_type' => 'optional', 'field_type' => 'file', 'description' => 'نقشه معماری'],
            ['art_field_id' => $architectureId, 'field_name' => 'scale', 'requirement_type' => 'optional', 'field_type' => 'text', 'description' => 'مقیاس نقشه'],
        ];

        foreach ($requirements as $requirement) {
            DB::table('field_requirements')->insert($requirement);
        }
    }
}
