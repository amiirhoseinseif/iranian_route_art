import React, { useEffect, useState, useRef } from 'react';
import { router, usePage } from '@inertiajs/react';

export default function LanguageSwitcher({ className = '', isScrolled = false }) {
    const { locale } = usePage().props;
    const [currentLocale, setCurrentLocale] = useState(locale || 'fa');
    const [isChanging, setIsChanging] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // SVG Flag Components
    const IranFlagIcon = () => (
        <svg className="w-5 h-3" viewBox="0 0 20 12">
            <rect width="20" height="12" fill="#239F40"/>
            <rect width="20" height="4" y="4" fill="#FFFFFF"/>
            <rect width="20" height="4" y="8" fill="#DA0000"/>
            <path d="M8.5 6c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" fill="#FFFFFF"/>
            <path d="M8 6c0 .8-.7 1.5-1.5 1.5S5 6.8 5 6 5.7 4.5 6.5 4.5 8 5.2 8 6z" fill="#DA0000"/>
            <text x="10" y="7.5" fontSize="1.8" fill="#FFFFFF" textAnchor="middle">الله</text>
        </svg>
    );

    const UsFlagIcon = () => (
        <svg className="w-5 h-3" viewBox="0 0 20 12">
            <rect width="20" height="12" fill="#B22234"/>
            <rect width="20" height="0.92" y="0.92" fill="#FFFFFF"/>
            <rect width="20" height="0.92" y="2.76" fill="#FFFFFF"/>
            <rect width="20" height="0.92" y="4.6" fill="#FFFFFF"/>
            <rect width="20" height="0.92" y="6.44" fill="#FFFFFF"/>
            <rect width="20" height="0.92" y="8.28" fill="#FFFFFF"/>
            <rect width="20" height="0.92" y="10.12" fill="#FFFFFF"/>
            <rect width="8.5" height="6.44" fill="#3C3B6E"/>
            <circle cx="1.5" cy="1.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="2.5" cy="1.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="3.5" cy="1.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="4.5" cy="1.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="5.5" cy="1.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="6.5" cy="1.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="7.5" cy="1.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="2" cy="2.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="3" cy="2.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="4" cy="2.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="5" cy="2.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="6" cy="2.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="7" cy="2.5" r="0.3" fill="#FFFFFF"/>
        </svg>
    );

    const languages = [
        { code: 'fa', name: 'فارسی', flag: <IranFlagIcon />, dir: 'rtl' },
        { code: 'en', name: 'English', flag: <UsFlagIcon />, dir: 'ltr' }
    ];

    // Update local state when locale prop changes
    useEffect(() => {
        setCurrentLocale(locale || 'fa');
    }, [locale]);

    // Detect and set timezone on component mount
    useEffect(() => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        document.cookie = `timezone=${timezone}; path=/; max-age=31536000`;
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const switchLanguage = (newLocale) => {
        if (newLocale === currentLocale || isChanging) return;
        
        setIsChanging(true);
        setIsOpen(false);
        
        router.visit(window.location.pathname + window.location.search, {
            method: 'get',
            data: { locale: newLocale },
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setCurrentLocale(newLocale);
                setIsChanging(false);
                document.documentElement.dir = newLocale === 'fa' ? 'rtl' : 'ltr';
                document.documentElement.lang = newLocale;
            },
            onError: () => {
                setIsChanging(false);
            }
        });
    };

    const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                onClick={() => !isChanging && setIsOpen(!isOpen)}
                disabled={isChanging}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all duration-200 ${
                    isScrolled
                        ? 'bg-secondary-50 border border-secondary-200 hover:bg-secondary-100'
                        : 'bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-20'
                } ${
                    isChanging ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                } ${isOpen ? (isScrolled ? 'ring-2 ring-secondary-300' : 'ring-2 ring-white ring-opacity-30') : ''}`}
            >
                {/* Globe Icon */}
                <svg 
                    className={`w-5 h-5 transition-colors duration-200 ${isScrolled ? 'text-secondary-600' : 'text-white'}`}
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>

                {/* Current Language */}
                <div className="flex items-center gap-2">
                    <span className="flex items-center">{currentLanguage.flag}</span>
                    <span className={`font-medium text-sm transition-colors duration-200 ${isScrolled ? 'text-secondary-700' : 'text-white'}`}>
                        {currentLanguage.name}
                    </span>
                </div>

                {/* Arrow Icon */}
                <svg 
                    className={`w-4 h-4 transition-all duration-200 ${isScrolled ? 'text-secondary-600' : 'text-white'} ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full mt-2 right-0 w-48 bg-white rounded-xl shadow-2xl overflow-hidden z-50 animate-fadeIn border border-secondary-200">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => switchLanguage(lang.code)}
                            disabled={isChanging}
                            className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-150 ${
                                lang.code === currentLocale 
                                    ? 'bg-gradient-to-r from-secondary-50 to-secondary-100 border-r-4 border-secondary-500' 
                                    : 'hover:bg-gray-50'
                            } ${isChanging ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            <span className="flex items-center">{lang.flag}</span>
                            <span className={`font-medium ${
                                lang.code === currentLocale ? 'text-secondary-600' : 'text-secondary-700'
                            }`}>
                                {lang.name}
                            </span>
                            
                            {/* Checkmark for selected */}
                            {lang.code === currentLocale && (
                                <svg 
                                    className="w-5 h-5 text-secondary-500 mr-auto" 
                                    fill="none" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* Loading Spinner */}
            {isChanging && (
                <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl ${
                    isScrolled ? 'bg-secondary-50 bg-opacity-80' : 'bg-white bg-opacity-20'
                }`}>
                    <div className={`w-5 h-5 border-2 rounded-full animate-spin ${
                        isScrolled 
                            ? 'border-secondary-400 border-t-transparent' 
                            : 'border-white border-t-transparent'
                    }`}></div>
                </div>
            )}
        </div>
    );
}

/**
 * Compact version for mobile or dropdown menus
 */
export function LanguageSwitcherCompact({ className = '' }) {
    const { locale } = usePage().props;
    const [currentLocale, setCurrentLocale] = useState(locale || 'fa');
    const [isChanging, setIsChanging] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // SVG Flag Components
    const IranFlagIcon = () => (
        <svg className="w-4 h-2.5" viewBox="0 0 20 12">
            <rect width="20" height="12" fill="#239F40"/>
            <rect width="20" height="4" y="4" fill="#FFFFFF"/>
            <rect width="20" height="4" y="8" fill="#DA0000"/>
            <path d="M8.5 6c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" fill="#FFFFFF"/>
            <path d="M8 6c0 .8-.7 1.5-1.5 1.5S5 6.8 5 6 5.7 4.5 6.5 4.5 8 5.2 8 6z" fill="#DA0000"/>
            <text x="10" y="7.5" fontSize="1.5" fill="#FFFFFF" textAnchor="middle">الله</text>
        </svg>
    );

    const UsFlagIcon = () => (
        <svg className="w-4 h-2.5" viewBox="0 0 20 12">
            <rect width="20" height="12" fill="#B22234"/>
            <rect width="20" height="0.92" y="0.92" fill="#FFFFFF"/>
            <rect width="20" height="0.92" y="2.76" fill="#FFFFFF"/>
            <rect width="20" height="0.92" y="4.6" fill="#FFFFFF"/>
            <rect width="20" height="0.92" y="6.44" fill="#FFFFFF"/>
            <rect width="20" height="0.92" y="8.28" fill="#FFFFFF"/>
            <rect width="20" height="0.92" y="10.12" fill="#FFFFFF"/>
            <rect width="8.5" height="6.44" fill="#3C3B6E"/>
            <circle cx="1.5" cy="1.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="2.5" cy="1.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="3.5" cy="1.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="4.5" cy="1.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="5.5" cy="1.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="6.5" cy="1.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="7.5" cy="1.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="2" cy="2.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="3" cy="2.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="4" cy="2.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="5" cy="2.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="6" cy="2.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="7" cy="2.5" r="0.3" fill="#FFFFFF"/>
        </svg>
    );

    const languages = [
        { code: 'fa', name: 'فارسی', flag: <IranFlagIcon /> },
        { code: 'en', name: 'English', flag: <UsFlagIcon /> }
    ];

    useEffect(() => {
        setCurrentLocale(locale || 'fa');
    }, [locale]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const switchLanguage = (newLocale) => {
        if (newLocale === currentLocale || isChanging) return;
        setIsChanging(true);
        setIsOpen(false);
        
        router.visit(window.location.pathname + window.location.search, {
            method: 'get',
            data: { locale: newLocale },
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setCurrentLocale(newLocale);
                setIsChanging(false);
                document.documentElement.dir = newLocale === 'fa' ? 'rtl' : 'ltr';
                document.documentElement.lang = newLocale;
            },
            onError: () => {
                setIsChanging(false);
            }
        });
    };

    const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                onClick={() => !isChanging && setIsOpen(!isOpen)}
                disabled={isChanging}
                className={`w-full flex items-center gap-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white border-opacity-20 hover:bg-opacity-20 transition-all ${
                    isChanging ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="flex items-center">{currentLanguage.flag}</span>
                <span className="text-white font-medium text-sm flex-1 text-left">{currentLanguage.name}</span>
                <svg className={`w-3 h-3 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full mt-1 left-0 right-0 bg-white rounded-lg shadow-xl overflow-hidden z-50 animate-fadeIn">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => switchLanguage(lang.code)}
                            className={`w-full flex items-center gap-2 px-3 py-2.5 transition-all ${
                                lang.code === currentLocale ? 'bg-secondary-50 text-secondary-600' : 'hover:bg-secondary-100 text-secondary-700'
                            }`}
                        >
                            <span className="flex items-center">{lang.flag}</span>
                            <span className="font-medium text-sm">{lang.name}</span>
                            {lang.code === currentLocale && (
                                <svg className="w-4 h-4 text-secondary-500 mr-auto" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

/**
 * Language switcher for authenticated layouts (gray theme)
 */
export function LanguageSwitcherAuth({ className = '' }) {
    const { locale } = usePage().props;
    const [currentLocale, setCurrentLocale] = useState(locale || 'fa');
    const [isChanging, setIsChanging] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // SVG Flag Components
    const IranFlagIcon = () => (
        <svg className="w-4 h-2.5" viewBox="0 0 20 12">
            <rect width="20" height="12" fill="#239F40"/>
            <rect width="20" height="4" y="4" fill="#FFFFFF"/>
            <rect width="20" height="4" y="8" fill="#DA0000"/>
            <path d="M8.5 6c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" fill="#FFFFFF"/>
            <path d="M8 6c0 .8-.7 1.5-1.5 1.5S5 6.8 5 6 5.7 4.5 6.5 4.5 8 5.2 8 6z" fill="#DA0000"/>
            <text x="10" y="7.5" fontSize="1.5" fill="#FFFFFF" textAnchor="middle">الله</text>
        </svg>
    );

    const UsFlagIcon = () => (
        <svg className="w-4 h-2.5" viewBox="0 0 20 12">
            <rect width="20" height="12" fill="#B22234"/>
            <rect width="20" height="0.92" y="0.92" fill="#FFFFFF"/>
            <rect width="20" height="0.92" y="2.76" fill="#FFFFFF"/>
            <rect width="20" height="0.92" y="4.6" fill="#FFFFFF"/>
            <rect width="20" height="0.92" y="6.44" fill="#FFFFFF"/>
            <rect width="20" height="0.92" y="8.28" fill="#FFFFFF"/>
            <rect width="20" height="0.92" y="10.12" fill="#FFFFFF"/>
            <rect width="8.5" height="6.44" fill="#3C3B6E"/>
            <circle cx="1.5" cy="1.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="2.5" cy="1.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="3.5" cy="1.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="4.5" cy="1.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="5.5" cy="1.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="6.5" cy="1.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="7.5" cy="1.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="2" cy="2.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="3" cy="2.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="4" cy="2.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="5" cy="2.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="6" cy="2.5" r="0.3" fill="#FFFFFF"/>
            <circle cx="7" cy="2.5" r="0.3" fill="#FFFFFF"/>
        </svg>
    );

    const languages = [
        { code: 'fa', name: 'فارسی', flag: <IranFlagIcon /> },
        { code: 'en', name: 'English', flag: <UsFlagIcon /> }
    ];

    useEffect(() => {
        setCurrentLocale(locale || 'fa');
    }, [locale]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const switchLanguage = (newLocale) => {
        if (newLocale === currentLocale || isChanging) return;
        setIsChanging(true);
        setIsOpen(false);
        
        router.visit(window.location.pathname + window.location.search, {
            method: 'get',
            data: { locale: newLocale },
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setCurrentLocale(newLocale);
                setIsChanging(false);
                document.documentElement.dir = newLocale === 'fa' ? 'rtl' : 'ltr';
                document.documentElement.lang = newLocale;
            },
            onError: () => {
                setIsChanging(false);
            }
        });
    };

    const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                onClick={() => !isChanging && setIsOpen(!isOpen)}
                disabled={isChanging}
                className={`flex items-center gap-2 bg-secondary-100 rounded-lg px-3 py-2 border border-secondary-200 hover:border-secondary-300 transition-all ${
                    isChanging ? 'opacity-50 cursor-not-allowed' : ''
                } ${isOpen ? 'ring-2 ring-gray-300' : ''}`}
            >
                <svg className="w-4 h-4 text-secondary-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="flex items-center">{currentLanguage.flag}</span>
                <span className="text-secondary-700 font-medium text-sm">{currentLanguage.name}</span>
                <svg className={`w-3 h-3 text-secondary-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 right-0 w-44 bg-white rounded-lg shadow-xl overflow-hidden z-50 animate-fadeIn border border-secondary-200">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => switchLanguage(lang.code)}
                            className={`w-full flex items-center gap-2 px-3 py-2.5 transition-all ${
                                lang.code === currentLocale 
                                    ? 'bg-gradient-to-r from-secondary-50 to-secondary-100 border-r-4 border-secondary-500 text-secondary-600' 
                                    : 'hover:bg-secondary-100 text-secondary-700'
                            }`}
                        >
                            <span className="flex items-center">{lang.flag}</span>
                            <span className="font-medium text-sm">{lang.name}</span>
                            {lang.code === currentLocale && (
                                <svg className="w-4 h-4 text-secondary-500 mr-auto" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}

            {isChanging && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 rounded-lg">
                    <div className="w-4 h-4 border-2 border-secondary-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
}

/**
 * Globe icon for language switcher (optional)
 */
export function LanguageIcon({ className = '' }) {
    return (
        <svg 
            className={className} 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
        >
            <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
    );
}

