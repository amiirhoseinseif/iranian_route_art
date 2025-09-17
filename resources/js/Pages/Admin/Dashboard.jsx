import React from 'react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { 
    CheckIcon,
    ClockIcon,
    CloseIcon,
    AddIcon,
    ProfileIcon,
    ListIcon
} from '@/Components/SvgIcons';

export default function AdminDashboard() {
    return (
        <FestivalLayout title="پنل مدیریت - جشنواره هنری مسیر ایران">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                        پنل مدیریت
                    </h1>
                    <p className="text-gray-600 font-['Vazirmatn']">
                        مدیریت جشنواره هنری مسیر ایران
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl text-blue-600">👥</span>
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">کل هنرمندان</p>
                                <p className="text-2xl font-bold text-gray-800">1,234</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl text-green-600">🎨</span>
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">کل آثار</p>
                                <p className="text-2xl font-bold text-gray-800">2,567</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl text-yellow-600">👨‍⚖️</span>
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">کل داوران</p>
                                <p className="text-2xl font-bold text-gray-800">45</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl text-purple-600">📊</span>
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">در انتظار تایید</p>
                                <p className="text-2xl font-bold text-gray-800">89</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 font-['Vazirmatn']">مدیریت هنرمندان</h3>
                        <div className="space-y-3">
                            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-['Vazirmatn']">
                                مشاهده همه هنرمندان
                            </button>
                            <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-['Vazirmatn']">
                                تایید هنرمندان جدید
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 font-['Vazirmatn']">مدیریت آثار</h3>
                        <div className="space-y-3">
                            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-['Vazirmatn']">
                                مشاهده همه آثار
                            </button>
                            <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors font-['Vazirmatn']">
                                آثار در انتظار تایید
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 font-['Vazirmatn']">مدیریت داوران</h3>
                        <div className="space-y-3">
                            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-['Vazirmatn']">
                                مشاهده همه داوران
                            </button>
                            <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-['Vazirmatn']">
                                اضافه کردن داور جدید
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">فعالیت‌های اخیر</h3>
                    <div className="space-y-4">
                        {[
                            { action: 'هنرمند جدید ثبت نام کرد', user: 'علی محمدی', time: '2 ساعت پیش', type: 'success' },
                            { action: 'اثر جدید ارسال شد', user: 'فاطمه احمدی', time: '3 ساعت پیش', type: 'info' },
                            { action: 'داور جدید اضافه شد', user: 'دکتر رضایی', time: '5 ساعت پیش', type: 'warning' },
                            { action: 'اثر تایید شد', user: 'محمد کریمی', time: '1 روز پیش', type: 'success' },
                        ].map((activity, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <div className={`w-3 h-3 rounded-full mr-3 ${
                                        activity.type === 'success' ? 'bg-green-500' :
                                        activity.type === 'info' ? 'bg-blue-500' :
                                        activity.type === 'warning' ? 'bg-yellow-500' : 'bg-gray-500'
                                    }`}></div>
                                    <div>
                                        <p className="font-medium text-gray-800 font-['Vazirmatn']">{activity.action}</p>
                                        <p className="text-sm text-gray-600 font-['Vazirmatn']">توسط {activity.user}</p>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500 font-['Vazirmatn']">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Status */}
                <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">وضعیت سیستم</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-3 font-['Vazirmatn']">سرور</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600 font-['Vazirmatn']">CPU</span>
                                    <span className="text-sm font-medium">23%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-3 font-['Vazirmatn']">حافظه</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600 font-['Vazirmatn']">RAM</span>
                                    <span className="text-sm font-medium">67%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FestivalLayout>
    );
}
