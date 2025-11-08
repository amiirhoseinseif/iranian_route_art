import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import PersianDateInput from '@/Components/PersianDateInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { route } from '@/Utils/route';

export default function ArtistProfile({ artist }) {
    const { data, setData, patch, processing, errors } = useForm({
        first_name: artist?.first_name || '',
        last_name: artist?.last_name || '',
        phone: artist?.phone || '',
        email: artist?.email || '',
        birth_date: artist?.birth_date || '',
        telegram_id: artist?.telegram_id || '',
        whatsapp_id: artist?.whatsapp_id || '',
        instagram_id: artist?.instagram_id || '',
        linkedin_id: artist?.linkedin_id || '',
        bio: artist?.bio || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('artist.profile.update'));
    };

    return (
        <FestivalLayout title="پروفایل هنرمند - جشنواره بین الملی مسیر ایران">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                        پروفایل هنرمند
                    </h1>
                    <p className="text-gray-600 font-['Vazirmatn']">
                        اطلاعات شخصی و هنری خود را مدیریت کنید
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                                اطلاعات شخصی
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="first_name" value="نام" />
                                    <input
                                        id="first_name"
                                        type="text"
                                        value={data.first_name}
                                        onChange={e => setData('first_name', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                        required
                                    />
                                    {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="last_name" value="نام خانوادگی" />
                                    <input
                                        id="last_name"
                                        type="text"
                                        value={data.last_name}
                                        onChange={e => setData('last_name', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                        required
                                    />
                                    {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="phone" value="شماره تماس" />
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                        placeholder="09123456789"
                                        required
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="email" value="ایمیل" />
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                        required
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="birth_date" value="تاریخ تولد (شمسی)" />
                                    <PersianDateInput
                                        id="birth_date"
                                        value={data.birth_date}
                                        onChange={(value) => setData('birth_date', value)}
                                        placeholder="تاریخ تولد خود را انتخاب کنید"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                    />
                                    {errors.birth_date && <p className="text-red-500 text-sm mt-1">{errors.birth_date}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                                شبکه‌های اجتماعی (اختیاری)
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="telegram_id" value="آیدی تلگرام" />
                                    <input
                                        id="telegram_id"
                                        type="text"
                                        value={data.telegram_id}
                                        onChange={e => setData('telegram_id', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                        placeholder="@username"
                                    />
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="whatsapp_id" value="آیدی واتساپ" />
                                    <input
                                        id="whatsapp_id"
                                        type="text"
                                        value={data.whatsapp_id}
                                        onChange={e => setData('whatsapp_id', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                        placeholder="+989123456789"
                                    />
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="instagram_id" value="آیدی اینستاگرام" />
                                    <input
                                        id="instagram_id"
                                        type="text"
                                        value={data.instagram_id}
                                        onChange={e => setData('instagram_id', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                        placeholder="@username"
                                    />
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="linkedin_id" value="آیدی لینکدین" />
                                    <input
                                        id="linkedin_id"
                                        type="text"
                                        value={data.linkedin_id}
                                        onChange={e => setData('linkedin_id', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                        placeholder="username"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                                بیوگرافی (اختیاری)
                            </h2>
                            <div>
                                <InputLabel htmlFor="bio" value="درباره خودتان بنویسید" />
                                <textarea
                                    id="bio"
                                    value={data.bio}
                                    onChange={e => setData('bio', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                    placeholder="تجربیات هنری، سبک کاری، افتخارات و..."
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-end space-x-4 space-x-reverse">
                            <Link
                                href="/artist/dashboard"
                                className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-['Vazirmatn']"
                            >
                                انصراف
                            </Link>
                            <PrimaryButton disabled={processing}>
                                {processing ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </FestivalLayout>
    );
}
