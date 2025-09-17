# Persian DatePicker Components

مجموعه کامپوننت‌های انتخابگر تاریخ شمسی برای پروژه Laravel + React + Inertia.js

## نصب و راه‌اندازی

### 1. نصب وابستگی‌ها

```bash
npm install moment-jalaali moment
```

### 2. کامپوننت‌های موجود

- `PersianDatePicker`: انتخابگر تاریخ با تقویم
- `PersianDateInput`: ورودی تاریخ با قابلیت تایپ و انتخاب از تقویم
- `persianDate.js`: ابزارهای کمکی برای کار با تاریخ شمسی

## استفاده

### PersianDatePicker

کامپوننت انتخابگر تاریخ ساده:

```jsx
import PersianDatePicker from '@/Components/PersianDatePicker';

function MyComponent() {
    const [selectedDate, setSelectedDate] = useState('');

    return (
        <PersianDatePicker
            value={selectedDate}
            onChange={setSelectedDate}
            placeholder="انتخاب تاریخ"
            className="w-full"
        />
    );
}
```

### PersianDateInput

کامپوننت ورودی تاریخ با قابلیت تایپ:

```jsx
import PersianDateInput from '@/Components/PersianDateInput';

function MyForm() {
    const [birthDate, setBirthDate] = useState('');

    return (
        <PersianDateInput
            value={birthDate}
            onChange={setBirthDate}
            placeholder="تاریخ تولد"
            className="w-full"
        />
    );
}
```

## ویژگی‌ها

### PersianDatePicker
- نمایش تقویم شمسی (جلالی)
- انتخاب دستی ماه و سال از dropdown
- ناوبری با فلش‌های چپ و راست
- نام ماه‌های فارسی
- روزهای هفته به فارسی
- دکمه "امروز" برای انتخاب سریع
- پشتیبانی از حالت غیرفعال
- طراحی ریسپانسیو

### PersianDateInput
- تمام ویژگی‌های PersianDatePicker
- قابلیت تایپ مستقیم تاریخ
- اعتبارسنجی خودکار تاریخ
- سازگاری با فرم‌های Laravel

## Props

### PersianDatePicker & PersianDateInput

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | مقدار تاریخ در فرمت `jYYYY/jMM/jDD` |
| `onChange` | `function` | `() => {}` | تابع تغییر مقدار |
| `placeholder` | `string` | `'انتخاب تاریخ'` | متن راهنما |
| `className` | `string` | `''` | کلاس‌های CSS اضافی |
| `disabled` | `boolean` | `false` | حالت غیرفعال |
| `name` | `string` | `''` | نام فیلد |

## ابزارهای کمکی

### persianDate.js

مجموعه توابع کمکی برای کار با تاریخ شمسی:

```jsx
import { 
    formatPersianDate, 
    formatPersianDateToText,
    isValidPersianDate,
    getTodayPersian 
} from '@/Utils/persianDate';

// فرمت کردن تاریخ
const formatted = formatPersianDate('1403/06/25'); // "1403/06/25"

// تبدیل به متن فارسی
const text = formatPersianDateToText('1403/06/25'); // "دوشنبه، 25 شهریور 1403"

// اعتبارسنجی تاریخ
const isValid = isValidPersianDate('1403/06/25'); // true

// تاریخ امروز
const today = getTodayPersian(); // "1403/06/25"
```

## مثال کامل

```jsx
import { useState } from 'react';
import PersianDatePicker from '@/Components/PersianDatePicker';
import InputLabel from '@/Components/InputLabel';

function UserForm() {
    const [formData, setFormData] = useState({
        name: '',
        birthDate: '',
        registrationDate: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <InputLabel value="نام" />
                <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full rounded-md border-gray-300"
                />
            </div>

            <div>
                <InputLabel value="تاریخ تولد" />
                <PersianDatePicker
                    value={formData.birthDate}
                    onChange={(value) => setFormData({...formData, birthDate: value})}
                    placeholder="تاریخ تولد را انتخاب کنید"
                    className="w-full"
                />
            </div>

            <div>
                <InputLabel value="تاریخ ثبت‌نام" />
                <PersianDatePicker
                    value={formData.registrationDate}
                    onChange={(value) => setFormData({...formData, registrationDate: value})}
                    placeholder="تاریخ ثبت‌نام"
                    className="w-full"
                />
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                ثبت
            </button>
        </form>
    );
}
```

## صفحه نمایش نمونه

برای مشاهده نمونه‌های کامل، به صفحه زیر مراجعه کنید:
- URL: `/datepicker-demo` (نیاز به احراز هویت دارد)

## نکات مهم

1. **فرمت تاریخ**: تمام تاریخ‌ها در فرمت `jYYYY/jMM/jDD` (مثل `1403/06/25`) ذخیره می‌شوند.

2. **RTL Support**: کامپوننت‌ها از RTL پشتیبانی می‌کنند.

3. **Tailwind CSS**: طراحی با Tailwind CSS انجام شده است.

4. **Validation**: برای اعتبارسنجی تاریخ‌ها از `isValidPersianDate` استفاده کنید.

5. **Database**: در دیتابیس می‌توانید تاریخ‌ها را به صورت رشته ذخیره کنید یا با استفاده از `persianToGregorian` به میلادی تبدیل کنید.

## عیب‌یابی

### مشکل نمایش تاریخ
- مطمئن شوید که `moment-jalaali` نصب شده است
- فرمت تاریخ باید `jYYYY/jMM/jDD` باشد

### مشکل RTL
- فونت `Vazirmatn` در Tailwind config تنظیم شده است
- از کلاس‌های RTL Tailwind استفاده کنید

### مشکل تقویم
- مطمئن شوید که `z-index` کافی برای نمایش dropdown تنظیم شده است
