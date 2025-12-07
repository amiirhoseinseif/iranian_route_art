<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>تست S3</title>
    <style>
        body {
            font-family: 'iransansX', Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            margin-bottom: 30px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input[type="file"] {
            width: 100%;
            padding: 10px;
            border: 2px dashed #ddd;
            border-radius: 5px;
            background: #f9f9f9;
        }
        button {
            background: #007bff;
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background: #0056b3;
        }
        .result {
            margin-top: 30px;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 5px;
            white-space: pre-wrap;
            font-family: monospace;
            font-size: 12px;
            max-height: 500px;
            overflow-y: auto;
        }
        .success {
            color: green;
        }
        .error {
            color: red;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>تست آپلود فایل به S3</h1>
        
        <form id="testForm" enctype="multipart/form-data">
            @csrf
            <div class="form-group">
                <label for="test_file">انتخاب فایل برای تست:</label>
                <input type="file" id="test_file" name="test_file" required>
            </div>
            <button type="submit">تست آپلود</button>
        </form>
        
        <div id="result" class="result" style="display: none;"></div>
    </div>

    <script>
        document.getElementById('testForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const resultDiv = document.getElementById('result');
            resultDiv.style.display = 'block';
            resultDiv.textContent = 'در حال تست...';
            
            try {
                // Get CSRF token from form input (most reliable)
                const tokenInput = document.querySelector('input[name="_token"]');
                let csrfToken = null;
                
                if (tokenInput) {
                    csrfToken = tokenInput.value;
                    console.log('Token from input:', csrfToken ? 'Found' : 'Not found');
                } else {
                    // Fallback to meta tag
                    csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
                    console.log('Token from meta:', csrfToken ? 'Found' : 'Not found');
                }
                
                if (!csrfToken) {
                    resultDiv.className = 'result error';
                    resultDiv.textContent = 'خطا: CSRF token یافت نشد. لطفاً صفحه را refresh کنید.';
                    return;
                }
                
                // Ensure token is in FormData (use set to override if exists)
                formData.set('_token', csrfToken);
                
                // Also try XSRF-TOKEN from cookie
                const xsrfToken = getCookie('XSRF-TOKEN');
                console.log('XSRF-TOKEN from cookie:', xsrfToken ? 'Found' : 'Not found');
                
                const headers = {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                };
                
                // Add CSRF token to headers
                headers['X-CSRF-TOKEN'] = csrfToken;
                
                // Also try X-XSRF-TOKEN from cookie (Laravel reads this automatically)
                if (xsrfToken) {
                    headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
                }
                
                // Use absolute URL to avoid issues
                const testUrl = window.location.origin + '/s3/test';
                
                console.log('Sending request to:', testUrl, {
                    method: 'POST',
                    hasFile: formData.has('test_file'),
                    hasToken: formData.has('_token'),
                    headers: headers
                });
                
                const response = await fetch(testUrl, {
                    method: 'POST',
                    body: formData,
                    headers: headers,
                    credentials: 'same-origin'
                }).catch(fetchError => {
                    console.error('Fetch error:', fetchError);
                    throw new Error('خطا در ارسال درخواست: ' + fetchError.message + 
                        '\n\nممکن است سرور در دسترس نباشد یا route درست تعریف نشده باشد.');
                });
                
                console.log('Response status:', response.status, response.statusText);
                
                if (!response.ok) {
                    let errorData;
                    try {
                        errorData = await response.json();
                    } catch (e) {
                        errorData = { 
                            message: 'خطای HTTP: ' + response.status + ' ' + response.statusText,
                            status: response.status,
                            statusText: response.statusText
                        };
                    }
                    resultDiv.className = 'result error';
                    resultDiv.textContent = JSON.stringify(errorData, null, 2);
                    return;
                }
                
                let data;
                try {
                    data = await response.json();
                } catch (e) {
                    resultDiv.className = 'result error';
                    resultDiv.textContent = 'خطا در خواندن پاسخ: ' + e.message + 
                        '\n\nممکن است پاسخ JSON نباشد.';
                    return;
                }
                
                resultDiv.textContent = JSON.stringify(data, null, 2);
                
                if (data.upload_test && data.upload_test.success) {
                    resultDiv.className = 'result success';
                } else if (data.error || (data.upload_test && !data.upload_test.success)) {
                    resultDiv.className = 'result error';
                } else {
                    resultDiv.className = 'result';
                }
            } catch (error) {
                console.error('Error in form submission:', error);
                resultDiv.className = 'result error';
                resultDiv.textContent = 'خطا: ' + error.message + 
                    '\n\nجزئیات:\n' + error.stack +
                    '\n\nراه حل:\n' +
                    '1. بررسی کنید که سرور Laravel در حال اجرا باشد\n' +
                    '2. بررسی کنید که route /s3/test در routes/web.php تعریف شده باشد\n' +
                    '3. Console مرورگر را باز کنید (F12) و خطاهای دیگر را بررسی کنید';
            }
        });
        
        // Helper function to get cookie value
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
        }
    </script>
</body>
</html>

