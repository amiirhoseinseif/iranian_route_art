import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { LogoIcon, HomeIcon, AboutIcon, ContactIcon, TelegramIcon, InstagramIcon, WhatsAppIcon, PaletteIcon, AddIcon, UploadIcon, ProfileIcon, BellIcon, SettingsIcon, UsersIcon, ScaleIcon, ClipboardIcon, StarIcon, ExitIcon, ChartBarIcon, EmailIcon, LocationIcon, PhoneIcon } from '@/Components/SvgIcons';
import Dropdown from '@/Components/Dropdown';
import LanguageSwitcher, { LanguageSwitcherCompact } from '@/Components/LanguageSwitcher';
import AuthModal from '@/Components/AuthModal';
import Toast from '@/Components/Toast';
import ArtRegistrationSuccessModal from '@/Components/ArtRegistrationSuccessModal';
import { useTranslation } from '@/Utils/translation';

export default function FestivalLayout({ children, title }) {
    const { auth, locale } = usePage().props;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { trans } = useTranslation();
    const persianTitle = 'جشنواره بین المللی مسیر ایران';
    const persianTagline = 'دانشگاه‌ها و دانشکده‌های هنر ایران';
    const englishTitle = 'Iranian Art Route Festival';
    const englishTagline = 'universities and faculties of art in iran';
    
    // Set document direction based on locale
    useEffect(() => {
        const currentLocale = locale || 'fa';
        document.documentElement.dir = currentLocale === 'fa' ? 'rtl' : 'ltr';
        document.documentElement.lang = currentLocale;
    }, [locale]);
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // Get user role display name
    const getUserRoleDisplayName = (userType) => {
        switch (userType) {
            case 'artist':
                return trans('artist');
            case 'admin':
                return trans('admin');
            case 'judge':
                return trans('judge');
            default:
                return trans('user');
        }
    };

    // Get role-based shortcuts
    const getRoleBasedShortcuts = (userType) => {
        switch (userType) {
            case 'artist':
                return [
                    { href: route('artist.dashboard'), label: trans('dashboard'), icon: HomeIcon },
                    { href: route('artist.arts'), label: trans('my_arts'), icon: PaletteIcon },
                    { href: route('artist.arts.create'), label: trans('submit_new_art'), icon: AddIcon },
                    { href: route('artist.submissions'), label: trans('submissions'), icon: UploadIcon },
                    { href: route('artist.profile'), label: trans('profile'), icon: ProfileIcon },
                    { href: route('artist.notifications'), label: trans('notifications'), icon: BellIcon },
                    { href: route('artist.settings'), label: trans('settings'), icon: SettingsIcon },
                ];
            case 'admin':
                return [
                    { href: route('admin.dashboard'), label: trans('dashboard'), icon: HomeIcon },
                    { href: route('admin.artists'), label: trans('artists'), icon: UsersIcon },
                    { href: route('admin.arts'), label: trans('arts'), icon: PaletteIcon },
                    { href: route('admin.art-fields'), label: trans('art_fields'), icon: AddIcon },
                    { href: route('admin.field-requirements'), label: trans('field_requirements'), icon: ClipboardIcon },
                    { href: route('admin.judges'), label: trans('judges'), icon: ScaleIcon },
                    { href: route('admin.settings'), label: trans('settings'), icon: SettingsIcon },
                    { href: route('admin.reports'), label: trans('reports'), icon: ChartBarIcon },
                ];
            case 'judge':
                return [
                    { href: route('judge.dashboard'), label: trans('dashboard'), icon: HomeIcon },
                    { href: route('judge.assignments'), label: trans('assignments'), icon: ClipboardIcon },
                    { href: route('judge.evaluations'), label: trans('evaluations'), icon: StarIcon },
                    { href: route('judge.profile'), label: trans('profile'), icon: ProfileIcon },
                    { href: route('judge.settings'), label: trans('settings'), icon: SettingsIcon },
                ];
            default:
                return [];
        }
    };

    return (
        <>
            <Head title={title || trans('site_title')} />
            <div className="min-h-screen bg-gradient-to-br from-light-100 via-light-200 to-primary-100">
                {/* Modern Header with Glassmorphism */}
                <header 
                    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                        isScrolled 
                            ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-secondary-200/30' 
                            : 'bg-gradient-to-r from-secondary-600 via-secondary-700 to-secondary-800 shadow-lg'
                    } mobile-safe-area`}
                >
                    {/* Top Banner Text */}
                    <div className={`hidden md:block border-b transition-all duration-300 ${
                        isScrolled 
                            ? 'border-secondary-200/30 bg-white/50' 
                            : 'border-white/20 bg-white/5'
                    }`}>
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-1.5">
                            <p className={`text-[9px] lg:text-[10px] text-center font-['iransansX'] leading-tight transition-colors duration-300 ${
                                isScrolled ? 'text-gray-600' : 'text-white/80'
                            }`}>
                                {trans('festival_collaboration')}
                            </p>
                        </div>
                    </div>
                    
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-20 lg:h-24">
                            {/* Mobile Hamburger */}
                            <div className="lg:hidden flex items-center flex-shrink-0">
                                <button
                                    onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                    className={`relative inline-flex items-center justify-center rounded-xl p-2.5 transition-all duration-300 ${
                                        isScrolled 
                                            ? 'text-secondary-700 hover:bg-secondary-50' 
                                            : 'text-white hover:bg-white/10'
                                    } active:scale-95`}
                                    aria-label="Toggle menu"
                                >
                                    <div className="w-6 h-6 relative">
                                        {/* Top line - transforms to top part of X */}
                                        <span 
                                            className={`absolute left-0 top-0 w-full h-0.5 bg-current transition-all duration-300 ${
                                                showingNavigationDropdown 
                                                    ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45' 
                                                    : ''
                                            }`}
                                        ></span>
                                        {/* Middle line - fades out */}
                                        <span 
                                            className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-current transition-all duration-300 ${
                                                showingNavigationDropdown ? 'opacity-0' : 'opacity-100'
                                            }`}
                                        ></span>
                                        {/* Bottom line - transforms to bottom part of X */}
                                        <span 
                                            className={`absolute left-0 bottom-0 w-full h-0.5 bg-current transition-all duration-300 ${
                                                showingNavigationDropdown 
                                                    ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45' 
                                                    : ''
                                            }`}
                                        ></span>
                                    </div>
                                </button>
                            </div>
                            
                            {/* Logo */}
                            <Link href="/" className="flex items-center space-x-3 space-x-reverse flex-shrink-0 group">
                                <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6 gap-3 text-center sm:text-right">
                                    <div className="sm:hidden flex justify-center">
                                        <LogoIcon className="h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
                                    </div>
                                    <div className="hidden sm:flex flex-col items-center sm:items-end gap-1">
                                        <h1 className={`text-lg md:text-2xl font-black font-['iransansX'] leading-tight tracking-tight transition-colors duration-300 ${
                                            isScrolled ? 'text-primary-700' : 'text-white'
                                        }`}>
                                            {persianTitle}
                                        </h1>
                                        <p className={`text-[11px] md:text-sm font-medium transition-colors duration-300 ${
                                            isScrolled ? 'text-gray-600' : 'text-white/75'
                                        }`}>
                                            {persianTagline}
                                        </p>
                                    </div>
                                    <div className="hidden sm:block h-10 w-px bg-white/25"></div>
                                    <div className="hidden sm:flex flex-col items-center sm:items-start gap-1 sm:text-left">
                                        <p className={`text-xs md:text-base font-semibold uppercase tracking-[0.22em] md:tracking-[0.35em] transition-colors duration-300 ${
                                            isScrolled ? 'text-gray-700' : 'text-white/90'
                                        }`}>
                                            {englishTitle}
                                        </p>
                                        <p className={`text-[10px] md:text-xs tracking-wide transition-colors duration-300 ${
                                            isScrolled ? 'text-gray-500' : 'text-white/65'
                                        }`}>
                                            {englishTagline}
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden lg:flex items-center space-x-0.5 space-x-reverse">
                                {[
                                    { href: '/', label: trans('home'), icon: HomeIcon },
                                    { href: '/about', label: trans('about_festival'), icon: AboutIcon },
                                    { href: '/contact', label: trans('contact_us'), icon: ContactIcon },
                                ].map((item, index) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            className={`group relative px-2 py-2 rounded-lg text-xs xl:text-sm font-semibold font-['iransansX'] transition-all duration-300 ${
                                                isScrolled
                                                    ? 'text-gray-700 hover:text-secondary-600 hover:bg-secondary-50'
                                                    : 'text-white hover:text-secondary-200 hover:bg-white/10'
                                            }`}
                                        >
                                            <span className="flex items-center space-x-2 space-x-reverse">
                                                {/* <IconComponent className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" /> */}
                                                <span>{item.label}</span>
                                            </span>
                                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-secondary-500 transition-all duration-300 group-hover:w-3/4"></span>
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Auth Section */}
                            {auth.user ? (
                                <>
                                    <div className="hidden lg:flex items-center space-x-3 space-x-reverse flex-shrink-0">
                                        {/* <div className="hidden xl:block text-right">
                                            <p className={`text-sm font-semibold font-['iransansX'] transition-colors duration-300 ${
                                                isScrolled ? 'text-gray-800' : 'text-white'
                                            }`}>
                                                {trans('welcome')}، {auth.user.first_name || auth.user.name}
                                            </p>
                                            <p className={`text-xs font-['iransansX'] transition-colors duration-300 ${
                                                isScrolled ? 'text-gray-600' : 'text-white/80'
                                            }`}>
                                                {getUserRoleDisplayName(auth.user_type)}
                                            </p>
                                        </div> */}
                                        
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <button className={`flex items-center space-x-2 space-x-reverse px-4 py-2.5 rounded-xl font-semibold font-['iransansX'] transition-all duration-300 shadow-lg hover:shadow-xl ${
                                                    isScrolled
                                                        ? 'bg-secondary-600 text-white hover:bg-secondary-700'
                                                        : 'bg-white text-secondary-600 hover:bg-secondary-100'
                                                }`}>
                                                    <ProfileIcon className="w-5 h-5" />
                                                    <span className="hidden xl:inline">{auth.user.first_name || auth.user.name}</span>
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content>
                                                {getRoleBasedShortcuts(auth.user_type).map((shortcut, index) => {
                                                    const IconComponent = shortcut.icon;
                                                    return (
                                                        <Dropdown.Link key={index} href={shortcut.href}>
                                                            <span className="flex items-center space-x-2 space-x-reverse">
                                                                <IconComponent className="w-4 h-4" />
                                                                <span>{shortcut.label}</span>
                                                            </span>
                                                        </Dropdown.Link>
                                                    );
                                                })}
                                                <div className="border-t border-gray-200 my-1"></div>
                                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                                    <span className="flex items-center space-x-2 space-x-reverse text-red-600">
                                                        <ExitIcon className="w-4 h-4" />
                                                        <span>{trans('logout')}</span>
                                                    </span>
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                    <div className="hidden lg:flex items-center space-x-3 space-x-reverse flex-shrink-0">
                                        <LanguageSwitcher isScrolled={isScrolled} />
                                    </div>
                                </>
                            ) : (
                                <div className="hidden lg:flex items-center space-x-3 space-x-reverse flex-shrink-0">
                                    <LanguageSwitcher isScrolled={isScrolled} />
                                    <button 
                                        onClick={() => setShowAuthModal(true)}
                                        className={`px-6 py-2.5 rounded-xl font-bold font-['iransansX'] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 ${
                                            isScrolled
                                                ? 'bg-secondary-600 text-white hover:bg-secondary-700'
                                                : 'bg-white text-secondary-600 hover:bg-secondary-100'
                                        }`}
                                    >
                                        {trans('login')} / {trans('register')}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Modern Mobile Menu */}
                    {showingNavigationDropdown && (
                        <div className="lg:hidden border-t border-white/20">
                            <div className="container mx-auto px-4 py-6 space-y-3">
                                {[
                                    { href: '/', label: trans('home'), icon: HomeIcon },
                                    { href: '/about', label: trans('about_festival'), icon: AboutIcon },
                                    { href: '/contact', label: trans('contact_us'), icon: ContactIcon },
                                ].map((item, index) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            className={`flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-xl text-sm font-semibold font-['iransansX'] transition-all duration-200 ${
                                                isScrolled
                                                    ? 'text-gray-700 hover:bg-secondary-50 hover:text-secondary-600'
                                                    : 'text-white hover:bg-white/10'
                                            }`}
                                            onClick={() => setShowingNavigationDropdown(false)}
                                        >
                                            <IconComponent className="w-5 h-5" />
                                            <span>{item.label}</span>
                                        </Link>
                                    );
                                })}
                                
                                <div className="pt-4 border-t border-white/20">
                                    <LanguageSwitcherCompact />
                                </div>
                                
                                {!auth.user ? (
                                    <button
                                        onClick={() => {
                                            setShowAuthModal(true);
                                            setShowingNavigationDropdown(false);
                                        }}
                                        className={`w-full px-4 py-3 rounded-xl font-bold font-['iransansX'] transition-all duration-200 ${
                                            isScrolled
                                                ? 'bg-secondary-600 text-white hover:bg-secondary-700'
                                                : 'bg-white text-secondary-600 hover:bg-secondary-100'
                                        }`}
                                    >
                                        {trans('login')} / {trans('register')}
                                    </button>
                                ) : (
                                    <>
                                        <div className="px-4 py-2 rounded-xl bg-white/10">
                                            <p className={`text-sm font-semibold font-['iransansX'] ${
                                                isScrolled ? 'text-gray-800' : 'text-white'
                                            }`}>
                                                {trans('welcome')}، {auth.user.first_name || auth.user.name}
                                            </p>
                                            <p className={`text-xs font-['iransansX'] ${
                                                isScrolled ? 'text-gray-600' : 'text-white/80'
                                            }`}>
                                                {getUserRoleDisplayName(auth.user_type)}
                                            </p>
                                        </div>
                                        {getRoleBasedShortcuts(auth.user_type).map((shortcut, index) => {
                                            const IconComponent = shortcut.icon;
                                            return (
                                                <Link
                                                    key={index}
                                                    href={shortcut.href}
                                                    className={`flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-xl text-sm font-semibold font-['iransansX'] transition-all duration-200 ${
                                                        isScrolled
                                                            ? 'text-gray-700 hover:bg-secondary-50'
                                                            : 'text-white hover:bg-white/10'
                                                    }`}
                                                    onClick={() => setShowingNavigationDropdown(false)}
                                                >
                                                    <IconComponent className="w-5 h-5" />
                                                    <span>{shortcut.label}</span>
                                                </Link>
                                            );
                                        })}
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="flex items-center space-x-3 space-x-reverse w-full px-4 py-3 rounded-xl text-sm font-semibold font-['iransansX'] text-red-500 hover:bg-red-50 transition-all duration-200"
                                            onClick={() => setShowingNavigationDropdown(false)}
                                        >
                                            <ExitIcon className="w-5 h-5" />
                                            <span>{trans('logout')}</span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </header>

                {/* Main Content with padding for fixed header */}
                <main className="pt-20 md:pt-28 lg:pt-28 container mx-auto px-4 py-8">
                    {children}
                </main>

                {/* Modern Footer */}
                <footer className="relative mt-20 bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 text-white overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute top-20 right-20 w-72 h-72 bg-primary-400 rounded-full filter blur-3xl"></div>
                        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-300 rounded-full filter blur-3xl"></div>
                    </div>
                    
                    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
                            {/* Logo and Description */}
                            <div className="lg:col-span-1">
                                <Link href="/" className="inline-block mb-6">
                                    <LogoIcon className="h-16 w-auto" />
                                </Link>
                                <h3 className="text-2xl font-black mb-4 font-['iransansX']">{trans('site_title')}</h3>
                                <p className="text-gray-300 text-sm leading-relaxed font-['iransansX'] mb-6">
                                    {trans('site_description')}
                                </p>
                                {/* Social Media */}
                                <div className="flex space-x-4 space-x-reverse">
                                    <a 
                                        href="https://t.me/iranian_route" 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-white/10 hover:bg-primary-600 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 group"
                                        aria-label="Telegram"
                                    >
                                        <TelegramIcon className="w-5 h-5 text-white group-hover:text-white transition-colors" />
                                    </a>
                                    <a 
                                        href="https://www.instagram.com/iranianroute" 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-white/10 hover:bg-pink-600 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 group"
                                        aria-label="Instagram"
                                    >
                                        <InstagramIcon className="w-5 h-5 text-white group-hover:text-white transition-colors" />
                                    </a>
                                </div>
                            </div>

                            {/* Quick Access */}
                            <div>
                                <h4 className="text-lg font-bold mb-6 font-['iransansX'] border-b border-white/20 pb-3">{trans('quick_access')}</h4>
                                <ul className="space-y-3">
                                    {[
                                        { href: '/', label: trans('home') },
                                        { href: '/about', label: trans('about_us') },
                                        { href: '/contact', label: trans('contact_us') },
                                    ].map((link, index) => (
                                        <li key={index}>
                                            <Link 
                                                href={link.href}
                                                className="text-gray-300 hover:text-white transition-colors duration-300 font-['iransansX'] flex items-center space-x-2 space-x-reverse group"
                                            >
                                                <span className="w-1.5 h-1.5 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                                <span>{link.label}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Contact Info */}
                            <div>
                                <h4 className="text-lg font-bold mb-6 font-['iransansX'] border-b border-white/20 pb-3">{trans('contact_us')}</h4>
                                <ul className="space-y-4">
                                    <li className="flex items-start space-x-3 space-x-reverse group">
                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 transition-colors duration-300">
                                            <PhoneIcon className="w-5 h-5" />
                                        </div>
                                        <a href="tel:+989392129628" className="text-gray-300 hover:text-white transition-colors font-['iransansX']">
                                            <p className="text-sm text-gray-400 font-['iransansX'] mb-1">{trans('phone')}</p>
                                            <p className="text-gray-300 font-['iransansX']">
                                                {trans('phone_details')}
                                            </p>
                                        </a>
                                    </li>
                                    <li className="flex items-start space-x-3 space-x-reverse group">
                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 transition-colors duration-300">
                                            <EmailIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 font-['iransansX'] mb-1">{trans('email')}</p>
                                            <a href="mailto:info@iranianrouteart.ir" className="text-gray-300 hover:text-white transition-colors font-['iransansX']">
                                                Iranianrouteartfestival@gmail.com
                                            </a>
                                        </div>
                                    </li>
                                    <li className="flex items-start space-x-3 space-x-reverse group">
                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 transition-colors duration-300">
                                            <TelegramIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 font-['iransansX'] mb-1">{trans('telegram')}</p>
                                            <a href="https://t.me/iranian_route" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors font-['iransansX']">
                                                @iranian_route
                                            </a>
                                        </div>
                                    </li>
                                    <li className="flex items-start space-x-3 space-x-reverse group">
                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 transition-colors duration-300">
                                            <LocationIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 font-['iransansX'] mb-1">{trans('address')}</p>
                                            <p className="text-gray-300 font-['iransansX']">
                                                {trans('address_details')}
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Newsletter / Info */}
                            <div>
                                <h4 className="text-lg font-bold mb-6 font-['iransansX'] border-b border-white/20 pb-3">{trans('more_info')}</h4>
                                <p className="text-gray-300 text-sm leading-relaxed font-['iransansX'] mb-6">
                                    {trans('follow_social_media')}
                                </p>
                                <Link 
                                    href="/about"
                                    className="inline-flex items-center space-x-2 space-x-reverse px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-xl font-semibold font-['iransansX'] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    <span>{trans('about_festival')}</span>
                                    <svg className="w-5 h-5 transform -rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="border-t border-white/20 pt-8 mt-8">
                            <div className="flex flex-col items-center justify-center space-y-3">
                                <p className="text-gray-400 text-[10px] sm:text-xs text-center font-['iransansX'] leading-relaxed px-4">
                                    {trans('festival_collaboration')}
                                </p>
                                <p className="text-gray-400 text-sm text-center font-['iransansX']">
                                    © 2025 {trans('site_title')}. {trans('all_rights_reserved')}.
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
            
            {/* Auth Modal */}
            <AuthModal 
                isOpen={showAuthModal} 
                onClose={() => setShowAuthModal(false)} 
            />
            
            {/* Toast Notification */}
            <Toast />
            
            {/* Art Registration Success Modal */}
            <ArtRegistrationSuccessModal />
        </>
    );
}
