import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Vazirmatn', 'Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'festival': {
                    50: '#fefce8',
                    100: '#fef9c3',
                    200: '#fef08a',
                    300: '#fde047',
                    400: '#facc15',
                    500: '#eab308',
                    600: '#ca8a04',
                    700: '#a16207',
                    800: '#854d0e',
                    900: '#713f12',
                }
            },
            direction: {
                'rtl': 'rtl',
                'ltr': 'ltr',
            },
            animation: {
                'fade-in': 'fadeIn 0.2s ease-in-out',
                'slide-in-from-top': 'slideInFromTop 0.2s ease-out',
                'bounce-in': 'bounceIn 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideInFromTop: {
                    '0%': { 
                        opacity: '0',
                        transform: 'translateY(-10px) scale(0.95)'
                    },
                    '100%': { 
                        opacity: '1',
                        transform: 'translateY(0) scale(1)'
                    },
                },
                bounceIn: {
                    '0%': { 
                        opacity: '0',
                        transform: 'scale(0.3)'
                    },
                    '50%': { 
                        opacity: '1',
                        transform: 'scale(1.05)'
                    },
                    '70%': { 
                        transform: 'scale(0.9)'
                    },
                    '100%': { 
                        opacity: '1',
                        transform: 'scale(1)'
                    },
                }
            }
        },
    },

    plugins: [forms],
};
