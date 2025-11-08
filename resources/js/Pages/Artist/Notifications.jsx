import React from 'react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { BellIcon } from '@/Components/SvgIcons';

export default function ArtistNotifications() {
    return (
        <FestivalLayout title="اعلان‌ها - جشنواره بین الملی مسیر ایران">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                        اعلان‌ها
                    </h1>
                    <p className="text-gray-600 font-['Vazirmatn']">
                        اطلاعیه‌ها و پیام‌های مهم
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="text-center py-12">
                        <BellIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                            صفحه اعلان‌ها
                        </h3>
                        <p className="text-gray-600 font-['Vazirmatn']">
                            این صفحه به زودی آماده خواهد شد
                        </p>
                    </div>
                </div>
            </div>
        </FestivalLayout>
    );
}
