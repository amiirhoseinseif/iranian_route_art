import React from 'react';
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
    ArchitectureIcon
} from '@/Components/SvgIcons';

export default function About() {
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
        <FestivalLayout title="درباره جشنواره">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6 font-['Vazirmatn']">
                        درباره جشنواره هنری مسیر ایران
                    </h1>
                    <p className="text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed font-['Vazirmatn']">
                        جشنواره هنری مسیر ایران با هدف شناسایی، حمایت و معرفی استعدادهای هنری ایران زمین 
                        و ایجاد پلی میان هنرمندان و مخاطبان هنر راه‌اندازی شده است.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mb-6">
                                <CreativityIcon className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 font-['Vazirmatn']">
                                ماموریت ما
                            </h2>
                            <p className="text-gray-600 leading-relaxed font-['Vazirmatn']">
                                ما متعهد به ایجاد فضایی هستیم که در آن هنرمندان بتوانند آثار خود را به نمایش بگذارند، 
                                از بازخوردهای تخصصی بهره‌مند شوند و در مسیر رشد و تعالی هنری خود گام بردارند. 
                                هدف ما حمایت از خلاقیت و نوآوری در عرصه هنر است.
                            </p>
                        </div>
                        
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-6">
                                <GlobalIcon className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 font-['Vazirmatn']">
                                چشم‌انداز ما
                            </h2>
                            <p className="text-gray-600 leading-relaxed font-['Vazirmatn']">
                                ما در نظر داریم تا جشنواره هنری مسیر ایران را به یکی از معتبرترین و 
                                شناخته‌شده‌ترین رویدادهای هنری در سطح منطقه تبدیل کنیم و پلی میان 
                                هنرمندان ایرانی و جامعه جهانی هنر ایجاد نماییم.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Art Fields */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 font-['Vazirmatn']">
                        رشته‌های هنری پوشش داده شده
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                        {[
                            { icon: MusicIcon, name: 'موسیقی' },
                            { icon: PaintingIcon, name: 'نقاشی' },
                            { icon: FilmIcon, name: 'فیلم‌سازی' },
                            { icon: SculptureIcon, name: 'مجسمه‌سازی' },
                            { icon: GraphicIcon, name: 'گرافیک' },
                            { icon: CalligraphyIcon, name: 'خوشنویسی' },
                            { icon: PhotographyIcon, name: 'عکاسی' },
                            { icon: ArchitectureIcon, name: 'معماری' },
                        ].map((field, index) => (
                            <div key={index} className="text-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                <field.icon className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                                <p className="text-sm font-medium text-gray-800 font-['Vazirmatn']">
                                    {field.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 font-['Vazirmatn']">
                        تاریخچه جشنواره
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-8">
                            {achievements.map((achievement, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold">{achievement.year}</span>
                                    </div>
                                    <div className="mr-6 bg-white p-6 rounded-xl shadow-lg flex-1">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                                            {achievement.title}
                                        </h3>
                                        <p className="text-gray-600 font-['Vazirmatn']">
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
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 font-['Vazirmatn']">
                        تیم جشنواره
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg text-center">
                                <div className="w-24 h-24 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl text-white font-bold">
                                        {member.name.split(' ')[0].charAt(0)}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                                    {member.name}
                                </h3>
                                <p className="text-amber-600 font-medium mb-3 font-['Vazirmatn']">
                                    {member.role}
                                </p>
                                <p className="text-gray-600 text-sm leading-relaxed font-['Vazirmatn']">
                                    {member.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 font-['Vazirmatn']">
                        ارزش‌های ما
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <TrophyIcon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 font-['Vazirmatn']">کیفیت</h3>
                            <p className="text-amber-100 font-['Vazirmatn']">
                                ما به کیفیت آثار هنری و فرآیند داوری اهمیت ویژه‌ای می‌دهیم
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CreativityIcon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 font-['Vazirmatn']">خلاقیت</h3>
                            <p className="text-amber-100 font-['Vazirmatn']">
                                تشویق و حمایت از ایده‌های نو و خلاقانه در عرصه هنر
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <GlobalIcon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 font-['Vazirmatn']">تنوع</h3>
                            <p className="text-amber-100 font-['Vazirmatn']">
                                احترام به تنوع فرهنگی و هنری و ایجاد فضای برابر برای همه
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </FestivalLayout>
    );
}
