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

export default function JudgeDashboard() {
    return (
        <FestivalLayout title="پنل داور - جشنواره هنری مسیر ایران">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                        پنل داور
                    </h1>
                    <p className="text-gray-600 font-['Vazirmatn']">
                        ارزیابی آثار هنری جشنواره هنری مسیر ایران
                    </p>
                </div>

                {/* Judge Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl text-blue-600">📋</span>
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">کل آثار تخصیص داده شده</p>
                                <p className="text-2xl font-bold text-gray-800">24</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl text-yellow-600">⏳</span>
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">در انتظار ارزیابی</p>
                                <p className="text-2xl font-bold text-gray-800">8</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl text-green-600">✅</span>
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">ارزیابی شده</p>
                                <p className="text-2xl font-bold text-gray-800">16</p>
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
                                <p className="text-2xl font-bold text-gray-800">8.2</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Assigned Art Fields */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">رشته‌های هنری تخصیص داده شده</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { name: 'موسیقی', count: 12, icon: '🎵', color: 'bg-blue-100 text-blue-600' },
                            { name: 'نقاشی', count: 8, icon: '🖼️', color: 'bg-green-100 text-green-600' },
                            { name: 'فیلم‌سازی', count: 4, icon: '🎬', color: 'bg-purple-100 text-purple-600' },
                        ].map((field, index) => (
                            <div key={index} className="p-4 border border-gray-200 rounded-xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${field.color}`}>
                                            <span className="text-xl">{field.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 font-['Vazirmatn']">{field.name}</h4>
                                            <p className="text-sm text-gray-600 font-['Vazirmatn']">{field.count} اثر</p>
                                        </div>
                                    </div>
                                    <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors font-['Vazirmatn']">
                                        مشاهده
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pending Evaluations */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">آثار در انتظار ارزیابی</h3>
                    <div className="space-y-4">
                        {[
                            { title: 'سمفونی بهار', artist: 'علی محمدی', field: 'موسیقی', submitted: '2 ساعت پیش', priority: 'high' },
                            { title: 'نقاشی منظره کوهستان', artist: 'فاطمه احمدی', field: 'نقاشی', submitted: '4 ساعت پیش', priority: 'medium' },
                            { title: 'فیلم کوتاه زندگی', artist: 'محمد کریمی', field: 'فیلم‌سازی', submitted: '6 ساعت پیش', priority: 'low' },
                            { title: 'آهنگ عاشقانه', artist: 'سارا رضایی', field: 'موسیقی', submitted: '1 روز پیش', priority: 'medium' },
                        ].map((art, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <div className={`w-3 h-3 rounded-full mr-3 ${
                                        art.priority === 'high' ? 'bg-red-500' :
                                        art.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}></div>
                                    <div>
                                        <h4 className="font-medium text-gray-800 font-['Vazirmatn']">{art.title}</h4>
                                        <p className="text-sm text-gray-600 font-['Vazirmatn']">
                                            هنرمند: {art.artist} | رشته: {art.field}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 space-x-reverse">
                                    <span className="text-sm text-gray-500 font-['Vazirmatn']">{art.submitted}</span>
                                    <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors font-['Vazirmatn']">
                                        ارزیابی
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Evaluations */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">ارزیابی‌های اخیر</h3>
                    <div className="space-y-4">
                        {[
                            { title: 'نقاشی انتزاعی', artist: 'احمد نوری', score: 9.2, date: '2 ساعت پیش', status: 'completed' },
                            { title: 'آهنگ سنتی', artist: 'مریم صادقی', score: 7.8, date: '4 ساعت پیش', status: 'completed' },
                            { title: 'مجسمه مدرن', artist: 'حسین کریمی', score: 8.5, date: '6 ساعت پیش', status: 'completed' },
                            { title: 'فیلم مستند', artist: 'علی رضایی', score: 9.0, date: '1 روز پیش', status: 'completed' },
                        ].map((evaluation, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <h4 className="font-medium text-gray-800 font-['Vazirmatn']">{evaluation.title}</h4>
                                    <p className="text-sm text-gray-600 font-['Vazirmatn']">هنرمند: {evaluation.artist}</p>
                                </div>
                                <div className="flex items-center space-x-4 space-x-reverse">
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600 font-['Vazirmatn']">امتیاز</p>
                                        <p className="text-xl font-bold text-amber-600">{evaluation.score}</p>
                                    </div>
                                    <span className="text-sm text-gray-500 font-['Vazirmatn']">{evaluation.date}</span>
                                    <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-colors font-['Vazirmatn']">
                                        مشاهده
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Evaluation Guidelines */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 font-['Vazirmatn']">راهنمای ارزیابی</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 font-['Vazirmatn']">
                        <div>
                            <h4 className="font-semibold mb-2">معیارهای ارزیابی:</h4>
                            <ul className="space-y-1 list-disc list-inside">
                                <li>خلاقیت و نوآوری (25%)</li>
                                <li>تکنیک و مهارت (25%)</li>
                                <li>مفهوم و پیام (20%)</li>
                                <li>کیفیت اجرا (20%)</li>
                                <li>اصالت و منحصر به فرد بودن (10%)</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">نکات مهم:</h4>
                            <ul className="space-y-1 list-disc list-inside">
                                <li>امتیازدهی از 0 تا 10</li>
                                <li>ارائه توضیحات برای امتیازات پایین</li>
                                <li>رعایت انصاف و بی‌طرفی</li>
                                <li>توجه به فرهنگ و هنر ایرانی</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </FestivalLayout>
    );
}
