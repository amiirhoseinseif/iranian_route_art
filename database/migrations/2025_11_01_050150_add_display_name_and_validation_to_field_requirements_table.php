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
        Schema::table('field_requirements', function (Blueprint $table) {
            $table->string('display_name')->after('field_name')->nullable(); // نام نمایشی فیلد (که توسط ادمین قابل تغییر است)
            $table->json('validation_rules')->nullable(); // قوانین اعتبارسنجی (مثل max_size, allowed_formats, max_length)
            $table->integer('order')->default(0); // ترتیب نمایش فیلدها
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('field_requirements', function (Blueprint $table) {
            $table->dropColumn(['display_name', 'validation_rules', 'order']);
        });
    }
};
