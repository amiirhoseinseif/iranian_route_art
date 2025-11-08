import { usePage } from '@inertiajs/react';

/**
 * Translation utility hook
 */
export function useTranslation() {
    const { translations, locale } = usePage().props;
    
    /**
     * Translate a key
     * @param {string} key - Translation key
     * @param {object} replacements - Optional key-value pairs to replace in translation
     * @returns {string} - Translated text
     */
    const trans = (key, replacements = {}) => {
        let translation = translations?.[key] || key;
        
        // Replace placeholders like :name with actual values
        Object.keys(replacements).forEach(placeholder => {
            translation = translation.replace(
                new RegExp(`:${placeholder}`, 'g'),
                replacements[placeholder]
            );
        });
        
        return translation;
    };
    
    /**
     * Check if current locale is RTL
     */
    const isRTL = () => {
        return locale === 'fa';
    };
    
    /**
     * Get current locale
     */
    const getLocale = () => {
        return locale;
    };
    
    return { trans, isRTL, getLocale };
}

/**
 * Standalone translation function (for use outside components)
 */
export function trans(key, translations = {}, replacements = {}) {
    let translation = translations?.[key] || key;
    
    Object.keys(replacements).forEach(placeholder => {
        translation = translation.replace(
            new RegExp(`:${placeholder}`, 'g'),
            replacements[placeholder]
        );
    });
    
    return translation;
}

