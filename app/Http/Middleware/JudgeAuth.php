<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class JudgeAuth
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
        $userData = $request->session()->get('user_data');
        $accessToken = $request->session()->get('access_token');
        
        if (!$userType || !$userData || !$accessToken) {
            return redirect()->route('login');
        }

        // Check if user type is judge
        if ($userType !== 'judge') {
            return redirect()->route('login');
        }

        // Verify token is still valid
        $user = \App\Models\Judge::find($request->session()->get('user_id'));
        if (!$user) {
            $request->session()->forget(['access_token', 'user_type', 'user_id', 'user_data']);
            return redirect()->route('login');
        }

        // Check if user has valid tokens (simplified check for now)
        $hasValidTokens = $user->tokens()->where('revoked', false)->exists();
        
        if (!$hasValidTokens) {
            $request->session()->forget(['access_token', 'user_type', 'user_id', 'user_data']);
            return redirect()->route('login');
        }

        return $next($request);
    }
}
