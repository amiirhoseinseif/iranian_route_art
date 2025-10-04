import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import { initializeLanguagePreferences, applyDirection } from './Utils/translations';
import { LanguageProvider } from './Contexts/LanguageContext';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Set up timezone detection and send to server
const setupTimezoneDetection = () => {
    try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Set timezone in axios headers for all requests
        axios.defaults.headers.common['X-Timezone'] = timezone;
        
        // Also store in localStorage for persistence
        localStorage.setItem('user_timezone', timezone);
        
        console.log('Detected timezone:', timezone);
    } catch (error) {
        console.warn('Could not detect timezone:', error);
    }
};

// Initialize language preferences and apply direction
const initializeApp = () => {
    // Initialize timezone detection
    setupTimezoneDetection();
    
    // Initialize language preferences
    initializeLanguagePreferences();
    
    // Apply text direction based on current locale
    applyDirection();
};

// Initialize app
initializeApp();

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <LanguageProvider 
                initialLocale={props.initialPage.props.currentLocale} 
                initialTranslations={props.initialPage.props.translations}
            >
                <App {...props} />
            </LanguageProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
