<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Get locale from session, request parameter, or detect from timezone
        $locale = $this->getLocale($request);
        
        // Set the application locale
        App::setLocale($locale);
        
        // Store in session for persistence
        Session::put('locale', $locale);
        
        return $next($request);
    }
    
    /**
     * Get the locale from various sources
     */
    private function getLocale(Request $request): string
    {
        // Priority 1: Check if locale change was requested
        if ($request->has('locale')) {
            $requestedLocale = $request->input('locale');
            if (in_array($requestedLocale, ['fa', 'en'])) {
                return $requestedLocale;
            }
        }
        
        // Priority 2: Check session
        if (Session::has('locale')) {
            return Session::get('locale');
        }
        
        // Priority 3: Detect from timezone
        return $this->detectLocaleFromTimezone($request);
    }
    
    /**
     * Detect locale from timezone
     */
    private function detectLocaleFromTimezone(Request $request): string
    {
        // Get timezone from request header or cookie
        $timezone = $request->header('X-Timezone') ?? 
                   $request->cookie('timezone') ?? 
                   'UTC';
        
        // Iranian timezones
        $iranianTimezones = [
            'Asia/Tehran',
            'Iran',
            'Asia/Kabul', // Afghanistan uses Persian
        ];
        
        // If timezone matches Iranian timezones, use Persian
        if (in_array($timezone, $iranianTimezones)) {
            return 'fa';
        }
        
        // Try to detect from timezone offset
        // Iran is UTC+3:30 (210 minutes) or UTC+4:30 (270 minutes) during DST
        if ($request->has('timezone_offset')) {
            $offset = (int) $request->input('timezone_offset');
            if (in_array($offset, [-210, -270])) {
                return 'fa';
            }
        }
        
        // Default to Persian (since it's an Iranian festival)
        return 'fa';
    }
}

