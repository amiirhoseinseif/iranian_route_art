import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { router } from '@inertiajs/react';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Clean oversized cookies helper function
function cleanOversizedCookies() {
    const MAX_COOKIE_SIZE = 4000;
    const cookies = document.cookie.split(';');
    
    cookies.forEach(cookie => {
        const cookieSize = cookie.length;
        if (cookieSize > MAX_COOKIE_SIZE) {
            const cookieName = cookie.split('=')[0].trim();
            console.warn(`Deleting oversized cookie: ${cookieName} (${cookieSize} bytes)`);
            // Delete cookie by setting it to expire in the past
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
    });
}

// Handle 419 CSRF token mismatch errors
// When CSRF token expires, reload the page to get a fresh token
window.addEventListener('unhandledrejection', (event) => {
    if (event.reason?.response?.status === 419) {
        console.warn('CSRF token mismatch detected. Reloading page...');
        window.location.reload();
        event.preventDefault();
    }
    
    // Handle 400 Bad Request errors (often caused by oversized cookies)
    if (event.reason?.response?.status === 400) {
        console.warn('400 Bad Request detected, cleaning oversized cookies...');
        cleanOversizedCookies();
        setTimeout(() => {
            window.location.reload();
        }, 100);
        event.preventDefault();
    }
});

// Also handle errors from Inertia requests
router.on('error', (errors) => {
    if (errors.response?.status === 419) {
        console.warn('CSRF token mismatch detected. Reloading page...');
        window.location.reload();
    }
    
    // Handle 400 Bad Request errors
    if (errors.response?.status === 400) {
        console.warn('400 Bad Request detected, cleaning oversized cookies...');
        cleanOversizedCookies();
        setTimeout(() => {
            window.location.reload();
        }, 100);
    }
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
