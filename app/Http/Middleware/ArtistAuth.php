<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ArtistAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if user is authenticated via session
        $userType = $request->session()->get('user_type');
        $userId = $request->session()->get('user_id');
        $accessToken = $request->session()->get('access_token');
        
        if (!$userType || !$userId || !$accessToken) {
            return redirect()->route('login');
        }

        // Check if user type is artist
        if ($userType !== 'artist') {
            return redirect()->route('login');
        }

        // Verify token is still valid
        $user = \App\Models\Artist::find($userId);
        if (!$user) {
            $request->session()->forget(['access_token', 'user_type', 'user_id']);
            return redirect()->route('login');
        }

        // Check if user has valid tokens (simplified check for now)
        $hasValidTokens = $user->tokens()->where('revoked', false)->exists();
        
        if (!$hasValidTokens) {
            $request->session()->forget(['access_token', 'user_type', 'user_id']);
            return redirect()->route('login');
        }

        return $next($request);
    }
}
