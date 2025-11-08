import React, { useState } from 'react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { useTranslation } from '@/Utils/translation';
import { MusicIcon, PaintingIcon, ShortFilmIcon, SculptureIcon, IllustrationIcon, CalligraphyIcon, PhotographyIcon, ArchitectureIcon, HandicraftsIcon, IndustrialDesignIcon, LiteratureIcon, CarpetIcon, TheaterIcon, FashionDesignIcon, AnimationIcon, NewMediaArtsIcon, CheckIcon, ClockIcon, CalendarIcon, TimerIcon } from '@/Components/SvgIcons';

export default function Arts() {
    const { trans } = useTranslation();
    const [selectedField, setSelectedField] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');

    const artFields = [
        { value: 'all', name: trans('all_fields'), icon: MusicIcon },
        { value: 'music', name: trans('music'), icon: MusicIcon },
        { value: 'calligraphy', name: trans('calligraphy'), icon: CalligraphyIcon },
        { value: 'painting', name: trans('painting'), icon: PaintingIcon },
        { value: 'sculpture', name: trans('sculpture'), icon: SculptureIcon },
        { value: 'handicrafts', name: trans('handicrafts'), icon: HandicraftsIcon },
        { value: 'architecture', name: trans('architecture'), icon: ArchitectureIcon },
        { value: 'industrial_design', name: trans('industrial_design'), icon: IndustrialDesignIcon },
        { value: 'graphic', name: trans('graphic'), icon: IllustrationIcon },
        { value: 'literature', name: trans('literature'), icon: LiteratureIcon },
        { value: 'carpet', name: trans('carpet'), icon: CarpetIcon },
        { value: 'short_film', name: trans('short_film'), icon: ShortFilmIcon },
        { value: 'theater', name: trans('theater'), icon: TheaterIcon },
        { value: 'fashion_design', name: trans('fashion_design'), icon: FashionDesignIcon },
        { value: 'animation', name: trans('animation'), icon: AnimationIcon },
        { value: 'photography', name: trans('photography'), icon: PhotographyIcon },
        { value: 'new_media_arts', name: trans('new_media_arts'), icon: NewMediaArtsIcon },
    ];

    const statuses = [
        { value: 'all', name: trans('all_statuses'), icon: CheckIcon },
        { value: 'approved', name: trans('approved_status'), icon: CheckIcon },
        { value: 'pending', name: trans('pending_status'), icon: ClockIcon },
    ];

    // Sample arts data
    const arts = [
        {
            id: 1,
            title: 'سکوت شب',
            artist: 'احمد محمدی',
            field: 'music',
            fieldName: trans('music'),
            description: 'قطعه‌ای از موسیقی سنتی ایرانی با تار و سه‌تار',
            status: 'approved',
            statusName: trans('approved_status'),
            uploadDate: '1402/06/15',
            duration: '4:32',
            thumbnail: '/images/arts/music1.jpg'
        },
        {
            id: 2,
            title: 'طلوع خورشید',
            artist: 'فاطمه احمدی',
            field: 'painting',
            fieldName: trans('painting'),
            description: 'نقاشی با آبرنگ از منظره کوهستان در طلوع آفتاب',
            status: 'approved',
            statusName: trans('approved_status'),
            uploadDate: '1402/06/20',
            thumbnail: '/images/arts/painting1.jpg'
        },
        {
            id: 3,
            title: 'زندگی در شهر',
            artist: 'علی رضایی',
            field: 'film',
            fieldName: trans('filmmaking'),
            description: 'فیلم کوتاه مستند درباره زندگی روزمره در تهران',
            status: 'pending',
            statusName: trans('pending_status'),
            uploadDate: '1402/07/01',
            duration: '12:45',
            thumbnail: '/images/arts/film1.jpg'
        },
        {
            id: 4,
            title: 'مجسمه آزادی',
            artist: 'زهرا کریمی',
            field: 'sculpture',
            fieldName: trans('sculpture'),
            description: 'مجسمه برنزی با موضوع آزادی و استقلال',
            status: 'approved',
            statusName: trans('approved_status'),
            uploadDate: '1402/07/05',
            thumbnail: '/images/arts/sculpture1.jpg'
        },
        {
            id: 5,
            title: 'پوستر جشنواره',
            artist: 'محمد حسینی',
            field: 'graphic',
            fieldName: trans('graphic'),
            description: 'طراحی پوستر برای جشنواره هنری با استفاده از المان‌های سنتی',
            status: 'approved',
            statusName: trans('approved_status'),
            uploadDate: '1402/07/10',
            thumbnail: '/images/arts/graphic1.jpg'
        },
        {
            id: 6,
            title: 'خط نستعلیق',
            artist: 'مریم نوری',
            field: 'calligraphy',
            fieldName: trans('calligraphy'),
            description: 'خوشنویسی شعر حافظ با خط نستعلیق',
            status: 'pending',
            statusName: trans('pending_status'),
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
        <FestivalLayout title={trans('arts_title')}>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-12 sm:py-16 lg:py-20 transition-all duration-300">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 font-['Vazirmatn'] animate-fadeIn">
                        {trans('arts_title')}
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-secondary-100 max-w-2xl mx-auto font-['Vazirmatn']">
                        {trans('arts_subtitle')}
                    </p>
                </div>
            </section>

            {/* Filters Section */}
            <section className="py-6 sm:py-8 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="flex flex-wrap justify-center gap-2">
                            <span className="text-xs sm:text-sm font-medium text-gray-700 font-['Vazirmatn']">{trans('filter_by_field')}</span>
                            {artFields.map((field) => (
                                <button
                                    key={field.value}
                                    onClick={() => setSelectedField(field.value)}
                                    className={`flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                                        selectedField === field.value
                                            ? 'bg-primary-600 text-white shadow-lg'
                                            : 'bg-white text-gray-700 hover:bg-secondary-50'
                                    }`}
                                >
                                    <field.icon className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                                    <span className="font-['Vazirmatn']">{field.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                        <div className="flex flex-wrap justify-center gap-2">
                            <span className="text-xs sm:text-sm font-medium text-gray-700 font-['Vazirmatn']">{trans('filter_by_status')}</span>
                            {statuses.map((status) => (
                                <button
                                    key={status.value}
                                    onClick={() => setSelectedStatus(status.value)}
                                    className={`flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                                        selectedStatus === status.value
                                            ? 'bg-primary-600 text-white shadow-lg'
                                            : 'bg-white text-gray-700 hover:bg-secondary-50'
                                    }`}
                                >
                                    <status.icon className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                                    <span className="font-['Vazirmatn']">{status.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Arts Grid */}
            <section className="py-12 sm:py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 font-['Vazirmatn']">
                            {filteredArts.length} {trans('arts_count')}
                        </h2>
                        <div className="flex flex-wrap items-center gap-4">
                            <span className="text-xs sm:text-sm text-gray-600 font-['Vazirmatn']">
                                {selectedField === 'all' ? trans('all_fields') : artFields.find(f => f.value === selectedField)?.name}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-600 font-['Vazirmatn']">
                                {selectedStatus === 'all' ? trans('all_statuses') : statuses.find(s => s.value === selectedStatus)?.name}
                            </span>
                        </div>
                    </div>

                    {filteredArts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {filteredArts.map((art) => (
                                <div key={art.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-fadeIn">
                                    <div className="h-40 sm:h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer">
                                        <div className="text-6xl text-primary-600">
                                            {artFields.find(f => f.value === art.field)?.icon && 
                                                React.createElement(artFields.find(f => f.value === art.field)?.icon, { className: "w-12 h-12 sm:w-16 sm:h-16" })
                                            }
                                        </div>
                                    </div>
                                    
                                    <div className="p-4 sm:p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium ${
                                                art.status === 'approved' 
                                                    ? 'bg-secondary-200 text-secondary-800' 
                                                    : 'bg-secondary-100 text-secondary-700'
                                            } font-['Vazirmatn']`}>
                                                {art.statusName}
                                            </span>
                                            <span className="text-xs sm:text-sm text-gray-500 font-['Vazirmatn']">
                                                {art.fieldName}
                                            </span>
                                        </div>
                                        
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                                            {art.title}
                                        </h3>
                                        
                                        <p className="text-gray-600 text-xs sm:text-sm mb-3 font-['Vazirmatn']">
                                            {trans('artist')}: {art.artist}
                                        </p>
                                        
                                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 font-['Vazirmatn']">
                                            {art.description}
                                        </p>
                                        
                                        <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500 mb-4">
                                            <span className="font-['Vazirmatn'] flex items-center">
                                                <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                                                {art.uploadDate}
                                            </span>
                                            {art.duration && (
                                                <span className="font-['Vazirmatn'] flex items-center">
                                                    <TimerIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                                                    {art.duration}
                                                </span>
                                            )}
                                        </div>
                                        
                                        <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2 px-4 rounded-lg font-medium hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 font-['Vazirmatn']">
                                            {trans('view_artwork')}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounceIn">
                                <MusicIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-600 mb-2 font-['Vazirmatn']">
                                {trans('no_artwork_found')}
                            </h3>
                            <p className="text-gray-500 font-['Vazirmatn'] text-sm sm:text-base">
                                {trans('no_artwork_with_filter')}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Statistics */}
            <section className="py-12 sm:py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6 sm:mb-8 font-['Vazirmatn']">
                        {trans('art_stats')}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
                        {[
                            { number: arts.length, label: trans('total_artworks') },
                            { number: arts.filter(art => art.status === 'approved').length, label: trans('approved_status') },
                            { number: arts.filter(art => art.status === 'pending').length, label: trans('pending_status') },
                            { number: artFields.length - 1, label: trans('total_statuses') }
                        ].map((stat, index) => (
                            <div key={index} className="text-center transition-all duration-300 hover:scale-110 cursor-pointer animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600 font-['Vazirmatn']">
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
