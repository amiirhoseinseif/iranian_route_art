import React from 'react';
import { Link } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { 
    AddIcon, 
    ProfileIcon, 
    ListIcon,
    CheckIcon,
    ClockIcon,
    CloseIcon
} from '@/Components/SvgIcons';

export default function ArtistDashboard() {
    return (
        <FestivalLayout title="پنل هنرمند - جشنواره هنری مسیر ایران">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                        پنل هنرمند
                    </h1>
                    <p className="text-gray-600 font-['Vazirmatn']">
                        خوش آمدید! اینجا می‌توانید آثار هنری خود را مدیریت کنید
                    </p>
                </div>

                {/* Artist Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl text-blue-600">🎨</span>
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">کل آثار</p>
                                <p className="text-2xl font-bold text-gray-800">12</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl text-green-600">✅</span>
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">تایید شده</p>
                                <p className="text-2xl font-bold text-gray-800">8</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl text-yellow-600">⏳</span>
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">در انتظار تایید</p>
                                <p className="text-2xl font-bold text-gray-800">3</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl text-purple-600">📊</span>
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">میانگین امتیاز</p>
                                <p className="text-2xl font-bold text-gray-800">8.7</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">عملیات سریع</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link 
                            href="/artist/art/create" 
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
                        {[
                            { title: 'نقاشی انتزاعی', status: 'approved', score: 9.2, date: '2 روز پیش', image: '🖼️' },
                            { title: 'آهنگ سنتی', status: 'pending', score: null, date: '1 هفته پیش', image: '🎵' },
                            { title: 'مجسمه مدرن', status: 'approved', score: 8.7, date: '2 هفته پیش', image: '🗿' },
                            { title: 'فیلم کوتاه', status: 'rejected', score: null, date: '3 هفته پیش', image: '🎬' },
                            { title: 'خوشنویسی', status: 'approved', score: 9.5, date: '1 ماه پیش', image: '✍️' },
                            { title: 'عکس هنری', status: 'pending', score: null, date: '1 ماه پیش', image: '📸' },
                        ].map((art, index) => (
                            <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-3 text-center">{art.image}</div>
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
                                    {art.score && (
                                        <span className="text-sm text-gray-600 font-['Vazirmatn']">
                                            امتیاز: {art.score}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mb-3 font-['Vazirmatn']">{art.date}</p>
                                <div className="flex space-x-2 space-x-reverse">
                                    <button className="flex-1 bg-amber-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-amber-700 transition-colors font-['Vazirmatn']">
                                        مشاهده
                                    </button>
                                    <button className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors font-['Vazirmatn']">
                                        ویرایش
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">اعلان‌ها</h3>
                    <div className="space-y-4">
                        {[
                            { message: 'اثر "نقاشی انتزاعی" شما تایید شد و امتیاز 9.2 دریافت کرد', time: '2 ساعت پیش', type: 'success' },
                            { message: 'اثر "آهنگ سنتی" شما در حال بررسی است', time: '1 روز پیش', type: 'info' },
                            { message: 'مهلت ارسال آثار تا 31 اکتبر تمدید شد', time: '3 روز پیش', type: 'warning' },
                            { message: 'جلسه داوری آثار موسیقی در تاریخ 15 نوامبر برگزار می‌شود', time: '1 هفته پیش', type: 'info' },
                        ].map((notification, index) => (
                            <div key={index} className="flex items-start space-x-3 space-x-reverse p-4 bg-gray-50 rounded-lg">
                                <div className={`w-3 h-3 rounded-full mt-2 ${
                                    notification.type === 'success' ? 'bg-green-500' :
                                    notification.type === 'info' ? 'bg-blue-500' :
                                    notification.type === 'warning' ? 'bg-yellow-500' : 'bg-gray-500'
                                }`}></div>
                                <div className="flex-1">
                                    <p className="text-gray-800 font-['Vazirmatn']">{notification.message}</p>
                                    <p className="text-sm text-gray-500 mt-1 font-['Vazirmatn']">{notification.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Festival Info */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 font-['Vazirmatn']">اطلاعات جشنواره</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700 font-['Vazirmatn']">
                        <div>
                            <h4 className="font-semibold mb-2">مهلت‌های مهم:</h4>
                            <ul className="space-y-1">
                                <li>• مهلت ارسال آثار: 31 اکتبر 2025</li>
                                <li>• شروع داوری: 1 نوامبر 2025</li>
                                <li>• اعلام نتایج: 15 دسامبر 2025</li>
                                <li>• مراسم اختتامیه: 20 دسامبر 2025</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">قوانین مهم:</h4>
                            <ul className="space-y-1">
                                <li>• آثار باید اصیل و منحصر به فرد باشند</li>
                                <li>• حداکثر اندازه فایل: 100 مگابایت</li>
                                <li>• فرمت‌های مجاز: MP3, MP4, JPG, PNG</li>
                                <li>• هر هنرمند حداکثر 5 اثر می‌تواند ارسال کند</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </FestivalLayout>
    );
}
