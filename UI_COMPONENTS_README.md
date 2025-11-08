# راهنمای کامپوننت‌های UI / UI Components Guide

## Language Switcher Components

### نمای کلی / Overview

سیستم چندزبانه شامل سه نوع سوییچ زبان است که برای بخش‌های مختلف وبسایت طراحی شده‌اند.

---

## 1. LanguageSwitcher (Default)

**استفاده / Usage**: برای navbar های عمومی (FestivalLayout)

**ویژگی‌ها / Features**:
- پس‌زمینه شفاف با backdrop blur
- رنگ سفید برای متن و آیکون‌ها
- مناسب برای header های رنگی (gradient)
- آیکون کره زمین 🌐
- پرچم کشورها در منو 🇮🇷 🇬🇧

```jsx
import LanguageSwitcher from '@/Components/LanguageSwitcher';

<LanguageSwitcher className="mr-4" />
```

**استایل**:
- Background: `bg-white bg-opacity-10 backdrop-blur-sm`
- Border: `border border-white border-opacity-20`
- Text: `text-white`
- Hover: `hover:bg-opacity-20`

---

## 2. LanguageSwitcherCompact

**استفاده / Usage**: برای منوهای موبایل و فضاهای محدود

**ویژگی‌ها / Features**:
- اندازه کوچکتر
- مناسب برای responsive menu
- همان استایل LanguageSwitcher اما compact

```jsx
import { LanguageSwitcherCompact } from '@/Components/LanguageSwitcher';

<LanguageSwitcherCompact />
```

---

## 3. LanguageSwitcherAuth

**استفاده / Usage**: برای داشبورد و صفحات احراز هویت شده

**ویژگی‌ها / Features**:
- پس‌زمینه خاکستری روشن
- مناسب برای navbar های سفید
- مناسب برای AuthenticatedLayout

```jsx
import { LanguageSwitcherAuth } from '@/Components/LanguageSwitcher';

<LanguageSwitcherAuth className="mr-4" />
```

**استایل**:
- Background: `bg-gray-100`
- Border: `border border-gray-200`
- Text: `text-gray-700`
- Hover: `hover:border-gray-300`

---

## ویژگی‌های مشترک / Common Features

### 1. تشخیص خودکار Timezone
```javascript
useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.cookie = `timezone=${timezone}; path=/; max-age=31536000`;
}, []);
```

### 2. تغییر نرم زبان (بدون reload)
```javascript
router.visit(window.location.pathname, {
    method: 'get',
    data: { locale: newLocale },
    preserveState: true,
    preserveScroll: true
});
```

### 3. به‌روزرسانی خودکار RTL/LTR
```javascript
document.documentElement.dir = newLocale === 'fa' ? 'rtl' : 'ltr';
document.documentElement.lang = newLocale;
```

### 4. حالت غیرفعال (Disabled State)
در حین تغییر زبان، select غیرفعال می‌شود تا از تغییرات متعدد جلوگیری شود.

---

## طراحی UI / UI Design

### آیکون کره زمین (Globe Icon)
```jsx
<svg className="w-5 h-5 text-white mr-2">
    <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
</svg>
```

### Custom Select Styling
- فلش کشویی سفارشی با SVG
- بدون ظاهر پیش‌فرض browser
- انیمیشن‌های smooth

### رنگ‌بندی
- **Public Pages**: سفید شفاف روی gradient نارنجی-قرمز
- **Auth Pages**: خاکستری روشن روی سفید

---

## نمونه استفاده در Layout ها / Example Usage in Layouts

### FestivalLayout.jsx
```jsx
import LanguageSwitcher from '@/Components/LanguageSwitcher';

<nav className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600">
    {/* Navigation items */}
    <LanguageSwitcher />
</nav>
```

### AuthenticatedLayout.jsx
```jsx
import { LanguageSwitcherAuth } from '@/Components/LanguageSwitcher';

<nav className="bg-white">
    {/* Navigation items */}
    <LanguageSwitcherAuth className="mr-4" />
</nav>
```

### Mobile Menu (FestivalLayout)
```jsx
import { LanguageSwitcherCompact } from '@/Components/LanguageSwitcher';

<div className="mobile-menu">
    {/* Menu items */}
    <div className="px-3 py-2">
        <LanguageSwitcherCompact />
    </div>
</div>
```

---

## Accessibility

### Keyboard Navigation
- ✅ Tab برای focus
- ✅ Space/Enter برای باز کردن
- ✅ Arrow keys برای انتخاب
- ✅ Escape برای بستن

### Screen Readers
- Select دارای label مناسب
- حالت disabled مشخص است
- تغییرات زبان اعلام می‌شود

---

## Performance

- **Lightweight**: کد بهینه و سبک
- **No Extra Libraries**: بدون dependency اضافی
- **Optimized Rendering**: استفاده از React hooks بهینه
- **Instant Feedback**: بازخورد فوری به کاربر

---

## Browser Support

✅ Chrome/Edge (Chromium)
✅ Firefox
✅ Safari
✅ Mobile Browsers (iOS Safari, Chrome Mobile)

---

Made with ❤️ for Iranian Route Art Festival

