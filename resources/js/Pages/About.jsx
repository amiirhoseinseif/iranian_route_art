import React from 'react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { useTranslation } from '@/Utils/translation';
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
    ArchitectureIcon
} from '@/Components/SvgIcons';

export default function About() {
    const { trans } = useTranslation();
    
    const teamMembers = [
        {
            name: 'دکتر احمد محمدی',
            role: 'مدیر هنری جشنواره',
            description: 'استاد دانشگاه هنر و متخصص در زمینه نقاشی و هنرهای تجسمی',
            image: '/images/team/ahmad.jpg'
        },
        {
            name: 'خانم فاطمه احمدی',
            role: 'مدیر اجرایی',
            description: 'کارشناس ارشد مدیریت فرهنگی و متخصص در برگزاری رویدادهای هنری',
            image: '/images/team/fateme.jpg'
        },
        {
            name: 'استاد علی رضایی',
            role: 'مشاور هنری',
            description: 'آهنگساز و نوازنده برجسته و عضو هیئت علمی دانشگاه',
            image: '/images/team/ali.jpg'
        }
    ];

    const achievements = [
        { year: '2020', title: 'تاسیس جشنواره', desc: 'شروع فعالیت با 50 هنرمند' },
        { year: '2021', title: 'رشد قابل توجه', desc: 'شرکت 200 هنرمند و 300 اثر' },
        { year: '2022', title: 'شناسایی ملی', desc: 'پوشش رسانه‌ای و استقبال عمومی' },
        { year: '2023', title: 'توسعه بین‌المللی', desc: 'شرکت هنرمندان از کشورهای همسایه' },
        { year: '2024', title: 'پلتفرم دیجیتال', desc: 'راه‌اندازی سایت و سیستم آنلاین' }
    ];

    return (
        <FestivalLayout title={trans('about_title')}>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-12 sm:py-16 lg:py-20 transition-all duration-300">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 font-['Vazirmatn'] animate-fadeIn">
                        {trans('about_title')}
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-secondary-100 max-w-3xl mx-auto leading-relaxed font-['Vazirmatn']">
                        {trans('about_description')}
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-12 sm:py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slideDown">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-4 sm:mb-6 animate-bounceIn">
                                <CreativityIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 font-['Vazirmatn']">
                                {trans('our_mission')}
                            </h2>
                            <p className="text-gray-600 leading-relaxed font-['Vazirmatn'] text-sm sm:text-base">
                                {trans('mission_text')}
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slideDown">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-full flex items-center justify-center mb-4 sm:mb-6 animate-bounceIn">
                                <GlobalIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 font-['Vazirmatn']">
                                {trans('our_vision')}
                            </h2>
                            <p className="text-gray-600 leading-relaxed font-['Vazirmatn'] text-sm sm:text-base">
                                {trans('vision_text')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Art Fields */}
            <section className="py-12 sm:py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12 font-['Vazirmatn']">
                        {trans('covered_art_fields')}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6">
                        {[
                            { icon: MusicIcon, name: trans('music') },
                            { icon: PaintingIcon, name: trans('painting') },
                            { icon: FilmIcon, name: trans('filmmaking') },
                            { icon: SculptureIcon, name: trans('sculpture') },
                            { icon: GraphicIcon, name: trans('graphic') },
                            { icon: CalligraphyIcon, name: trans('calligraphy') },
                            { icon: PhotographyIcon, name: trans('photography') },
                            { icon: ArchitectureIcon, name: trans('architecture') },
                        ].map((field, index) => (
                            <div key={index} className="text-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 animate-fadeIn cursor-pointer">
                                <field.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary-600 mx-auto mb-3 transition-transform duration-300 hover:scale-125" />
                                <p className="text-xs sm:text-sm font-medium text-gray-800 font-['Vazirmatn']">
                                    {field.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-12 sm:py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12 font-['Vazirmatn']">
                        {trans('festival_history')}
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-6 sm:space-y-8">
                            {achievements.map((achievement, index) => (
                                <div key={index} className="flex items-center animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 cursor-pointer">
                                        <span className="text-white font-bold text-sm sm:text-base">{achievement.year}</span>
                                    </div>
                                    <div className="mr-4 sm:mr-6 bg-white p-4 sm:p-6 rounded-xl shadow-lg flex-1 transition-all duration-300 hover:shadow-xl">
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                                            {achievement.title}
                                        </h3>
                                        <p className="text-gray-600 font-['Vazirmatn'] text-sm sm:text-base">
                                            {achievement.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-12 sm:py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12 font-['Vazirmatn']">
                        {trans('festival_team')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-fadeIn" style={{ animationDelay: `${index * 0.15}s` }}>
                                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110 cursor-pointer">
                                    <span className="text-2xl text-white font-bold">
                                        {member.name.split(' ')[0].charAt(0)}
                                    </span>
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                                    {member.name}
                                </h3>
                                <p className="text-primary-600 font-medium mb-3 font-['Vazirmatn'] text-sm sm:text-base">
                                    {member.role}
                                </p>
                                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-['Vazirmatn']">
                                    {member.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-12 sm:py-16 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 font-['Vazirmatn']">
                        {trans('our_values')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        <div className="text-center animate-fadeIn">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-125 cursor-pointer">
                                <TrophyIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mb-3 font-['Vazirmatn']">{trans('quality')}</h3>
                            <p className="text-secondary-100 font-['Vazirmatn'] text-sm sm:text-base">
                                {trans('quality_desc')}
                            </p>
                        </div>
                        <div className="text-center animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-125 cursor-pointer">
                                <CreativityIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mb-3 font-['Vazirmatn']">{trans('creativity')}</h3>
                            <p className="text-secondary-100 font-['Vazirmatn'] text-sm sm:text-base">
                                {trans('creativity_desc')}
                            </p>
                        </div>
                        <div className="text-center animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-125 cursor-pointer">
                                <GlobalIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mb-3 font-['Vazirmatn']">{trans('diversity')}</h3>
                            <p className="text-secondary-100 font-['Vazirmatn'] text-sm sm:text-base">
                                {trans('diversity_desc')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </FestivalLayout>
    );
}
