<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('first_name'); // نام
            $table->string('last_name'); // نام خانوادگی
            $table->string('email')->unique(); // ایمیل
            $table->string('phone'); // شماره تماس
            $table->string('password'); // رمز عبور
            $table->enum('role', ['super_admin', 'admin', 'moderator']); // نقش
            $table->json('permissions')->nullable(); // دسترسی‌ها
            $table->boolean('is_active')->default(true); // فعال
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
