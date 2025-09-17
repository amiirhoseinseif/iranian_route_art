<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('judges', function (Blueprint $table) {
            $table->id();
            $table->string('first_name'); // نام
            $table->string('last_name'); // نام خانوادگی
            $table->string('email')->unique(); // ایمیل
            $table->string('phone'); // شماره تماس
            $table->string('password'); // رمز عبور
            $table->text('bio')->nullable(); // بیوگرافی
            $table->string('profile_image')->nullable(); // تصویر پروفایل
            $table->json('expertise_areas'); // حوزه‌های تخصص (آرایه از رشته‌های هنری)
            $table->string('qualification'); // مدرک و تخصص
            $table->string('organization')->nullable(); // سازمان یا موسسه
            $table->boolean('is_active')->default(true); // فعال
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('judges');
    }
};
