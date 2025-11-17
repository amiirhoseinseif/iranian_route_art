import React from 'react';
import { Link } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { PaletteIcon, MusicIcon, ShortFilmIcon, SculptureIcon, IllustrationIcon, CalligraphyIcon, PhotographyIcon, ArchitectureIcon, HandicraftsIcon, IndustrialDesignIcon, LiteratureIcon, CarpetIcon, TheaterIcon, FashionDesignIcon, AnimationIcon, NewMediaArtsIcon, AddIcon } from '@/Components/SvgIcons';

export default function ArtistArts({ arts = [] }) {
    return (
        <FestivalLayout title="آثار هنری - جشنواره بین المللی مسیر ایران">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['iransansX']">
                                آثار هنری من
                            </h1>
                            <p className="text-gray-600 font-['iransansX']">
                                مدیریت و مشاهده آثار هنری ارسالی
                            </p>
                        </div>
                        <Link
                            href="/artist/arts/create"
                            className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 font-['iransansX']"
                        >
                            + افزودن اثر جدید
                        </Link>
                    </div>
                </div>

                {/* Arts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {arts.length > 0 ? (
                        arts.map((art, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                                    {art.art_field?.name === 'موسیقی' ? <MusicIcon className="w-16 h-16 text-primary-600" /> :
                                     art.art_field?.name === 'خوشنویسی' ? <CalligraphyIcon className="w-16 h-16 text-primary-600" /> :
                                     art.art_field?.name === 'نقاشی' ? <PaletteIcon className="w-16 h-16 text-primary-600" /> :
                                     art.art_field?.name === 'مجسمه‌سازی' ? <SculptureIcon className="w-16 h-16 text-primary-600" /> :
                                     art.art_field?.name === 'صنایع دستی' ? <HandicraftsIcon className="w-16 h-16 text-primary-600" /> :
                                     art.art_field?.name === 'معماری' ? <ArchitectureIcon className="w-16 h-16 text-primary-600" /> :
                                     art.art_field?.name === 'طراحی صنعتی' ? <IndustrialDesignIcon className="w-16 h-16 text-primary-600" /> :
                                     art.art_field?.name === 'گرافیک و تصویرسازی' ? <IllustrationIcon className="w-16 h-16 text-primary-600" /> :
                                     art.art_field?.name === 'ادبیات' ? <LiteratureIcon className="w-16 h-16 text-primary-600" /> :
                                     art.art_field?.name === 'فرش' ? <CarpetIcon className="w-16 h-16 text-primary-600" /> :
                                     art.art_field?.name === 'سینما' ? <ShortFilmIcon className="w-16 h-16 text-primary-600" /> :
                                     art.art_field?.name === 'نمایش' ? <TheaterIcon className="w-16 h-16 text-primary-600" /> :
                                     art.art_field?.name === 'طراحی پارچه و طراحی لباس' ? <FashionDesignIcon className="w-16 h-16 text-primary-600" /> :
                                     art.art_field?.name === 'انیمیشن' ? <AnimationIcon className="w-16 h-16 text-primary-600" /> :
                                     art.art_field?.name === 'عکاسی' ? <PhotographyIcon className="w-16 h-16 text-primary-600" /> :
                                     art.art_field?.name === 'هنرهای جدید' ? <NewMediaArtsIcon className="w-16 h-16 text-primary-600" /> :
                                     <PaletteIcon className="w-16 h-16 text-primary-600" />}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 font-['iransansX']">
                                        {art.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 font-['iransansX'] line-clamp-2">
                                        {art.description}
                                    </p>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            art.status === 'approved' ? 'bg-secondary-200 text-secondary-800' :
                                            art.status === 'pending' ? 'bg-secondary-100 text-secondary-700' :
                                            art.status === 'rejected' ? 'bg-primary-100 text-primary-800' :
                                            'bg-gray-100 text-gray-800'
                                        } font-['iransansX']`}>
                                            {art.status === 'approved' ? 'تایید شده' :
                                             art.status === 'pending' ? 'در انتظار' :
                                             art.status === 'rejected' ? 'رد شده' : 'نامشخص'}
                                        </span>
                                        <span className="text-sm text-gray-500 font-['iransansX']">
                                            {art.created_at}
                                        </span>
                                    </div>
                                    <div className="flex space-x-2 space-x-reverse">
                                        <Link
                                            href={`/artist/arts/${art.id}/edit`}
                                            className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700 transition-colors text-center font-['iransansX']"
                                        >
                                            ویرایش
                                        </Link>
                                        <button className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors font-['iransansX']">
                                            حذف
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <PaletteIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                            <h3 className="text-xl font-bold text-gray-800 mb-2 font-['iransansX']">
                                هنوز اثری ارسال نکرده‌اید
                            </h3>
                            <p className="text-gray-600 mb-6 font-['iransansX']">
                                اولین اثر هنری خود را ارسال کنید
                            </p>
                            <Link
                                href="/artist/arts/create"
                                className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 font-['iransansX']"
                            >
                                افزودن اثر جدید
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </FestivalLayout>
    );
}
