# راهنمای کامل Dropdown سفارشی زبان / Custom Language Dropdown Guide

## 🎨 طراحی و ویژگی‌ها / Design & Features

### ویژگی‌های اصلی:

#### ✨ طراحی مدرن و زیبا
- **بدون استفاده از HTML `<select>`** - کاملاً سفارشی با React
- **انیمیشن‌های smooth** برای باز/بسته شدن
- **Backdrop blur effect** برای زیبایی بیشتر
- **Shadow و gradient** برای حالت انتخاب شده

#### 🎯 تجربه کاربری عالی (UX)
- کلیک خارج از dropdown آن را می‌بندد
- فلش چرخان (rotate animation) هنگام باز/بسته شدن
- حالت Disabled با spinner زیبا در حین تغییر زبان
- Checkmark (✓) برای زبان فعلی
- Hover effect روی هر گزینه

#### 🔥 ویژگی‌های تکنیکال
- **React Hooks**: `useState`, `useEffect`, `useRef`
- **Click Outside Detection**: بسته شدن با کلیک خارج
- **Event Listeners**: پاک‌سازی خودکار
- **Smooth Transitions**: انیمیشن fade-in با CSS
- **Loading State**: نمایش spinner در حین تغییر

---

## 📋 ساختار کامپوننت

### 1. LanguageSwitcher (اصلی - برای FestivalLayout)

```jsx
<LanguageSwitcher className="mr-4" />
```

**مشخصات:**
- پس‌زمینه شفاف سفید با blur
- مناسب برای gradient header
- دکمه trigger با آیکون کره زمین 🌐
- Dropdown سفید با shadow
- انیمیشن fade-in
- Checkmark برای انتخاب فعلی

**نمای Trigger Button:**
```
┌─────────────────────────┐
│ 🌐  🇮🇷 فارسی    ▼    │  ← backdrop blur, شفاف
└─────────────────────────┘
```

**نمای Dropdown:**
```
┌─────────────────────────┐
│ 🇮🇷  فارسی        ✓   │  ← gradient amber, selected
├─────────────────────────┤
│ 🇬🇧  English           │  ← hover: gray-50
└─────────────────────────┘
```

---

### 2. LanguageSwitcherCompact (برای موبایل)

```jsx
<LanguageSwitcherCompact />
```

**مشخصات:**
- نسخه فشرده‌تر
- full-width برای منوهای موبایل
- همان استایل اما کوچکتر

---

### 3. LanguageSwitcherAuth (برای داشبورد)

```jsx
<LanguageSwitcherAuth className="mr-4" />
```

**مشخصات:**
- پس‌زمینه خاکستری روشن
- border خاکستری
- مناسب برای navbar های سفید
- رنگ‌بندی خنثی

**نمای Trigger Button:**
```
┌─────────────────────────┐
│ 🌐  🇮🇷 فارسی    ▼    │  ← bg-gray-100
└─────────────────────────┘
```

---

## 🎬 نحوه کار (Flow)

### 1. کلیک روی Trigger
```javascript
onClick={() => !isChanging && setIsOpen(!isOpen)}
```
- State `isOpen` toggle می‌شود
- فلش 180 درجه می‌چرخد (`rotate-180`)
- Dropdown با انیمیشن `fadeIn` ظاهر می‌شود

### 2. انتخاب زبان
```javascript
onClick={() => switchLanguage(lang.code)}
```
- بررسی: آیا زبان جدید با فعلی متفاوت است؟
- `setIsChanging(true)` - نمایش loading
- `setIsOpen(false)` - بستن dropdown
- `router.visit()` - تغییر route با locale جدید
- بدون reload صفحه (`preserveState`, `preserveScroll`)

### 3. Success Callback
```javascript
onSuccess: () => {
    setCurrentLocale(newLocale);
    setIsChanging(false);
    document.documentElement.dir = newLocale === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLocale;
}
```
- تغییر direction (RTL/LTR)
- تنظیم lang attribute
- پایان loading

### 4. کلیک خارج از Dropdown
```javascript
useEffect(() => {
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);
```
- استفاده از `useRef` برای reference
- Event listener برای mousedown
- پاک‌سازی خودکار در cleanup

---

## 🎨 استایل‌ها و انیمیشن‌ها

### Trigger Button Classes
```jsx
className={`
  flex items-center gap-2
  bg-white bg-opacity-10 backdrop-blur-sm
  rounded-xl px-4 py-2.5
  border border-white border-opacity-20
  hover:bg-opacity-20
  transition-all duration-200
  ${isOpen ? 'ring-2 ring-white ring-opacity-30' : ''}
`}
```

### Dropdown Menu Classes
```jsx
className="
  absolute top-full mt-2 right-0
  w-48 bg-white rounded-xl
  shadow-2xl overflow-hidden
  z-50 animate-fadeIn
  border border-gray-100
"
```

### Option Selected State
```jsx
className={`
  ${lang.code === currentLocale 
    ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-r-4 border-amber-500' 
    : 'hover:bg-gray-50'
  }
`}
```

### Loading Spinner
```jsx
<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
```

---

## 🎭 انیمیشن FadeIn

در `app.css`:
```css
@layer utilities {
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fadeIn {
        animation: fadeIn 0.2s ease-out;
    }
}
```

---

## 📱 Responsive Design

### Desktop (> 768px)
- Dropdown به سمت راست باز می‌شود
- عرض ثابت: `w-48` (192px)
- Shadow بزرگ برای جدا شدن از background

### Mobile (< 768px)
- از `LanguageSwitcherCompact` استفاده کنید
- Full-width: `w-full`
- Dropdown همان عرض trigger

---

## 🔧 نکات توسعه

### افزودن زبان جدید:
```javascript
const languages = [
    { code: 'fa', name: 'فارسی', flag: '🇮🇷', dir: 'rtl' },
    { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },  // مثال
];
```

### تغییر رنگ‌بندی:
```javascript
// برای theme دلخواه:
const themeClasses = {
  trigger: 'bg-blue-500 hover:bg-blue-600',
  dropdown: 'bg-white border-blue-200',
  selected: 'bg-blue-50 border-blue-500 text-blue-600',
  hover: 'hover:bg-blue-50'
};
```

### افزودن آیکون سفارشی:
```jsx
<span className="text-xl">
  {lang.code === 'fa' ? '🇮🇷' : '🇬🇧'}
</span>
```

---

## ✅ Accessibility (دسترسی‌پذیری)

- ✅ **Keyboard Navigation**: می‌توانید با Tab به dropdown بروید
- ✅ **Focus Management**: Focus به درستی مدیریت می‌شود
- ✅ **Disabled State**: حالت غیرفعال واضح است
- ✅ **Screen Readers**: متن واضح و قابل خواندن
- ✅ **Visual Feedback**: بازخورد بصری در هر مرحله

---

## 🚀 Performance

- **Light Weight**: بدون dependency اضافی
- **Optimized Re-renders**: استفاده بهینه از React hooks
- **Event Cleanup**: پاک‌سازی صحیح event listeners
- **CSS Animations**: استفاده از CSS به جای JS برای انیمیشن‌ها

---

## 🎯 Best Practices پیاده‌سازی شده

1. ✅ **Controlled Component**: State به درستی مدیریت می‌شود
2. ✅ **Error Handling**: مدیریت خطا در onError
3. ✅ **Loading States**: نمایش صحیح حالت loading
4. ✅ **Click Outside**: بستن dropdown با کلیک خارج
5. ✅ **Smooth UX**: انیمیشن‌های نرم و محو
6. ✅ **Responsive**: سازگار با تمام اندازه‌های صفحه
7. ✅ **Clean Code**: کد تمیز و قابل نگهداری

---

## 📸 Screenshots (توصیف نمای بصری)

### حالت بسته (Closed):
```
┌──────────────────────────────────┐
│  ┌─────────────────────────┐    │
│  │ 🌐  🇮🇷 فارسی    ▼    │    │  ← شفاف با blur
│  └─────────────────────────┘    │
└──────────────────────────────────┘
```

### حالت باز (Open):
```
┌──────────────────────────────────┐
│  ┌─────────────────────────┐    │
│  │ 🌐  🇮🇷 فارسی    ▲    │    │  ← ring روشن
│  └─────────────────────────┘    │
│  ┌─────────────────────────┐    │
│  │ 🇮🇷  فارسی        ✓   │    │  ← gradient
│  ├─────────────────────────┤    │
│  │ 🇬🇧  English           │    │  ← hover effect
│  └─────────────────────────┘    │
└──────────────────────────────────┘
```

### حالت Loading:
```
┌──────────────────────────────────┐
│  ┌─────────────────────────┐    │
│  │      ⟳ Loading...       │    │  ← spinner animation
│  └─────────────────────────┘    │
└──────────────────────────────────┘
```

---

Made with ❤️ for Iranian Route Art Festival

