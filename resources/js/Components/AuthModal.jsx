import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { useTranslation } from '../Utils/translation';
import { route } from '../Utils/route';

// SVG Icons
const UserIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const UserPlusIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
);

const XIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export default function AuthModal({ isOpen, onClose }) {
    const { trans } = useTranslation();

    // Login Form
    const loginForm = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log('Login form submitted:', loginForm.data);
        
        loginForm.post(route('login.store'), {
            onSuccess: () => {
                console.log('Login successful!');
                loginForm.reset();
                onClose();
            },
            onError: (errors) => {
                console.log('Login errors:', errors);
            }
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop with blur effect */}
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity animate-fadeIn" 
                onClick={onClose}
            ></div>
            
            {/* Modal with enhanced animations */}
            <div className="flex min-h-full items-center justify-center p-4 animate-scaleIn">
                <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md transform transition-all animate-slideDown">
                    {/* Decorative gradient overlay */}
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-primary-100 via-primary-50 to-transparent rounded-t-3xl"></div>
                    {/* Header with better spacing */}
                    <div className="relative flex items-center justify-between p-6 border-b border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 font-['iransansX'] relative z-10">
                            {trans('login')}
                        </h2>
                        <button
                            onClick={onClose}
                            className="relative z-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all duration-200 hover:scale-110 active:scale-95"
                        >
                            <XIcon />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="relative p-6 space-y-6">
                        <form onSubmit={handleLoginSubmit} className="space-y-5">
                                <div className="relative group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-['iransansX']">
                                        {trans('email')}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={loginForm.data.email}
                                            onChange={e => loginForm.setData('email', e.target.value)}
                                            className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 font-['iransansX'] hover:border-primary-300"
                                            placeholder={trans('enter_email')}
                                            required
                                        />
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    {loginForm.errors.email && (
                                        <p className="text-red-500 text-sm mt-2 font-['iransansX'] animate-fadeIn">{loginForm.errors.email}</p>
                                    )}
                                </div>
                                <div className="relative group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-['iransansX']">
                                        {trans('password')}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            value={loginForm.data.password}
                                            onChange={e => loginForm.setData('password', e.target.value)}
                                            className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 font-['iransansX'] hover:border-primary-300"
                                            placeholder={trans('enter_password')}
                                            required
                                        />
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                    </div>
                                    {loginForm.errors.password && (
                                        <p className="text-red-500 text-sm mt-2 font-['iransansX'] animate-fadeIn">{loginForm.errors.password}</p>
                                    )}
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center group cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={loginForm.data.remember}
                                            onChange={e => loginForm.setData('remember', e.target.checked)}
                                            className="rounded border-2 border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500 transition-all duration-200 group-hover:border-primary-400 cursor-pointer"
                                        />
                                        <span className="mr-2 text-sm text-gray-700 font-['iransansX'] group-hover:text-primary-600 transition-colors">{trans('remember_me')}</span>
                                    </label>
                                    <Link
                                        href="/forgot-password"
                                        className="text-sm text-primary-600 hover:text-primary-700 font-semibold transition-colors font-['iransansX']"
                                    >
                                        {trans('forgot_password')}
                                    </Link>
                                </div>
                                <button 
                                    type="submit"
                                    disabled={loginForm.processing}
                                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-['iransansX'] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:hover:shadow-lg"
                                >
                                    {loginForm.processing ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            {trans('logging_in')}
                                        </span>
                                    ) : (
                                        trans('login')
                                    )}
                                </button>
                            </form>
                            
                            {/* Register Link */}
                            <div className="pt-4 border-t border-gray-200">
                                <p className="text-center text-sm text-gray-600 mb-3 font-['iransansX']">
                                    {trans('not_registered')}
                                </p>
                                <Link
                                    href={route('artist.register')}
                                    onClick={onClose}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] font-['iransansX']"
                                >
                                    <UserPlusIcon className="w-5 h-5" />
                                    <span>{trans('register_as_artist')}</span>
                                </Link>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
