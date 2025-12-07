<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>پاک کردن Session</title>
    <style>
        body {
            font-family: 'iransansX', Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            text-align: center;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 1rem;
            backdrop-filter: blur(10px);
        }
        h1 {
            margin-bottom: 1rem;
        }
        p {
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        .spinner {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>در حال پاک کردن Session...</h1>
        <div class="spinner"></div>
        <p>لطفاً صبر کنید...</p>
    </div>
    
    <script>
        // Clear all cookies
        function clearAllCookies() {
            const cookies = document.cookie.split(';');
            cookies.forEach(cookie => {
                const cookieName = cookie.split('=')[0].trim();
                // Delete cookie for current domain
                document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                // Also try with domain
                document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
                // Try with www prefix
                if (window.location.hostname.startsWith('www.')) {
                    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname.replace('www.', '')};`;
                }
            });
        }
        
        // Clear cookies and redirect
        clearAllCookies();
        
        // Redirect after a short delay
        setTimeout(() => {
            window.location.href = '/';
        }, 1000);
    </script>
</body>
</html>

