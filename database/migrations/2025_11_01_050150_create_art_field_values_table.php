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
        Schema::create('art_field_values', function (Blueprint $table) {
            $table->id();
            $table->foreignId('art_id')->constrained('arts')->onDelete('cascade');
            $table->foreignId('field_requirement_id')->constrained('field_requirements')->onDelete('cascade');
            $table->text('value')->nullable(); // مقدار فیلد (برای متن)
            $table->string('file_path')->nullable(); // مسیر فایل (برای فایل‌ها)
            $table->timestamps();

            $table->unique(['art_id', 'field_requirement_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('art_field_values');
    }
};
