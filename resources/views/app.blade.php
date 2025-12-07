<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="{{ app()->getLocale() === 'fa' ? 'rtl' : 'ltr' }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        <script>
            // Clean oversized cookies that might cause 400 errors
            (function() {
                const MAX_COOKIE_SIZE = 4000; // Apache default limit is usually 4096, we use 4000 for safety
                const SESSION_COOKIE_NAME = '{{ config("session.cookie", "laravel_session") }}';
                
                function getAllCookies() {
                    return document.cookie.split(';').map(cookie => {
                        const [name, ...valueParts] = cookie.trim().split('=');
                        return {
                            name: name.trim(),
                            value: valueParts.join('='),
                            full: cookie.trim()
                        };
                    });
                }
                
                function deleteCookie(name, path = '/', domain = null) {
                    let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
                    if (domain) {
                        cookieString += ` domain=${domain};`;
                    }
                    document.cookie = cookieString;
                }
                
                function cleanOversizedCookies() {
                    const cookies = getAllCookies();
                    let cleaned = false;
                    
                    cookies.forEach(cookie => {
                        const cookieSize = cookie.full.length;
                        
                        // If cookie is too large, delete it
                        if (cookieSize > MAX_COOKIE_SIZE) {
                            console.warn(`Deleting oversized cookie: ${cookie.name} (${cookieSize} bytes)`);
                            deleteCookie(cookie.name);
                            cleaned = true;
                        }
                        
                        // Also clean session cookie if it exists and is large
                        if (cookie.name === SESSION_COOKIE_NAME && cookieSize > MAX_COOKIE_SIZE) {
                            console.warn(`Deleting oversized session cookie (${cookieSize} bytes)`);
                            deleteCookie(cookie.name);
                            cleaned = true;
                        }
                    });
                    
                    if (cleaned) {
                        console.info('Oversized cookies cleaned. Reloading page...');
                        // Reload page after cleaning cookies
                        setTimeout(() => {
                            window.location.reload();
                        }, 100);
                    }
                }
                
                // Clean cookies on page load
                cleanOversizedCookies();
                
                // Also check if we got a 400 error and clean cookies
                window.addEventListener('error', function(event) {
                    if (event.message && event.message.includes('400')) {
                        console.warn('400 error detected, cleaning cookies...');
                        cleanOversizedCookies();
                    }
                });
            })();
        </script>
        @inertia
    </body>
</html>
