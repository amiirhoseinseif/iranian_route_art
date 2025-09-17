import React from 'react';
import { Link } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { 
    CreativityIcon, 
    TrophyIcon, 
    GlobalIcon,
    MusicIcon,
    PaintingIcon,
    FilmIcon,
    SculptureIcon,
    GraphicIcon,
    CalligraphyIcon,
    PhotographyIcon,
    ArchitectureIcon,
    AddIcon,
    ProfileIcon,
    ListIcon
} from '@/Components/SvgIcons';

export default function Home() {
    return (
        <FestivalLayout title="صفحه اصلی - جشنواره هنری مسیر ایران">
            {/* Hero Section */}
            <section className="text-center py-20 bg-gradient-to-r from-amber-100 via-orange-100 to-red-100 rounded-3xl mb-16">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 font-['Vazirmatn'] leading-tight">
                        جشنواره هنری
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-red-600">
                            مسیر ایران
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed font-['Vazirmatn']">
                        جشنواره‌ای برای معرفی و نمایش آثار هنری هنرمندان ایرانی در مسیر هنر و فرهنگ
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            href="/register" 
                            className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg font-['Vazirmatn']"
                        >
                            ثبت نام در جشنواره
                        </Link>
                        <Link 
                            href="/about" 
                            className="border-2 border-amber-600 text-amber-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-600 hover:text-white transition-all font-['Vazirmatn']"
                        >
                            درباره جشنواره
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 font-['Vazirmatn']">
                    چرا جشنواره هنری مسیر ایران؟
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CreativityIcon className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 font-['Vazirmatn']">تنوع رشته‌های هنری</h3>
                        <p className="text-gray-600 leading-relaxed font-['Vazirmatn']">
                            از موسیقی و نقاشی گرفته تا فیلم‌سازی و معماری، همه رشته‌های هنری را پوشش می‌دهیم
                        </p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <TrophyIcon className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 font-['Vazirmatn']">داوری تخصصی</h3>
                        <p className="text-gray-600 leading-relaxed font-['Vazirmatn']">
                            آثار توسط هیئت داوران متخصص و با تجربه در هر رشته هنری ارزیابی می‌شود
                        </p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <GlobalIcon className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 font-['Vazirmatn']">شناسایی جهانی</h3>
                        <p className="text-gray-600 leading-relaxed font-['Vazirmatn']">
                            فرصتی برای معرفی هنرمندان ایرانی به جامعه جهانی و ایجاد ارتباطات بین‌المللی
                        </p>
                    </div>
                </div>
            </section>

            {/* Art Fields Section */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 font-['Vazirmatn']">
                    رشته‌های هنری جشنواره
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: MusicIcon, name: 'موسیقی', desc: 'آهنگسازی، نوازندگی، خوانندگی' },
                        { icon: PaintingIcon, name: 'نقاشی', desc: 'نقاشی با تکنیک‌های مختلف' },
                        { icon: FilmIcon, name: 'فیلم‌سازی', desc: 'کارگردانی و تولید فیلم' },
                        { icon: SculptureIcon, name: 'مجسمه‌سازی', desc: 'مجسمه با مواد مختلف' },
                        { icon: GraphicIcon, name: 'گرافیک', desc: 'طراحی گرافیک و دیجیتال' },
                        { icon: CalligraphyIcon, name: 'خوشنویسی', desc: 'خوشنویسی فارسی و عربی' },
                        { icon: PhotographyIcon, name: 'عکاسی', desc: 'عکاسی هنری و مستند' },
                        { icon: ArchitectureIcon, name: 'معماری', desc: 'طراحی معماری و نقشه‌کشی' },
                    ].map((field, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                            <div className="text-4xl mb-4 flex justify-center">
                                <field.icon className="w-12 h-12 text-amber-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2 font-['Vazirmatn']">{field.name}</h3>
                            <p className="text-gray-600 text-sm font-['Vazirmatn']">{field.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How to Participate Section */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 font-['Vazirmatn']">
                    چگونه در جشنواره شرکت کنیم؟
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { step: '1', title: 'ثبت نام', desc: 'حساب کاربری خود را ایجاد کنید' },
                        { step: '2', title: 'انتخاب رشته', desc: 'رشته هنری مورد نظرتان را انتخاب کنید' },
                        { step: '3', title: 'آپلود اثر', desc: 'اثر هنری خود را آپلود کنید' },
                        { step: '4', title: 'داوری', desc: 'اثر شما توسط هیئت داوران ارزیابی می‌شود' },
                    ].map((item, index) => (
                        <div key={index} className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-white">{item.step}</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2 font-['Vazirmatn']">{item.title}</h3>
                            <p className="text-gray-600 text-sm font-['Vazirmatn']">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Statistics Section */}
            <section className="mb-16 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white rounded-3xl p-12">
                <h2 className="text-3xl font-bold text-center mb-12 font-['Vazirmatn']">
                    آمار جشنواره
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                    {[
                        { number: '500+', label: 'هنرمند ثبت نام شده' },
                        { number: '1000+', label: 'اثر هنری ارسال شده' },
                        { number: '50+', label: 'داور متخصص' },
                        { number: '8', label: 'رشته هنری' },
                    ].map((stat, index) => (
                        <div key={index}>
                            <div className="text-4xl font-bold mb-2">{stat.number}</div>
                            <div className="text-amber-100 font-['Vazirmatn']">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="text-center py-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                    آماده شرکت در جشنواره هستید؟
                </h2>
                <p className="text-xl text-gray-600 mb-8 font-['Vazirmatn']">
                    همین حالا ثبت نام کنید و اثر هنری خود را به نمایش بگذارید
                </p>
                <Link 
                    href="/register" 
                    className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-10 py-4 rounded-xl font-bold text-xl hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg font-['Vazirmatn']"
                >
                    شروع کنید
                </Link>
            </section>
        </FestivalLayout>
    );
}
