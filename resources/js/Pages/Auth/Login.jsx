import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { LogoIcon } from '@/Components/SvgIcons';

export default function Login() {
    const [userType, setUserType] = useState('artist');
    
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        user_type: 'artist'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    const userTypes = [
        { value: 'artist', label: 'هنرمند', description: 'برای هنرمندان و شرکت کنندگان' },
        { value: 'judge', label: 'داور', description: 'برای هیئت داوران' },
        { value: 'admin', label: 'مدیر', description: 'برای مدیران سیستم' }
    ];

    return (
        <FestivalLayout title="ورود به سیستم">
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-md mx-auto">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <LogoIcon className="w-12 h-12 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                                ورود به سیستم
                            </h1>
                            <p className="text-gray-600 font-['Vazirmatn']">
                                به جشنواره هنری مسیر ایران خوش آمدید
                            </p>
                        </div>

                        {/* User Type Selection */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 font-['Vazirmatn']">
                                نوع کاربری خود را انتخاب کنید
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {userTypes.map((type) => (
                                    <button
                                        key={type.value}
                                        onClick={() => {
                                            setUserType(type.value);
                                            setData('user_type', type.value);
                                        }}
                                        className={`p-4 border-2 rounded-xl text-right transition-all ${
                                            userType === type.value
                                                ? 'border-amber-500 bg-amber-50'
                                                : 'border-gray-200 hover:border-amber-300'
                                        }`}
                                    >
                                        <div className="font-bold text-gray-800 font-['Vazirmatn']">
                                            {type.label}
                                        </div>
                                        <div className="text-sm text-gray-600 font-['Vazirmatn']">
                                            {type.description}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Login Form */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                        ایمیل
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all font-['Vazirmatn']"
                                        placeholder="ایمیل خود را وارد کنید"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600 font-['Vazirmatn']">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                        رمز عبور
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all font-['Vazirmatn']"
                                        placeholder="رمز عبور خود را وارد کنید"
                                        required
                                    />
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-600 font-['Vazirmatn']">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Remember Me */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember" className="mr-2 block text-sm text-gray-700 font-['Vazirmatn']">
                                        مرا به خاطر بسپار
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-6 rounded-xl font-bold text-lg hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-['Vazirmatn']"
                                >
                                    {processing ? 'در حال ورود...' : 'ورود'}
                                </button>
                            </form>

                            {/* Links */}
                            <div className="mt-6 text-center space-y-3">
                                <Link
                                    href="/forgot-password"
                                    className="text-amber-600 hover:text-amber-700 text-sm font-['Vazirmatn']"
                                >
                                    رمز عبور خود را فراموش کرده‌اید؟
                                </Link>
                                <div className="text-gray-600 text-sm font-['Vazirmatn']">
                                    حساب کاربری ندارید؟{' '}
                                    <Link
                                        href="/register"
                                        className="text-amber-600 hover:text-amber-700 font-bold"
                                    >
                                        ثبت نام کنید
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FestivalLayout>
    );
}