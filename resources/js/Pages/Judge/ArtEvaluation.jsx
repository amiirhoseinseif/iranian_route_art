import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { route } from '@/Utils/route';

export default function ArtEvaluation({ art, existingEvaluation }) {
    const { data, setData, post, processing, errors } = useForm({
        score: existingEvaluation?.score || '',
        comments: existingEvaluation?.comments || '',
        criteria_scores: existingEvaluation?.criteria_scores || {
            artistic_connection: '',
            creativity: '',
            originality: '',
            technical_quality: '',
            innovation: '',
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Evaluation submitted:', data);
        
        if (existingEvaluation) {
            // Update existing evaluation
            post(route('judge.evaluation.update', existingEvaluation.id));
        } else {
            // Create new evaluation
            post(route('judge.evaluation.store', art.id));
        }
    };

    const getArtFieldCriteria = (artFieldId) => {
        const criteria = {
            1: { // موسیقی
                artistic_connection: 'ارتباط هنرمندانه اثر با موضوع ایران',
                creativity: 'خلاقیت در آهنگسازی و نوازندگی',
                originality: 'اصالت اثر و بیان شخصی',
                technical_quality: 'کیفیت فنی و تولید',
                innovation: 'نوآوری در تکنیک و روایت',
            },
            2: { // نقاشی
                artistic_connection: 'ارتباط هنرمندانه اثر با موضوع ایران',
                creativity: 'خلاقیت در طراحی و ترکیب‌بندی',
                originality: 'اصالت اثر و بیان شخصی',
                technical_quality: 'کیفیت فنی و اجرا',
                innovation: 'نوآوری در تکنیک و بیان',
            },
            3: { // فیلم‌سازی
                artistic_connection: 'ارتباط هنرمندانه اثر با موضوع ایران',
                creativity: 'خلاقیت در کارگردانی و فیلمنامه',
                originality: 'اصالت اثر و بیان شخصی',
                technical_quality: 'کیفیت تولید و جنبه‌های فنی',
                innovation: 'قدرت روایت و تأثیرگذاری',
            },
            4: { // مجسمه‌سازی
                artistic_connection: 'ارتباط هنرمندانه اثر با موضوع ایران',
                creativity: 'خلاقیت در فرم‌پردازی و ایده‌پردازی',
                originality: 'اصالت اثر و بیان شخصی',
                technical_quality: 'مهارت فنی و اجرایی',
                innovation: 'نوآوری در استفاده از مواد و تکنیک',
            },
            5: { // گرافیک
                artistic_connection: 'ارتباط هنرمندانه اثر با موضوع ایران',
                creativity: 'خلاقیت در ایده‌پردازی و بیان بصری',
                originality: 'اصالت اثر و بیان شخصی',
                technical_quality: 'ترکیب‌بندی و مهارت فنی',
                innovation: 'نوآوری در بازتاب هویت ایرانی',
            },
            6: { // خوشنویسی
                artistic_connection: 'ارتباط هنرمندانه اثر با موضوع ایران',
                creativity: 'مهارت فنی در اجرای خط',
                originality: 'خلاقیت در ترکیب‌بندی',
                technical_quality: 'اصالت اثر و بیان شخصی',
                innovation: 'ارتباط با موضوع ایران',
            },
            7: { // عکاسی
                artistic_connection: 'ارتباط هنرمندانه اثر با موضوع ایران',
                creativity: 'خلاقیت در ترکیب‌بندی و نورپردازی',
                originality: 'اصالت اثر و بیان شخصی',
                technical_quality: 'کیفیت فنی و تکنیک',
                innovation: 'نوآوری در دیدگاه و بیان',
            },
            8: { // معماری
                artistic_connection: 'ارتباط هنرمندانه اثر با موضوع ایران',
                creativity: 'خلاقیت در طراحی و ایده‌پردازی',
                originality: 'اصالت اثر و بیان شخصی',
                technical_quality: 'کیفیت فنی و اجرا',
                innovation: 'نوآوری در تلفیق سنت و مدرنیته',
            }
        };
        return criteria[artFieldId] || criteria[2]; // Default to painting criteria
    };

    const criteria = getArtFieldCriteria(art.art_field_id);

    return (
        <FestivalLayout title={`ارزیابی اثر: ${art.title} - جشنواره بین الملی مسیر ایران`}>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                                ارزیابی اثر هنری
                            </h1>
                            <p className="text-gray-600 font-['Vazirmatn']">
                                {art.title} - {art.artField?.name}
                            </p>
                        </div>
                        <Link
                            href={route('judge.dashboard')}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-['Vazirmatn']"
                        >
                            بازگشت به داشبورد
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* اطلاعات اثر */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                            اطلاعات اثر
                        </h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 font-['Vazirmatn']">
                                    عنوان اثر
                                </label>
                                <p className="text-gray-900 font-['Vazirmatn']">{art.title}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 font-['Vazirmatn']">
                                    نام کارگردان/هنرمند
                                </label>
                                <p className="text-gray-900 font-['Vazirmatn']">{art.director_name}</p>
                            </div>

                            {art.writer_name && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 font-['Vazirmatn']">
                                        نام نویسنده
                                    </label>
                                    <p className="text-gray-900 font-['Vazirmatn']">{art.writer_name}</p>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 font-['Vazirmatn']">
                                    رشته هنری
                                </label>
                                <p className="text-gray-900 font-['Vazirmatn']">{art.artField?.name}</p>
                            </div>

                            {art.technique && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 font-['Vazirmatn']">
                                        تکنیک/سبک
                                    </label>
                                    <p className="text-gray-900 font-['Vazirmatn']">{art.technique}</p>
                                </div>
                            )}

                            {art.duration && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 font-['Vazirmatn']">
                                        مدت زمان
                                    </label>
                                    <p className="text-gray-900 font-['Vazirmatn']">{art.duration} دقیقه</p>
                                </div>
                            )}

                            {art.dimensions && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 font-['Vazirmatn']">
                                        ابعاد
                                    </label>
                                    <p className="text-gray-900 font-['Vazirmatn']">{art.dimensions}</p>
                                </div>
                            )}

                            {art.materials && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 font-['Vazirmatn']">
                                        مواد به‌کاررفته
                                    </label>
                                    <p className="text-gray-900 font-['Vazirmatn']">{art.materials}</p>
                                </div>
                            )}

                            {art.software_used && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 font-['Vazirmatn']">
                                        نرم‌افزارهای مورد استفاده
                                    </label>
                                    <p className="text-gray-900 font-['Vazirmatn']">{art.software_used}</p>
                                </div>
                            )}

                            {art.subcategory && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 font-['Vazirmatn']">
                                        زیرشاخه
                                    </label>
                                    <p className="text-gray-900 font-['Vazirmatn']">{art.subcategory}</p>
                                </div>
                            )}

                            {art.year_created && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 font-['Vazirmatn']">
                                        سال ایجاد
                                    </label>
                                    <p className="text-gray-900 font-['Vazirmatn']">{art.year_created}</p>
                                </div>
                            )}

                            {art.location && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 font-['Vazirmatn']">
                                        مکان
                                    </label>
                                    <p className="text-gray-900 font-['Vazirmatn']">{art.location}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* فایل‌های اثر */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                            فایل‌های اثر
                        </h2>
                        
                        <div className="space-y-4">
                            {art.main_file && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                        فایل اصلی اثر
                                    </label>
                                    <div className="border border-gray-300 rounded-lg p-4">
                                        <a 
                                            href={`/storage/${art.main_file}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-primary-600 hover:text-primary-700 font-['Vazirmatn']"
                                        >
                                            مشاهده فایل اصلی
                                        </a>
                                    </div>
                                </div>
                            )}

                            {art.poster && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                        پوستر اثر
                                    </label>
                                    <div className="border border-gray-300 rounded-lg p-4">
                                        <img 
                                            src={`/storage/${art.poster}`} 
                                            alt="پوستر اثر" 
                                            className="max-w-full h-auto rounded-lg"
                                        />
                                    </div>
                                </div>
                            )}

                            {art.additional_files && art.additional_files.length > 0 && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                        فایل‌های اضافی
                                    </label>
                                    <div className="space-y-2">
                                        {art.additional_files.map((file, index) => (
                                            <div key={index} className="border border-gray-300 rounded-lg p-2">
                                                <a 
                                                    href={`/storage/${file}`} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-primary-600 hover:text-primary-700 font-['Vazirmatn']"
                                                >
                                                    فایل {index + 1}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {art.production_photos && art.production_photos.length > 0 && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                        عکس‌های پشت صحنه
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {art.production_photos.map((photo, index) => (
                                            <div key={index} className="border border-gray-300 rounded-lg p-2">
                                                <img 
                                                    src={`/storage/${photo}`} 
                                                    alt={`عکس پشت صحنه ${index + 1}`} 
                                                    className="w-full h-auto rounded"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* خلاصه داستان و سخن هنرمند */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {art.story_summary && (
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 font-['Vazirmatn']">
                                خلاصه داستان
                            </h2>
                            <p className="text-gray-700 leading-relaxed font-['Vazirmatn']">
                                {art.story_summary}
                            </p>
                        </div>
                    )}

                    {art.artist_statement && (
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 font-['Vazirmatn']">
                                سخن هنرمند
                            </h2>
                            <p className="text-gray-700 leading-relaxed font-['Vazirmatn']">
                                {art.artist_statement}
                            </p>
                        </div>
                    )}
                </div>

                {/* رزومه هنرمند */}
                {art.resume && (
                    <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 font-['Vazirmatn']">
                            رزومه هنرمند
                        </h2>
                        <p className="text-gray-700 leading-relaxed font-['Vazirmatn']">
                            {art.resume}
                        </p>
                    </div>
                )}

                {/* فرم ارزیابی */}
                <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                        ارزیابی اثر
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* امتیاز کلی */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                امتیاز کلی (0-10) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="10"
                                step="0.1"
                                value={data.score}
                                onChange={e => setData('score', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                required
                            />
                            {errors.score && <p className="text-red-500 text-sm mt-1">{errors.score}</p>}
                        </div>

                        {/* امتیازات جزئی */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 font-['Vazirmatn']">
                                امتیازات جزئی معیارها
                            </h3>
                            <div className="space-y-4">
                                {Object.entries(criteria).map(([key, label]) => (
                                    <div key={key}>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                            {label} (0-10)
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="10"
                                            step="0.1"
                                            value={data.criteria_scores[key] || ''}
                                            onChange={e => setData('criteria_scores', {
                                                ...data.criteria_scores,
                                                [key]: e.target.value
                                            })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* نظرات */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                نظرات و توضیحات
                            </label>
                            <textarea
                                value={data.comments}
                                onChange={e => setData('comments', e.target.value)}
                                rows={6}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                placeholder="نظرات خود را در مورد این اثر بنویسید..."
                            />
                            {errors.comments && <p className="text-red-500 text-sm mt-1">{errors.comments}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-end space-x-4 space-x-reverse">
                            <Link
                                href={route('judge.dashboard')}
                                className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-['Vazirmatn']"
                            >
                                انصراف
                            </Link>
                            <PrimaryButton disabled={processing}>
                                {processing ? 'در حال ارسال...' : (existingEvaluation ? 'به‌روزرسانی ارزیابی' : 'ارسال ارزیابی')}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </FestivalLayout>
    );
}
