<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('arts', function (Blueprint $table) {
            // اطلاعات اصلی اثر
            $table->string('director_name')->nullable()->after('title'); // نام کارگردان/هنرمند
            $table->string('writer_name')->nullable()->after('director_name'); // نام نویسنده (برای فیلم)
            $table->string('technique')->nullable()->after('writer_name'); // تکنیک/سبک
            $table->text('story_summary')->nullable()->after('technique'); // خلاصه داستان (برای فیلم)
            $table->text('artist_statement')->nullable()->after('story_summary'); // سخن هنرمند
            
            // فایل‌های اصلی
            $table->string('main_file')->nullable()->after('art_file'); // فایل اصلی اثر
            $table->string('poster')->nullable()->after('main_file'); // پوستر اثر
            
            // فایل‌های اختیاری
            $table->text('resume')->nullable()->after('artist_statement'); // رزومه کوتاه
            $table->string('location')->nullable()->after('resume'); // کجای جهان هستید
            $table->json('additional_files')->nullable()->after('location'); // فایل‌های اضافی
            $table->json('production_photos')->nullable()->after('additional_files'); // عکس‌های پشت صحنه
            
            // اطلاعات تکمیلی
            $table->string('dimensions')->nullable()->after('duration'); // ابعاد اثر
            $table->string('materials')->nullable()->after('dimensions'); // مواد به‌کاررفته
            $table->string('weight')->nullable()->after('materials'); // وزن تقریبی
            $table->string('software_used')->nullable()->after('weight'); // نرم‌افزارهای مورد استفاده
            $table->string('subcategory')->nullable()->after('software_used'); // زیرشاخه (برای گرافیک)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('arts', function (Blueprint $table) {
            $table->dropColumn([
                'director_name',
                'writer_name', 
                'technique',
                'story_summary',
                'artist_statement',
                'main_file',
                'poster',
                'resume',
                'location',
                'additional_files',
                'production_photos',
                'dimensions',
                'materials',
                'weight',
                'software_used',
                'subcategory'
            ]);
        });
    }
};