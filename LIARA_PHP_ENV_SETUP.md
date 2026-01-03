# راهنمای تنظیم PHP در Liara

## مشکل
فایل `php.ini` در root پروژه در Liara اعمال نمی‌شود. Liara از **Environment Variables** یا **`liara.json`** برای تنظیمات PHP استفاده می‌کند.

## راه حل 1: استفاده از `liara.json` (توصیه می‌شود) ⭐

این روش ساده‌تر و قابل اعتمادتر است.

### مرحله 1: ویرایش فایل `liara.json`
فایل `liara.json` در root پروژه را ویرایش کنید و بخش `phpConfig` را اضافه کنید:

```json
{
  "port": 80,
  "platform": "laravel",
  "app": "iranian-art-route",
  "php": "8.3",
  "node": "22",
  "build": {
    "location": "iran"
  },
  "laravel": {
    "phpVersion": "8.3"
  },
  "phpConfig": {
    "upload_max_filesize": "1000M",
    "post_max_size": "1000M",
    "max_execution_time": 1800,
    "max_input_time": 1800,
    "memory_limit": "1024M",
    "max_file_uploads": 20
  }
}
```

### مرحله 2: Deploy و Restart
1. فایل `liara.json` را commit و push کنید
2. اپلیکیشن را در Liara deploy کنید
3. اپلیکیشن را **Restart** کنید

### مرحله 3: بررسی تنظیمات
بعد از deploy و restart، با SSH بررسی کنید:

```bash
php -i | grep upload_max_filesize
php -i | grep post_max_size
```

---

## راه حل 2: استفاده از Environment Variables

### مرحله 1: ورود به پنل Liara
1. به پنل Liara بروید: https://console.liara.ir
2. وارد حساب کاربری خود شوید
3. اپلیکیشن `iranian-art-route` را انتخاب کنید

### مرحله 2: تنظیم Environment Variables
1. در صفحه اپلیکیشن، به بخش **Settings** بروید
2. روی **Environment Variables** کلیک کنید
3. Environment Variables زیر را اضافه کنید:

```
php.upload_max_filesize = 1000M
php.post_max_size = 1000M
php.max_execution_time = 1800
php.max_input_time = 1800
php.memory_limit = 1024M
php.max_file_uploads = 20
```

### مرحله 3: Restart اپلیکیشن
بعد از اضافه کردن Environment Variables، حتماً اپلیکیشن را **Restart** کنید.

### مرحله 4: بررسی تنظیمات
بعد از restart، با SSH به اپلیکیشن متصل شوید و بررسی کنید:

```bash
php -i | grep upload_max_filesize
php -i | grep post_max_size
php -i | grep max_execution_time
php -i | grep memory_limit
```

باید مقادیر زیر را ببینید:
- `upload_max_filesize => 1000M => 1000M`
- `post_max_size => 1000M => 1000M`
- `max_execution_time => 1800 => 1800`
- `memory_limit => 1024M => 1024M`

## نکات مهم

1. ✅ **Environment Variables** در Liara با prefix `php.` کار می‌کنند
2. ✅ بعد از تغییر Environment Variables، حتماً **Restart** کنید
3. ✅ `post_max_size` باید **بزرگتر یا مساوی** `upload_max_filesize` باشد
4. ✅ `memory_limit` باید **بزرگتر یا مساوی** `post_max_size` باشد

## مقادیر پیشنهادی برای فایل‌های بزرگ

برای فایل‌های تا 1GB:
```
php.upload_max_filesize = 1000M
php.post_max_size = 1000M
php.max_execution_time = 1800
php.max_input_time = 1800
php.memory_limit = 1024M
```

برای فایل‌های تا 500MB:
```
php.upload_max_filesize = 500M
php.post_max_size = 500M
php.max_execution_time = 600
php.max_input_time = 600
php.memory_limit = 512M
```

## عیب‌یابی

### اگر Environment Variables اعمال نشدند:

اگر در خروجی `php -i` می‌بینید:
```
php.upload_max_filesize => 1000M
upload_max_filesize => 100M => 100M
```

یعنی Environment Variables تنظیم شده‌اند اما اعمال نشده‌اند. راه‌حل‌ها:

#### راه‌حل 1: Restart کامل اپلیکیشن
1. در پنل Liara، به بخش **Settings** بروید
2. روی دکمه **Restart** کلیک کنید
3. منتظر بمانید تا اپلیکیشن کاملاً restart شود (چند دقیقه)
4. دوباره بررسی کنید:
   ```bash
   php -i | grep upload_max_filesize
   ```

#### راه‌حل 2: بررسی فرمت Environment Variables
در پنل Liara، مطمئن شوید که Environment Variables را به این صورت وارد کرده‌اید:
- **نام:** `php.upload_max_filesize`
- **مقدار:** `1000M` (بدون فاصله، با M بزرگ)

**نکته:** بعضی از پلتفرم‌ها ممکن است نیاز به فرمت `1000M` یا `1024000K` داشته باشند.

#### راه‌حل 3: استفاده از `.user.ini` (اگر Environment Variables کار نکرد)
اگر Environment Variables کار نکرد، می‌توانید فایل `.user.ini` را در root پروژه ایجاد کنید:

```ini
upload_max_filesize = 1000M
post_max_size = 1000M
max_execution_time = 1800
max_input_time = 1800
memory_limit = 1024M
```

**توجه:** این فایل باید در root پروژه باشد (همان سطح `composer.json`).

#### راه‌حل 4: استفاده از `liara.json` (توصیه می‌شود)
اگر Environment Variables کار نکرد، از `liara.json` استفاده کنید. این روش ساده‌تر و قابل اعتمادتر است.

در فایل `liara.json` بخش `phpConfig` را اضافه کنید:
```json
{
  "phpConfig": {
    "upload_max_filesize": "1000M",
    "post_max_size": "1000M",
    "max_execution_time": 1800,
    "max_input_time": 1800,
    "memory_limit": "1024M",
    "max_file_uploads": 20
  }
}
```

سپس اپلیکیشن را deploy و restart کنید.

#### راه‌حل 5: تماس با پشتیبانی Liara
اگر هیچکدام از راه‌حل‌ها کار نکرد، با پشتیبانی Liara تماس بگیرید و مشکل را توضیح دهید.

### اگر هنوز خطای "POST Content-Length exceeds" می‌گیرید:
1. بررسی کنید که `nginx.conf` هم به 1000M تنظیم شده باشد
2. بررسی کنید که اپلیکیشن را Restart کرده‌اید
3. بررسی کنید که Environment Variables را درست اضافه کرده‌اید

## منابع
- [مستندات Liara - Environment Variables](https://docs.liara.ir/app-deploy/env)
- [مستندات Liara - PHP Configuration](https://docs.liara.ir/app-deploy/php-config)
