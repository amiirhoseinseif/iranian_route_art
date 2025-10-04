import React, { createContext, useContext, useState, useEffect } from 'react';
import { t, getCurrentLocale, applyDirection, getFontFamily } from '../Utils/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children, initialLocale, initialTranslations }) => {
    const [currentLocale, setCurrentLocale] = useState(initialLocale || getCurrentLocale());
    const [translations, setTranslations] = useState(initialTranslations || window.translations || {});

    // Load translations for all languages
    const [allTranslations, setAllTranslations] = useState({
        fa: initialTranslations || window.translations || {},
        ar: window.translationsAr || {},
        en: window.translationsEn || {}
    });

    // Function to change language without page refresh
    const changeLanguage = async (newLocale) => {
        if (newLocale === currentLocale) return;

        // Store preference in localStorage
        localStorage.setItem('preferred_language', newLocale);

        // Update current locale
        setCurrentLocale(newLocale);
        
        // Update window object for compatibility
        window.currentLocale = newLocale;
        
        // Update translations
        if (allTranslations[newLocale]) {
            setTranslations(allTranslations[newLocale]);
            window.translations = allTranslations[newLocale];
        }

        // Apply direction changes
        applyDirection();

        // Send request to backend to update session (without page refresh)
        try {
            await fetch(`/lang/${newLocale}`, {
                method: 'GET',
                credentials: 'same-origin'
            });
        } catch (error) {
            console.warn('Failed to update server session:', error);
        }
    };

    // Initialize from localStorage on mount
    useEffect(() => {
        const savedLocale = localStorage.getItem('preferred_language');
        if (savedLocale && savedLocale !== currentLocale && ['fa', 'ar', 'en'].includes(savedLocale)) {
            changeLanguage(savedLocale);
        }
    }, []);

    // Apply direction when locale changes
    useEffect(() => {
        applyDirection();
    }, [currentLocale]);

    const value = {
        currentLocale,
        translations,
        changeLanguage,
        t: (key, params = {}) => {
            // Use current translations for translation
            const keys = key.split('.');
            let translation = translations;
            
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
        },
        getCurrentLocale: () => currentLocale,
        getFontFamily,
        isRTL: () => ['fa', 'ar'].includes(currentLocale)
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
