<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('art_fields', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // نام رشته هنری
            $table->string('name_en')->nullable(); // English name for reference
            $table->text('description')->nullable(); // توضیحات
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('art_fields');
    }
};
