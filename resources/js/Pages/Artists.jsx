import React from 'react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { useTranslation } from '@/Utils/translation';
import { TrophyIcon, UsersIcon, StarIcon, GlobalIcon, CalendarIcon, LocationIcon, MusicIcon } from '@/Components/SvgIcons';

export default function FestivalHistory() {
    const { trans } = useTranslation();

    const pageTitle = 'تاریخچه جشنواره مسیر ایران | Iranian Route Festival History';

    const firstEdition = {
        titleFa: 'دورۀ نخست جشنواره مسیر ایران – نوروز ۱۴۰۴',
        titleEn: 'Iranian Route Festival — First Edition, Nowruz 2025',
        descriptionFa:
            'دورۀ نخست جشنواره بین‌المللی مسیر ایران قرار است در نوروز ۱۴۰۴ با محوریت «ایران، فرهنگ و هنر ایرانی» برگزار شود. این رویداد با همراهی دانشگاه‌های هنر کشور طراحی شده تا فضایی برای نمایش آثار تازه، آشنایی هنرمندان با یکدیگر و شکل‌گیری گفت‌وگوی بین‌رشته‌ای فراهم کند. برنامه‌های آموزشی، نشست‌های تخصصی و نمایش آثار منتخب در حال برنامه‌ریزی است تا جشنواره به شبکه‌ای پویا برای معرفی استعدادهای نو بدل شود.',
        descriptionEn:
            'The inaugural Iranian Route Festival is scheduled for Nowruz 2025, centered on the theme “Iran, Culture, and Artistic Identity.” Planned in partnership with Iran’s leading art universities, the edition will offer a vibrant arena for debut works, peer exchange, and interdisciplinary dialogue. Curated exhibitions, expert-led talks, and hands-on labs are being prepared to launch the festival as a dynamic platform for emerging voices.',
    };

    const stats = [
        {
            icon: UsersIcon,
            valueFa: '۶۰۰+ هنرمند (برآورد)',
            valueEn: '600+ Artists (Projected)',
            descFa: 'دعوت از هنرمندان ۲۵ استان و ۱۲ کشور همکار',
            descEn: 'inviting artists from 25 provinces and 12 partner countries',
        },
        {
            icon: TrophyIcon,
            valueFa: '۱۸۰ اثر منتخب (در دست انتخاب)',
            valueEn: '180 Featured Works (In Selection)',
            descFa: 'نمایش برنامه‌ریزی شده در هشت رشته تخصصی جشنواره',
            descEn: 'planned showcases across eight core festival disciplines',
        },
        {
            icon: StarIcon,
            valueFa: '۴۰ استاد و داور (در حال دعوت)',
            valueEn: '40 Mentors & Jurors (Invited)',
            descFa: 'حضور پیشنهادی اعضای هیئت علمی دانشگاه‌های هنر ایران',
            descEn: 'invited faculty members from national schools of art',
        },
        {
            icon: GlobalIcon,
            valueFa: '۳۰+ برنامه جانبی (در حال برنامه‌ریزی)',
            valueEn: '30+ Satellite Events (Planned)',
            descFa: 'نشست‌ها، ورکشاپ‌ها و اجراهای آزاد در دست تدارک',
            descEn: 'talks, workshops, and open performances in preparation',
        },
    ];

    const milestones = [
        {
            periodFa: 'پاییز ۱۴۰۳',
            periodEn: 'Autumn 2024',
            titleFa: 'فراخوان و ثبت‌نام هنرمندان',
            titleEn: 'Call for Entries & Registration',
            descriptionFa: 'دعوتنامه جشنواره در دانشگاه‌ها و خانه‌های فرهنگ منتشر می‌شود و سامانه ثبت آثار فعال خواهد شد.',
            descriptionEn: 'Festival invitations will circulate through universities and cultural centers as the submission portal opens.',
        },
        {
            periodFa: 'زمستان ۱۴۰۳',
            periodEn: 'Winter 2025',
            titleFa: 'بازبینی و کارگاه‌های تخصصی',
            titleEn: 'Review Sessions & Masterclasses',
            descriptionFa: 'هیئت داوران مشغول ارزیابی اولیه خواهند بود و کارگاه‌های آموزشی برای هنرمندان برگزار می‌شود.',
            descriptionEn: 'Jury panels will conduct preliminary reviews while faculty host discipline-specific masterclasses.',
        },
        {
            periodFa: 'نوروز ۱۴۰۴',
            periodEn: 'Nowruz 2025',
            titleFa: 'آیین افتتاحیه و نمایش آثار',
            titleEn: 'Opening Ceremony & Exhibitions',
            descriptionFa: 'نمایشگاه اصلی در تهران برپا خواهد شد و برنامه‌های استانی برای ارتباط با مخاطبان جدید اجرا می‌شوند.',
            descriptionEn: 'The main exhibition will open in Tehran with regional satellite programs introducing the festival to new audiences.',
        },
        {
            periodFa: 'بهار ۱۴۰۴',
            periodEn: 'Spring 2025',
            titleFa: 'اعلام برگزیدگان و برنامه آینده',
            titleEn: 'Awards & Next Steps',
            descriptionFa: 'برگزیدگان معرفی خواهند شد و دبیرخانه برنامه‌های توسعه و دوره دوم را اعلام می‌کند.',
            descriptionEn: 'Award recipients will be announced and the secretariat will outline development plans for the second edition.',
        },
    ];

    const highlightMoments = [
        {
            titleFa: 'آیین افتتاحیه در تالار وحدت',
            titleEn: 'Opening Night at Vahdat Hall',
            descriptionFa: 'برنامه‌ریزی برای اجرای ویژه موسیقی با محوریت سازهای ایرانی معاصر و معرفی هنرمندان نوگرا.',
            descriptionEn: 'A special music program is planned, blending contemporary Iranian instruments while introducing emerging artists.',
        },
        {
            titleFa: 'پروژه «مسیر صدا»',
            titleEn: '“Route of Sound” Project',
            descriptionFa: 'پیشنهاد گروه‌های موسیقی سنتی و الکترونیک برای تجربه‌ای تازه از صدا و هویت ایرانی در حال نهایی شدن است.',
            descriptionEn: 'Traditional and electronic ensembles are preparing a collaborative exploration of Iranian sound.',
        },
        {
            titleFa: 'گالری «نور و روایت»',
            titleEn: '“Light & Narrative” Gallery',
            descriptionFa: 'منتخبی از عکاسی، تصویرسازی و هنر دیجیتال درباره روایت‌های معاصر ایران در حال گردآوری است.',
            descriptionEn: 'Curators are assembling photography, illustration, and digital art that portray contemporary Iranian narratives.',
        },
    ];

    const venueInfo = [
        {
            icon: LocationIcon,
            fa: 'محل برگزاری: تهران، دانشگاه هنر و تالار وحدت',
            en: 'Venues: University of Art campus & Vahdat Hall, Tehran',
        },
        {
            icon: CalendarIcon,
            fa: 'تاریخ برگزاری: ۱ تا ۱۲ فروردین ۱۴۰۴',
            en: 'Dates: 21 March – 1 April 2025',
        },
        {
            icon: MusicIcon,
            fa: 'تمرکز هنری: موسیقی، هنرهای تجسمی، معماری و رسانه‌های نو',
            en: 'Focus: Music, visual arts, architecture, and new media',
        },
    ];

    return (
        <FestivalLayout title={pageTitle}>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-secondary-700 text-white py-16 lg:py-24">
                <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle at top, rgba(255,255,255,0.35), transparent 55%)' }}></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <div className="space-y-6">
                            <span className="inline-flex items-center px-6 py-2 bg-white/15 backdrop-blur-md rounded-full text-sm font-semibold">
                                {trans('festival_history')}
                            </span>
                            <div className="bg-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl backdrop-blur-md border border-white/20">
                                <h1 className="text-3xl lg:text-4xl font-black font-['Vazirmatn'] leading-tight mb-4">
                                    {firstEdition.titleFa}
                                </h1>
                                <p className="text-sm lg:text-base text-white/90 leading-relaxed font-['Vazirmatn']">
                                    {firstEdition.descriptionFa}
                                </p>
                            </div>
                        </div>
                        <div className="bg-white text-primary-800 rounded-3xl p-6 lg:p-8 shadow-2xl border border-white/60">
                            <h2 className="text-2xl lg:text-3xl font-black mb-4 font-['Vazirmatn']">
                                {firstEdition.titleEn}
                            </h2>
                            <p className="text-base lg:text-lg leading-relaxed text-gray-700">
                                {firstEdition.descriptionEn}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Edition Statistics */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {stats.map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                                <div key={index} className="group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 p-8 transition-all duration-500 hover:-translate-y-3">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary-100/0 via-primary-100/20 to-secondary-100/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="relative z-10 flex flex-col gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-lg">
                                            <IconComponent className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <p className="text-xl font-black text-gray-900 font-['Vazirmatn']">
                                                {item.valueFa}
                                            </p>
                                            <p className="text-sm text-gray-500 font-['Vazirmatn']">
                                                {item.descFa}
                                            </p>
                                        </div>
                                        <div className="border-t border-gray-200 pt-4">
                                            <p className="text-sm font-semibold text-primary-700">
                                                {item.valueEn}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {item.descEn}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Milestones Timeline */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-black text-gray-900 font-['Vazirmatn'] mb-3">
                            مسیر برگزاری / Festival Timeline
                        </h2>
                        <p className="text-base lg:text-lg text-gray-600 font-['Vazirmatn']">
                            مروری دو زبانه بر رویدادهای کلیدی دورۀ نخست جشنواره
                        </p>
                    </div>
                    <div className="relative">
                        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-secondary-200 to-primary-200 transform -translate-y-1/2"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10 relative z-10">
                            {milestones.map((milestone, index) => (
                                <div key={index} className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 lg:p-7 flex flex-col gap-4 transition-all duration-500 hover:-translate-y-3">
                                    <div className="font-bold text-primary-600 font-['Vazirmatn'] text-sm lg:text-base">
                                        {milestone.periodFa}
                                    </div>
                                    <div className="text-xs text-gray-500 uppercase tracking-[0.2em]">
                                        {milestone.periodEn}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-gray-900 font-['Vazirmatn'] mb-2">
                                            {milestone.titleFa}
                                        </h3>
                                        <p className="text-sm text-gray-600 font-['Vazirmatn'] leading-relaxed">
                                            {milestone.descriptionFa}
                                        </p>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3">
                                        <h4 className="text-sm font-semibold text-primary-700">
                                            {milestone.titleEn}
                                        </h4>
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            {milestone.descriptionEn}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlight Moments */}
            <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-black font-['Vazirmatn'] mb-3">
                            لحظات ماندگار / Signature Moments
                        </h2>
                        <p className="text-base lg:text-lg text-white/80 font-['Vazirmatn']">
                            روایت کوتاهی از صحنه‌های محبوب دورۀ نخست در دو زبان
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {highlightMoments.map((moment, index) => (
                            <div key={index} className="relative bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-7 shadow-lg backdrop-blur-md transition-all duration-500 hover:-translate-y-4">
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-white/0 opacity-0 hover:opacity-100 transition-opacity"></div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-black font-['Vazirmatn'] mb-3">
                                        {moment.titleFa}
                                    </h3>
                                    <p className="text-sm text-white/85 font-['Vazirmatn'] leading-relaxed mb-4">
                                        {moment.descriptionFa}
                                    </p>
                                    <div className="border-t border-white/10 pt-3">
                                        <h4 className="text-sm font-semibold text-secondary-200 uppercase tracking-[0.18em]">
                                            {moment.titleEn}
                                        </h4>
                                        <p className="text-xs text-white/70 leading-relaxed">
                                            {moment.descriptionEn}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Venue & Focus Info */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 lg:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                            {venueInfo.map((info, index) => {
                                const IconComponent = info.icon;
                                return (
                                    <div key={index} className="flex flex-col gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-lg">
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <p className="text-base font-['Vazirmatn'] text-gray-800 leading-relaxed">
                                            {info.fa}
                                        </p>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            {info.en}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </FestivalLayout>
    );
}
