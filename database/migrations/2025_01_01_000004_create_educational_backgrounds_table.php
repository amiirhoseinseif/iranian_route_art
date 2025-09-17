<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('educational_backgrounds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('artist_id')->constrained()->onDelete('cascade');
            $table->enum('level', ['diploma', 'associate', 'bachelor', 'master', 'phd', 'other']); // مقطع تحصیلی
            $table->string('field_of_study'); // رشته تحصیلی
            $table->string('institution'); // موسسه آموزشی
            $table->year('graduation_year')->nullable(); // سال فارغ التحصیلی
            $table->decimal('gpa', 3, 2)->nullable(); // معدل
            $table->text('description')->nullable(); // توضیحات اضافی
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('educational_backgrounds');
    }
};
