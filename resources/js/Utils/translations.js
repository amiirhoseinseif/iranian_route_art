// Translation utilities for the application

/**
 * Get the current locale from localStorage or default to 'fa'
 */
export const getCurrentLocale = () => {
    return localStorage.getItem('preferred_language') || 'fa';
};

/**
 * Initialize language preferences from localStorage
 */
export const initializeLanguagePreferences = () => {
    const savedLocale = localStorage.getItem('preferred_language');
    if (savedLocale && ['fa', 'ar', 'en'].includes(savedLocale)) {
        window.currentLocale = savedLocale;
    } else {
        window.currentLocale = 'fa';
        localStorage.setItem('preferred_language', 'fa');
    }
};

/**
 * Apply text direction based on current locale
 */
export const applyDirection = () => {
    const locale = getCurrentLocale();
    const isRTL = ['fa', 'ar'].includes(locale);
    
    // Update document direction
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
    
    // Update body class for styling
    document.body.classList.remove('rtl', 'ltr');
    document.body.classList.add(isRTL ? 'rtl' : 'ltr');
    
    // Update font family based on locale
    const fontFamily = getFontFamily(locale);
    document.body.style.fontFamily = fontFamily;
};

/**
 * Get appropriate font family for the locale
 */
export const getFontFamily = (locale) => {
    switch (locale) {
        case 'fa':
            return '"Vazirmatn", "Tahoma", "Arial", sans-serif';
        case 'ar':
            return '"Cairo", "Tahoma", "Arial", sans-serif';
        case 'en':
        default:
            return '"Inter", "Helvetica", "Arial", sans-serif';
    }
};

/**
 * Translation function - gets translation from window.translations
 */
export const t = (key, params = {}) => {
    const keys = key.split('.');
    let translation = window.translations || {};
    
    for (const k of keys) {
        if (translation && typeof translation === 'object' && k in translation) {
            translation = translation[k];
        } else {
            translation = key; // Fallback to original key
            break;
        }
    }
    
    // Replace parameters in translation
    if (typeof translation === 'string') {
        Object.keys(params).forEach(param => {
            translation = translation.replace(`:${param}`, params[param]);
        });
    }
    
    return translation;
};

/**
 * Check if current locale is RTL
 */
export const isRTL = () => {
    const locale = getCurrentLocale();
    return ['fa', 'ar'].includes(locale);
};
