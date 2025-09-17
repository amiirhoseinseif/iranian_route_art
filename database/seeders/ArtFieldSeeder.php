<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArtFieldSeeder extends Seeder
{
    public function run(): void
    {
        $artFields = [
            [
                'name' => 'موسیقی',
                'name_en' => 'Music',
                'description' => 'شامل آهنگسازی، نوازندگی، خوانندگی و تولید موسیقی',
                'is_active' => true,
            ],
            [
                'name' => 'نقاشی',
                'name_en' => 'Painting',
                'description' => 'شامل نقاشی با رنگ روغن، آبرنگ، گواش و سایر تکنیک‌ها',
                'is_active' => true,
            ],
            [
                'name' => 'فیلم‌سازی',
                'name_en' => 'Filmmaking',
                'description' => 'شامل کارگردانی، فیلمنامه‌نویسی، تدوین و تولید فیلم',
                'is_active' => true,
            ],
            [
                'name' => 'مجسمه‌سازی',
                'name_en' => 'Sculpture',
                'description' => 'شامل مجسمه‌سازی با گچ، سنگ، فلز و سایر مواد',
                'is_active' => true,
            ],
            [
                'name' => 'گرافیک',
                'name_en' => 'Graphic Design',
                'description' => 'شامل طراحی گرافیک، پوستر، لوگو و تصویرسازی دیجیتال',
                'is_active' => true,
            ],
            [
                'name' => 'خوشنویسی',
                'name_en' => 'Calligraphy',
                'description' => 'شامل خوشنویسی فارسی، عربی و ترکیبی',
                'is_active' => true,
            ],
            [
                'name' => 'عکاسی',
                'name_en' => 'Photography',
                'description' => 'شامل عکاسی هنری، مستند و تجربی',
                'is_active' => true,
            ],
            [
                'name' => 'معماری',
                'name_en' => 'Architecture',
                'description' => 'شامل طراحی معماری، نقشه‌کشی و طراحی داخلی',
                'is_active' => true,
            ],
        ];

        foreach ($artFields as $field) {
            DB::table('art_fields')->insert($field);
        }
    }
}
