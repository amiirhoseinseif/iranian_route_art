import React from 'react';
import { Link } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { PaletteIcon, MusicIcon, FilmIcon, SculptureIcon, GraphicIcon, CalligraphyIcon, PhotographyIcon, ArchitectureIcon, AddIcon } from '@/Components/SvgIcons';

export default function ArtistArts({ arts = [] }) {
    return (
        <FestivalLayout title="آثار هنری - جشنواره هنری مسیر ایران">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                                آثار هنری من
                            </h1>
                            <p className="text-gray-600 font-['Vazirmatn']">
                                مدیریت و مشاهده آثار هنری ارسالی
                            </p>
                        </div>
                        <Link
                            href="/artist/arts/create"
                            className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 font-['Vazirmatn']"
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
                                <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                    {art.art_field?.name === 'نقاشی' ? <PaletteIcon className="w-16 h-16 text-blue-600" /> :
                                     art.art_field?.name === 'موسیقی' ? <MusicIcon className="w-16 h-16 text-blue-600" /> :
                                     art.art_field?.name === 'فیلم‌سازی' ? <FilmIcon className="w-16 h-16 text-blue-600" /> :
                                     art.art_field?.name === 'مجسمه‌سازی' ? <SculptureIcon className="w-16 h-16 text-blue-600" /> :
                                     art.art_field?.name === 'گرافیک' ? <GraphicIcon className="w-16 h-16 text-blue-600" /> :
                                     art.art_field?.name === 'خوشنویسی' ? <CalligraphyIcon className="w-16 h-16 text-blue-600" /> :
                                     art.art_field?.name === 'عکاسی' ? <PhotographyIcon className="w-16 h-16 text-blue-600" /> :
                                     art.art_field?.name === 'معماری' ? <ArchitectureIcon className="w-16 h-16 text-blue-600" /> : 
                                     <PaletteIcon className="w-16 h-16 text-blue-600" />}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                                        {art.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 font-['Vazirmatn'] line-clamp-2">
                                        {art.description}
                                    </p>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            art.status === 'approved' ? 'bg-green-100 text-green-800' :
                                            art.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            art.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                        } font-['Vazirmatn']`}>
                                            {art.status === 'approved' ? 'تایید شده' :
                                             art.status === 'pending' ? 'در انتظار' :
                                             art.status === 'rejected' ? 'رد شده' : 'نامشخص'}
                                        </span>
                                        <span className="text-sm text-gray-500 font-['Vazirmatn']">
                                            {art.created_at}
                                        </span>
                                    </div>
                                    <div className="flex space-x-2 space-x-reverse">
                                        <Link
                                            href={`/artist/arts/${art.id}/edit`}
                                            className="flex-1 bg-amber-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-700 transition-colors text-center font-['Vazirmatn']"
                                        >
                                            ویرایش
                                        </Link>
                                        <button className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors font-['Vazirmatn']">
                                            حذف
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <PaletteIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                            <h3 className="text-xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                                هنوز اثری ارسال نکرده‌اید
                            </h3>
                            <p className="text-gray-600 mb-6 font-['Vazirmatn']">
                                اولین اثر هنری خود را ارسال کنید
                            </p>
                            <Link
                                href="/artist/arts/create"
                                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 font-['Vazirmatn']"
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
