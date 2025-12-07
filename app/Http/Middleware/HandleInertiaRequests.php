<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // Clean up old session data that might cause header size issues
        // If user_data exists in session (from old sessions), remove it
        if ($request->session()->has('user_data')) {
            $request->session()->forget('user_data');
        }
        
        // Get authenticated user from session
        $userType = $request->session()->get('user_type');
        $userId = $request->session()->get('user_id');
        
        // Load user data from database instead of session to avoid cookie size issues
        $user = null;
        if ($userType && $userId) {
            try {
                switch ($userType) {
                    case 'artist':
                        $user = \App\Models\Artist::find($userId);
                        break;
                    case 'admin':
                        $user = \App\Models\Admin::find($userId);
                        break;
                    case 'judge':
                        $user = \App\Models\Judge::find($userId);
                        break;
                }
                // Convert to array and exclude sensitive data
                if ($user) {
                    $user = $user->toArray();
                    // Remove password and other sensitive fields
                    unset($user['password'], $user['remember_token']);
                }
            } catch (\Exception $e) {
                // If user not found, clear session
                $request->session()->forget(['access_token', 'user_type', 'user_id']);
                $user = null;
            }
        }
        
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'user_type' => $userType,
                'access_token' => $request->session()->get('access_token'),
            ],
            'csrf_token' => csrf_token(),
            'locale' => app()->getLocale(),
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
                'message' => $request->session()->get('message'),
                'art_registration_success' => $request->session()->get('art_registration_success'),
            ],
            'translations' => function () {
                $locale = app()->getLocale();
                $messages = trans('messages');
                $auth = trans('auth');
                
                // Merge messages and auth translations
                $allTranslations = [];
                if (is_array($messages)) {
                    $allTranslations = array_merge($allTranslations, $messages);
                }
                if (is_array($auth)) {
                    $allTranslations = array_merge($allTranslations, $auth);
                }
                
                return $allTranslations;
            },
        ];
    }
}
