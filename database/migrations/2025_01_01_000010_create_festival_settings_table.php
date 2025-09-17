<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('festival_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique(); // کلید تنظیم
            $table->text('value'); // مقدار تنظیم
            $table->string('type')->default('string'); // نوع داده
            $table->text('description')->nullable(); // توضیحات
            $table->boolean('is_public')->default(false); // آیا عمومی است
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('festival_settings');
    }
};
