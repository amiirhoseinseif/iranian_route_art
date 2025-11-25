import React from 'react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { BellIcon } from '@/Components/SvgIcons';
import { useTranslation } from '@/Utils/translation';

export default function ArtistNotifications() {
    const { trans } = useTranslation();
    
    return (
        <FestivalLayout title={`${trans('notifications_title')} - ${trans('site_title')}`}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['iransansX']">
                        {trans('notifications_title')}
                    </h1>
                    <p className="text-gray-600 font-['iransansX']">
                        {trans('notifications_description')}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="text-center py-12">
                        <BellIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2 font-['iransansX']">
                            {trans('notifications_page_title')}
                        </h3>
                        <p className="text-gray-600 font-['iransansX']">
                            {trans('settings_coming_soon')}
                        </p>
                    </div>
                </div>
            </div>
        </FestivalLayout>
    );
}
