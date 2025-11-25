import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
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
    ArchitectureIcon,
    HandicraftsIcon,
    IndustrialDesignIcon,
    IllustrationIcon,
    LiteratureIcon,
    CarpetIcon,
    ShortFilmIcon,
    TheaterIcon,
    FashionDesignIcon,
    AnimationIcon,
    NewMediaArtsIcon,
    NoteIcon,
    PaletteIcon,
    CloudIcon,
    StarIcon,
    UsersIcon,
    BookIcon,
} from '@/Components/SvgIcons';

const uniLogosSrc = new URL('../../../public/uni_logos.png', import.meta.url).href;

export default function Home({ artFields = [] }) {
    const { trans, getLocale, isRTL } = useTranslation();
    const { auth } = usePage().props;
    const locale = getLocale();
    const rtl = isRTL();
    
    // Map icon names to icon components
    const iconMap = {
        'music': MusicIcon,
        'painting': PaintingIcon,
        'short_film': ShortFilmIcon,
        'sculpture': SculptureIcon,
        'illustration': IllustrationIcon,
        'calligraphy': CalligraphyIcon,
        'photography': PhotographyIcon,
        'architecture': ArchitectureIcon,
        'handicrafts': HandicraftsIcon,
        'industrial_design': IndustrialDesignIcon,
        'literature': LiteratureIcon,
        'carpet': CarpetIcon,
        'theater': TheaterIcon,
        'fashion_design': FashionDesignIcon,
        'animation': AnimationIcon,
        'new_media_arts': NewMediaArtsIcon,
    };
    
    const handleArtFieldClick = (fieldId) => {
        // Always redirect to create page with art_field_id (public route)
        // The page will show guide for everyone, and form fields only for authenticated users
        router.visit(`/artist/arts/create?art_field_id=${fieldId}`);
    };
    const [scrollY, setScrollY] = useState(0);
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);
    const heroSectionRef = useRef(null);
    const trackRef = useRef(null);
    const containerRef = useRef(null);
    const leftFadeRef = useRef(null);
    const rightFadeRef = useRef(null);
    const frameRef = useRef(null);
    const posRef = useRef(0);
    const lastTimeRef = useRef(0);
    const directionRef = useRef(-1);
    const maxOffsetRef = useRef(0);
    const fadeRangeRef = useRef(80);
    const speed = 80; // سرعت پیکسل بر ثانیه

    const bilingualHeroPanels = [
        {
            key: 'fa',
            badgeLabel: 'فارسی',
            title: trans('hero_title_fa'),
            subtitle: trans('hero_subtitle_fa'),
            description: trans('hero_description_fa'),
            direction: 'rtl',
            alignment: 'text-right',
            badgeAlignment: 'justify-end',
            gradient: 'from-primary-500/40 via-primary-400/20 to-secondary-500/30',
            highlightGradient: 'from-secondary-200 via-white to-secondary-500',
            textTone: 'text-white',
            descriptionTone: 'text-white/80',
        },
        {
            key: 'en',
            badgeLabel: 'English',
            title: trans('hero_title_en'),
            subtitle: trans('hero_subtitle_en'),
            description: trans('hero_description_en'),
            direction: 'ltr',
            alignment: 'text-left',
            badgeAlignment: 'justify-start',
            gradient: 'from-white/70 via-white/25 to-white/5',
            highlightGradient: 'from-white via-secondary-200 to-secondary-400',
            textTone: 'text-white',
            descriptionTone: 'text-white/80',
        },
    ];
    
    // Set document direction based on locale
    useEffect(() => {
        document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';
        document.documentElement.lang = locale;
    }, [locale]);
    
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);
            // Hide scroll indicator after scrolling 100px
            if (currentScrollY > 100) {
                setShowScrollIndicator(false);
            } else {
                setShowScrollIndicator(true);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    useEffect(() => {
        const track = trackRef.current;
        const container = containerRef.current;
        if (!track || !container) return;

        let cleanupImages = [];
        let segmentWidth = 0;

        const updateOverlayOpacity = (maxOffset) => {
            const fadeRange = Math.max(1, fadeRangeRef.current);
            const leftEl = leftFadeRef.current;
            const rightEl = rightFadeRef.current;

            if (leftEl) {
                const leftOpacity = maxOffset > 0 ? Math.min(1, Math.abs(posRef.current) / fadeRange) : 0;
                leftEl.style.opacity = leftOpacity.toString();
            }

            if (rightEl) {
                const distanceToRight = Math.abs(maxOffset + posRef.current);
                const rightOpacity = maxOffset > 0 ? Math.min(1, distanceToRight / fadeRange) : 0;
                rightEl.style.opacity = rightOpacity.toString();
            }
        };

        const recalcMetrics = () => {
            const firstChild = track.firstElementChild;
            if (!firstChild) return false;

            segmentWidth = firstChild.getBoundingClientRect().width;
            const containerWidth = container.getBoundingClientRect().width;
            maxOffsetRef.current = Math.max(0, segmentWidth - containerWidth);
            fadeRangeRef.current = Math.max(24, Math.min(maxOffsetRef.current || 0, containerWidth * 0.25));

            posRef.current = Math.min(Math.max(posRef.current, -maxOffsetRef.current), 0);
            track.style.transform = `translateX(${posRef.current}px)`;
            lastTimeRef.current = null;
            updateOverlayOpacity(maxOffsetRef.current);

            return Boolean(segmentWidth);
        };

        const startAnimation = () => {
            cancelAnimationFrame(frameRef.current);
            recalcMetrics();
            frameRef.current = requestAnimationFrame(step);
        };

        const step = (now) => {
            const maxOffset = maxOffsetRef.current;

            if (!segmentWidth || maxOffset === 0) {
                if (!segmentWidth) {
                    recalcMetrics();
                } else {
                    posRef.current = 0;
                    track.style.transform = 'translateX(0px)';
                    updateOverlayOpacity(0);
                }
                frameRef.current = requestAnimationFrame(step);
                lastTimeRef.current = now;
                return;
            }

            if (!lastTimeRef.current) {
                lastTimeRef.current = now;
            }

            const delta = (now - lastTimeRef.current) / 1000;
            lastTimeRef.current = now;

            posRef.current += directionRef.current * speed * delta;

            if (posRef.current <= -maxOffset) {
                posRef.current = -maxOffset;
                directionRef.current = 1;
            } else if (posRef.current >= 0) {
                posRef.current = 0;
                directionRef.current = -1;
            }

            track.style.transform = `translateX(${posRef.current}px)`;
            updateOverlayOpacity(maxOffset);

            frameRef.current = requestAnimationFrame(step);
        };

        const handleResize = () => {
            segmentWidth = 0;
            startAnimation();
        };

        const images = Array.from(track.querySelectorAll('img'));

        let pending = images.filter((img) => !img.complete).length;

        const handleImageSettled = () => {
            pending = Math.max(0, pending - 1);
            if (pending === 0) {
                startAnimation();
            }
        };

        if (images.length === 0 || pending === 0) {
            startAnimation();
        } else {
            images.forEach((img) => {
                if (img.complete) return;
                img.addEventListener('load', handleImageSettled);
                img.addEventListener('error', handleImageSettled);
                cleanupImages.push(img);
            });
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cleanupImages.forEach((img) => {
                img.removeEventListener('load', handleImageSettled);
                img.removeEventListener('error', handleImageSettled);
            });
            cancelAnimationFrame(frameRef.current);
        };
    }, []);
    

    return (
        <FestivalLayout title={`${trans('home')} - ${trans('site_title')}`}>
            {/* Modern Hero Section with Poster */}
            <section 
                ref={heroSectionRef}
                className="relative mt-8 lg:mt-16 mb-24 rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500"
                style={{
                    background: scrollY > 50 
                        ? `linear-gradient(to bottom right, ${scrollY > 200 ? '#1e2b62' : '#263675'}, ${scrollY > 200 ? '#131c42' : '#2f4289'})`
                        : 'linear-gradient(to bottom right, #374c9a, #263675)',
                    backdropFilter: scrollY > 50 ? `blur(${Math.min(scrollY / 10, 10)}px)` : 'blur(0px)',
                }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[500px] lg:min-h-[600px]">
                        {/* Poster - Left Side (Right in RTL) */}
                        <div className="order-2 lg:order-1 flex flex-col justify-center lg:justify-end items-center lg:items-end gap-4">
                            <div className="relative w-full sm:w-auto">
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300 bg-white backdrop-blur-sm p-2 sm:p-3 lg:p-4">
                                    <img
                                        src="/poster.jpg"
                                        alt="Iranian Route International Festival Poster"
                                        className="block object-contain rounded-xl mx-auto"
                                        style={{
                                            width: 'clamp(280px, 70vw, 450px)',
                                            height: 'clamp(400px, 100vw, 650px)',
                                            maxWidth: '100%',
                                            maxHeight: '90vh',
                                        }}
                                    />
                                    {/* Decorative Border */}
                                    <div className="absolute inset-2 sm:inset-3 lg:inset-4 border-4 border-white/20 rounded-xl pointer-events-none"></div>
                                </div>
                                {/* Decorative Elements */}
                                <div className="absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-secondary-400/30 rounded-full filter blur-2xl -z-10 hidden sm:block"></div>
                                <div className="absolute -bottom-4 -left-4 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-primary-400/30 rounded-full filter blur-2xl -z-10 hidden sm:block"></div>
                            </div>
                            {/* Download Poster Button */}
                            <a
                                href="/poster.jpg"
                                download="poster-jashnvare-masir-iran.jpg"
                                className="group relative inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-md border-2 border-white/30 text-white rounded-xl font-bold text-sm sm:text-base hover:bg-white/30 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl font-['iransansX']"
                            >
                                <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                <span>دانلود پوستر</span>
                            </a>
                        </div>

                        {/* Hero Content - Right Side (Left in RTL) */}
                        <div className="order-1 lg:order-2 relative z-10">
                            <div className="mb-6 inline-block">
                                <span className="px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold border border-white/30 shadow-lg font-['iransansX']">
                                    جشنواره بین‌المللی
                                </span>
                            </div>
                            
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                    {bilingualHeroPanels.map((panel) => (
                                        <article
                                            key={panel.key}
                                            dir={panel.direction}
                                            className="group relative overflow-hidden rounded-[2.75rem] border border-white/20 bg-white/10 backdrop-blur-xl p-6 sm:p-8 shadow-2xl transition-transform duration-500 hover:-translate-y-1"
                                        >
                                            <div className={`absolute inset-0 bg-gradient-to-br ${panel.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-500`}></div>
                                            <div className="relative flex flex-col gap-4">
                                                <div className={`flex ${panel.badgeAlignment}`}>
                                                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.35em] uppercase bg-white/15 text-white/80">
                                                        {panel.badgeLabel}
                                                    </span>
                                                </div>
                                                <h2 className={`font-black font-['iransansX'] leading-tight ${panel.alignment} ${panel.textTone} text-3xl sm:text-4xl`}>
                                                    <span className="block mb-2">{panel.title}</span>
                                                    <span className={`block text-transparent bg-clip-text bg-gradient-to-r ${panel.highlightGradient}`}>
                                                        {panel.subtitle}
                                                    </span>
                                                </h2>
                                                <p className={`text-sm sm:text-base md:text-lg leading-relaxed font-['iransansX'] ${panel.alignment} ${panel.descriptionTone}`}>
                                                    {panel.description}
                                                </p>
                                            </div>
                                        </article>
                                    ))}
                                </div>

                                {/* <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed font-['iransansX']">
                                    {trans('hero_description_extra')}
                                </p> */}
                                
                                <div className="flex flex-col sm:flex-row gap-4 items-center">
                                    <Link 
                                        href="/artist/register" 
                                        className="group relative w-full sm:w-auto px-8 py-4 bg-white text-primary-700 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-3xl font-['iransansX'] overflow-hidden text-center"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors duration-300">
                                            {trans('register_now')}
                                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </Link>
                                    <Link 
                                        href="/about" 
                                        className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-2xl font-bold text-base sm:text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl font-['iransansX'] text-center"
                                    >
                                        {trans('about_us')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Decorative Background Elements with Scroll Effects */}
                
                
                {/* Floating Particles Effect with Scroll Fade */}
                
                
                {/* Scroll Indicator with Animation - Hidden on Scroll */}
                {/* {showScrollIndicator && (
                    <div 
                        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-500"
                        style={{
                            opacity: scrollY > 50 ? 0 : 1,
                            transform: scrollY > 50 ? 'translateX(-50%) translateY(20px)' : 'translateX(-50%) translateY(0)'
                        }}
                    >
                        <div className="animate-bounce cursor-pointer" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                            <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center shadow-lg hover:border-white transition-colors duration-300">
                                <div className="w-1.5 h-3 bg-white/70 rounded-full mt-2 animate-pulse hover:bg-white transition-colors duration-300"></div>
                            </div>
                            <p className="text-white/70 text-xs mt-2 text-center font-['iransansX']">اسکرول کنید</p>
                        </div>
                    </div>
                )} */}
            </section>

            {/* Call for Entries Section - فراخوان */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-[3rem] p-8 sm:p-12 lg:p-16 shadow-2xl border border-gray-100">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-800 mb-4 font-['iransansX']">
                            فراخوان
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-500 mx-auto mt-4 rounded-full"></div>
                    </div>

                    {/* Main Content */}
                    <div dir="rtl" className="max-w-5xl mx-auto space-y-8">
                        {/* Title Section */}
                        <div className="text-center space-y-4 mb-10">
                            <h3 className="text-3xl md:text-4xl font-black text-primary-700 font-['iransansX']">
                                جشنواره بین‌المللی مسیر ایران
                            </h3>
                            <p className="text-xl md:text-2xl text-gray-700 font-semibold font-['iransansX']">
                                دانشگاه‌ها و دانشکده‌های هنر ایران
                            </p>
                        </div>

                        {/* Introduction */}
                        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 sm:p-8 border-r-4 border-primary-500">
                            <p className="text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed font-['iransansX'] text-justify">
                                مسیر ایران از هنرمندان جهان دعوت می‌کند تا به افتخار ایران، دست بر ساز، قلم و ابزار هنر ببرند.
                            </p>
                            <p className="text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed font-['iransansX'] text-justify mt-4">
                                جشنواره به صورت مجازی و با موضوع "ایران" برگزار می‌شود.
                            </p>
                        </div>

                        {/* Art Fields Section */}
                        <div className="space-y-6">
                            <h4 className="text-2xl md:text-3xl font-bold text-primary-700 font-['iransansX'] text-right">
                                مسیر ایران پذیرای آثار در رشته‌های زیر می‌باشد:
                            </h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* First Column */}
                                <div className="space-y-3">
                                    <div className="bg-white rounded-xl p-4 shadow-md border-r-4 border-primary-400">
                                        <p className="text-base md:text-lg text-gray-800 font-['iransansX'] leading-relaxed">
                                            <span className="font-bold text-primary-700">موسیقی</span> (نوازندگی و آهنگسازی)، <span className="font-bold text-primary-700">سینما</span> (فیلم کوتاه)، <span className="font-bold text-primary-700">نمایش</span> (فیلم نمایش) و <span className="font-bold text-primary-700">انیمیشن</span>.
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-xl p-4 shadow-md border-r-4 border-secondary-400">
                                        <p className="text-base md:text-lg text-gray-800 font-['iransansX'] leading-relaxed">
                                            <span className="font-bold text-primary-700">نقاشی</span> (سبک، تکنیک و اندازه آزاد)، <span className="font-bold text-primary-700">مجسمه‌سازی</span>، <span className="font-bold text-primary-700">خوشنویسی</span>، <span className="font-bold text-primary-700">گرافیک</span> (طراحی پوستر، نشانه و طراحی متحرک)، <span className="font-bold text-primary-700">تصویرسازی</span>، <span className="font-bold text-primary-700">عکاسی</span> (تک عکس و مجموعه) و <span className="font-bold text-primary-700">هنرهای جدید</span>.
                                        </p>
                                    </div>
                                </div>

                                {/* Second Column */}
                                <div className="space-y-3">
                                    <div className="bg-white rounded-xl p-4 shadow-md border-r-4 border-primary-500">
                                        <p className="text-base md:text-lg text-gray-800 font-['iransansX'] leading-relaxed">
                                            <span className="font-bold text-primary-700">معماری</span>، <span className="font-bold text-primary-700">طراحی صنعتی</span>، <span className="font-bold text-primary-700">طراحی لباس</span>، <span className="font-bold text-primary-700">طراحی پارچه</span>، <span className="font-bold text-primary-700">طراحی فرش</span>، <span className="font-bold text-primary-700">بافت فرش</span> و <span className="font-bold text-primary-700">صنایع دستی</span>.
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-xl p-4 shadow-md border-r-4 border-secondary-500">
                                        <p className="text-base md:text-lg text-gray-800 font-['iransansX'] leading-relaxed">
                                            <span className="font-bold text-primary-700">ادبیات</span>: داستان کوتاه و شعر.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl p-4 border border-primary-200">
                                <p className="text-base md:text-lg text-gray-800 font-['iransansX'] text-center">
                                    <span className="font-bold text-primary-700">سبک، تکنیک و اندازه آزاد است.</span>
                                </p>
                            </div>
                        </div>

                        {/* Important Notes */}
                        <div className="space-y-4 mt-10">
                            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-primary-600">
                                <p className="text-base md:text-lg text-gray-800 leading-relaxed font-['iransansX'] text-justify mb-3">
                                    جشنواره مسیر ایران هیچ‌گونه رتبه‌بندی و گزینش مقام اول و دوم ندارد.
                                </p>
                                <p className="text-base md:text-lg text-gray-800 leading-relaxed font-['iransansX'] text-justify mb-3">
                                    مسیر ایران بستری برابر جهت انتشار و تقدیر از آثار پذیرفته شده در جشنواره است.
                                </p>
                                <p className="text-base md:text-lg text-gray-800 leading-relaxed font-['iransansX'] text-justify mb-3">
                                    لوح جشنواره، با افتخار از طرف دانشگاه هنر ایران به تمامی آثار پذیرفته شده اعطا خواهد شد.
                                </p>
                                <p className="text-base md:text-lg text-gray-800 leading-relaxed font-['iransansX'] text-justify">
                                    بازبینی آثار توسط اساتید هنر از دانشگاه‌های هنر ایران صورت می‌پذیرد.
                                </p>
                            </div>

                            <div className="bg-red-50 rounded-xl p-6 border-r-4 border-red-400">
                                <p className="text-base md:text-lg text-red-800 font-bold font-['iransansX'] text-center">
                                    آثار باید مختص به جشنواره مسیر ایران تولید شده باشند.
                                </p>
                            </div>
                        </div>

                        {/* Deadline Section */}
                        <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-center shadow-xl mt-10">
                            <div className="space-y-4">
                                <h4 className="text-2xl md:text-3xl font-black text-white font-['iransansX']">
                                    مهلت ارسال آثار
                                </h4>
                                <p className="text-3xl md:text-4xl font-black text-white font-['iransansX']">
                                    نوروز ۱۴۰۵
                                </p>
                            </div>
                        </div>

                        {/* Website Link */}
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-primary-200 text-center mt-8">
                            <p className="text-base md:text-lg text-gray-700 mb-4 font-['iransansX']">
                                برای ارسال اثر و مطالعهٔ جزئیات کامل و شرایط فنی هر رشته (مانند فرمت‌های قابل قبول) به وب‌سایت رسمی جشنواره مراجعه بفرمایید:
                            </p>
                            <a 
                                href="https://www.iranian-route.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block text-2xl md:text-3xl font-bold text-primary-700 hover:text-primary-800 transition-colors duration-300 font-['iransansX'] break-all"
                            >
                                WWW.IRANIAN-ROUTE.COM
                            </a>
                        </div>

                        {/* Download PDF Button */}
                        <div className="flex justify-center mt-8">
                            <a
                                href="/farakhan.pdf"
                                download="farakhan-jashnvare-masir-iran.pdf"
                                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold text-base sm:text-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl font-['iransansX']"
                            >
                                <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <span>دانلود PDF متن فراخوان</span>
                                <svg className="w-5 h-5 transform group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20 bg-white rounded-2xl">
                <div ref={containerRef} className="relative overflow-hidden">
                    <div
                        ref={trackRef}
                        className="flex mix-blend-multiply will-change-transform select-none"
                        style={{
                            width: "200%", // دو برابر برای حرکت بی‌نهایت
                            transform: "translateX(0px)",
                        }}
                    >
                    <img
                         src={uniLogosSrc}
                         alt="لوگو دانشگاه‌ها"
                        className="w-1/2 max-w-none object-contain flex-shrink-0 h-28 sm:h-28 lg:h-32 block scale-[1.2] sm:scale-[2] lg:scale-100"
                         draggable={false}
                     />
                     <img
                         src={uniLogosSrc}
                         alt="لوگو دانشگاه‌ها"
                        className="w-1/2 max-w-none object-contain flex-shrink-0 h-28 sm:h-28 lg:h-32 block scale-[1.2] sm:scale-[2] lg:scale-100"
                         draggable={false}
                     />
                    </div>

                    {/* سایه‌های دو طرف */}
                    <div
                    ref={leftFadeRef}
                    className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-32"
                    style={{
                        background:
                        "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))",
                        opacity: 1,
                        transition: 'opacity 300ms ease',
                    }}
                    />
                    <div
                    ref={rightFadeRef}
                    className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-32"
                    style={{
                        background:
                        "linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))",
                        opacity: 1,
                        transition: 'opacity 300ms ease',
                    }}
                    />
                </div>
                </section>

            {/* Art Fields Section - Modern Grid with Hover Effects */}
            <section className="mb-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-[3rem] p-12 lg:p-16 shadow-xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-800 mb-4 font-['iransansX']">
                        {trans('art_fields')}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-500 mx-auto mt-4 rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
                    {artFields.map((field) => {
                        const IconComponent = field.icon_name ? (iconMap[field.icon_name] || PaletteIcon) : PaletteIcon;
                        const fieldName = locale === 'en' 
                            ? (field.name_en || field.name || trans('art_field'))
                            : (field.name || trans('art_field'));
                        const fieldDesc = locale === 'en'
                            ? (field.description_en || field.description_translated || field.description || '')
                            : (field.description_translated || field.description || '');
                        
                        return (
                            <div 
                                key={field.id}
                                onClick={() => handleArtFieldClick(field.id)}
                                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden cursor-pointer"
                            >
                                {/* Gradient Overlay on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-600 opacity-80 transition-opacity duration-500`}></div>
                                
                                {/* Icon */}
                                {/* <div className={`relative z-10 w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl`}> */}
                                    {/* <IconComponent className="w-8 h-8 text-white" /> */}
                                {/* </div> */}
                                
                                {/* Content */}
                                <div className="relative z-10 text-center">
                                    <h3 className="text-lg font-bold text-white mb-2 font-['iransansX'] group-hover:text-primary-700 transition-colors">
                                        {fieldName}
                                    </h3>
                                    {/* <p className="text-sm text-white font-['iransansX'] line-clamp-2">
                                        {fieldDesc}
                                    </p> */}
                                </div>
                                
                                {/* Shine Effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* How to Participate - Modern Timeline */}
            <section className="mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 font-['iransansX']">
                        {trans('how_to_participate')}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-500 mx-auto rounded-full"></div>
                </div>
                
                <div className="relative max-w-5xl mx-auto">
                    {/* Timeline Line */}
                    <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: '1', title: trans('step_register'), desc: trans('step_register_desc'), icon: NoteIcon, gradient: 'from-primary-400 to-primary-600' },
                            { step: '2', title: trans('step_choose_field'), desc: trans('step_choose_field_desc'), icon: PaletteIcon, gradient: 'from-primary-500 to-secondary-500' },
                            { step: '3', title: trans('step_upload'), desc: trans('step_upload_desc'), icon: CloudIcon, gradient: 'from-secondary-400 to-secondary-600' },
                            { step: '4', title: trans('step_judging'), desc: trans('step_judging_desc'), icon: StarIcon, gradient: 'from-primary-600 to-secondary-600' },
                        ].map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                            <div key={index} className="relative">
                                {/* Timeline Dot */}
                                <div className="hidden md:flex absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full border-4 border-primary-500 shadow-xl z-10 items-center justify-center">
                                    <IconComponent className="w-6 h-6 text-primary-600" />
                                </div>
                                
                                {/* Card */}
                                <div className={`relative mt-16 md:mt-0 pt-16 md:pt-24 bg-gradient-to-br ${item.gradient} rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-3xl group`}>
                                    {/* Step Number */}
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white text-primary-700 rounded-full flex items-center justify-center text-3xl font-black shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                        {item.step}
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="text-center">
                                        <h3 className="text-xl font-bold mb-3 font-['iransansX']">
                                            {item.title}
                                        </h3>
                                        <p className="text-white/90 font-['iransansX'] leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                    
                                    {/* Decorative Element */}
                                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/20 rounded-b-3xl"></div>
                                </div>
                            </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Statistics Section - Modern Dashboard Style */}
            {/* <section className="mb-32 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-[3rem] transform -rotate-1"></div>
                <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-[3rem] p-12 lg:p-16 shadow-2xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 font-['iransansX']">
                            {trans('statistics')}
                        </h2>
                        <div className="w-24 h-1 bg-white/50 mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: '500+', label: trans('registered_artists'), icon: UsersIcon },
                            { number: '1000+', label: trans('submitted_arts'), icon: PaletteIcon },
                            { number: '50+', label: trans('expert_judges'), icon: StarIcon },
                            { number: '16', label: trans('art_fields_count'), icon: BookIcon },
                        ].map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                            <div 
                                key={index}
                                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 shadow-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group"
                            >
                                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300 flex justify-center">
                                    <IconComponent className="w-12 h-12 text-white" />
                                </div>
                                <div className="text-5xl md:text-6xl font-black text-white mb-3 font-['iransansX']">
                                    {stat.number}
                                </div>
                                <div className="text-white/90 font-['iransansX'] text-lg">
                                    {stat.label}
                                </div>
                            </div>
                            );
                        })}
                    </div>
                </div>
            </section> */}

            {/* Final Call to Action - Modern CTA */}
            <section className="relative py-24 rounded-[3rem] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100"></div>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
                
                <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 font-['iransansX']">
                        {trans('ready_to_join')}
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-600 mb-12 font-['iransansX'] leading-relaxed">
                        {trans('register_now_desc')}
                    </p>
                    <Link 
                        href="/artist/register" 
                        className="inline-block px-12 py-6 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white rounded-2xl font-bold text-xl hover:from-primary-700 hover:via-primary-800 hover:to-primary-900 transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-2xl hover:shadow-3xl font-['iransansX'] relative overflow-hidden group"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            {trans('get_started')}
                            <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </Link>
                </div>
            </section>
        </FestivalLayout>
    );
}

