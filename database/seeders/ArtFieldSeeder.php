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
                'icon_name' => 'music',
                'description' => 'شامل آهنگسازی، نوازندگی، خوانندگی و تولید موسیقی',
                'is_active' => true,
            ],
            [
                'name' => 'خوشنویسی',
                'name_en' => 'Calligraphy',
                'icon_name' => 'calligraphy',
                'description' => 'شامل خوشنویسی فارسی، عربی و ترکیبی',
                'is_active' => true,
            ],
            [
                'name' => 'نقاشی',
                'name_en' => 'Painting',
                'icon_name' => 'painting',
                'description' => 'شامل نقاشی با رنگ روغن، آبرنگ، گواش و سایر تکنیک‌ها',
                'is_active' => true,
            ],
            [
                'name' => 'مجسمه‌سازی',
                'name_en' => 'Sculpture',
                'icon_name' => 'sculpture',
                'description' => 'شامل مجسمه‌سازی با گچ، سنگ، فلز و سایر مواد',
                'is_active' => true,
            ],
            [
                'name' => 'صنایع دستی',
                'name_en' => 'Handicrafts',
                'icon_name' => 'handicrafts',
                'description' => 'شامل منبت، معرق، گلیم، سفال و سایر صنایع دستی',
                'is_active' => true,
            ],
            [
                'name' => 'معماری',
                'name_en' => 'Architecture',
                'icon_name' => 'architecture',
                'description' => 'شامل طراحی معماری، نقشه‌کشی و طراحی داخلی',
                'is_active' => true,
            ],
            [
                'name' => 'طراحی صنعتی',
                'name_en' => 'Industrial Design',
                'icon_name' => 'industrial_design',
                'description' => 'شامل طراحی محصول، مبلمان، اسباب بازی و لوازم خانگی',
                'is_active' => true,
            ],
            [
                'name' => 'گرافیک و تصویرسازی',
                'name_en' => 'Graphic Design & Illustration',
                'icon_name' => 'illustration',
                'description' => 'شامل طراحی گرافیک، پوستر، لوگو و تصویرسازی دیجیتال',
                'is_active' => true,
            ],
            [
                'name' => 'ادبیات',
                'name_en' => 'Literature',
                'icon_name' => 'literature',
                'description' => 'شامل شعر، داستان، رمان، نمایشنامه و سایر آثار ادبی',
                'is_active' => true,
            ],
            [
                'name' => 'فرش',
                'name_en' => 'Carpet',
                'icon_name' => 'carpet',
                'description' => 'شامل طراحی و بافت فرش دستباف ایرانی',
                'is_active' => true,
            ],
            [
                'name' => 'فیلم کوتاه',
                'name_en' => 'Short Film',
                'icon_name' => 'short_film',
                'description' => 'شامل کارگردانی، فیلمنامه‌نویسی، تدوین و تولید فیلم کوتاه',
                'is_active' => true,
            ],
            [
                'name' => 'نمایش',
                'name_en' => 'Theater',
                'icon_name' => 'theater',
                'description' => 'شامل کارگردانی تئاتر، بازیگری، طراحی صحنه و نمایشنامه‌نویسی',
                'is_active' => true,
            ],
            [
                'name' => 'طراحی پارچه و لباس',
                'name_en' => 'Textile & Fashion Design',
                'icon_name' => 'fashion_design',
                'description' => 'شامل طراحی مد، پارچه، الگو و دوخت لباس',
                'is_active' => true,
            ],
            [
                'name' => 'انیمیشن',
                'name_en' => 'Animation',
                'icon_name' => 'animation',
                'description' => 'شامل انیمیشن دوبعدی، سه‌بعدی، استاپ‌موشن و موشن گرافیک',
                'is_active' => true,
            ],
            [
                'name' => 'عکاسی',
                'name_en' => 'Photography',
                'icon_name' => 'photography',
                'description' => 'شامل عکاسی هنری، مستند و تجربی',
                'is_active' => true,
            ],
            [
                'name' => 'هنرهای جدید',
                'name_en' => 'New Media Arts',
                'icon_name' => 'new_media_arts',
                'description' => 'شامل هنر دیجیتال، هنر مفهومی، هنر رسانه‌ای و هنرهای ترکیبی',
                'is_active' => true,
            ],
        ];

        foreach ($artFields as $field) {
            DB::table('art_fields')->updateOrInsert(
                ['name' => $field['name']],
                $field
            );
        }
    }
}
