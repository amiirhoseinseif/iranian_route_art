import React from 'react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { SettingsIcon } from '@/Components/SvgIcons';

export default function ArtistSettings() {
    return (
        <FestivalLayout title="تنظیمات - جشنواره بین المللی مسیر ایران">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['iransansX']">
                        تنظیمات
                    </h1>
                    <p className="text-gray-600 font-['iransansX']">
                        تنظیمات حساب کاربری و حریم خصوصی
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="text-center py-12">
                        <SettingsIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2 font-['iransansX']">
                            صفحه تنظیمات
                        </h3>
                        <p className="text-gray-600 font-['iransansX']">
                            این صفحه به زودی آماده خواهد شد
                        </p>
                    </div>
                </div>
            </div>
        </FestivalLayout>
    );
}
