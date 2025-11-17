<?php

namespace Database\Seeders;

use App\Models\ArtField;
use Illuminate\Database\Seeder;

class ArtFieldSeeder extends Seeder
{
    public function run(): void
    {
        $artFields = [
            [
                'name' => 'موسیقی',
                'name_en' => 'Music',
                'icon_name' => 'music',
                'description' => 'آهنگسازی، نوازندگی و تولید آثار موسیقایی در گرایش‌های ایرانی و جهانی',
                'description_en' => 'Composition, performance, and production across Iranian and global musical traditions.',
                'is_active' => true,
                'metadata' => [
                    'fa' => [
                        'headline' => 'بخش موسیقی - جشنواره بین‌المللی مسیر ایران',
                        'submission_deadline' => 'نوروز ۱۴۰۵',
                        'guidelines' => <<<'FA'
شرایط کلی بخش موسیقی
· موضوع: ایران، فرهنگ و هنر ایران
· تکنیک و سبک: آزاد
· تعداد آثار ارسالی: حداکثر ۲ اثر
· هیئت بازبین: اساتید رشته موسیقی از دانشگاه‌های هنر ایران
· اصالت آثار:
  · آثار باید مختص جشنواره تولید شده و پیش از این منتشر نشده باشند.
  · هرگونه کپی‌برداری منجر به حذف اثر خواهد شد.

---

۱. آهنگسازی – گرایش موسیقی جهانی و موسیقی ایرانی
موارد الزامی:
· ایده و طرح اولیه (ارتباط آن با جشنواره)
· فایل صوتی (WAV یا MP3 – حداکثر ۷ دقیقه و ۵۰ مگابایت)
· پارتیتور (PDF – حداکثر ۲۰ مگابایت)
· نام اثر، نام آهنگساز، سازبندی

موارد اختیاری:
· رزومه کوتاه (۱۵۰ کلمه)
· نام نوازندگان
· محل زندگی شما
· پوستر اثر (JPG/PNG – تا ۱۰ مگابایت)
· ویدئوی اجرا (MP4/MOV – حداکثر ۷ دقیقه – تا ۳۰۰ مگابایت)

۲. نوازندگی – گرایش موسیقی جهانی و موسیقی ایرانی
موارد الزامی:
· فایل ویدئویی اجرا بدون صدای پس‌زمینه (MP4/MOV – حداکثر ۶ دقیقه – تا ۳۰۰ مگابایت)
· نام اثر
· نام نوازندگان و سازها

موارد اختیاری:
· محل زندگی شما
· پوستر اثر (JPG/PNG – تا ۱۰ مگابایت)
FA,
                        'notes' => <<<'FA'
توجه:
· فایل‌های صوتی و ویدئویی نباید شامل نام هنرمند، واترمارک یا هرگونه علامت شناسایی باشند.
· آثار باید مختص جشنواره تولید شده و پیش از این در فضای مجازی منتشر نشده باشند.
· ارسال اثر به منزله پذیرش تمامی قوانین جشنواره است.
FA,
                    ],
                    'en' => [
                        'headline' => 'Music Section – Iranian Route International Festival',
                        'submission_deadline' => 'Nowruz 2026',
                        'guidelines' => <<<'EN'
General Conditions – Music
· Theme: Iran, its culture and art
· Technique & style: open
· Submissions: up to 2 pieces
· Jury: faculty members of Iranian art universities
· Originality:
  · Works must be created exclusively for this festival and remain unpublished.
  · Any plagiarism results in immediate disqualification.

---

1. Composition – World Music & Iranian Music
Required materials:
· Concept statement explaining the work’s connection to the festival
· Audio file (WAV or MP3 – up to 7 minutes / 50 MB)
· Full score (PDF – up to 20 MB)
· Title, composer name, instrumentation (free choice)

Optional materials:
· Short résumé (150 words)
· List of performers
· Where you are based
· Poster (JPG/PNG – up to 10 MB)
· Performance video (MP4/MOV – up to 7 minutes / 300 MB)

2. Performance – World Music & Iranian Music
Required materials:
· Performance video without background noise (MP4/MOV – up to 6 minutes / 300 MB)
· Title of the piece
· Names of performers and instruments

Optional materials:
· Where you are based
· Poster (JPG/PNG – up to 10 MB)
EN,
                        'notes' => <<<'EN'
Notes:
· Audio and video files must be free of artist names, watermarks, or identifying marks.
· Works must be original, unpublished, and created specifically for this festival.
· Submitting a work implies acceptance of all festival regulations.
EN,
                    ],
                ],
            ],
            [
                'name' => 'خوشنویسی',
                'name_en' => 'Calligraphy',
                'icon_name' => 'calligraphy',
                'description' => 'خوشنویسی به تمامی زبان‌ها و سبک‌ها با تأکید بر هویت ایرانی',
                'description_en' => 'Calligraphy in any language or style with an emphasis on Iranian identity.',
                'is_active' => true,
                'metadata' => [
                    'fa' => [
                        'headline' => 'بخش خوشنویسی - جشنواره بین‌المللی مسیر ایران',
                        'submission_deadline' => 'نوروز ۱۴۰۵',
                        'guidelines' => <<<'FA'
شرایط کلی بخش خوشنویسی
· موضوع: ایران است. فرهنگ و هنر ایران
· سبک: آزاد (نستعلیق، شکسته، ثلث و ...)
· زبان خوشنویسی: آزاد (انگلیسی، عربی، چینی، ژاپنی و ...)
· تعداد آثار: حداکثر ۵ اثر
· هیئت بازبین: اساتید خوشنویسی ایران

ملاک‌های ارزیابی
· مهارت فنی در اجرای خط
· خلاقیت در ترکیب‌بندی
· اصالت اثر و بیان شخصی
· ارتباط اثر با موضوع ایران

موارد ارسالی الزامی
· نام اثر
· نام هنرمند
· سبک خوشنویسی
· متن خوشنویسی شده (PDF – تا ۵ مگابایت)
· ابعاد اثر
· عکس اثر (JPEG/PNG – تا ۱۵ مگابایت – کیفیت بالا و نور مناسب)

موارد اختیاری
· رزومه کوتاه (۱۵۰ کلمه)
· محل زندگی شما
· عکس‌های جزئیات اثر یا مراحل اجرا (تا ۸ تصویر – JPEG/PNG – تا ۱۵ مگابایت)
FA,
                        'notes' => <<<'FA'
توجه:
· تصاویر باید عاری از نام هنرمند و واترمارک باشند.
· آثار باید اصیل و متعلق به هنرمند باشند.
· ارسال آثار تکراری یا منتشرشده مجاز نیست.
FA,
                    ],
                    'en' => [
                        'headline' => 'Calligraphy Section – Iranian Route International Festival',
                        'submission_deadline' => 'Nowruz 2026',
                        'guidelines' => <<<'EN'
General Conditions – Calligraphy
· Theme: Iran, its culture and art
· Style: open (Nastaʿlīq, Shekasteh, Thuluth, etc.)
· Script language: open (English, Arabic, Chinese, Japanese, etc.)
· Submissions: up to 5 works
· Jury: master calligraphers from Iranian universities

Evaluation Criteria
· Technical mastery of the script
· Creativity in composition
· Originality and personal expression
· Resonance with the theme of Iran

Required materials
· Title of the work
· Author’s name
· Calligraphy style
· Text file (PDF – up to 5 MB)
· Dimensions of the artwork
· Photograph of the work (JPEG/PNG – up to 15 MB, high-quality, well lit)

Optional materials
· Short résumé (150 words)
· Where you are based
· Detail shots or process photos (up to 8 images – JPEG/PNG – up to 15 MB each)
EN,
                        'notes' => <<<'EN'
Notes:
· Images must not contain names or watermarks.
· Works must be original and created by the submitting artist.
· Previously published or duplicate works are not accepted.
EN,
                    ],
                ],
            ],
            [
                'name' => 'نقاشی',
                'name_en' => 'Painting',
                'icon_name' => 'painting',
                'description' => 'انواع تکنیک‌های نقاشی با محوریت فرهنگ و هنر ایران',
                'description_en' => 'Painting in any medium inspired by Iranian culture and artistic heritage.',
                'is_active' => true,
                'metadata' => [
                    'fa' => [
                        'headline' => 'بخش نقاشی - جشنواره بین‌المللی مسیر ایران',
                        'submission_deadline' => 'نوروز ۱۴۰۵',
                        'guidelines' => <<<'FA'
شرایط کلی بخش نقاشی
· موضوع: فرهنگ و هنر ایران
· تکنیک و سبک: آزاد
· تعداد آثار: حداکثر ۸ اثر
· هیئت بازبین: اساتید رشته نقاشی ایران

ملاک‌های ارزیابی
· ارتباط اثر با موضوع ایران
· خلاقیت در بیان بصری و تکنیک اجرا
· اصالت اثر و بیان شخصی

موارد الزامی
· نام اثر
· نام هنرمند
· ابعاد اثر (طول × عرض)
· مواد و تکنیک
· عکس اصلی اثر (JPEG/PNG – تا ۱۵ مگابایت – زاویه روبرو، پس‌زمینه ساده)
· عکس جزئیات (۱ تا ۸ تصویر – JPEG/PNG – تا ۸ مگابایت)
· سخن هنرمند (حداکثر ۳۵۰ کلمه)

موارد اختیاری
· رزومه کوتاه (۱۵۰ کلمه)
· محل زندگی شما
· طرح‌های اولیه / اسکیس‌ها (تا ۸ تصویر – JPEG/PNG – تا ۵ مگابایت)
FA,
                        'notes' => <<<'FA'
توجه:
· تصاویر نباید شامل نام هنرمند یا واترمارک باشند.
· آثار باید اصیل و مختص جشنواره باشند.
· انتشار قبلی اثر منجر به رد خواهد شد.
FA,
                    ],
                    'en' => [
                        'headline' => 'Painting Section – Iranian Route International Festival',
                        'submission_deadline' => 'Nowruz 2026',
                        'guidelines' => <<<'EN'
General Conditions – Painting
· Theme: Iran, celebrating its culture and art
· Technique & style: open
· Submissions: up to 8 works
· Jury: painting faculty from Iranian art universities

Evaluation Criteria
· Connection of the work to the theme of Iran
· Creativity and command of visual language
· Originality and personal expression

Required materials
· Title of the work
· Artist’s name
· Dimensions (height × width)
· Materials and technique
· Main image (JPEG/PNG – up to 15 MB – frontal view, plain background)
· Detail images (1 to 8 photos – JPEG/PNG – up to 8 MB each)
· Artist statement (up to 350 words)

Optional materials
· Short résumé (150 words)
· Where you are based
· Sketches or process images (up to 8 images – JPEG/PNG – up to 5 MB each)
EN,
                        'notes' => <<<'EN'
Notes:
· Images must be free of watermarks or identifying marks.
· Works must be original and produced for this festival.
· Previously published works will be rejected.
EN,
                    ],
                ],
            ],
            [
                'name' => 'مجسمه‌سازی',
                'name_en' => 'Sculpture',
                'icon_name' => 'sculpture',
                'description' => 'آثار سه‌بعدی و حجم با مواد و تکنیک‌های متنوع با محوریت ایران',
                'description_en' => 'Three-dimensional works in diverse materials exploring Iranian themes.',
                'is_active' => true,
                'metadata' => [
                    'fa' => [
                        'headline' => 'بخش مجسمه‌سازی - جشنواره بین‌المللی مسیر ایران',
                        'submission_deadline' => 'نوروز ۱۴۰۵',
                        'guidelines' => <<<'FA'
شرایط کلی بخش مجسمه‌سازی
· موضوع: فرهنگ و هنر ایران
· تکنیک و سبک: آزاد
· تعداد آثار: حداکثر ۳ اثر
· هیئت بازبین: اساتید مجسمه‌سازی

ملاک‌های ارزیابی
· ارتباط اثر با موضوع ایران
· خلاقیت در فرم و ایده
· اصالت و بیان شخصی
· مهارت اجرایی و نوآوری در متریال

موارد الزامی
· عنوان اثر
· نام هنرمند
· مواد به کار رفته
· ابعاد اثر (ارتفاع × عرض × طول)
· عکس اصلی اثر (JPEG/PNG – تا ۱۵ مگابایت)
· تصاویر زوایای مختلف (حداقل ۴ تصویر – JPEG/PNG – تا ۱۵ مگابایت)
· تصاویر جزئیات (حداقل ۳ تصویر – JPEG/PNG – تا ۱۰ مگابایت)
· سخن هنرمند (حداکثر ۳۵۰ کلمه)

موارد اختیاری
· رزومه کوتاه (۱۵۰ کلمه)
· محل زندگی
· وزن تقریبی اثر
· فیلم کوتاه (MP4/MOV – تا ۴۰ ثانیه – ۱۰۰ مگابایت)
· اسکیس یا رندر سه‌بعدی (JPEG/PNG/PDF – تا ۲۰ مگابایت)
FA,
                        'notes' => <<<'FA'
توجه:
· تصاویر باید فاقد واترمارک باشند.
· آثار باید اصیل و اختصاصی جشنواره باشند.
· انتشار پیشین اثر موجب رد اثر خواهد شد.
FA,
                    ],
                    'en' => [
                        'headline' => 'Sculpture Section – Iranian Route International Festival',
                        'submission_deadline' => 'Nowruz 2026',
                        'guidelines' => <<<'EN'
General Conditions – Sculpture
· Theme: Iran, its culture and art
· Technique & style: open
· Submissions: up to 3 works
· Jury: sculpture faculty members

Evaluation Criteria
· Connection to the theme of Iran
· Creativity in form and concept
· Originality and personal voice
· Technical execution and innovative use of materials

Required materials
· Title of the work
· Artist’s name
· Materials used
· Dimensions (height × width × length)
· Main photo (JPEG/PNG – up to 15 MB)
· Views from different angles (minimum 4 images – JPEG/PNG – up to 15 MB)
· Detail shots (minimum 3 images – JPEG/PNG – up to 10 MB)
· Artist statement (up to 350 words)

Optional materials
· Short résumé (150 words)
· Where you are based
· Approximate weight
· Short video (MP4/MOV – up to 40 seconds – 100 MB)
· Sketches or 3D renderings (JPEG/PNG/PDF – up to 20 MB)
EN,
                        'notes' => <<<'EN'
Notes:
· Images must not contain watermarks.
· Works must be original and produced for this festival.
· Previously published works will be rejected.
EN,
                    ],
                ],
            ],
            [
                'name' => 'صنایع دستی',
                'name_en' => 'Handicrafts',
                'icon_name' => 'handicrafts',
                'description' => 'دستی‌ساخته‌ها و هنرهای سنتی الهام‌گرفته از فرهنگ ایران',
                'description_en' => 'Handcrafted objects and traditional arts inspired by Iranian heritage.',
                'is_active' => true,
                'metadata' => null,
            ],
            [
                'name' => 'معماری',
                'name_en' => 'Architecture',
                'icon_name' => 'architecture',
                'description' => 'طراحی معماری، فضاهای شهری و عناصر محیطی با رویکرد معاصر به هویت ایرانی',
                'description_en' => 'Architectural design, urban spaces, and environmental elements reimagining Iranian identity.',
                'is_active' => true,
                'metadata' => [
                    'fa' => [
                        'headline' => 'معماری - جشنواره بین‌المللی مسیر ایران',
                        'submission_deadline' => 'نوروز ۱۴۰۵',
                        'guidelines' => <<<'FA'
· موضوع جشنواره: فرهنگ و هنر ایران
· حوزه‌های مورد پذیرش:
  ۱. طرح‌های معماری
  ۲. طراحی عناصر و نشانه‌های شهری
  ۳. طراحی فضاهای شهری و بازآفرینی محیط
· تعداد آثار: حداکثر ۳ پروژه
· هیئت بازبین: اساتید معماری ایران

ملاک‌های ارزیابی
۱. ارتباط هنرمندانه اثر با موضوع ایران
۲. عمق ایده و اندیشه
۳. خلاقیت در طراحی و مفهوم‌پردازی فضایی
۴. اصالت اثر و بیان شخصی
۵. نوآوری در بازتاب هویت ایرانی

موارد الزامی
· عنوان پروژه
· نام معمار/طراح
· موقعیت مکانی پروژه (واقعی یا فرضی)
· اندازه تقریبی
· پنل یا شیت اصلی (JPEG/PNG)

مدارک اختیاری
· حداکثر ۸ پنل تکمیلی (JPEG/PNG – تا ۱۵ مگابایت)
· سخن هنرمند (حداکثر ۳۵۰ کلمه)
· شرح کانسپت (PDF – دو صفحه A4 – تا ۱ مگابایت)
· ماکت: ۱ تا ۸ تصویر یا ویدئو کوتاه (JPEG/PNG/MP4/MOV)
· رزومه کوتاه (۱۵۰ کلمه)
· محل زندگی شما
· ویدئوی ارائه (MP4/MOV – تا ۶۰ ثانیه – ۱۵۰ مگابایت)
FA,
                        'notes' => <<<'FA'
توجه:
· فایل‌ها نباید شامل نام طراح یا واترمارک باشند.
· آثار باید اصیل و مختص جشنواره باشند.
· انتشار قبلی موجب رد اثر خواهد شد.
FA,
                    ],
                    'en' => [
                        'headline' => 'Architecture – Iranian Route International Festival',
                        'submission_deadline' => 'Nowruz 2026',
                        'guidelines' => <<<'EN'
· Theme: Iran, its culture and art
· Accepted domains:
  1. Architectural design proposals
  2. Urban elements and signage
  3. Urban spaces and regeneration concepts
· Submissions: up to 3 projects
· Jury: architecture professors from Iranian universities

Evaluation Criteria
1. Artistic connection to the theme of Iran
2. Depth of concept and idea
3. Creativity in spatial storytelling
4. Originality and personal expression
5. Innovation in reflecting Iranian identity

Required materials
· Project title
· Architect/designer name
· Project location (real or hypothetical)
· Approximate scale
· Primary presentation board (JPEG/PNG)

Optional materials
· Up to 8 supporting boards (JPEG/PNG – up to 15 MB each)
· Artist statement (up to 350 words)
· Concept description (PDF, 2 pages A4 – up to 1 MB)
· Model documentation: 1–8 images or short video (JPEG/PNG/MP4/MOV)
· Short résumé (150 words)
· Where you are based
· Pitch video (MP4/MOV – up to 60 seconds – 150 MB)
EN,
                        'notes' => <<<'EN'
Notes:
· Files must be free of names or watermarks.
· Projects must be original and created for this festival.
· Previously published submissions will be rejected.
EN,
                    ],
                ],
            ],
            [
                'name' => 'طراحی صنعتی',
                'name_en' => 'Industrial Design',
                'icon_name' => 'industrial_design',
                'description' => 'طراحی محصول، خدمات و تجربه با رویکردی معاصر به نیازهای ایران',
                'description_en' => 'Product, service, and experience design addressing contemporary Iranian contexts.',
                'is_active' => true,
                'metadata' => null,
            ],
            [
                'name' => 'گرافیک و تصویرسازی',
                'name_en' => 'Graphic Design & Illustration',
                'icon_name' => 'illustration',
                'description' => 'پوستر، تصویرسازی، نشانه، اینفوگرافیک و طراحی متحرک با الهام از ایران',
                'description_en' => 'Poster, illustration, identity, infographics, and motion design celebrating Iran.',
                'is_active' => true,
                'metadata' => [
                    'fa' => [
                        'headline' => 'بخش گرافیک - جشنواره بین‌المللی مسیر ایران',
                        'submission_deadline' => 'نوروز ۱۴۰۵',
                        'guidelines' => <<<'FA'
· موضوع: فرهنگ و هنر ایران
· زیرشاخه‌ها: طراحی پوستر، تصویرسازی، نشانه، طراحی جلد، بسته‌بندی، اینفوگرافیک متحرک
· تعداد آثار: حداکثر ۵ اثر
· هیئت بازبین: اساتید گرافیک ایران

ملاک‌های ارزیابی
· ارتباط اثر با موضوع ایران
· خلاقیت در ایده‌پردازی و بیان بصری
· اصالت و بیان شخصی
· ترکیب‌بندی و مهارت فنی
· نوآوری در بازتاب هویت ایرانی

موارد الزامی
· نام اثر
· نام هنرمند
· زیرشاخه انتخابی
· نرم‌افزارهای مورد استفاده
· فایل اصلی (JPEG/PNG و برای اینفوگرافیک: MP4/MOV – رزولوشن 1080×1920 – تا ۳ دقیقه – ۳۰۰ مگابایت)

موارد اختیاری
· فایل‌های تکمیلی (۰ تا ۸ فایل – JPEG/PNG – تا ۲۰ مگابایت)
· رزومه کوتاه (۱۵۰ کلمه)
· محل زندگی شما
· مراحل طراحی / فرایند (JPEG/PNG/PDF – تا ۸ فایل – ۱۰ مگابایت)
· پالت رنگی (JPEG/PDF – تا ۵ مگابایت)
FA,
                        'notes' => <<<'FA'
توجه:
· آثار باید قابلیت نمایش در فضای مجازی را داشته باشند.
· برای آثار تعاملی ارائه راهنمای استفاده الزامی است.
· آثار باید اصیل و مختص جشنواره باشند و پیش‌تر منتشر نشده باشند.
FA,
                    ],
                    'en' => [
                        'headline' => 'Graphic Design – Iranian Route International Festival',
                        'submission_deadline' => 'Nowruz 2026',
                        'guidelines' => <<<'EN'
· Theme: Iran – culture and art
· Categories: poster, illustration, identity, book cover, packaging, motion infographic
· Submissions: up to 5 works
· Jury: graphic design faculty from Iranian universities

Evaluation Criteria
· Artistic relevance to Iran
· Creativity in concept and visual storytelling
· Originality and personal voice
· Composition and technical proficiency
· Innovation in reflecting Iranian identity

Required materials
· Title of the work
· Artist’s name
· Selected subcategory
· Software used
· Main file (JPEG/PNG, or MP4/MOV for motion pieces – 1080×1920 – up to 3 minutes – 300 MB)

Optional materials
· Additional files (0–8 files – JPEG/PNG – up to 20 MB each)
· Short résumé (150 words)
· Where you are based
· Process files (JPEG/PNG/PDF – up to 8 files – 10 MB each)
· Colour palette (JPEG/PDF – up to 5 MB)
EN,
                        'notes' => <<<'EN'
Notes:
· Files must be free of watermarks and artist names.
· Works must be original and created for this festival.
· Previously published pieces will be rejected.
EN,
                    ],
                ],
            ],
            [
                'name' => 'ادبیات',
                'name_en' => 'Literature',
                'icon_name' => 'literature',
                'description' => 'شعر و داستان کوتاه درباره ایران و تجربه ایرانی',
                'description_en' => 'Poetry and short fiction that explore Iran and the Iranian experience.',
                'is_active' => true,
                'metadata' => [
                    'fa' => [
                        'headline' => 'بخش ادبیات - جشنواره بین‌المللی مسیر ایران',
                        'submission_deadline' => 'نوروز ۱۴۰۵',
                        'guidelines' => <<<'FA'
شرایط کلی بخش ادبیات
· موضوع: ایران است. فرهنگ و هنر ایران
· حوزه‌ها: داستان کوتاه (حداکثر ۳۰۰۰ کلمه)، شعر (حداکثر ۵۰ بیت)
· تعداد آثار: حداکثر ۳ اثر
· هیئت بازبین: اساتید ادبیات ایران

موارد الزامی
· نام اثر
· نام نویسنده
· تاریخ اتمام نگارش
· نوع اثر (داستان/شعر)
· زبان اثر
· فایل اثر (PDF – تا ۵ مگابایت – فونت استاندارد)
· فایل صوتی خوانش اثر (MP3/WAV – تا ۱۵ دقیقه)

موارد اختیاری
· رزومه کوتاه (۱۵۰ کلمه)
· محل زندگی شما
· عکس‌ها یا تصویرسازی‌های همراه (۱ تا ۸ تصویر – JPEG/PNG – تا ۱۵ مگابایت)
· ویدئوی خوانش اثر (MP4/MOV)
· شرح اثر / منبع الهام (۲۰۰ کلمه)
FA,
                        'notes' => <<<'FA'
توجه:
· فایل‌ها نباید شامل نام هنرمند یا واترمارک باشند.
· آثار باید اصیل و مختص جشنواره باشند.
· انتشار قبلی موجب رد اثر خواهد شد.
FA,
                    ],
                    'en' => [
                        'headline' => 'Literature Section – Iranian Route International Festival',
                        'submission_deadline' => 'Nowruz 2026',
                        'guidelines' => <<<'EN'
General Conditions – Literature
· Theme: Iran, its culture and art
· Categories: short story (up to 3,000 words), poetry (up to 50 lines)
· Submissions: up to 3 works
· Jury: professors of Persian literature

Required materials
· Title of the work
· Author’s name
· Completion date
· Genre (story/poetry)
· Language of the work
· Manuscript (PDF – up to 5 MB – standard formatting)
· Audio recording of the work (MP3/WAV – up to 15 minutes)

Optional materials
· Short résumé (150 words)
· Where you are based
· Supporting visuals (1–8 images – JPEG/PNG – up to 15 MB each)
· Video reading (MP4/MOV)
· Commentary / inspiration (up to 200 words)
EN,
                        'notes' => <<<'EN'
Notes:
· Files must not include the author’s name or watermarks.
· Works must be original and prepared for this festival.
· Previously published material will be rejected.
EN,
                    ],
                ],
            ],
            [
                'name' => 'فرش',
                'name_en' => 'Carpet',
                'icon_name' => 'carpet',
                'description' => 'طراحی و بافت فرش ایرانی و معاصر',
                'description_en' => 'Traditional and contemporary Persian carpet design and weaving.',
                'is_active' => true,
                'metadata' => null,
            ],
            [
                'name' => 'سینما',
                'name_en' => 'Short Film',
                'icon_name' => 'short_film',
                'description' => 'فیلم کوتاه داستانی و مستند با محوریت ایران',
                'description_en' => 'Short narrative or documentary films inspired by Iran.',
                'is_active' => true,
                'metadata' => [
                    'fa' => [
                        'headline' => 'بخش سینما - جشنواره بین‌المللی مسیر ایران',
                        'submission_deadline' => 'نوروز ۱۴۰۵',
                        'guidelines' => <<<'FA'
شرایط کلی بخش سینما
· موضوع: فرهنگ و هنر ایران
· نوع آثار: فیلم کوتاه (حداکثر ۱۶ دقیقه)
· هیئت بازبین: اساتید سینما

موارد الزامی
· نام اثر
· نام کارگردان
· نام نویسنده
· نام سه بازیگر اصلی
· مدت زمان اثر
· خلاصه داستان (حداکثر ۳۰۰ کلمه)
· فایل فیلم (MP4/MOV – تا ۱ گیگابایت – کیفیت حداقل 1080p)
· پوستر اثر (JPEG/PNG – تا ۱۰ مگابایت)
· سخن هنرمند (حداکثر ۳۵۰ کلمه)

موارد اختیاری
· رزومه کوتاه (۱۵۰ کلمه)
· محل زندگی شما
· عکس‌های پشت صحنه (تا ۱۰ عکس – JPEG/PNG – تا ۵ مگابایت)
FA,
                        'notes' => <<<'FA'
توجه:
· فایل‌های ویدئویی نباید شامل نام هنرمند یا واترمارک باشند.
· آثار باید اصیل و مختص جشنواره باشند.
· انتشار قبلی اثر موجب رد خواهد شد.
FA,
                    ],
                    'en' => [
                        'headline' => 'Cinema Section – Iranian Route International Festival',
                        'submission_deadline' => 'Nowruz 2026',
                        'guidelines' => <<<'EN'
General Conditions – Cinema
· Theme: Iran, its culture and art
· Format: short film (up to 16 minutes)
· Jury: film professors from Iranian art universities

Required materials
· Title of the film
· Director’s name
· Writer’s name
· Names of three leading actors
· Running time
· Synopsis (up to 300 words)
· Film file (MP4/MOV – up to 1 GB – minimum 1080p)
· Poster (JPEG/PNG – up to 10 MB)
· Director’s statement (up to 350 words)

Optional materials
· Short résumé (150 words)
· Where you are based
· Behind-the-scenes photos (up to 10 images – JPEG/PNG – up to 5 MB each)
EN,
                        'notes' => <<<'EN'
Notes:
· Video files must be free of names or watermarks.
· Works must be original and created for this festival.
· Previously released films will be rejected.
EN,
                    ],
                ],
            ],
            [
                'name' => 'نمایش',
                'name_en' => 'Theater',
                'icon_name' => 'theater',
                'description' => 'تئاتر صحنه‌ای و اجراهای نمایشی با محوریت ایران',
                'description_en' => 'Stage plays and performance works rooted in Iranian narratives.',
                'is_active' => true,
                'metadata' => [
                    'fa' => [
                        'headline' => 'بخش تئاتر - جشنواره بین‌المللی مسیر ایران',
                        'submission_deadline' => 'نوروز ۱۴۰۵',
                        'guidelines' => <<<'FA'
شرایط کلی بخش تئاتر
· موضوع: فرهنگ و هنر ایران
· سبک: آزاد (تئاتر بلند – حداکثر ۸۰ دقیقه، تئاتر کوتاه – حداکثر ۱۶ دقیقه)
· هیئت بازبین: اساتید تئاتر

موارد الزامی
· نام اثر
· نام کارگردان
· نام نویسنده
· نام سه بازیگر اصلی
· مدت زمان اجرا
· خلاصه داستان (حداکثر ۳۰۰ کلمه)
· فیلم اجرا (MP4/MOV – تئاتر بلند تا ۱ گیگابایت، تئاتر کوتاه تا ۵۰۰ مگابایت – حداقل 720p)
· پوستر اثر (JPEG/PNG – تا ۱۰ مگابایت)
· سخن هنرمند (حداکثر ۳۵۰ کلمه)

موارد اختیاری
· رزومه کوتاه (۱۵۰ کلمه)
· محل زندگی شما
· عکس‌های پشت صحنه (تا ۱۰ عکس – JPEG/PNG – تا ۵ مگابایت)
FA,
                        'notes' => <<<'FA'
توجه:
· فایل‌های ویدئویی و عکس‌ها باید بدون نام و واترمارک باشند.
· آثار باید اصیل و اختصاصی جشنواره باشند.
· انتشار قبلی منجر به رد اثر خواهد شد.
FA,
                    ],
                    'en' => [
                        'headline' => 'Theatre Section – Iranian Route International Festival',
                        'submission_deadline' => 'Nowruz 2026',
                        'guidelines' => <<<'EN'
General Conditions – Theatre
· Theme: Iran, its culture and art
· Formats: full-length (up to 80 minutes) or short form (up to 16 minutes)
· Jury: theatre faculty from Iranian universities

Required materials
· Title of the production
· Director’s name
· Writer’s name
· Names of three principal actors
· Running time
· Synopsis (up to 300 words)
· Performance video (MP4/MOV – long form up to 1 GB, short form up to 500 MB – minimum 720p)
· Poster (JPEG/PNG – up to 10 MB)
· Artist statement (up to 350 words)

Optional materials
· Short résumé (150 words)
· Where you are based
· Backstage photos (up to 10 images – JPEG/PNG – up to 5 MB each)
EN,
                        'notes' => <<<'EN'
Notes:
· Video and photo files must be free of names or watermarks.
· Works must be original and prepared for this festival.
· Previously released productions will be rejected.
EN,
                    ],
                ],
            ],
            [
                'name' => 'طراحی پارچه و طراحی لباس',
                'name_en' => 'Textile & Fashion Design',
                'icon_name' => 'fashion_design',
                'description' => 'طراحی پارچه، لباس و مد با الهام از فرهنگ ایران',
                'description_en' => 'Textile and fashion design inspired by Iranian motifs and contemporary culture.',
                'is_active' => true,
                'metadata' => null,
            ],
            [
                'name' => 'انیمیشن',
                'name_en' => 'Animation',
                'icon_name' => 'animation',
                'description' => 'انیمیشن کوتاه در تکنیک‌های مختلف با محوریت ایران',
                'description_en' => 'Short-form animation in any technique exploring Iranian stories.',
                'is_active' => true,
                'metadata' => [
                    'fa' => [
                        'headline' => 'بخش انیمیشن - جشنواره بین‌المللی مسیر ایران',
                        'submission_deadline' => 'نوروز ۱۴۰۵',
                        'guidelines' => <<<'FA'
شرایط کلی بخش انیمیشن
· موضوع: فرهنگ و هنر ایران
· نوع آثار: انیمیشن کوتاه (حداکثر ۸ دقیقه)
· هیئت بازبین: اساتید انیمیشن

موارد الزامی
· نام اثر
· نام کارگردان
· نام نویسنده
· تکنیک انیمیشن
· مدت زمان اثر
· خلاصه داستان (حداکثر ۲۰۰ کلمه)
· فیلم اثر (MP4/MOV – تا ۵۰۰ مگابایت – حداقل 1080p)
· پوستر اثر (JPEG/PNG – تا ۱۰ مگابایت)
· سخن هنرمند (حداکثر ۳۵۰ کلمه)

موارد اختیاری
· رزومه کوتاه (۱۵۰ کلمه)
· محل زندگی شما
· عکس‌ها و طراحی‌های مراحل تولید (تا ۱۵ فایل – JPEG/PNG/PDF – تا ۵ مگابایت)
FA,
                        'notes' => <<<'FA'
توجه:
· فایل‌های ویدئویی نباید شامل نام هنرمند یا واترمارک باشند.
· آثار باید اصیل و مختص جشنواره باشند.
· انتشار قبلی موجب رد اثر خواهد شد.
FA,
                    ],
                    'en' => [
                        'headline' => 'Animation Section – Iranian Route International Festival',
                        'submission_deadline' => 'Nowruz 2026',
                        'guidelines' => <<<'EN'
General Conditions – Animation
· Theme: Iran, its culture and art
· Format: short animation (up to 8 minutes)
· Jury: animation faculty members

Required materials
· Title of the work
· Director’s name
· Writer’s name
· Animation technique
· Running time
· Synopsis (up to 200 words)
· Film file (MP4/MOV – up to 500 MB – minimum 1080p)
· Poster (JPEG/PNG – up to 10 MB)
· Artist statement (up to 350 words)

Optional materials
· Short résumé (150 words)
· Where you are based
· Production assets (up to 15 files – JPEG/PNG/PDF – up to 5 MB each)
EN,
                        'notes' => <<<'EN'
Notes:
· Video files must be free of artist names or watermarks.
· Works must be original and created for this festival.
· Previously published films will be rejected.
EN,
                    ],
                ],
            ],
            [
                'name' => 'عکاسی',
                'name_en' => 'Photography',
                'icon_name' => 'photography',
                'description' => 'تک‌عکس و مجموعه عکس با روایت فرهنگ و زندگی ایرانی',
                'description_en' => 'Single images and photo series portraying Iranian culture and everyday life.',
                'is_active' => true,
                'metadata' => [
                    'fa' => [
                        'headline' => 'بخش عکاسی - جشنواره بین‌المللی مسیر ایران',
                        'submission_deadline' => 'نوروز ۱۴۰۵',
                        'guidelines' => <<<'FA'
• بخش‌های پذیرفته‌شده: تک عکس و مجموعه
• موضوع: ایران، بازنمایی هنری فرهنگ و هنر ایران
• تکنیک: آزاد
• تعداد آثار: حداکثر ۸ اثر
• هیئت بازبین: اساتید عکاسی

ملاک‌های ارزیابی
· ارتباط اثر با موضوع ایران
· خلاقیت در دید و ترکیب‌بندی
· اصالت و بیان شخصی
· کیفیت فنی و وضوح تصویر
· روایت‌گری بصری

۱. تک عکس – موارد الزامی
· نام اثر
· نام هنرمند
· تاریخ و زمان عکاسی
· محل عکاسی
· فایل عکس (JPEG/PNG – تا ۲۰ مگابایت)
· سخن هنرمند (حداکثر ۳۵۰ کلمه)

موارد اختیاری
· رزومه کوتاه (۱۵۰ کلمه)
· محل زندگی
· سری عکس اضافی (تا ۸ تصویر – JPEG/PNG – تا ۲۰ مگابایت)

۲. مجموعه عکس – موارد الزامی
· نام مجموعه
· نام هنرمند
· تاریخ عکاسی
· محل عکاسی
· فایل تصاویر مجموعه (حداکثر ۱۶ عکس – JPEG/PNG – تا ۲۰ مگابایت)
· سخن عکاس (حداکثر ۳۵۰ کلمه)

موارد اختیاری
· رزومه کوتاه (۱۵۰ کلمه)
· محل زندگی
· سری عکس اضافی (تا ۸ تصویر – JPEG/PNG – تا ۲۰ مگابایت)
FA,
                        'notes' => <<<'FA'
توجه:
· فایل‌ها نباید حاوی نام یا واترمارک باشند.
· آثار باید اصیل و مختص جشنواره باشند.
· انتشار قبلی موجب رد اثر خواهد شد.
FA,
                    ],
                    'en' => [
                        'headline' => 'Photography Section – Iranian Route International Festival',
                        'submission_deadline' => 'Nowruz 2026',
                        'guidelines' => <<<'EN'
• Accepted categories: single image and series
• Theme: Iran – authentic visual narratives of its culture and art
• Technique: open
• Submissions: up to 8 works
• Jury: photography professors from Iranian art schools

Evaluation Criteria
· Artistic connection to the theme of Iran
· Creativity in vision and composition
· Originality and personal voice
· Technical quality and clarity
· Narrative strength

1. Single Image – Required
· Title
· Photographer’s name
· Date and time of capture
· Location
· Photo file (JPEG/PNG – up to 20 MB)
· Artist statement (up to 350 words)

Optional
· Short résumé (150 words)
· Where you are based
· Additional related images (up to 8 – JPEG/PNG – up to 20 MB)

2. Photo Series – Required
· Series title
· Photographer’s name
· Date of capture
· Location
· Series files (up to 16 images – JPEG/PNG – up to 20 MB each)
· Photographer’s statement (up to 350 words)

Optional
· Short résumé (150 words)
· Where you are based
· Supplementary images (up to 8 – JPEG/PNG – up to 20 MB)
EN,
                        'notes' => <<<'EN'
Notes:
· Files must not include names or watermarks.
· Works must be original and produced for this festival.
· Previously published images will be rejected.
EN,
                    ],
                ],
            ],
            [
                'name' => 'هنرهای جدید',
                'name_en' => 'New Media Arts',
                'icon_name' => 'new_media_arts',
                'description' => 'هنر دیجیتال، چیدمان، پرفورمنس، ویدئو آرت و هنر تعاملی با نگاهی نو به ایران',
                'description_en' => 'Digital, installation, performance, video, and interactive works exploring contemporary Iran.',
                'is_active' => true,
                'metadata' => [
                    'fa' => [
                        'headline' => 'هنرهای جدید - جشنواره بین‌المللی مسیر ایران',
                        'submission_deadline' => 'نوروز ۱۴۰۵',
                        'guidelines' => <<<'FA'
· رسانه‌های قابل پذیرش: هنر دیجیتال و NFT، چیدمان، پرفورمنس، ویدئو آرت، هنر تعاملی، هنر شبکه‌ای، هنر چندرسانه‌ای
· تعداد آثار: حداکثر ۲ پروژه
· هیئت بازبین: اساتید فعال در هنرهای نو از دانشگاه‌های هنر ایران

ملاک‌های ارزیابی
· ارتباط هنرمندانه اثر با موضوع ایران
· نوآوری در رسانه و زبان بیانی
· اصالت اثر و بیان شخصی
· عمق مفهومی و تاثیرگذاری
· تعامل با مخاطب و فضای نمایش
· تلفیق خلاقانه سنت و فناوری

موارد ارسالی الزامی
· عنوان اثر
· نام هنرمند
· فایل اصلی اثر:
  · فرمت: بر اساس رسانه (MP4, MOV, JPEG, PNG, PDF)
  · حجم: تا ۵۰۰ مگابایت
  · شرایط: کیفیت مناسب برای نمایش
· سخن هنرمند (حداکثر ۳۵۰ کلمه)

موارد اختیاری
· رزومه کوتاه (۱۵۰ کلمه)
· کجای جهان هستید؟
· فایل‌های فرعی از اثر (۱ تا ۸ فایل – فرمت متناسب با نوع اثر – حجم هر فایل تا ۵۰۰ مگابایت)
· طرح اولیه یا اسکیس (۱ تا ۸ عکس – فرمت JPEG/PNG/PDF – حجم هر عکس تا ۲۰ مگابایت)
· ابعاد/مدت زمان اثر
· رسانه اثر (نوع هنر جدید)
FA,
                        'notes' => <<<'FA'
توجه:
· کلیه آثار باید قابلیت نمایش در فضای مجازی را داشته باشند.
· برای آثار تعاملی، ارائه راهنمای استفاده الزامی است.
· تمام آثار باید حاصل خلاقیت و مالکیت هنرمند باشند.
· هرگونه کپی‌برداری یا سرقت هنری منجر به حذف قطعی اثر خواهد شد.
· آثار باید مختص جشنواره تولید شده و پیش از این منتشر نشده باشند.
FA,
                    ],
                    'en' => [
                        'headline' => 'New Media Arts – Iranian Route International Festival',
                        'submission_deadline' => 'Nowruz 2026',
                        'guidelines' => <<<'EN'
· Accepted media: digital art & NFTs, installations, performance, video art, interactive work, net art, multimedia
· Submissions: up to 2 projects
· Jury: leading practitioners and scholars of contemporary/new media art

Evaluation Criteria
· Artistic engagement with the theme of Iran
· Innovation in medium and expressive language
· Originality and personal perspective
· Conceptual depth and audience impact
· Quality of interaction and spatial experience
· Creative fusion of tradition and technology

Required materials
· Title of the work
· Artist’s name
· Primary file (appropriate to the medium – MP4/MOV/JPEG/PNG/PDF – up to 500 MB)
· Artist statement (up to 350 words)

Optional materials
· Short résumé (150 words)
· Where you are based
· Supporting files (1–8 items – matching formats – up to 500 MB each)
· Sketches or preparatory material (1–8 files – JPEG/PNG/PDF – up to 20 MB)
· Dimensions or duration of the work
· Medium / technology used
EN,
                        'notes' => <<<'EN'
Notes:
· All works must be suitable for online presentation.
· For interactive pieces, user guidance must be provided.
· All works must be original, unreleased, and created for this festival.
EN,
                    ],
                ],
            ],
        ];

        foreach ($artFields as $field) {
            ArtField::updateOrCreate(
                ['name' => $field['name']],
                $field
            );
        }
    }
}
