import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { LogoIcon, MusicIcon, PaintingIcon, FilmIcon, SculptureIcon, GraphicIcon, CalligraphyIcon, PhotographyIcon, ArchitectureIcon } from '@/Components/SvgIcons';

export default function Register() {
    const [selectedUserType, setSelectedUserType] = useState('artist');

    const userTypes = [
        { 
            value: 'artist', 
            label: 'هنرمند', 
            description: 'برای هنرمندان و شرکت کنندگان در جشنواره',
            icon: MusicIcon,
            features: ['آپلود آثار هنری', 'شرکت در جشنواره', 'دریافت بازخورد از داوران']
        },
        { 
            value: 'judge', 
            label: 'داور', 
            description: 'برای هیئت داوران و ارزیابان آثار',
            icon: PaintingIcon,
            features: ['ارزیابی آثار هنری', 'امتیازدهی', 'ارائه نظرات تخصصی']
        }
    ];

    const artFields = [
        { id: 1, name: 'موسیقی', icon: MusicIcon },
        { id: 2, name: 'نقاشی', icon: PaintingIcon },
        { id: 3, name: 'فیلم‌سازی', icon: FilmIcon },
        { id: 4, name: 'مجسمه‌سازی', icon: SculptureIcon },
        { id: 5, name: 'گرافیک', icon: GraphicIcon },
        { id: 6, name: 'خوشنویسی', icon: CalligraphyIcon },
        { id: 7, name: 'عکاسی', icon: PhotographyIcon },
        { id: 8, name: 'معماری', icon: ArchitectureIcon },
    ];

    return (
        <FestivalLayout title="ثبت نام">
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <div className="w-20 h-20 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <LogoIcon className="w-12 h-12 text-white" />
                            </div>
                            <h1 className="text-4xl font-bold text-gray-800 mb-4 font-['Vazirmatn']">
                                ثبت نام در جشنواره
                            </h1>
                            <p className="text-xl text-gray-600 font-['Vazirmatn']">
                                به خانواده بزرگ هنرمندان ایرانی بپیوندید
                            </p>
                        </div>

                        {/* User Type Selection */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center font-['Vazirmatn']">
                                نوع کاربری خود را انتخاب کنید
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {userTypes.map((type) => (
                                    <div
                                        key={type.value}
                                        onClick={() => setSelectedUserType(type.value)}
                                        className={`p-6 border-2 rounded-2xl cursor-pointer transition-all ${
                                            selectedUserType === type.value
                                                ? 'border-amber-500 bg-amber-50'
                                                : 'border-gray-200 hover:border-amber-300'
                                        }`}
                                    >
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center ml-4">
                                                <type.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800 font-['Vazirmatn']">
                                                    {type.label}
                                                </h3>
                                                <p className="text-gray-600 text-sm font-['Vazirmatn']">
                                                    {type.description}
                                                </p>
                                            </div>
                                        </div>
                                        <ul className="space-y-2">
                                            {type.features.map((feature, index) => (
                                                <li key={index} className="flex items-center text-sm text-gray-600 font-['Vazirmatn']">
                                                    <div className="w-2 h-2 bg-amber-500 rounded-full ml-2"></div>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Art Fields Preview */}
                        {selectedUserType === 'artist' && (
                            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center font-['Vazirmatn']">
                                    رشته‌های هنری جشنواره
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {artFields.map((field) => (
                                        <div key={field.id} className="text-center p-4 border border-gray-200 rounded-xl hover:border-amber-300 transition-colors">
                                            <field.icon className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                                            <p className="text-sm font-medium text-gray-800 font-['Vazirmatn']">
                                                {field.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Registration Steps */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center font-['Vazirmatn']">
                                مراحل ثبت نام
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {[
                                    { step: '1', title: 'انتخاب نوع کاربری', desc: 'هنرمند یا داور' },
                                    { step: '2', title: 'پر کردن فرم', desc: 'اطلاعات شخصی و تخصصی' },
                                    { step: '3', title: 'تایید ایمیل', desc: 'فعال‌سازی حساب کاربری' },
                                    { step: '4', title: 'شروع فعالیت', desc: 'آپلود آثار یا ارزیابی' },
                                ].map((item, index) => (
                                    <div key={index} className="text-center">
                                        <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="text-2xl font-bold text-white">{item.step}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm font-['Vazirmatn']">
                                            {item.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="text-center">
                            <Link
                                href={selectedUserType === 'artist' ? '/artist/register' : '/judge/register'}
                                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-12 py-4 rounded-xl font-bold text-xl hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg font-['Vazirmatn'] inline-block"
                            >
                                شروع ثبت نام
                            </Link>
                            <div className="mt-4 text-gray-600 font-['Vazirmatn']">
                                قبلاً ثبت نام کرده‌اید؟{' '}
                                <Link
                                    href="/login"
                                    className="text-amber-600 hover:text-amber-700 font-bold"
                                >
                                    وارد شوید
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FestivalLayout>
    );
}