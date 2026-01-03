# راهنمای تنظیمات Liara برای پروژه Laravel

این فایل راهنمای تنظیمات PHP و Nginx برای استقرار پروژه روی پلتفرم Liara است.

## ⚠️ مهم: نحوه تنظیم PHP و Nginx در Liara

### برای Nginx:
**بله!** Liara به صورت خودکار فایل `nginx.conf` را در **root پروژه** شناسایی می‌کند و از آن استفاده می‌کند.

### برای PHP:
**خیر!** فایل `php.ini` در root پروژه در Liara اعمال نمی‌شود. باید از **`liara.json`** یا **Environment Variables** استفاده کنید.

**راه حل 1 (توصیه می‌شود):** استفاده از `liara.json` - به بخش زیر مراجعه کنید.
**راه حل 2:** استفاده از Environment Variables - به فایل `LIARA_PHP_ENV_SETUP.md` مراجعه کنید.

## ساختار فایل‌های تنظیمات

### 1. تنظیمات PHP (از طریق `liara.json` - توصیه می‌شود) ⭐
⚠️ **مهم:** فایل `php.ini` در root پروژه در Liara اعمال نمی‌شود!

**بهترین راه:** استفاده از بخش `phpConfig` در فایل `liara.json` یا فایل `liara_php.ini`:

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

**راه جایگزین:** استفاده از Environment Variables در پنل Liara (به فایل `LIARA_PHP_ENV_SETUP.md` مراجعه کنید).

### 2. `nginx.conf` (در root پروژه)
این فایل تنظیمات Nginx را برای پردازش فایل‌های بزرگ تعریف می‌کند.

**محتویات:**
- `client_max_body_size 1000M` - حداکثر حجم بدنه درخواست
- `client_body_timeout 1800s` - تایم‌اوت برای دریافت بدنه درخواست
- `client_body_buffer_size 1000M` - اندازه بافر برای بدنه درخواست
- `proxy_read_timeout 1800s` - تایم‌اوت خواندن از پروکسی
- `proxy_connect_timeout 1800s` - تایم‌اوت اتصال به پروکسی
- `proxy_send_timeout 1800s` - تایم‌اوت ارسال به پروکسی

### 3. `liara.json` (در root پروژه)
این فایل تنظیمات اصلی اپلیکیشن در Liara را تعریف می‌کند و **بهترین راه** برای تنظیم PHP است.

**محتویات:**
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

**نکته:** بخش `phpConfig` تنظیمات PHP را تعریف می‌کند و در زمان deploy اعمال می‌شود.

### 4. `liara_php.ini` (در root پروژه - اختیاری)
این فایل می‌تواند به عنوان جایگزین یا مکمل `liara.json` استفاده شود.

**محتویات:**
```ini
file_uploads = On
upload_max_filesize = 1000M
post_max_size = 1000M
max_execution_time = 1800
max_input_time = 1800
memory_limit = 1024M
max_file_uploads = 20
upload_tmp_dir = /tmp
```

**نکته:** اگر از `liara.json` استفاده می‌کنید، این فایل اختیاری است.

### 5. `public/.htaccess`
این فایل فقط شامل قوانین rewrite برای Laravel است. **توجه:** دستورات PHP (`php_value`) در این فایل کار نمی‌کنند چون Liara از Nginx استفاده می‌کند، نه Apache.

## نحوه استقرار

### مرحله 1: اطمینان از وجود فایل‌ها در root
قبل از deploy، مطمئن شوید که این فایل‌ها در **root پروژه** (همان سطح `composer.json` و `liara.json`) هستند:

```
iranian_route_art/
├── composer.json
├── liara.json          ← باید اینجا باشد (با phpConfig)
├── liara_php.ini       ← اختیاری (اگر از liara.json استفاده نمی‌کنید)
├── nginx.conf          ← باید اینجا باشد
├── .user.ini           ← اختیاری (fallback)
├── .env
├── app/
├── public/
└── ...
```

### مرحله 2: Deploy به Liara
1. فایل‌ها را به repository خود push کنید
2. در پنل Liara، اپلیکیشن را deploy کنید
3. Liara به صورت خودکار فایل `nginx.conf` را شناسایی و اعمال می‌کند

### مرحله 3: Restart اپلیکیشن
بعد از deploy و تنظیم Environment Variables، حتماً اپلیکیشن را در پنل Liara **restart** کنید تا تنظیمات اعمال شوند.

### مرحله 4: تست تنظیمات
- یک فایل بزرگ (مثلاً 100MB) آپلود کنید
- بررسی کنید که فایل با موفقیت آپلود می‌شود
- با SSH به اپلیکیشن متصل شوید و بررسی کنید:
  ```bash
  php -i | grep upload_max_filesize
  php -i | grep post_max_size
  ```
- لاگ‌های PHP و Nginx را در پنل Liara بررسی کنید

## نکات مهم

- ⚠️ **فایل `php.ini` در Liara اعمال نمی‌شود!** باید از Environment Variables استفاده کنید
- ✅ فایل `nginx.conf` باید در **root** پروژه باشد، نه در `public/`
- ✅ بعد از تغییر تنظیمات یا Environment Variables، اپلیکیشن را در Liara **restart** کنید
- ✅ `post_max_size` باید **بزرگتر یا مساوی** `upload_max_filesize` باشد
- ✅ `memory_limit` باید **بزرگتر یا مساوی** `post_max_size` باشد
- ✅ تنظیمات `nginx.conf` فقط برای Nginx است و در Apache کار نمی‌کند

## عیب‌یابی

### اگر فایل‌های بزرگ آپلود نمی‌شوند:

1. ⚠️ **مهم:** بررسی کنید که Environment Variables را در پنل Liara تنظیم کرده‌اید:
   - `php.upload_max_filesize = 1000M`
   - `php.post_max_size = 1000M`
   - `php.max_execution_time = 1800`
   - `php.memory_limit = 1024M`
2. ✅ بررسی کنید که فایل `nginx.conf` در **root پروژه** است
3. ✅ اطمینان حاصل کنید که فایل‌ها در repository شما commit شده‌اند
4. ✅ اپلیکیشن را در Liara **restart** کنید
5. ✅ با SSH بررسی کنید که تنظیمات PHP اعمال شده‌اند:
   ```bash
   php -i | grep upload_max_filesize
   php -i | grep post_max_size
   ```
6. ✅ لاگ‌های PHP و Nginx را در پنل Liara بررسی کنید

### بررسی اینکه تنظیمات اعمال شده‌اند:

بعد از deploy و تنظیم Environment Variables، می‌توانید با دستور زیر در SSH Liara بررسی کنید:

```bash
# اتصال به SSH اپلیکیشن در Liara
# بررسی تنظیمات PHP (باید 1000M باشد):
php -i | grep upload_max_filesize
php -i | grep post_max_size
php -i | grep max_execution_time
php -i | grep memory_limit

# بررسی فایل nginx.conf:
ls -la /app/nginx.conf
```

### اگر خطای timeout می‌گیرید:

- `max_execution_time` را در `php.ini` افزایش دهید
- `client_body_timeout` را در `nginx.conf` افزایش دهید
- `proxy_read_timeout` را در `nginx.conf` افزایش دهید

## منابع

- [مستندات Liara](https://docs.liara.ir)
- [تنظیمات PHP در Liara](https://docs.liara.ir/app-deploy/php-config)
- [تنظیمات Nginx در Liara](https://docs.liara.ir/app-deploy/nginx-config)
