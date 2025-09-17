# جشنواره هنری مسیر ایران - Iranian Route Art Festival

یک پلتفرم کامل برای مدیریت جشنواره هنری با قابلیت ثبت نام هنرمندان، ارسال آثار هنری، و داوری تخصصی.

## ویژگی‌ها ✨

- **ثبت نام هنرمندان**: سیستم ثبت نام کامل با اطلاعات شخصی و حرفه‌ای
- **رشته‌های هنری متنوع**: موسیقی، نقاشی، فیلم‌سازی، مجسمه‌سازی، گرافیک، خوشنویسی، عکاسی، معماری
- **مدیریت آثار**: آپلود و مدیریت آثار هنری با فیلدهای پویا
- **سیستم داوری**: ارزیابی آثار توسط هیئت داوران متخصص
- **پنل مدیریت**: کنترل کامل سیستم توسط مدیران
- **رابط کاربری فارسی**: طراحی زیبا و کاربرپسند با فونت فارسی
- **احراز هویت چندگانه**: سیستم‌های جداگانه برای هنرمندان، داوران و مدیران

## تکنولوژی‌های استفاده شده 🛠️

- **Backend**: Laravel 11 + PHP 8.2+
- **Frontend**: React + Inertia.js + Tailwind CSS
- **Database**: MySQL
- **Authentication**: Laravel Passport
- **Font**: Vazirmatn (فونت فارسی)

## پیش‌نیازها 📋

- PHP 8.2 یا بالاتر
- Composer
- Node.js 18+ و npm
- MySQL 8.0 یا بالاتر
- Git

## نصب و راه‌اندازی 🚀

### 1. کلون کردن پروژه
```bash
git clone <repository-url>
cd iranian_route_art
```

### 2. نصب وابستگی‌های PHP
```bash
composer install
```

### 3. نصب وابستگی‌های Node.js
```bash
npm install
```

### 4. کپی فایل محیط
```bash
cp .env.example .env
```

### 5. تنظیم متغیرهای محیط
فایل `.env` را ویرایش کنید و اطلاعات دیتابیس را وارد کنید:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=iranian_route_art
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 6. تولید کلید اپلیکیشن
```bash
php artisan key:generate
```

### 7. اجرای مایگریشن‌ها
```bash
php artisan migrate
```

### 8. اجرای سیدرها
```bash
php artisan db:seed
```

### 9. نصب Passport
```bash
php artisan passport:install
```

### 10. ساخت فایل‌های فرانت‌اند
```bash
npm run build
```

### 11. اجرای سرور
```bash
php artisan serve
```

## ساختار دیتابیس 🗄️

### جداول اصلی:
- **art_fields**: رشته‌های هنری
- **field_requirements**: نیازمندی‌های هر رشته
- **artists**: هنرمندان
- **educational_backgrounds**: سوابق تحصیلی
- **arts**: آثار هنری
- **judges**: داوران
- **judge_assignments**: تخصیص داوران
- **art_evaluations**: ارزیابی آثار
- **admins**: مدیران
- **festival_settings**: تنظیمات جشنواره

## کاربران پیش‌فرض 👥

### ادمین اصلی:
- **ایمیل**: amiirhoseinseif@gmail.com
- **شماره تماس**: 09101006949
- **نام**: amirhosein seif
- **رمز عبور**: Amirhosein@12

## مسیرهای اصلی 🛣️

- **صفحه اصلی**: `/`
- **ثبت نام هنرمند**: `/artist/register`
- **پنل هنرمند**: `/artist/dashboard`
- **پنل داور**: `/judge/dashboard`
- **پنل مدیریت**: `/admin/dashboard`

## ویژگی‌های امنیتی 🔒

- احراز هویت چندگانه با Passport
- رمزگذاری پسوردها
- محافظت از مسیرها با middleware
- اعتبارسنجی ورودی‌ها
- محافظت از CSRF

## سفارشی‌سازی 🎨

### تغییر رنگ‌ها:
فایل `tailwind.config.js` را ویرایش کنید.

### تغییر فونت:
فایل `resources/css/app.css` را ویرایش کنید.

### اضافه کردن رشته هنری جدید:
1. رکورد جدید در جدول `art_fields` اضافه کنید
2. نیازمندی‌های مربوطه را در `field_requirements` تعریف کنید
3. فیلدهای مربوطه در فرم ثبت اثر اضافه کنید

## توسعه 🧪

### اجرای تست‌ها:
```bash
php artisan test
```

### مشاهده مسیرها:
```bash
php artisan route:list
```

### پاک کردن کش:
```bash
php artisan cache:clear
php artisan config:clear
php artisan view:clear
```

## استقرار 🌐

### تولید:
```bash
npm run build
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### تنظیمات سرور:
- PHP-FPM یا Apache/Nginx
- MySQL
- Redis (اختیاری برای کش)

## مشارکت 🤝

1. Fork کنید
2. Branch جدید ایجاد کنید (`git checkout -b feature/amazing-feature`)
3. تغییرات را commit کنید (`git commit -m 'Add amazing feature'`)
4. Push کنید (`git push origin feature/amazing-feature`)
5. Pull Request ایجاد کنید

## لایسنس 📄

این پروژه تحت لایسنس MIT منتشر شده است.

## پشتیبانی 💬

برای سوالات و مشکلات:
- ایمیل: info@iranianrouteart.ir
- شماره تماس: +98-21-12345678

## تغییرات اخیر 📝

### نسخه 1.0.0
- راه‌اندازی اولیه سیستم
- ثبت نام هنرمندان
- مدیریت آثار هنری
- سیستم داوری
- پنل‌های مدیریتی
- رابط کاربری فارسی

---

**جشنواره هنری مسیر ایران** - ترویج هنر و فرهنگ ایرانی 🌟
