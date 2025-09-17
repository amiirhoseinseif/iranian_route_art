import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

export default function ArtistLogin({ csrf_token }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
        _token: csrf_token,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login.store'), {
            onSuccess: (page) => {
                // Inertia will automatically handle the redirect
                console.log('Artist login successful, redirecting...');
            },
            onError: (errors) => {
                console.log('Artist login failed:', errors);
            }
        });
    };

    return (
        <FestivalLayout title="ورود هنرمند - جشنواره هنری مسیر ایران">
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-bold text-gray-900 font-['Vazirmatn']">
                            ورود هنرمند
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 font-['Vazirmatn']">
                            به حساب کاربری خود وارد شوید
                        </p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="email" value="ایمیل" />
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-['Vazirmatn']"
                                    placeholder="ایمیل خود را وارد کنید"
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <InputLabel htmlFor="password" value="رمز عبور" />
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-['Vazirmatn']"
                                    placeholder="رمز عبور خود را وارد کنید"
                                    required
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={e => setData('remember', e.target.checked)}
                                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember" className="mr-2 block text-sm text-gray-900 font-['Vazirmatn']">
                                        مرا به خاطر بسپار
                                    </label>
                                </div>
                            </div>

                            <div>
                                <PrimaryButton disabled={processing} className="w-full">
                                    {processing ? 'در حال ورود...' : 'ورود'}
                                </PrimaryButton>
                            </div>

                            <div className="text-center">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">
                                    حساب کاربری ندارید؟{' '}
                                    <Link
                                        href={route('artist.register')}
                                        className="font-medium text-amber-600 hover:text-amber-500"
                                    >
                                        ثبت نام کنید
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </FestivalLayout>
    );
}
