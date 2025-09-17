import React, { useState } from 'react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { MusicIcon, PaintingIcon, FilmIcon, SculptureIcon, GraphicIcon, CalligraphyIcon, PhotographyIcon, ArchitectureIcon, CheckIcon, ClockIcon } from '@/Components/SvgIcons';

export default function Arts() {
    const [selectedField, setSelectedField] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');

    const artFields = [
        { value: 'all', name: 'همه رشته‌ها', icon: MusicIcon },
        { value: 'music', name: 'موسیقی', icon: MusicIcon },
        { value: 'painting', name: 'نقاشی', icon: PaintingIcon },
        { value: 'film', name: 'فیلم‌سازی', icon: FilmIcon },
        { value: 'sculpture', name: 'مجسمه‌سازی', icon: SculptureIcon },
        { value: 'graphic', name: 'گرافیک', icon: GraphicIcon },
        { value: 'calligraphy', name: 'خوشنویسی', icon: CalligraphyIcon },
        { value: 'photography', name: 'عکاسی', icon: PhotographyIcon },
        { value: 'architecture', name: 'معماری', icon: ArchitectureIcon },
    ];

    const statuses = [
        { value: 'all', name: 'همه وضعیت‌ها', icon: CheckIcon },
        { value: 'approved', name: 'تایید شده', icon: CheckIcon },
        { value: 'pending', name: 'در انتظار', icon: ClockIcon },
    ];

    // Sample arts data
    const arts = [
        {
            id: 1,
            title: 'سکوت شب',
            artist: 'احمد محمدی',
            field: 'music',
            fieldName: 'موسیقی',
            description: 'قطعه‌ای از موسیقی سنتی ایرانی با تار و سه‌تار',
            status: 'approved',
            statusName: 'تایید شده',
            uploadDate: '1402/06/15',
            duration: '4:32',
            thumbnail: '/images/arts/music1.jpg'
        },
        {
            id: 2,
            title: 'طلوع خورشید',
            artist: 'فاطمه احمدی',
            field: 'painting',
            fieldName: 'نقاشی',
            description: 'نقاشی با آبرنگ از منظره کوهستان در طلوع آفتاب',
            status: 'approved',
            statusName: 'تایید شده',
            uploadDate: '1402/06/20',
            thumbnail: '/images/arts/painting1.jpg'
        },
        {
            id: 3,
            title: 'زندگی در شهر',
            artist: 'علی رضایی',
            field: 'film',
            fieldName: 'فیلم‌سازی',
            description: 'فیلم کوتاه مستند درباره زندگی روزمره در تهران',
            status: 'pending',
            statusName: 'در انتظار',
            uploadDate: '1402/07/01',
            duration: '12:45',
            thumbnail: '/images/arts/film1.jpg'
        },
        {
            id: 4,
            title: 'مجسمه آزادی',
            artist: 'زهرا کریمی',
            field: 'sculpture',
            fieldName: 'مجسمه‌سازی',
            description: 'مجسمه برنزی با موضوع آزادی و استقلال',
            status: 'approved',
            statusName: 'تایید شده',
            uploadDate: '1402/07/05',
            thumbnail: '/images/arts/sculpture1.jpg'
        },
        {
            id: 5,
            title: 'پوستر جشنواره',
            artist: 'محمد حسینی',
            field: 'graphic',
            fieldName: 'گرافیک',
            description: 'طراحی پوستر برای جشنواره هنری با استفاده از المان‌های سنتی',
            status: 'approved',
            statusName: 'تایید شده',
            uploadDate: '1402/07/10',
            thumbnail: '/images/arts/graphic1.jpg'
        },
        {
            id: 6,
            title: 'خط نستعلیق',
            artist: 'مریم نوری',
            field: 'calligraphy',
            fieldName: 'خوشنویسی',
            description: 'خوشنویسی شعر حافظ با خط نستعلیق',
            status: 'pending',
            statusName: 'در انتظار',
            uploadDate: '1402/07/12',
            thumbnail: '/images/arts/calligraphy1.jpg'
        }
    ];

    const filteredArts = arts.filter(art => {
        const fieldMatch = selectedField === 'all' || art.field === selectedField;
        const statusMatch = selectedStatus === 'all' || art.status === selectedStatus;
        return fieldMatch && statusMatch;
    });

    return (
        <FestivalLayout title="آثار هنری">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4 font-['Vazirmatn']">
                        آثار هنری جشنواره
                    </h1>
                    <p className="text-xl text-amber-100 max-w-2xl mx-auto font-['Vazirmatn']">
                        مجموعه‌ای از بهترین آثار هنری هنرمندان ایرانی
                    </p>
                </div>
            </section>

            {/* Filters Section */}
            <section className="py-8 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        <div className="flex flex-wrap justify-center gap-2">
                            <span className="text-sm font-medium text-gray-700 font-['Vazirmatn']">رشته هنری:</span>
                            {artFields.map((field) => (
                                <button
                                    key={field.value}
                                    onClick={() => setSelectedField(field.value)}
                                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                        selectedField === field.value
                                            ? 'bg-amber-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-amber-50'
                                    }`}
                                >
                                    <field.icon className="w-4 h-4 ml-1" />
                                    <span className="font-['Vazirmatn']">{field.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="flex flex-wrap justify-center gap-2">
                            <span className="text-sm font-medium text-gray-700 font-['Vazirmatn']">وضعیت:</span>
                            {statuses.map((status) => (
                                <button
                                    key={status.value}
                                    onClick={() => setSelectedStatus(status.value)}
                                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                        selectedStatus === status.value
                                            ? 'bg-amber-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-amber-50'
                                    }`}
                                >
                                    <status.icon className="w-4 h-4 ml-1" />
                                    <span className="font-['Vazirmatn']">{status.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Arts Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 font-['Vazirmatn']">
                            {filteredArts.length} اثر هنری
                        </h2>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600 font-['Vazirmatn']">
                                {selectedField === 'all' ? 'همه رشته‌ها' : artFields.find(f => f.value === selectedField)?.name}
                            </span>
                            <span className="text-sm text-gray-600 font-['Vazirmatn']">
                                {selectedStatus === 'all' ? 'همه وضعیت‌ها' : statuses.find(s => s.value === selectedStatus)?.name}
                            </span>
                        </div>
                    </div>

                    {filteredArts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredArts.map((art) => (
                                <div key={art.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                    <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                                        <div className="text-6xl text-amber-600">
                                            {artFields.find(f => f.value === art.field)?.icon && 
                                                React.createElement(artFields.find(f => f.value === art.field)?.icon, { className: "w-16 h-16" })
                                            }
                                        </div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                art.status === 'approved' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-yellow-100 text-yellow-800'
                                            } font-['Vazirmatn']`}>
                                                {art.statusName}
                                            </span>
                                            <span className="text-sm text-gray-500 font-['Vazirmatn']">
                                                {art.fieldName}
                                            </span>
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                                            {art.title}
                                        </h3>
                                        
                                        <p className="text-gray-600 text-sm mb-3 font-['Vazirmatn']">
                                            هنرمند: {art.artist}
                                        </p>
                                        
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4 font-['Vazirmatn']">
                                            {art.description}
                                        </p>
                                        
                                        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                                            <span className="font-['Vazirmatn']">📅 {art.uploadDate}</span>
                                            {art.duration && (
                                                <span className="font-['Vazirmatn']">⏱️ {art.duration}</span>
                                            )}
                                        </div>
                                        
                                        <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:from-amber-700 hover:to-orange-700 transition-all font-['Vazirmatn']">
                                            مشاهده اثر
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MusicIcon className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-600 mb-2 font-['Vazirmatn']">
                                اثری یافت نشد
                            </h3>
                            <p className="text-gray-500 font-['Vazirmatn']">
                                با فیلترهای انتخاب شده اثری وجود ندارد
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Statistics */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 font-['Vazirmatn']">
                        آمار آثار هنری
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: arts.length, label: 'کل آثار' },
                            { number: arts.filter(art => art.status === 'approved').length, label: 'تایید شده' },
                            { number: arts.filter(art => art.status === 'pending').length, label: 'در انتظار' },
                            { number: artFields.length - 1, label: 'رشته هنری' }
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
