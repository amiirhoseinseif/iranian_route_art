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
            $table->string('video_url')->nullable()->after('metadata'); // لینک ویدیو
            $table->string('audio_url')->nullable()->after('video_url'); // لینک فایل صوتی
            $table->text('tags')->nullable()->after('audio_url'); // برچسب‌ها
            $table->integer('year_created')->nullable()->after('tags'); // سال ایجاد اثر (شمسی)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('arts', function (Blueprint $table) {
            $table->dropColumn(['video_url', 'audio_url', 'tags', 'year_created']);
        });
    }
};
