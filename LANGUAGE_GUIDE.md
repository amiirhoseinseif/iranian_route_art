# راهنمای سیستم چندزبانه / Multilingual System Guide

## Persian / فارسی

### نحوه استفاده

این پروژه اکنون از دو زبان فارسی و انگلیسی پشتیبانی می‌کند. زبان پیش‌فرض بر اساس timezone سیستم کاربر تشخیص داده می‌شود.

#### تغییر زبان

در navbar سایت، یک منوی انتخاب زبان (select box) با آیکون کره زمین 🌐 وجود دارد که شامل گزینه‌های:
- 🇮🇷 فارسی
- 🇬🇧 English

با انتخاب هر کدام از منو، زبان سایت به صورت خودکار و بدون reload تغییر می‌کند.

#### ساختار فایل‌های ترجمه

فایل‌های ترجمه در مسیر زیر قرار دارند:
- `lang/fa/messages.php` - ترجمه‌های فارسی
- `lang/en/messages.php` - ترجمه‌های انگلیسی
- `lang/fa/auth.php` - ترجمه‌های احراز هویت فارسی
- `lang/en/auth.php` - ترجمه‌های احراز هویت انگلیسی

#### افزودن ترجمه جدید

1. کلید ترجمه را به فایل‌های `messages.php` در هر دو زبان اضافه کنید
2. در کامپوننت React از hook استفاده کنید:

```javascript
import { useTranslation } from '@/Utils/translation';

function MyComponent() {
    const { trans } = useTranslation();
    
    return <h1>{trans('my_key')}</h1>;
}
```

#### تشخیص خودکار زبان

سیستم به طور خودکار زبان را بر اساس timezone کاربر تشخیص می‌دهد:
- اگر timezone ایران باشد (Asia/Tehran)، فارسی انتخاب می‌شود
- در غیر این صورت، انگلیسی انتخاب می‌شود
- کاربران می‌توانند زبان را دستی تغییر دهند و انتخاب آن‌ها در session ذخیره می‌شود

---

## English

### How to Use

This project now supports both Persian and English languages. The default language is automatically detected based on the user's system timezone.

#### Changing Language

In the website navbar, there is a language selection menu (select box) with a globe icon 🌐 that includes:
- 🇮🇷 فارسی (Persian)
- 🇬🇧 English

By selecting either option from the menu, the site language changes automatically without page reload.

#### Translation Files Structure

Translation files are located at:
- `lang/fa/messages.php` - Persian translations
- `lang/en/messages.php` - English translations
- `lang/fa/auth.php` - Persian authentication translations
- `lang/en/auth.php` - English authentication translations

#### Adding New Translations

1. Add the translation key to the `messages.php` files in both languages
2. Use the hook in React components:

```javascript
import { useTranslation } from '@/Utils/translation';

function MyComponent() {
    const { trans } = useTranslation();
    
    return <h1>{trans('my_key')}</h1>;
}
```

#### Automatic Language Detection

The system automatically detects the language based on the user's timezone:
- If the timezone is Iran (Asia/Tehran), Persian is selected
- Otherwise, English is selected
- Users can manually change the language, and their choice is saved in the session

---

## Technical Details

### Backend (Laravel)

- **Middleware**: `SetLocale` - Handles locale detection and switching
- **Translations**: Stored in `lang/fa/` and `lang/en/` directories
- **Sharing with Frontend**: Via Inertia.js in `HandleInertiaRequests`

### Frontend (React)

- **Language Switcher**: `LanguageSwitcher.jsx` component
- **Translation Hook**: `useTranslation()` from `Utils/translation.js`
- **RTL/LTR Support**: Automatic direction switching based on language

### Key Features

1. **Automatic Timezone Detection**: Uses browser timezone to set default language
2. **Session Persistence**: Language choice is saved in session
3. **Smooth Switching**: No page reload required when changing language
4. **RTL Support**: Automatic right-to-left layout for Persian
5. **Comprehensive Coverage**: All UI text is translatable
6. **Beautiful UI**: Custom-styled select dropdown with globe icon and country flags
7. **Responsive Design**: Different styles for public pages (gradient theme) and authenticated pages (gray theme)
8. **Accessibility**: Keyboard navigation support and disabled state during language change

---

## مسائل احتمالی / Troubleshooting

### زبان تغییر نمی‌کند / Language Not Changing

1. مطمئن شوید که جاوااسکریپت در مرورگر فعال است
2. کش مرورگر را پاک کنید
3. مطمئن شوید session در سرور فعال است

### متن‌ها به جای ترجمه کلید نشان می‌دهند / Text Shows Keys Instead of Translations

1. مطمئن شوید فایل‌های ترجمه به درستی ایجاد شده‌اند
2. کلید ترجمه را در فایل `messages.php` چک کنید
3. کش Laravel را پاک کنید: `php artisan cache:clear`

---

Made with ❤️ for Iranian Route Art Festival

