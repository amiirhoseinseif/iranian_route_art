import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { useTranslation } from '@/Utils/translation';
import { route } from '@/Utils/route';

export default function ArtistLogin({ csrf_token }) {
    const { trans } = useTranslation();
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
        <FestivalLayout title={`${trans('artist')} ${trans('login')} - ${trans('site_title')}`}>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-light-100 to-secondary-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-bold text-gray-900 font-['Vazirmatn']">
                            {trans('login_title')}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 font-['Vazirmatn']">
                            {trans('login_subtitle')}
                        </p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="email" value={trans('email')} />
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                    placeholder={trans('enter_email')}
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <InputLabel htmlFor="password" value={trans('password')} />
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                    placeholder={trans('enter_password')}
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
                                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember" className="mr-2 block text-sm text-gray-900 font-['Vazirmatn']">
                                        {trans('remember_me')}
                                    </label>
                                </div>
                            </div>

                            <div>
                                <PrimaryButton 
                                    type="submit"
                                    disabled={processing} 
                                    className="w-full"
                                    onClick={(e) => console.log('Button clicked!', e)}
                                >
                                    {processing ? trans('logging_in') : trans('login')}
                                </PrimaryButton>
                            </div>

                            <div className="text-center">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">
                                    {trans('not_registered')}{' '}
                                    <Link
                                        href={route('artist.register')}
                                        className="font-medium text-primary-600 hover:text-primary-500"
                                    >
                                        {trans('register_here')}
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
