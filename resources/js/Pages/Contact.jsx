import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { ContactIcon, TelegramIcon, InstagramIcon, WhatsAppIcon } from '@/Components/SvgIcons';

export default function Contact() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contact');
    };

    const contactInfo = [
        {
            icon: ContactIcon,
            title: 'آدرس',
            details: 'تهران، خیابان ولیعصر، پلاک 123',
            description: 'دفتر مرکزی جشنواره هنری مسیر ایران'
        },
        {
            icon: ContactIcon,
            title: 'تلفن',
            details: '021-12345678',
            description: 'شنبه تا پنج‌شنبه، 9 صبح تا 6 عصر'
        },
        {
            icon: ContactIcon,
            title: 'ایمیل',
            details: 'info@iranianrouteart.ir',
            description: 'پاسخ‌دهی در کمتر از 24 ساعت'
        }
    ];

    const socialMedia = [
        {
            icon: TelegramIcon,
            name: 'تلگرام',
            link: 'https://t.me/iranianrouteart',
            username: '@iranianrouteart'
        },
        {
            icon: InstagramIcon,
            name: 'اینستاگرام',
            link: 'https://instagram.com/iranianrouteart',
            username: '@iranianrouteart'
        },
        {
            icon: WhatsAppIcon,
            name: 'واتساپ',
            link: 'https://wa.me/989101234567',
            username: '09101234567'
        }
    ];

    const faqs = [
        {
            question: 'چگونه می‌توانم در جشنواره شرکت کنم؟',
            answer: 'ابتدا در سایت ثبت نام کنید، سپس رشته هنری خود را انتخاب کرده و آثارتان را آپلود کنید.'
        },
        {
            question: 'آیا شرکت در جشنواره رایگان است؟',
            answer: 'بله، شرکت در جشنواره کاملاً رایگان است و هیچ هزینه‌ای از شرکت کنندگان دریافت نمی‌شود.'
        },
        {
            question: 'چه نوع آثاری قابل ارسال است؟',
            answer: 'آثار هنری در 8 رشته موسیقی، نقاشی، فیلم‌سازی، مجسمه‌سازی، گرافیک، خوشنویسی، عکاسی و معماری قابل ارسال است.'
        },
        {
            question: 'داوری آثار چگونه انجام می‌شود؟',
            answer: 'آثار توسط هیئت داوران متخصص در هر رشته ارزیابی شده و امتیاز و بازخورد ارائه می‌شود.'
        }
    ];

    return (
        <FestivalLayout title="تماس با ما">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ContactIcon className="w-10 h-10" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 font-['Vazirmatn']">
                        تماس با ما
                    </h1>
                    <p className="text-xl text-amber-100 max-w-2xl mx-auto font-['Vazirmatn']">
                        ما اینجا هستیم تا به سوالات شما پاسخ دهیم و راهنماییتان کنیم
                    </p>
                </div>
            </section>

            {/* Contact Info */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {contactInfo.map((info, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <info.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                                    {info.title}
                                </h3>
                                <p className="text-amber-600 font-medium mb-2 font-['Vazirmatn']">
                                    {info.details}
                                </p>
                                <p className="text-gray-600 text-sm font-['Vazirmatn']">
                                    {info.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Social Media */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                                پیام خود را برای ما بفرستید
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                        نام و نام خانوادگی
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all font-['Vazirmatn']"
                                        placeholder="نام خود را وارد کنید"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600 font-['Vazirmatn']">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                        ایمیل
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all font-['Vazirmatn']"
                                        placeholder="ایمیل خود را وارد کنید"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600 font-['Vazirmatn']">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                        موضوع
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all font-['Vazirmatn']"
                                        placeholder="موضوع پیام خود را وارد کنید"
                                        required
                                    />
                                    {errors.subject && (
                                        <p className="mt-1 text-sm text-red-600 font-['Vazirmatn']">
                                            {errors.subject}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                        پیام
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all font-['Vazirmatn']"
                                        placeholder="پیام خود را بنویسید"
                                        required
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-600 font-['Vazirmatn']">
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-6 rounded-xl font-bold text-lg hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-['Vazirmatn']"
                                >
                                    {processing ? 'در حال ارسال...' : 'ارسال پیام'}
                                </button>
                            </form>
                        </div>

                        {/* Social Media */}
                        <div className="space-y-8">
                            <div className="bg-white p-8 rounded-2xl shadow-lg">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                                    ما را در شبکه‌های اجتماعی دنبال کنید
                                </h2>
                                <div className="space-y-4">
                                    {socialMedia.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-all"
                                        >
                                            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center ml-4">
                                                <social.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800 font-['Vazirmatn']">
                                                    {social.name}
                                                </h3>
                                                <p className="text-gray-600 text-sm font-['Vazirmatn']">
                                                    {social.username}
                                                </p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-lg">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                                    ساعات کاری
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-800 font-['Vazirmatn']">شنبه تا چهارشنبه:</span>
                                        <span className="text-gray-600 font-['Vazirmatn']">9:00 - 18:00</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-800 font-['Vazirmatn']">پنج‌شنبه:</span>
                                        <span className="text-gray-600 font-['Vazirmatn']">9:00 - 14:00</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-800 font-['Vazirmatn']">جمعه:</span>
                                        <span className="text-gray-600 font-['Vazirmatn']">تعطیل</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 font-['Vazirmatn']">
                        سوالات متداول
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                                <h3 className="text-lg font-bold text-gray-800 mb-3 font-['Vazirmatn']">
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600 leading-relaxed font-['Vazirmatn']">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </FestivalLayout>
    );
}
