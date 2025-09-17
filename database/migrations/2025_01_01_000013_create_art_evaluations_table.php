<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('art_evaluations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('art_id')->constrained('arts')->onDelete('cascade');
            $table->foreignId('judge_id')->constrained()->onDelete('cascade');
            $table->decimal('score', 3, 1); // امتیاز (0-10)
            $table->text('comments')->nullable(); // نظرات و توضیحات
            $table->json('criteria_scores')->nullable(); // امتیازات جزئی معیارها
            $table->enum('status', ['draft', 'submitted', 'final'])->default('draft'); // وضعیت ارزیابی
            $table->timestamp('submitted_at')->nullable(); // زمان ارسال
            $table->timestamps();
            
            $table->unique(['art_id', 'judge_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('art_evaluations');
    }
};
