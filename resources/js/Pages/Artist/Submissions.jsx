import React from 'react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { ClipboardIcon } from '@/Components/SvgIcons';

export default function ArtistSubmissions() {
    return (
        <FestivalLayout title="ارسال‌ها - جشنواره بین الملی مسیر ایران">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                        ارسال‌های من
                    </h1>
                    <p className="text-gray-600 font-['Vazirmatn']">
                        وضعیت ارسال آثار هنری شما
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="text-center py-12">
                        <ClipboardIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                            صفحه ارسال‌ها
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
