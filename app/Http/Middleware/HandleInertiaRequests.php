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
        // Get authenticated user from session
        $userType = $request->session()->get('user_type');
        $user = $request->session()->get('user_data');
        
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'user_type' => $userType,
                'access_token' => $request->session()->get('access_token'),
            ],
            'csrf_token' => csrf_token(),
            'locale' => app()->getLocale(),
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
