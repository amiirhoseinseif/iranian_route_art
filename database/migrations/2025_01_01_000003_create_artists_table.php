<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('artists', function (Blueprint $table) {
            $table->id();
            $table->string('first_name'); // نام
            $table->string('last_name'); // نام خانوادگی
            $table->string('phone'); // شماره تماس
            $table->string('email')->unique(); // ایمیل
            $table->date('birth_date'); // تاریخ تولد شمسی
            $table->string('password'); // رمز عبور
            
            // Optional social media fields
            $table->string('telegram_id')->nullable(); // آیدی تلگرام
            $table->string('whatsapp_id')->nullable(); // آیدی واتساپ
            $table->string('instagram_id')->nullable(); // آیدی اینستاگرام
            $table->string('linkedin_id')->nullable(); // آیدی لینکدین
            
            // Professional information
            $table->foreignId('art_field_id')->constrained(); // رشته هنری
            $table->text('bio')->nullable(); // بیوگرافی
            $table->string('profile_image')->nullable(); // تصویر پروفایل
            
            $table->boolean('is_verified')->default(false); // تایید شده
            $table->boolean('is_active')->default(true); // فعال
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('artists');
    }
};
