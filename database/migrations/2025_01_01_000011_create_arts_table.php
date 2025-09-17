<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('arts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('artist_id')->constrained()->onDelete('cascade');
            $table->foreignId('art_field_id')->constrained();
            $table->string('title'); // عنوان اثر
            $table->text('description'); // توضیحات
            $table->string('cover_image')->nullable(); // تصویر کاور
            $table->string('art_file')->nullable(); // فایل اصلی اثر (مثل موسیقی، نقاشی، فیلم)
            $table->string('art_file_type')->nullable(); // نوع فایل
            $table->integer('file_size')->nullable(); // اندازه فایل به کیلوبایت
            $table->string('duration')->nullable(); // مدت زمان (برای موسیقی و فیلم)
            $table->json('metadata')->nullable(); // اطلاعات اضافی (مثل ابعاد نقاشی، کیفیت فیلم)
            
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending'); // وضعیت تایید
            $table->text('rejection_reason')->nullable(); // دلیل رد شدن
            $table->timestamp('approved_at')->nullable(); // زمان تایید
            $table->foreignId('approved_by')->nullable()->constrained('admins'); // تایید کننده
            
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('arts');
    }
};
