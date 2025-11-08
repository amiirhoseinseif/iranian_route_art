import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { useTranslation } from '@/Utils/translation';
import { ContactIcon, TelegramIcon, InstagramIcon, WhatsAppIcon, LocationIcon, PhoneIcon, EmailIcon } from '@/Components/SvgIcons';

export default function Contact() {
    const { trans } = useTranslation();
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
            icon: LocationIcon,
            title: trans('address_title'),
            details: trans('address_details'),
            description: trans('address_desc')
        },
        {
            icon: PhoneIcon,
            title: trans('phone_title'),
            details: trans('phone_details'),
            description: trans('phone_desc')
        },
        {
            icon: EmailIcon,
            title: trans('email_title'),
            details: trans('email_details'),
            description: trans('email_desc')
        }
    ];

    const socialMedia = [
        {
            icon: TelegramIcon,
            name: trans('telegram'),
            link: 'https://t.me/iranian_route',
            username: '@iranian_route'
        },
        {
            icon: InstagramIcon,
            name: trans('instagram'),
            link: 'https://www.instagram.com/iranianroute',
            username: '@iranianroute'
        }
    ];

    const faqs = [
        {
            question: trans('how_to_participate_faq'),
            answer: trans('how_to_participate_faq_answer')
        },
        {
            question: trans('is_free_faq'),
            answer: trans('is_free_faq_answer')
        },
        {
            question: trans('what_art_types_faq'),
            answer: trans('what_art_types_faq_answer')
        },
        {
            question: trans('judging_process_faq'),
            answer: trans('judging_process_faq_answer')
        }
    ];

    return (
        <FestivalLayout title={trans('contact_title')}>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-12 sm:py-16 lg:py-20 transition-all duration-300">
                <div className="container mx-auto px-4 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-bounceIn">
                        <ContactIcon className="w-8 h-8 sm:w-10 sm:h-10" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 font-['Vazirmatn'] animate-fadeIn">
                        {trans('contact_title')}
                    </h1>
                    <p className="text-lg sm:text-xl text-secondary-100 max-w-2xl mx-auto font-['Vazirmatn']">
                        {trans('contact_subtitle')}
                    </p>
                </div>
            </section>

            {/* Contact Info */}
            <section className="py-12 sm:py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
                        {contactInfo.map((info, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-125 cursor-pointer">
                                    <info.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                                    {info.title}
                                </h3>
                                <p className="text-primary-600 font-medium mb-2 font-['Vazirmatn'] text-sm sm:text-base">
                                    {info.details}
                                </p>
                                <p className="text-gray-600 text-xs sm:text-sm font-['Vazirmatn']">
                                    {info.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Social Media */}
            <section className="py-12 sm:py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Contact Form */}
                        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slideDown">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                                {trans('send_message_title')}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                        {trans('full_name')}
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-['Vazirmatn']"
                                        placeholder={trans('enter_name')}
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
                                        {trans('email')}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-['Vazirmatn']"
                                        placeholder={trans('enter_email')}
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
                                        {trans('subject')}
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-['Vazirmatn']"
                                        placeholder={trans('enter_subject')}
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
                                        {trans('message')}
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-['Vazirmatn']"
                                        placeholder={trans('write_message')}
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
                                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-6 rounded-xl font-bold text-base sm:text-lg hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-['Vazirmatn']"
                                >
                                    {processing ? trans('sending') : trans('send_message')}
                                </button>
                            </form>
                        </div>

                        {/* Social Media */}
                        <div className="space-y-6 sm:space-y-8">
                            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slideDown">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                                    {trans('follow_social')}
                                </h2>
                                <div className="space-y-4">
                                    {socialMedia.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-secondary-300 hover:bg-secondary-50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                                        >
                                            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center ml-4 transition-transform duration-300 hover:rotate-12">
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

                            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slideDown">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                                    {trans('working_hours')}
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                        <span className="font-medium text-gray-800 font-['Vazirmatn']">{trans('saturday_to_wednesday')}</span>
                                        <span className="text-gray-600 font-['Vazirmatn']">9:00 - 18:00</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                        <span className="font-medium text-gray-800 font-['Vazirmatn']">{trans('thursday')}</span>
                                        <span className="text-gray-600 font-['Vazirmatn']">9:00 - 14:00</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                        <span className="font-medium text-gray-800 font-['Vazirmatn']">{trans('friday')}</span>
                                        <span className="text-gray-600 font-['Vazirmatn']">{trans('closed')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 sm:py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12 font-['Vazirmatn']">
                        {trans('faq_title')}
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3 font-['Vazirmatn']">
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600 leading-relaxed font-['Vazirmatn'] text-sm sm:text-base">
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
