import React from 'react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { ClipboardIcon } from '@/Components/SvgIcons';
import { useTranslation } from '@/Utils/translation';

export default function ArtistSubmissions() {
    const { trans } = useTranslation();
    
    return (
        <FestivalLayout title={`${trans('submissions_title')} - ${trans('site_title')}`}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['iransansX']">
                        {trans('submissions_title')}
                    </h1>
                    <p className="text-gray-600 font-['iransansX']">
                        {trans('submissions_description')}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="text-center py-12">
                        <ClipboardIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2 font-['iransansX']">
                            {trans('submissions_page_title')}
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
