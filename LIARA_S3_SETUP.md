# راهنمای تنظیم Liara Storage برای Laravel

## مشکل فعلی
خطای `InvalidAccessKeyId` یعنی Access Key ID که در `.env` تنظیم شده، در records Liara وجود ندارد.

## راه حل گام به گام

### مرحله 1: دریافت Credentials از Liara

1. به پنل Liara بروید: https://console.liara.ir
2. وارد حساب کاربری خود شوید
3. به بخش **Storage** بروید
4. روی bucket **iranian-route** کلیک کنید
5. به بخش **Access Keys** یا **Credentials** بروید
6. اگر Access Key ندارید:
   - روی دکمه **Create Access Key** کلیک کنید
   - یک نام برای Access Key انتخاب کنید (مثلاً: `laravel-app`)
   - Access Key و Secret Key را کپی کنید
   - **⚠️ مهم**: Secret Key فقط یک بار نمایش داده می‌شود، حتماً آن را کپی کنید

### مرحله 2: تنظیم .env

فایل `.env` را باز کنید و این مقادیر را تنظیم کنید:

```env
AWS_ACCESS_KEY_ID=<access_key_from_liara>
AWS_SECRET_ACCESS_KEY=<secret_key_from_liara>
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=iranian-route
AWS_ENDPOINT=https://storage.iran.liara.space
AWS_USE_PATH_STYLE_ENDPOINT=true
```

**مثال:**
```env
AWS_ACCESS_KEY_ID=64vl1234567890r2
AWS_SECRET_ACCESS_KEY=abc123def456ghi789jkl012mno345pqr678stu901vwx234yz5678902fe0
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=iranian-route
AWS_ENDPOINT=https://storage.iran.liara.space
AWS_USE_PATH_STYLE_ENDPOINT=true
```

### مرحله 3: پاک کردن Cache

بعد از تغییر `.env`، حتماً cache را پاک کنید:

```bash
php artisan config:clear
php artisan cache:clear
```

### مرحله 4: تست

1. به صفحه تست بروید: `http://localhost:8000/s3/test`
2. یک فایل انتخاب کنید
3. روی "تست آپلود" کلیک کنید
4. اگر `s3_accessible: true` و `upload_test.success: true` بود، یعنی همه چیز درست است!

## نکات مهم

- ✅ Access Key و Secret Key باید از **همان bucket** باشند
- ✅ بعد از تغییر `.env`، حتماً `config:clear` را اجرا کنید
- ✅ اگر Access Key منقضی شده، یک Access Key جدید ایجاد کنید
- ✅ Secret Key فقط یک بار نمایش داده می‌شود، حتماً آن را ذخیره کنید

## عیب‌یابی

### اگر هنوز خطای `InvalidAccessKeyId` می‌گیرید:

1. بررسی کنید که Access Key را درست کپی کرده‌اید (بدون فاصله اضافی)
2. بررسی کنید که Secret Key را درست کپی کرده‌اید
3. بررسی کنید که Access Key مربوط به bucket `iranian-route` باشد
4. یک Access Key جدید ایجاد کنید و دوباره امتحان کنید

### اگر خطای `403 Forbidden` می‌گیرید:

1. بررسی کنید که Access Key permissions درست باشد
2. بررسی کنید که bucket name درست باشد: `iranian-route`

### اگر خطای `Could not resolve host` می‌گیرید:

1. بررسی کنید که `AWS_ENDPOINT` درست باشد: `https://storage.iran.liara.space`
2. اتصال اینترنت را بررسی کنید

## تست دستی با AWS CLI (اختیاری)

اگر AWS CLI نصب دارید، می‌توانید credentials را تست کنید:

```bash
aws s3 ls s3://iranian-route/ \
  --endpoint-url https://storage.iran.liara.space \
  --region us-east-1
```

اگر این دستور کار کرد، یعنی credentials درست است و مشکل از Laravel configuration است.

