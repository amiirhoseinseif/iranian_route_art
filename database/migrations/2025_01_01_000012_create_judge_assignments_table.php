<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('judge_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('judge_id')->constrained()->onDelete('cascade');
            $table->foreignId('art_field_id')->constrained()->onDelete('cascade');
            $table->boolean('is_active')->default(true); // فعال
            $table->timestamp('assigned_at'); // زمان تخصیص
            $table->foreignId('assigned_by')->constrained('admins'); // تخصیص دهنده
            $table->timestamps();
            
            $table->unique(['judge_id', 'art_field_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('judge_assignments');
    }
};
