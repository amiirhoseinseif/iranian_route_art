import React, { useState } from 'react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { useTranslation } from '@/Utils/translation';
import { InstagramIcon } from '@/Components/SvgIcons';

export default function About() {
    const { trans } = useTranslation();
    const [activeTab, setActiveTab] = useState('first');

    return (
        <FestivalLayout title={trans('about_title')}>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-12 sm:py-16 lg:py-20 transition-all duration-300">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 font-['iransansX'] animate-fadeIn">
                        {trans('about_title')}
                    </h1>
                </div>
            </section>

            {/* Tabs Navigation */}
            <section className="bg-white border-b-2 border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setActiveTab('first')}
                            className={`px-6 py-4 text-lg font-bold font-['iransansX'] transition-all duration-300 relative ${
                                activeTab === 'first'
                                    ? 'text-primary-700 border-b-4 border-primary-700'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            دوره اول
                        </button>
                        <button
                            onClick={() => setActiveTab('second')}
                            className={`px-6 py-4 text-lg font-bold font-['iransansX'] transition-all duration-300 relative ${
                                activeTab === 'second'
                                    ? 'text-primary-700 border-b-4 border-primary-700'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            دوره دوم
                        </button>
                    </div>
                </div>
            </section>

            {/* First Edition Tab */}
            {activeTab === 'first' && (
                <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-primary-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto space-y-10">
                            {/* Title */}
                            <div className="text-center mb-12">
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary-800 mb-4 font-['iransansX']">
                                    جشنواره بین المللی «مسیر ایران»
                                </h2>
                                <p className="text-2xl sm:text-3xl text-primary-600 font-bold font-['iransansX'] mb-2">
                                    دوره اول ( مجازی)  ۱۴۰۱_۱۳۹۸
                                </p>
                                <p className="text-xl sm:text-2xl text-gray-700 font-['iransansX']">
                                    به افتخار سه کوهنورد ایرانی
                                </p>
                            </div>

                            {/* Why the Name Section */}
                            <div className="bg-white rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl border-2 border-primary-200">
                                <h3 className="text-2xl sm:text-3xl font-black text-primary-800 mb-8 font-['iransansX'] text-center border-b-4 border-primary-300 pb-4">
                                    چرا جشنواره «مسیر ایران» نام دارد؟
                                </h3>
                                <div className="space-y-6 text-lg sm:text-xl text-gray-800 leading-relaxed font-['iransansX'] text-justify">
                                    <p>
                                        رویداد هنری «مسیر ایران»، با همراهی و همدلی دانشجویان و اساتید دانشگاه های هنر ایران، بصورت مجازی و به یاد عشق و فداکاری آیدین بزرگی، پویا کیوان و مجتبی جراهی برگزار شد.
                                    </p>
                                    <p>
                                        سه کوهنورد جوان ایرانی که در تیر ماه سال ۱۳۹۲ موفق به گشایش مسیری جدید، به قله «برودپیک»، هیمالیا شدند. اما در راه بازگشت، مه غلیظی بمدت سه روز منطقه را فرا گرفت و نبود دید کافی باعث شد نتوانند مسیر بازگشت را پیدا کنند.
                                    </p>
                                    <p>
                                        آنها یک به یک از دست رفتند و هرگز حاظر نشدند یکدیگر را رها کنند.
                                    </p>
                                    <p>
                                        مسیر جدید بر فراز برودپیک به نام «مسیر ایرانی ها» در فضای کوهنوردی جهان شهره شد و هرگز نشانی از گشایندگان آن یافت نشد.
                                    </p>
                                    <p className="text-primary-700 font-bold text-xl sm:text-2xl mt-8 pt-6 border-t-2 border-primary-300 text-center">
                                        هدف جشنواره این بود که با تولید آثار هنری نامشان را زنده نگاه داریم.
                                    </p>
                                </div>
                            </div>

                            {/* Festival Experience */}
                            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl p-8 sm:p-10 lg:p-12 shadow-xl border-2 border-primary-300">
                                <div className="space-y-6 text-lg sm:text-xl text-gray-800 leading-relaxed font-['iransansX'] text-justify">
                                    <p>
                                        جشنواره «مسیر ایران» تجربه ای ارزشمند بود. جهت برگزاری جشنواره نیازی به پول نداشتیم و هیچ مبلغی از شخص و نهادی دریافت نکردیم، جشنواره با عشق و همکاری جمعی به سرانجام رسید.
                                    </p>
                                    <p>
                                        نوروز ۱۴۰۱، مراسم اختتامیه جشنواره به صورت مجازی برگزار شد.
                                    </p>
                                </div>
                                
                                <div className="mt-8 bg-white rounded-2xl p-6 border-2 border-primary-200">
                                    <p className="text-lg font-bold text-gray-800 mb-4 font-['iransansX']">
                                        صفحه اینستاگرام دوره اول جشنواره:
                                    </p>
                                    <a 
                                        href="https://www.instagram.com/iranian_route" 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 text-primary-700 hover:text-primary-800 font-bold text-xl sm:text-2xl transition-colors duration-200 group"
                                    >
                                        <InstagramIcon className="w-8 h-8 sm:w-10 sm:h-10 text-pink-600 group-hover:scale-110 transition-transform duration-200" />
                                        <span className="font-['iransansX'] border-b-2 border-primary-300 group-hover:border-primary-500 transition-colors duration-200">
                                            @Iranian_Route
                                        </span>
                                    </a>
                                </div>
                            </div>

                            {/* Where did the idea come from */}
                            <div className="bg-white rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl border-2 border-secondary-200">
                                <h3 className="text-2xl sm:text-3xl font-black text-secondary-800 mb-8 font-['iransansX'] text-center border-b-4 border-secondary-300 pb-4">
                                    ایدهٔ برگزاری مجدد جشنواره از کجا آمد؟
                                </h3>
                                <div className="space-y-6 text-lg sm:text-xl text-gray-800 leading-relaxed font-['iransansX'] text-justify">
                                    <p>
                                        ایران سرزمین هنر، صلح و مهربانیست، اما با یورش آمریکا و متحدانش به ایران، جنگ چهرهٔ زشت خود را نشان داد.
                                    </p>
                                    <p>
                                        در آن روزها، یک پرسش مشترک داشتیم:
                                    </p>
                                    <p className="text-2xl sm:text-3xl text-primary-700 font-black text-center py-6 border-y-4 border-primary-300 bg-primary-50 rounded-lg">
                                        «ایران عزیز، چه کاری می‌توانم برایت انجام دهم؟»
                                    </p>
                                    <p>
                                        دوست داشتیم برای ایران ساز بزنیم، نقش بزنیم و در فضایی برابر، کنار یکدیگر، آثارمان را به اشتراک بگذاریم.
                                    </p>
                                    <p>
                                        اکنون، با تکیه بر تجربهٔ گذشته و همراهی اساتید و دانشجویان هنر، بر آنیم تا بار دیگر جشنوارهٔ «مسیر ایران» را برپا کنیم…
                                    </p>
                                </div>
                            </div>

                            {/* Closing Statement */}
                            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl text-center">
                                <p className="text-xl sm:text-2xl lg:text-3xl font-bold leading-relaxed font-['iransansX']">
                                    پایان یک آغاز، پایانی که آغازی بلند پروانه تر را نوید میدهد. پایانی که خود شالوده آغاز است.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Second Edition Tab */}
            {activeTab === 'second' && (
                <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-secondary-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto space-y-10">
                            {/* Title - Bilingual */}
                            <div className="text-center mb-12 bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-secondary-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                    <div className="text-right md:order-2">
                                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-secondary-800 mb-4 font-['iransansX']">
                                            جشنوارهٔ بین‌المللی هنری مسیر ایران (مجازی)
                                        </h2>
                                    </div>
                                    <div className="text-left md:order-1 border-l-0 md:border-l-4 border-secondary-300 pl-0 md:pl-6">
                                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-secondary-700 font-['iransansX']">
                                            International Iranian Route Art Festival (Virtual)
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            {/* Festival Call - Bilingual */}
                            <div className="bg-white rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl border-2 border-secondary-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div className="text-right md:order-2">
                                        <p className="text-lg sm:text-xl lg:text-2xl text-gray-800 leading-relaxed font-['iransansX'] text-justify">
                                            مسیر ایران، هنرمندان جهان را فرامی‌خواند تا با الهام از موضوع ایران، دست بر ساز، قلم و ابزار هنر ببرند.
                                        </p>
                                    </div>
                                    <div className="text-left md:order-1 border-l-0 md:border-l-4 border-secondary-300 pl-0 md:pl-6">
                                        <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed font-['iransansX']">
                                            The Iranian Route calls upon global artists to embrace their creative implements, inspired by the theme of Iran.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Three Pillars - Bilingual */}
                            <div className="bg-gradient-to-r from-secondary-600 to-primary-600 rounded-3xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div className="text-right md:order-2">
                                        <p className="text-xl sm:text-2xl lg:text-3xl font-black mb-4 font-['iransansX'] text-center md:text-right">
                                            جشنواره بر سه محور استوار است: علم، هنر و دانشگاه.
                                        </p>
                                    </div>
                                    <div className="text-left md:order-1 border-l-0 md:border-l-4 border-white/30 pl-0 md:pl-6">
                                        <p className="text-lg sm:text-xl lg:text-2xl font-bold font-['iransansX'] text-center md:text-left">
                                            The festival stands on three fundamental pillars: Science, Art, and Academia.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Organizers - Bilingual */}
                            <div className="bg-white rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl border-2 border-secondary-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="text-right md:order-2 space-y-4">
                                        <p className="text-xl sm:text-2xl font-black text-gray-800 mb-4 font-['iransansX']">
                                            برگزارکنندگان:
                                        </p>
                                        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-['iransansX']">
                                            دانشجویان و اساتید دانشگاه‌ها و دانشکده‌های هنر ایران.
                                        </p>
                                    </div>
                                    <div className="text-left md:order-1 border-l-0 md:border-l-4 border-secondary-300 pl-0 md:pl-6 space-y-4">
                                        <p className="text-lg sm:text-xl font-bold text-gray-800 mb-4 font-['iransansX']">
                                            Organized by:
                                        </p>
                                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-['iransansX']">
                                            Students and professors from Iranian universities and art faculties.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </FestivalLayout>
    );
}
