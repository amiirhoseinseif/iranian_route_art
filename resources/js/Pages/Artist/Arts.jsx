import React from 'react';
import { Link } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { PaletteIcon, AddIcon } from '@/Components/SvgIcons';
import { useTranslation } from '@/Utils/translation';

export default function ArtistArts({ arts = [] }) {
    const { trans } = useTranslation();
    
    return (
        <FestivalLayout title={`${trans('my_arts')} - ${trans('site_title')}`}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 font-['iransansX']">
                                {trans('my_arts')}
                            </h1>
                            <p className="text-sm sm:text-base text-gray-600 font-['iransansX']">
                                {trans('manage_arts_description')}
                            </p>
                        </div>
                        <Link
                            href="/artist/arts/create"
                            className="w-full sm:w-auto bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 font-['iransansX'] text-center text-sm sm:text-base"
                        >
                            + {trans('add_new_art')}
                        </Link>
                    </div>
                </div>

                {/* Arts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {arts.length > 0 ? (
                        arts.map((art, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                                    <PaletteIcon className="w-16 h-16 text-primary-600" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 font-['iransansX']">
                                        {art.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 font-['iransansX'] line-clamp-2">
                                        {art.description}
                                    </p>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            art.status === 'approved' ? 'bg-secondary-200 text-secondary-800' :
                                            art.status === 'pending' ? 'bg-secondary-100 text-secondary-700' :
                                            art.status === 'rejected' ? 'bg-primary-100 text-primary-800' :
                                            'bg-gray-100 text-gray-800'
                                        } font-['iransansX']`}>
                                            {art.status === 'approved' ? trans('approved_status') :
                                             art.status === 'pending' ? trans('pending_status') :
                                             art.status === 'rejected' ? trans('rejected_status') : trans('unknown_status')}
                                        </span>
                                        <span className="text-xs sm:text-sm text-gray-500 font-['iransansX']">
                                            {art.created_at}
                                        </span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2 space-x-0 sm:space-x-2 space-x-reverse">
                                        <Link
                                            href={`/artist/arts/${art.id}/edit`}
                                            className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700 transition-colors text-center font-['iransansX']"
                                        >
                                            {trans('edit')}
                                        </Link>
                                        <button className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors font-['iransansX']">
                                            {trans('delete')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8 sm:py-12 px-4">
                            <PaletteIcon className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-4" />
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 font-['iransansX']">
                                {trans('no_arts_submitted')}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-6 font-['iransansX']">
                                {trans('submit_first_art')}
                            </p>
                            <Link
                                href="/artist/arts/create"
                                className="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 font-['iransansX'] text-sm sm:text-base"
                            >
                                {trans('add_new_art')}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </FestivalLayout>
    );
}
