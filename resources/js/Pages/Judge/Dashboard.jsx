import React from 'react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { 
    CheckIcon,
    ClockIcon,
    CloseIcon,
    AddIcon,
    ProfileIcon,
    ListIcon,
    TrophyIcon,
    GlobalIcon,
    MusicIcon,
    PaintingIcon,
    FilmIcon
} from '@/Components/SvgIcons';

export default function JudgeDashboard({ judge, statistics, assigned_art_fields, pending_evaluations, recent_evaluations }) {
    const isVerified = judge?.verification_status === 'approved';

    if (!isVerified) {
        return (
            <FestivalLayout title="پنل داور - جشنواره هنری مسیر ایران">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ClockIcon className="w-8 h-8 text-yellow-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 font-['Vazirmatn']">
                            عضویت شما تایید نشده است
                        </h2>
                        <p className="text-gray-600 mb-6 font-['Vazirmatn']">
                            لطفاً با مدیر سایت تماس بگیرید تا عضویت شما تایید شود.
                        </p>
                        {judge?.rejection_reason && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                <p className="text-red-800 font-['Vazirmatn']">
                                    <strong>دلیل رد شدن:</strong> {judge.rejection_reason}
                                </p>
                            </div>
                        )}
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-['Vazirmatn']">
                            تماس با مدیر
                        </button>
                    </div>
                </div>
            </FestivalLayout>
        );
    }

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
                                <ListIcon className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">کل آثار تخصیص داده شده</p>
                                <p className="text-2xl font-bold text-gray-800">{statistics.total_assignments}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <ClockIcon className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">در انتظار ارزیابی</p>
                                <p className="text-2xl font-bold text-gray-800">{statistics.pending_evaluations}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <CheckIcon className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">ارزیابی شده</p>
                                <p className="text-2xl font-bold text-gray-800">{statistics.completed_evaluations}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <TrophyIcon className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">میانگین امتیاز</p>
                                <p className="text-2xl font-bold text-gray-800">{statistics.average_score}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Assigned Art Fields */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">رشته‌های هنری تخصیص داده شده</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {assigned_art_fields.length === 0 ? (
                            <div className="col-span-full text-center py-8">
                                <p className="text-gray-500 font-['Vazirmatn']">
                                    هیچ رشته هنری تخصیص داده نشده است
                                </p>
                            </div>
                        ) : (
                            assigned_art_fields.map((field, index) => {
                                const getIcon = (fieldName) => {
                                    if (fieldName.includes('موسیقی')) return MusicIcon;
                                    if (fieldName.includes('نقاشی')) return PaintingIcon;
                                    if (fieldName.includes('فیلم')) return FilmIcon;
                                    return TrophyIcon;
                                };
                                
                                const IconComponent = getIcon(field.name);
                                
                                return (
                                    <div key={index} className="p-4 border border-gray-200 rounded-xl">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 bg-blue-100 text-blue-600">
                                                    <IconComponent className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-800 font-['Vazirmatn']">{field.name}</h4>
                                                    <p className="text-sm text-gray-600 font-['Vazirmatn']">
                                                        {field.count} اثر ({field.pending} در انتظار)
                                                    </p>
                                                </div>
                                            </div>
                                            <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors font-['Vazirmatn']">
                                                مشاهده
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Pending Evaluations */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">آثار در انتظار ارزیابی</h3>
                    <div className="space-y-4">
                        {pending_evaluations.length === 0 ? (
                            <p className="text-gray-500 text-center py-8 font-['Vazirmatn']">
                                هیچ اثری در انتظار ارزیابی وجود ندارد
                            </p>
                        ) : (
                            pending_evaluations.map((art, index) => (
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
                                        <span className="text-sm text-gray-500 font-['Vazirmatn']">
                                            {new Date(art.submitted_at).toLocaleDateString('fa-IR')}
                                        </span>
                                        <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors font-['Vazirmatn']">
                                            ارزیابی
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Recent Evaluations */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">ارزیابی‌های اخیر</h3>
                    <div className="space-y-4">
                        {recent_evaluations.length === 0 ? (
                            <p className="text-gray-500 text-center py-8 font-['Vazirmatn']">
                                هیچ ارزیابی انجام نشده است
                            </p>
                        ) : (
                            recent_evaluations.map((evaluation, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-gray-800 font-['Vazirmatn']">{evaluation.art_title}</h4>
                                        <p className="text-sm text-gray-600 font-['Vazirmatn']">هنرمند: {evaluation.artist}</p>
                                    </div>
                                    <div className="flex items-center space-x-4 space-x-reverse">
                                        <div className="text-center">
                                            <p className="text-sm text-gray-600 font-['Vazirmatn']">امتیاز</p>
                                            <p className="text-xl font-bold text-amber-600">{evaluation.score}</p>
                                        </div>
                                        <span className="text-sm text-gray-500 font-['Vazirmatn']">
                                            {new Date(evaluation.evaluated_at).toLocaleDateString('fa-IR')}
                                        </span>
                                        <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-colors font-['Vazirmatn']">
                                            مشاهده
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
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
