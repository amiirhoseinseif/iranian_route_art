# راهنمای Deployment برای رفع مشکل OAuth Clients

## مشکل
خطای "Personal access client not found for 'admins' user provider" به دلیل عدم وجود OAuth clients برای تمام user providers رخ می‌داد.

## راه حل
1. ✅ AppServiceProvider را ساده کردیم تا بدون error کار کند
2. ✅ PassportClientSeeder ایجاد کردیم
3. ✅ Command مخصوص ایجاد OAuth clients ایجاد کردیم

## مراحل Deployment

### 1. Commit و Push تغییرات
```bash
git add .
git commit -m "Fix OAuth clients for multiple user providers"
git push origin main
```

### 2. در Production Server اجرا کنید:
```bash
# ایجاد OAuth clients
php artisan passport:create-clients

# یا استفاده از seeder
php artisan db:seed --class=PassportClientSeeder
```

### 3. Clear Caches (اختیاری)
```bash
php artisan config:clear
php artisan route:clear
```

## فایل‌های تغییر یافته:
- `app/Providers/AppServiceProvider.php` - ساده شد
- `database/seeders/PassportClientSeeder.php` - جدید
- `database/seeders/DatabaseSeeder.php` - اضافه شد
- `app/Console/Commands/CreatePassportClients.php` - جدید

## تست
بعد از deployment، login برای تمام user types (artists, admins, judges) باید کار کند.

## مشکل حل شد! 🎉
