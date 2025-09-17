<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('field_requirements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('art_field_id')->constrained()->onDelete('cascade');
            $table->string('field_name'); // نام فیلد (مثل: audio_file, image, description)
            $table->enum('requirement_type', ['required', 'optional', 'disabled']); // نوع الزام: اجباری، اختیاری، غیرفعال
            $table->string('field_type'); // نوع فیلد (text, file, image, etc.)
            $table->text('description')->nullable(); // توضیحات
            $table->timestamps();
            
            $table->unique(['art_field_id', 'field_name']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('field_requirements');
    }
};
