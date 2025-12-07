<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class JudgeVerification
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

        // Check if user type is judge
        if ($userType !== 'judge') {
            return redirect()->route('login');
        }

        // Get judge data
        $judge = \App\Models\Judge::find($userId);
        if (!$judge) {
            $request->session()->forget(['access_token', 'user_type', 'user_id']);
            return redirect()->route('login');
        }

        // Check if judge is verified
        if (!$judge->isVerified()) {
            $message = 'عضویت شما تایید نشده است. لطفاً با مدیر سایت تماس بگیرید.';
            
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => $message,
                    'verification_status' => $judge->verification_status,
                    'rejection_reason' => $judge->rejection_reason
                ], 403);
            }
            
            return redirect()->back()->with('error', $message);
        }

        return $next($request);
    }
}