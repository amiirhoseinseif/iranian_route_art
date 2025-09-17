import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { LogoIcon } from '@/Components/SvgIcons';

export default function ForgotPassword() {
    const { data, setData, post, processing, errors } = useForm({
        email: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/forgot-password');
    };

    return (
        <FestivalLayout title="بازیابی رمز عبور">
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-md mx-auto">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <LogoIcon className="w-12 h-12 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                                بازیابی رمز عبور
                            </h1>
                            <p className="text-gray-600 font-['Vazirmatn']">
                                ایمیل خود را وارد کنید تا لینک بازیابی رمز عبور برایتان ارسال شود
                            </p>
                        </div>

                        {/* Form */}
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

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-6 rounded-xl font-bold text-lg hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-['Vazirmatn']"
                                >
                                    {processing ? 'در حال ارسال...' : 'ارسال لینک بازیابی'}
                                </button>
                            </form>

                            {/* Links */}
                            <div className="mt-6 text-center">
                                <Link
                                    href="/login"
                                    className="text-amber-600 hover:text-amber-700 text-sm font-['Vazirmatn']"
                                >
                                    بازگشت به صفحه ورود
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FestivalLayout>
    );
}