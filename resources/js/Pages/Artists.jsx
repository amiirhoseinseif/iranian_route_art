import React, { useState } from 'react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { ProfileIcon, MusicIcon, PaintingIcon, FilmIcon, SculptureIcon, GraphicIcon, CalligraphyIcon, PhotographyIcon, ArchitectureIcon } from '@/Components/SvgIcons';

export default function Artists() {
    const [selectedField, setSelectedField] = useState('all');

    const artFields = [
        { value: 'all', name: 'همه رشته‌ها', icon: ProfileIcon },
        { value: 'music', name: 'موسیقی', icon: MusicIcon },
        { value: 'painting', name: 'نقاشی', icon: PaintingIcon },
        { value: 'film', name: 'فیلم‌سازی', icon: FilmIcon },
        { value: 'sculpture', name: 'مجسمه‌سازی', icon: SculptureIcon },
        { value: 'graphic', name: 'گرافیک', icon: GraphicIcon },
        { value: 'calligraphy', name: 'خوشنویسی', icon: CalligraphyIcon },
        { value: 'photography', name: 'عکاسی', icon: PhotographyIcon },
        { value: 'architecture', name: 'معماری', icon: ArchitectureIcon },
    ];

    // Sample artists data
    const artists = [
        {
            id: 1,
            name: 'احمد محمدی',
            field: 'music',
            fieldName: 'موسیقی',
            bio: 'آهنگساز و نوازنده تار با بیش از 10 سال تجربه در موسیقی سنتی ایرانی',
            location: 'تهران',
            joinDate: '1402/01/15',
            artsCount: 5,
            avatar: '/images/artists/ahmad.jpg'
        },
        {
            id: 2,
            name: 'فاطمه احمدی',
            field: 'painting',
            fieldName: 'نقاشی',
            bio: 'نقاش و هنرمند تجسمی متخصص در نقاشی با آبرنگ و تکنیک‌های مدرن',
            location: 'اصفهان',
            joinDate: '1402/02/20',
            artsCount: 8,
            avatar: '/images/artists/fateme.jpg'
        },
        {
            id: 3,
            name: 'علی رضایی',
            field: 'film',
            fieldName: 'فیلم‌سازی',
            bio: 'کارگردان و فیلمساز مستقل با تخصص در فیلم‌های مستند و کوتاه',
            location: 'شیراز',
            joinDate: '1402/03/10',
            artsCount: 3,
            avatar: '/images/artists/ali.jpg'
        },
        {
            id: 4,
            name: 'زهرا کریمی',
            field: 'sculpture',
            fieldName: 'مجسمه‌سازی',
            bio: 'مجسمه‌ساز و هنرمند سه‌بعدی با تخصص در کار با فلز و سنگ',
            location: 'تبریز',
            joinDate: '1402/04/05',
            artsCount: 6,
            avatar: '/images/artists/zahra.jpg'
        },
        {
            id: 5,
            name: 'محمد حسینی',
            field: 'graphic',
            fieldName: 'گرافیک',
            bio: 'طراح گرافیک و تصویرساز دیجیتال با تخصص در طراحی پوستر و لوگو',
            location: 'مشهد',
            joinDate: '1402/05/12',
            artsCount: 12,
            avatar: '/images/artists/mohammad.jpg'
        },
        {
            id: 6,
            name: 'مریم نوری',
            field: 'calligraphy',
            fieldName: 'خوشنویسی',
            bio: 'خوشنویس و استاد خط نستعلیق با بیش از 15 سال تجربه در آموزش',
            location: 'کرمان',
            joinDate: '1402/06/18',
            artsCount: 9,
            avatar: '/images/artists/maryam.jpg'
        }
    ];

    const filteredArtists = selectedField === 'all' 
        ? artists 
        : artists.filter(artist => artist.field === selectedField);

    return (
        <FestivalLayout title="هنرمندان">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4 font-['Vazirmatn']">
                        هنرمندان جشنواره
                    </h1>
                    <p className="text-xl text-amber-100 max-w-2xl mx-auto font-['Vazirmatn']">
                        با استعدادهای هنری ایران آشنا شوید
                    </p>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-8 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-4">
                        {artFields.map((field) => (
                            <button
                                key={field.value}
                                onClick={() => setSelectedField(field.value)}
                                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                                    selectedField === field.value
                                        ? 'bg-amber-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-amber-50'
                                }`}
                            >
                                <field.icon className="w-5 h-5 ml-2" />
                                <span className="font-['Vazirmatn']">{field.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Artists Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 font-['Vazirmatn']">
                            {selectedField === 'all' ? 'همه هنرمندان' : artFields.find(f => f.value === selectedField)?.name}
                        </h2>
                        <span className="text-gray-600 font-['Vazirmatn']">
                            {filteredArtists.length} هنرمند
                        </span>
                    </div>

                    {filteredArtists.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredArtists.map((artist) => (
                                <div key={artist.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                    <div className="p-6">
                                        <div className="flex items-center mb-4">
                                            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center ml-4">
                                                <span className="text-2xl text-white font-bold">
                                                    {artist.name.split(' ')[0].charAt(0)}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800 font-['Vazirmatn']">
                                                    {artist.name}
                                                </h3>
                                                <p className="text-amber-600 font-medium font-['Vazirmatn']">
                                                    {artist.fieldName}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4 font-['Vazirmatn']">
                                            {artist.bio}
                                        </p>
                                        
                                        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                                            <span className="font-['Vazirmatn']">📍 {artist.location}</span>
                                            <span className="font-['Vazirmatn']">📅 {artist.joinDate}</span>
                                        </div>
                                        
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600 font-['Vazirmatn']">
                                                {artist.artsCount} اثر هنری
                                            </span>
                                            <button className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-amber-700 hover:to-orange-700 transition-all font-['Vazirmatn']">
                                                مشاهده آثار
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ProfileIcon className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-600 mb-2 font-['Vazirmatn']">
                                هنرمندی یافت نشد
                            </h3>
                            <p className="text-gray-500 font-['Vazirmatn']">
                                در این رشته هنری هنرمندی ثبت نام نکرده است
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Statistics */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 font-['Vazirmatn']">
                        آمار هنرمندان
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: artists.length, label: 'هنرمند فعال' },
                            { number: artFields.length - 1, label: 'رشته هنری' },
                            { number: artists.reduce((sum, artist) => sum + artist.artsCount, 0), label: 'اثر هنری' },
                            { number: 6, label: 'استان' }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl font-bold text-amber-600 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-['Vazirmatn']">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </FestivalLayout>
    );
}
