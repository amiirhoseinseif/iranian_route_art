import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { LogoIcon, HomeIcon, AboutIcon, ContactIcon, TelegramIcon, InstagramIcon, WhatsAppIcon, PaletteIcon, AddIcon, UploadIcon, ProfileIcon, BellIcon, SettingsIcon, UsersIcon, ScaleIcon, ClipboardIcon, StarIcon, ExitIcon, ChartBarIcon, EmailIcon, PhoneIcon, LocationIcon } from '@/Components/SvgIcons';
import Dropdown from '@/Components/Dropdown';

export default function FestivalLayout({ children, title = 'جشنواره هنری مسیر ایران' }) {
    const { auth } = usePage().props;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    
    // Get user role display name
    const getUserRoleDisplayName = (userType) => {
        switch (userType) {
            case 'artist':
                return 'هنرمند';
            case 'admin':
                return 'مدیر';
            case 'judge':
                return 'داور';
            default:
                return 'کاربر';
        }
    };

    // Get role-based shortcuts
    const getRoleBasedShortcuts = (userType) => {
        switch (userType) {
            case 'artist':
                return [
                    { href: route('artist.dashboard'), label: 'داشبورد', icon: HomeIcon },
                    { href: route('artist.arts'), label: 'آثار من', icon: PaletteIcon },
                    { href: route('artist.arts.create'), label: 'ثبت اثر جدید', icon: AddIcon },
                    { href: route('artist.submissions'), label: 'ارسال‌ها', icon: UploadIcon },
                    { href: route('artist.profile'), label: 'پروفایل', icon: ProfileIcon },
                    { href: route('artist.notifications'), label: 'اعلان‌ها', icon: BellIcon },
                    { href: route('artist.settings'), label: 'تنظیمات', icon: SettingsIcon },
                ];
            case 'admin':
                return [
                    { href: route('admin.dashboard'), label: 'داشبورد', icon: HomeIcon },
                    { href: route('admin.artists'), label: 'هنرمندان', icon: UsersIcon },
                    { href: route('admin.arts'), label: 'آثار هنری', icon: PaletteIcon },
                    { href: route('admin.judges'), label: 'داوران', icon: ScaleIcon },
                    { href: route('admin.settings'), label: 'تنظیمات', icon: SettingsIcon },
                    { href: route('admin.reports'), label: 'گزارشات', icon: ChartBarIcon },
                ];
            case 'judge':
                return [
                    { href: route('judge.dashboard'), label: 'داشبورد', icon: HomeIcon },
                    { href: route('judge.assignments'), label: 'وظایف', icon: ClipboardIcon },
                    { href: route('judge.evaluations'), label: 'ارزیابی‌ها', icon: StarIcon },
                    { href: route('judge.profile'), label: 'پروفایل', icon: ProfileIcon },
                    { href: route('judge.settings'), label: 'تنظیمات', icon: SettingsIcon },
                ];
            default:
                return [];
        }
    };

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
                {/* Header */}
                <header className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white shadow-lg">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            {/* Logo and Title */}
                            <div className="flex items-center space-x-4 space-x-reverse">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                    <LogoIcon className="w-10 h-10 text-amber-600" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold font-['Vazirmatn']">جشنواره هنری مسیر ایران</h1>
                                    <p className="text-amber-100 text-sm">Iranian Route Art Festival</p>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
                                <Link href="/" className="hover:text-amber-200 transition-colors font-['Vazirmatn'] flex items-center">
                                    <HomeIcon className="w-4 h-4 ml-1" />
                                    صفحه اصلی
                                </Link>
                                <Link href="/about" className="hover:text-amber-200 transition-colors font-['Vazirmatn'] flex items-center">
                                    <AboutIcon className="w-4 h-4 ml-1" />
                                    درباره جشنواره
                                </Link>
                                <Link href="/artists" className="hover:text-amber-200 transition-colors font-['Vazirmatn'] flex items-center">
                                    هنرمندان
                                </Link>
                                <Link href="/arts" className="hover:text-amber-200 transition-colors font-['Vazirmatn'] flex items-center">
                                    آثار هنری
                                </Link>
                                <Link href="/contact" className="hover:text-amber-200 transition-colors font-['Vazirmatn'] flex items-center">
                                    <ContactIcon className="w-4 h-4 ml-1" />
                                    تماس با ما
                                </Link>
                            </nav>

                            {/* Auth Section */}
                            {auth.user ? (
                                // Logged in user section
                                <div className="flex items-center space-x-4 space-x-reverse">
                                    <div className="hidden md:block text-right">
                                        <p className="text-sm text-amber-100 font-['Vazirmatn']">
                                            خوش آمدید، {auth.user.first_name || auth.user.name}
                                        </p>
                                        <p className="text-xs text-amber-200 font-['Vazirmatn']">
                                            {getUserRoleDisplayName(auth.user_type)}
                                        </p>
                                    </div>
                                    
                                    {/* User Dropdown */}
                                    <div className="relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <button className="flex items-center space-x-2 space-x-reverse bg-white text-amber-600 px-4 py-2 rounded-lg font-semibold hover:bg-amber-50 transition-colors font-['Vazirmatn']">
                                                    <span>{auth.user.first_name || auth.user.name}</span>
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
                                                        <span>خروج</span>
                                                    </span>
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>
                            ) : (
                                // Guest user section
                                <div className="flex items-center space-x-4 space-x-reverse">
                                    <Link 
                                        href="/login" 
                                        className="bg-white text-amber-600 px-6 py-2 rounded-lg font-semibold hover:bg-amber-50 transition-colors font-['Vazirmatn']"
                                    >
                                        ورود
                                    </Link>
                                    <Link 
                                        href="/register" 
                                        className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-amber-600 transition-colors font-['Vazirmatn']"
                                    >
                                        ثبت نام
                                    </Link>
                                </div>
                            )}
                        </div>
                        
                        {/* Mobile Navigation */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white hover:bg-opacity-10 transition-colors"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    {/* Mobile Menu */}
                    {showingNavigationDropdown && (
                        <div className="md:hidden bg-white bg-opacity-10 backdrop-blur-sm">
                            <div className="px-4 py-2 space-y-1">
                                <Link href="/" className="block px-3 py-2 text-white hover:bg-white hover:bg-opacity-10 rounded-md font-['Vazirmatn']">
                                    صفحه اصلی
                                </Link>
                                <Link href="/about" className="block px-3 py-2 text-white hover:bg-white hover:bg-opacity-10 rounded-md font-['Vazirmatn']">
                                    درباره جشنواره
                                </Link>
                                <Link href="/artists" className="block px-3 py-2 text-white hover:bg-white hover:bg-opacity-10 rounded-md font-['Vazirmatn']">
                                    هنرمندان
                                </Link>
                                <Link href="/arts" className="block px-3 py-2 text-white hover:bg-white hover:bg-opacity-10 rounded-md font-['Vazirmatn']">
                                    آثار هنری
                                </Link>
                                <Link href="/contact" className="block px-3 py-2 text-white hover:bg-white hover:bg-opacity-10 rounded-md font-['Vazirmatn']">
                                    تماس با ما
                                </Link>
                                
                                {auth.user && (
                                    <>
                                        <div className="border-t border-white border-opacity-20 my-2"></div>
                                        <div className="px-3 py-2">
                                            <p className="text-sm text-amber-100 font-['Vazirmatn']">
                                                خوش آمدید، {auth.user.first_name || auth.user.name}
                                            </p>
                                            <p className="text-xs text-amber-200 font-['Vazirmatn']">
                                                {getUserRoleDisplayName(auth.user_type)}
                                            </p>
                                        </div>
                                        {getRoleBasedShortcuts(auth.user_type).map((shortcut, index) => {
                                            const IconComponent = shortcut.icon;
                                            return (
                                                <Link key={index} href={shortcut.href} className="block px-3 py-2 text-white hover:bg-white hover:bg-opacity-10 rounded-md font-['Vazirmatn']">
                                                    <span className="flex items-center space-x-2 space-x-reverse">
                                                        <IconComponent className="w-4 h-4" />
                                                        <span>{shortcut.label}</span>
                                                    </span>
                                                </Link>
                                            );
                                        })}
                                        <div className="border-t border-white border-opacity-20 my-2"></div>
                                        <Link href={route('logout')} method="post" as="button" className="block w-full text-right px-3 py-2 text-red-200 hover:bg-white hover:bg-opacity-10 rounded-md font-['Vazirmatn']">
                                            <span className="flex items-center space-x-2 space-x-reverse">
                                                <ExitIcon className="w-4 h-4" />
                                                <span>خروج</span>
                                            </span>
                                        </Link>
                                    </>
                                )}
                                
                                {!auth.user && (
                                    <>
                                        <div className="border-t border-white border-opacity-20 my-2"></div>
                                        <Link href="/login" className="block px-3 py-2 text-white hover:bg-white hover:bg-opacity-10 rounded-md font-['Vazirmatn']">
                                            ورود
                                        </Link>
                                        <Link href="/register" className="block px-3 py-2 text-white hover:bg-white hover:bg-opacity-10 rounded-md font-['Vazirmatn']">
                                            ثبت نام
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-4 py-8">
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-gray-800 text-white mt-16">
                    <div className="container mx-auto px-4 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4 font-['Vazirmatn']">جشنواره هنری مسیر ایران</h3>
                                <p className="text-gray-300 text-sm leading-relaxed font-['Vazirmatn']">
                                    جشنواره‌ای برای معرفی و نمایش آثار هنری هنرمندان ایرانی در مسیر هنر و فرهنگ
                                </p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-4 font-['Vazirmatn']">دسترسی سریع</h4>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li><Link href="/about" className="hover:text-white transition-colors">درباره ما</Link></li>
                                    <li><Link href="/rules" className="hover:text-white transition-colors">قوانین جشنواره</Link></li>
                                    <li><Link href="/faq" className="hover:text-white transition-colors">سوالات متداول</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-4 font-['Vazirmatn']">تماس با ما</h4>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li className="flex items-center space-x-2 space-x-reverse">
                                        <EmailIcon className="w-4 h-4" />
                                        <span>info@iranianrouteart.ir</span>
                                    </li>
                                    <li className="flex items-center space-x-2 space-x-reverse">
                                        <PhoneIcon className="w-4 h-4" />
                                        <span>+98-21-12345678</span>
                                    </li>
                                    <li className="flex items-center space-x-2 space-x-reverse">
                                        <LocationIcon className="w-4 h-4" />
                                        <span>تهران، ایران</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-4 font-['Vazirmatn']">شبکه‌های اجتماعی</h4>
                                <div className="flex space-x-4 space-x-reverse">
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                        <TelegramIcon className="w-6 h-6" />
                                    </a>
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                        <InstagramIcon className="w-6 h-6" />
                                    </a>
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                        <WhatsAppIcon className="w-6 h-6" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
                            <p className="font-['Vazirmatn']">
                                © 2025 جشنواره هنری مسیر ایران. تمامی حقوق محفوظ است.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
