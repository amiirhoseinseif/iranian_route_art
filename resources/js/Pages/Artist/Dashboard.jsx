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

export default function ArtistDashboard({ artist, statistics, recent_arts, festival_settings, notifications }) {
    return (
        <FestivalLayout title="پنل هنرمند - جشنواره هنری مسیر ایران">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                                پنل هنرمند
                            </h1>
                            <p className="text-gray-600 font-['Vazirmatn']">
                                خوش آمدید {artist?.first_name} {artist?.last_name}! اینجا می‌توانید آثار هنری خود را مدیریت کنید
                            </p>
                        </div>
                        <Link
                            href="/logout"
                            method="post"
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-['Vazirmatn']"
                        >
                            خروج
                        </Link>
                    </div>
                </div>

                {/* Artist Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <PaletteIcon className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">کل آثار</p>
                                <p className="text-2xl font-bold text-gray-800">{statistics?.total_arts || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <CheckIcon className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">تایید شده</p>
                                <p className="text-2xl font-bold text-gray-800">{statistics?.approved_arts || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <ClockIcon className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">در انتظار تایید</p>
                                <p className="text-2xl font-bold text-gray-800">{statistics?.pending_arts || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <ChartBarIcon className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">میانگین امتیاز</p>
                                <p className="text-2xl font-bold text-gray-800">{statistics?.average_score || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">عملیات سریع</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link 
                            href="/artist/arts/create" 
                            className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 rounded-xl text-center hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105"
                        >
                            <div className="text-4xl mb-3 flex justify-center">
                                <AddIcon className="w-12 h-12" />
                            </div>
                            <h4 className="text-lg font-bold mb-2 font-['Vazirmatn']">افزودن اثر جدید</h4>
                            <p className="text-amber-100 text-sm font-['Vazirmatn']">اثر هنری جدید خود را اضافه کنید</p>
                        </Link>
                        
                        <Link 
                            href="/artist/profile" 
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl text-center hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                        >
                            <div className="text-4xl mb-3 flex justify-center">
                                <ProfileIcon className="w-12 h-12" />
                            </div>
                            <h4 className="text-lg font-bold mb-2 font-['Vazirmatn']">ویرایش پروفایل</h4>
                            <p className="text-blue-100 text-sm font-['Vazirmatn']">اطلاعات شخصی خود را بروزرسانی کنید</p>
                        </Link>
                        
                        <Link 
                            href="/artist/arts" 
                            className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-xl text-center hover:from-green-700 hover:to-teal-700 transition-all transform hover:scale-105"
                        >
                            <div className="text-4xl mb-3 flex justify-center">
                                <ListIcon className="w-12 h-12" />
                            </div>
                            <h4 className="text-lg font-bold mb-2 font-['Vazirmatn']">مشاهده همه آثار</h4>
                            <p className="text-green-100 text-sm font-['Vazirmatn']">لیست کامل آثار هنری خود را ببینید</p>
                        </Link>
                    </div>
                </div>

                {/* Recent Arts */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-800 font-['Vazirmatn']">آثار اخیر</h3>
                        <Link 
                            href="/artist/arts" 
                            className="text-amber-600 hover:text-amber-700 font-semibold font-['Vazirmatn']"
                        >
                            مشاهده همه
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recent_arts && recent_arts.length > 0 ? (
                            recent_arts.map((art) => {
                                const getArtIcon = (artField) => {
                                    const fieldIcons = {
                                        'نقاشی': '🖼️',
                                        'موسیقی': '🎵',
                                        'مجسمه‌سازی': '🗿',
                                        'فیلم': '🎬',
                                        'خوشنویسی': '✍️',
                                        'عکاسی': '📸',
                                        'طراحی': '🎨',
                                        'معماری': '🏛️',
                                        'تئاتر': '🎭',
                                        'رقص': '💃'
                                    };
                                    return fieldIcons[artField] || '🎨';
                                };

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
                                        <h4 className="font-semibold text-gray-800 mb-2 font-['Vazirmatn']">{art.title}</h4>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                art.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                art.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            } font-['Vazirmatn']`}>
                                                {art.status === 'approved' ? 'تایید شده' :
                                                 art.status === 'pending' ? 'در انتظار' : 'رد شده'}
                                            </span>
                                            {art.average_score && (
                                                <span className="text-sm text-gray-600 font-['Vazirmatn']">
                                                    امتیاز: {art.average_score}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 mb-3 font-['Vazirmatn']">{formatDate(art.created_at)}</p>
                                        <div className="flex space-x-2 space-x-reverse">
                                            <Link 
                                                href={`/artist/arts/${art.id}`}
                                                className="flex-1 bg-amber-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-amber-700 transition-colors font-['Vazirmatn'] text-center"
                                            >
                                                مشاهده
                                            </Link>
                                            <Link 
                                                href={`/artist/arts/${art.id}/edit`}
                                                className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors font-['Vazirmatn'] text-center"
                                            >
                                                ویرایش
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full text-center py-8">
                                <PaletteIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-600 mb-2 font-['Vazirmatn']">هنوز اثری ارسال نکرده‌اید</h3>
                                <p className="text-gray-500 mb-4 font-['Vazirmatn']">اولین اثر هنری خود را ارسال کنید</p>
                                <Link 
                                    href="/artist/arts/create"
                                    className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-['Vazirmatn']"
                                >
                                    افزودن اثر جدید
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">اعلان‌ها</h3>
                    <div className="space-y-4">
                        {notifications && notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <div key={index} className="flex items-start space-x-3 space-x-reverse p-4 bg-gray-50 rounded-lg">
                                    <div className={`w-3 h-3 rounded-full mt-2 ${
                                        notification.type === 'success' ? 'bg-green-500' :
                                        notification.type === 'info' ? 'bg-blue-500' :
                                        notification.type === 'warning' ? 'bg-yellow-500' : 
                                        notification.type === 'error' ? 'bg-red-500' : 'bg-gray-500'
                                    }`}></div>
                                    <div className="flex-1">
                                        <p className="text-gray-800 font-['Vazirmatn']">{notification.message}</p>
                                        <p className="text-sm text-gray-500 mt-1 font-['Vazirmatn']">{notification.time}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-4">🔔</div>
                                <p className="text-gray-500 font-['Vazirmatn']">هیچ اعلان جدیدی وجود ندارد</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Festival Info */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 font-['Vazirmatn']">اطلاعات جشنواره</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700 font-['Vazirmatn']">
                        <div>
                            <h4 className="font-semibold mb-2">مهلت‌های مهم:</h4>
                            <ul className="space-y-1">
                                <li>• مهلت ارسال آثار: {festival_settings?.submission_deadline || 'تعیین نشده'}</li>
                                <li>• شروع داوری: {festival_settings?.judging_start_date || 'تعیین نشده'}</li>
                                <li>• اعلام نتایج: {festival_settings?.results_announcement_date || 'تعیین نشده'}</li>
                                <li>• مراسم اختتامیه: {festival_settings?.closing_ceremony_date || 'تعیین نشده'}</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">قوانین مهم:</h4>
                            <ul className="space-y-1">
                                <li>• آثار باید اصیل و منحصر به فرد باشند</li>
                                <li>• حداکثر اندازه فایل: {festival_settings?.max_file_size || '100'} مگابایت</li>
                                <li>• فرمت‌های مجاز: {festival_settings?.allowed_formats || 'MP3, MP4, JPG, PNG'}</li>
                                <li>• هر هنرمند حداکثر {festival_settings?.max_submissions_per_artist || '5'} اثر می‌تواند ارسال کند</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </FestivalLayout>
    );
}
