import React from 'react';
import { Link } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { 
    AddIcon, 
    ProfileIcon, 
    ListIcon,
    CheckIcon,
    ClockIcon,
    CloseIcon,
    PaletteIcon,
    ChartBarIcon
} from '@/Components/SvgIcons';
import { useTranslation } from '@/Utils/translation';

export default function ArtistDashboard({ artist, statistics, recent_arts, festival_settings, notifications }) {
    const { trans } = useTranslation();
    
    return (
        <FestivalLayout title={trans('dashboard') + ' - ' + trans('site_title')}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['iransansX']">
                                {trans('dashboard')}
                            </h1>
                            <p className="text-gray-600 font-['iransansX']">
                                {trans('welcome')} {artist?.first_name} {artist?.last_name}! {trans('artist_dashboard_intro')}
                            </p>
                        </div>
                        <Link
                            href="/logout"
                            method="post"
                            className="bg-primary-700 text-white px-4 py-2 rounded-lg hover:bg-primary-800 transition-colors font-['iransansX']"
                        >
                            {trans('logout')}
                        </Link>
                    </div>
                </div>

                {/* Artist Stats with modern design */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="group relative bg-gradient-to-br from-primary-50 to-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-primary-100/50 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-200/20 rounded-full blur-2xl"></div>
                        <div className="relative flex items-center">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                <PaletteIcon className="w-7 h-7 text-white" />
                            </div>
                            <div className="mr-4">
                                <p className="text-xs text-gray-500 font-['iransansX'] uppercase tracking-wide mb-1">{trans('total_artworks')}</p>
                                <p className="text-3xl font-extrabold text-gray-800 group-hover:text-primary-600 transition-colors">{statistics?.total_arts || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="group relative bg-gradient-to-br from-secondary-50 to-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-secondary-100/50 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-300/20 rounded-full blur-2xl"></div>
                        <div className="relative flex items-center">
                            <div className="w-14 h-14 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                <CheckIcon className="w-7 h-7 text-white" />
                            </div>
                            <div className="mr-4">
                                <p className="text-xs text-gray-500 font-['iransansX'] uppercase tracking-wide mb-1">{trans('approved_status')}</p>
                                <p className="text-3xl font-extrabold text-gray-800 group-hover:text-secondary-700 transition-colors">{statistics?.approved_arts || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="group relative bg-gradient-to-br from-amber-50 to-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-amber-100/50 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl"></div>
                        <div className="relative flex items-center">
                            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                <ClockIcon className="w-7 h-7 text-white" />
                            </div>
                            <div className="mr-4">
                                <p className="text-xs text-gray-500 font-['iransansX'] uppercase tracking-wide mb-1">{trans('pending_status')}</p>
                                <p className="text-3xl font-extrabold text-gray-800 group-hover:text-amber-600 transition-colors">{statistics?.pending_arts || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="group relative bg-gradient-to-br from-primary-100 to-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-primary-200/50 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-300/20 rounded-full blur-2xl"></div>
                        <div className="relative flex items-center">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                <ChartBarIcon className="w-7 h-7 text-white" />
                            </div>
                            <div className="mr-4">
                                <p className="text-xs text-gray-500 font-['iransansX'] uppercase tracking-wide mb-1">{trans('average_score')}</p>
                                <p className="text-3xl font-extrabold text-gray-800 group-hover:text-primary-700 transition-colors">{statistics?.average_score || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions with modern cards */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
                    <h3 className="text-2xl font-extrabold text-gray-800 mb-8 font-['iransansX'] relative">
                        <span className="relative z-10">{trans('quick_actions')}</span>
                        <span className="absolute bottom-0 right-0 w-20 h-1 bg-gradient-to-r from-primary-600 to-transparent rounded-full"></span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link 
                            href="/artist/arts/create" 
                            className="group relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white p-8 rounded-3xl text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-primary-500/50 overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="mb-4 flex justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                                        <AddIcon className="w-8 h-8" />
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold mb-2 font-['iransansX']">{trans('submit_new_art')}</h4>
                                <p className="text-primary-100 text-sm font-['iransansX']">{trans('add_new_artwork')}</p>
                            </div>
                        </Link>
                        
                        <Link 
                            href="/artist/profile" 
                            className="group relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white p-8 rounded-3xl text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-500/50 overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="mb-4 flex justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                                        <ProfileIcon className="w-8 h-8" />
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold mb-2 font-['iransansX']">{trans('edit_profile')}</h4>
                                <p className="text-blue-100 text-sm font-['iransansX']">{trans('update_personal_info')}</p>
                            </div>
                        </Link>
                        
                        <Link 
                            href="/artist/arts" 
                            className="group relative bg-gradient-to-br from-secondary-600 via-secondary-700 to-secondary-800 text-white p-8 rounded-3xl text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-secondary-500/50 overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="mb-4 flex justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                                        <ListIcon className="w-8 h-8" />
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold mb-2 font-['iransansX']">{trans('view_all_artworks')}</h4>
                                <p className="text-secondary-100 text-sm font-['iransansX']">{trans('view_all_artworks_desc')}</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Recent Arts */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-800 font-['iransansX']">{trans('recent_artworks')}</h3>
                        <Link 
                            href="/artist/arts" 
                            className="text-primary-600 hover:text-primary-700 font-semibold font-['iransansX']"
                        >
                            {trans('view_all')}
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recent_arts && recent_arts.length > 0 ? (
                            recent_arts.map((art) => {
                                const formatDate = (dateString) => {
                                    const date = new Date(dateString);
                                    const now = new Date();
                                    const diffTime = Math.abs(now - date);
                                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                    
                                    if (diffDays === 1) return 'دیروز';
                                    if (diffDays < 7) return `${diffDays} روز پیش`;
                                    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} هفته پیش`;
                                    return `${Math.ceil(diffDays / 30)} ماه پیش`;
                                };

                                return (
                                    <div key={art.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                                        <div className="text-4xl mb-3 text-center">
                                            <PaletteIcon className="w-12 h-12 mx-auto text-gray-600" />
                                        </div>
                                        <h4 className="font-semibold text-gray-800 mb-2 font-['iransansX']">{art.title}</h4>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                art.status === 'approved' ? 'bg-secondary-200 text-secondary-800' :
                                                art.status === 'pending' ? 'bg-secondary-100 text-secondary-700' :
                                                'bg-primary-100 text-primary-800'
                                            } font-['iransansX']`}>
                                                {art.status === 'approved' ? trans('approved_status') :
                                                 art.status === 'pending' ? trans('pending_status') : trans('rejected_status')}
                                            </span>
                                            {art.average_score && (
                                                <span className="text-sm text-gray-600 font-['iransansX']">
                                                    {trans('score_label')}: {art.average_score}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 mb-3 font-['iransansX']">{formatDate(art.created_at)}</p>
                                        <div className="flex space-x-2 space-x-reverse">
                                            <Link 
                                                href={`/artist/arts/${art.id}`}
                                                className="flex-1 bg-primary-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-primary-700 transition-colors font-['iransansX'] text-center"
                                            >
                                                {trans('view')}
                                            </Link>
                                            <Link 
                                                href={`/artist/arts/${art.id}/edit`}
                                                className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors font-['iransansX'] text-center"
                                            >
                                                {trans('edit')}
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full text-center py-8">
                                <PaletteIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-600 mb-2 font-['iransansX']">{trans('no_artwork_submitted')}</h3>
                                <p className="text-gray-500 mb-4 font-['iransansX']">{trans('submit_first_artwork')}</p>
                                <Link 
                                    href="/artist/arts/create"
                                    className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-['iransansX']"
                                >
                                    {trans('submit_new_art')}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 font-['iransansX']">{trans('notifications')}</h3>
                    <div className="space-y-4">
                        {notifications && notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <div key={index} className="flex items-start space-x-3 space-x-reverse p-4 bg-gray-50 rounded-lg">
                                    <div className={`w-3 h-3 rounded-full mt-2 ${
                                        notification.type === 'success' ? 'bg-secondary-600' :
                                        notification.type === 'info' ? 'bg-primary-500' :
                                        notification.type === 'warning' ? 'bg-secondary-500' : 
                                        notification.type === 'error' ? 'bg-primary-800' : 'bg-primary-600'
                                    }`}></div>
                                    <div className="flex-1">
                                        <p className="text-gray-800 font-['iransansX']">{notification.message}</p>
                                        <p className="text-sm text-gray-500 mt-1 font-['iransansX']">{notification.time}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-4">🔔</div>
                                <p className="text-gray-500 font-['iransansX']">{trans('no_notifications')}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Festival Info */}
                <div className="bg-gradient-to-r from-primary-50 to-secondary-100 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 font-['iransansX']">{trans('festival_info')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700 font-['iransansX']">
                        <div>
                            <h4 className="font-semibold mb-2">{trans('important_deadlines')}:</h4>
                            <ul className="space-y-1">
                                <li>• {trans('submission_deadline')}: {festival_settings?.submission_deadline || trans('not_set')}</li>
                                <li>• {trans('judging_start')}: {festival_settings?.judging_start_date || trans('not_set')}</li>
                                <li>• {trans('results_announcement')}: {festival_settings?.results_announcement_date || trans('not_set')}</li>
                                <li>• {trans('closing_ceremony')}: {festival_settings?.closing_ceremony_date || trans('not_set')}</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">{trans('important_rules')}:</h4>
                            <ul className="space-y-1">
                                <li>• {trans('artworks_must_be_original')}</li>
                                <li>• {trans('max_file_size')}: {festival_settings?.max_file_size || '100'} {trans('megabytes')}</li>
                                <li>• {trans('allowed_formats')}: {festival_settings?.allowed_formats || 'MP3, MP4, JPG, PNG'}</li>
                                <li>• {trans('max_submissions_per_artist')}: {festival_settings?.max_submissions_per_artist || '5'}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </FestivalLayout>
    );
}
