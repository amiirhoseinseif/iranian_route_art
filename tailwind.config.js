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
                'primary': {
                    50: '#e8ebf5',
                    100: '#c5cde8',
                    200: '#9eadda',
                    300: '#778dcc',
                    400: '#5b74c1',
                    500: '#374c9a',
                    600: '#2f4289',
                    700: '#263675',
                    800: '#1e2b62',
                    900: '#131c42',
                },
                'secondary': {
                    50: '#fcfbf7',
                    100: '#f5f2e8',
                    200: '#ede7d3',
                    300: '#e5dcbe',
                    400: '#ddd4ac',
                    500: '#d5cc9d',
                    600: '#c9be87',
                    700: '#baad6f',
                    800: '#a89857',
                    900: '#8a7d45',
                },
                'light': {
                    50: '#ffffff',
                    100: '#fcfcfc',
                    200: '#f8f8f8',
                    300: '#f4f4f4',
                    400: '#f0f0f0',
                    500: '#e8e8e8',
                    600: '#d8d8d8',
                    700: '#c0c0c0',
                    800: '#a0a0a0',
                    900: '#808080',
                },
                // Keep festival as alias to primary for backward compatibility
                'festival': {
                    50: '#e8ebf5',
                    100: '#c5cde8',
                    200: '#9eadda',
                    300: '#778dcc',
                    400: '#5b74c1',
                    500: '#374c9a',
                    600: '#2f4289',
                    700: '#263675',
                    800: '#1e2b62',
                    900: '#131c42',
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
