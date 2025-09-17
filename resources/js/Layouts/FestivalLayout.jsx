import React from 'react';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { LogoIcon, HomeIcon, AboutIcon, ContactIcon, TelegramIcon, InstagramIcon, WhatsAppIcon } from '@/Components/SvgIcons';

export default function FestivalLayout({ children, title = 'جشنواره هنری مسیر ایران' }) {
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

                            {/* Auth Buttons */}
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
                        </div>
                    </div>
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
                                    <li>📧 info@iranianrouteart.ir</li>
                                    <li>📱 +98-21-12345678</li>
                                    <li>📍 تهران، ایران</li>
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
