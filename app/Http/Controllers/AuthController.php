<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\Admin;
use App\Models\Judge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ], [
            'email.required' => 'ایمیل الزامی است',
            'email.email' => 'فرمت ایمیل صحیح نیست',
            'password.required' => 'رمز عبور الزامی است',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $credentials = $request->only('email', 'password');
        $remember = $request->boolean('remember');

        // Try to authenticate with each user type to find the correct user
        $guards = ['artist', 'admin', 'judge'];
        $userType = null;
        $user = null;
        
        foreach ($guards as $guard) {
            // Get the user model based on guard
            $userModel = null;
            switch ($guard) {
                case 'artist':
                    $userModel = \App\Models\Artist::where('email', $credentials['email'])->first();
                    break;
                case 'admin':
                    $userModel = \App\Models\Admin::where('email', $credentials['email'])->first();
                    break;
                case 'judge':
                    $userModel = \App\Models\Judge::where('email', $credentials['email'])->first();
                    break;
            }
            
            if ($userModel && \Hash::check($credentials['password'], $userModel->password)) {
                $userType = $guard;
                $user = $userModel;
                
                // Create access token for Passport
                $token = $user->createToken('Login Token', ['*'])->accessToken;
                
                // Store authentication data in session for web usage
                $request->session()->put('access_token', $token);
                $request->session()->put('user_type', $userType);
                $request->session()->put('user_id', $user->id);
                $request->session()->put('user_data', $user->toArray());
                
                break;
            }
        }

        if ($userType) {
            // Redirect based on detected user type
            return $this->redirectBasedOnUserType($userType);
        }

        // If no guard succeeded, check if email exists in any table
        $email = $request->email;
        $userFound = false;
        $userTypeFound = null;

        if (\App\Models\Artist::where('email', $email)->exists()) {
            $userFound = true;
            $userTypeFound = 'هنرمند';
        } elseif (\App\Models\Admin::where('email', $email)->exists()) {
            $userFound = true;
            $userTypeFound = 'مدیر';
        } elseif (\App\Models\Judge::where('email', $email)->exists()) {
            $userFound = true;
            $userTypeFound = 'داور';
        }

        if ($userFound) {
            return back()->withErrors([
                'password' => "رمز عبور برای کاربر {$userTypeFound} صحیح نیست.",
            ])->withInput();
        }

        return back()->withErrors([
            'email' => 'ایمیل وارد شده در سیستم ثبت نشده است.',
        ])->withInput();
    }

    private function redirectBasedOnUserType($userType)
    {
        switch ($userType) {
            case 'artist':
                return redirect()->intended(route('artist.dashboard'));
            case 'admin':
                return redirect()->intended(route('admin.dashboard'));
            case 'judge':
                return redirect()->intended(route('judge.dashboard'));
            default:
                return redirect()->route('login');
        }
    }

    public function logout(Request $request)
    {
        // Get user type and user ID from session
        $userType = $request->session()->get('user_type');
        $userId = $request->session()->get('user_id');
        
        if ($userType && $userId) {
            // Get the user model based on type
            $userModel = null;
            switch ($userType) {
                case 'artist':
                    $userModel = \App\Models\Artist::find($userId);
                    break;
                case 'admin':
                    $userModel = \App\Models\Admin::find($userId);
                    break;
                case 'judge':
                    $userModel = \App\Models\Judge::find($userId);
                    break;
            }
            
            if ($userModel) {
                // Revoke all tokens for this user
                $userModel->tokens()->delete();
            }
        }
        
        // Clear session
        $request->session()->forget(['access_token', 'user_type', 'user_id', 'user_data']);
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        return redirect()->route('login');
    }

    public function apiLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $credentials = $request->only('email', 'password');
        $guards = ['artist', 'admin', 'judge'];
        
        foreach ($guards as $guard) {
            // Get the user model based on guard
            $userModel = null;
            switch ($guard) {
                case 'artist':
                    $userModel = \App\Models\Artist::where('email', $credentials['email'])->first();
                    break;
                case 'admin':
                    $userModel = \App\Models\Admin::where('email', $credentials['email'])->first();
                    break;
                case 'judge':
                    $userModel = \App\Models\Judge::where('email', $credentials['email'])->first();
                    break;
            }
            
            if ($userModel && \Hash::check($credentials['password'], $userModel->password)) {
                $token = $userModel->createToken('API Token', ['*'])->accessToken;
                
                return response()->json([
                    'user' => $userModel,
                    'user_type' => $guard,
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                ]);
            }
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function apiLogout(Request $request)
    {
        $user = $request->user();
        if ($user) {
            $user->tokens()->delete();
        }
        
        return response()->json(['message' => 'Successfully logged out']);
    }
}
