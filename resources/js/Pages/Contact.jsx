import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { ContactIcon, TelegramIcon, InstagramIcon, WhatsAppIcon } from '@/Components/SvgIcons';
import { t, getFontFamily } from '@/Utils/translations';

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
            title: t('messages.address'),
            details: t('messages.office_address'),
            description: t('messages.office_description')
        },
        {
            icon: ContactIcon,
            title: t('messages.phone'),
            details: t('messages.phone_number'),
            description: t('messages.phone_hours')
        },
        {
            icon: ContactIcon,
            title: t('messages.email'),
            details: t('messages.email_address'),
            description: t('messages.email_response')
        }
    ];

    const socialMedia = [
        {
            icon: TelegramIcon,
            name: t('messages.telegram'),
            link: 'https://t.me/iranianrouteart',
            username: '@iranianrouteart'
        },
        {
            icon: InstagramIcon,
            name: t('messages.instagram'),
            link: 'https://instagram.com/iranianrouteart',
            username: '@iranianrouteart'
        },
        {
            icon: WhatsAppIcon,
            name: t('messages.whatsapp'),
            link: 'https://wa.me/989101234567',
            username: '09101234567'
        }
    ];

    const faqs = [
        {
            question: t('messages.faq_1_question'),
            answer: t('messages.faq_1_answer')
        },
        {
            question: t('messages.faq_2_question'),
            answer: t('messages.faq_2_answer')
        },
        {
            question: t('messages.faq_3_question'),
            answer: t('messages.faq_3_answer')
        },
        {
            question: t('messages.faq_4_question'),
            answer: t('messages.faq_4_answer')
        }
    ];

    return (
        <FestivalLayout title={t('messages.contact_us')}>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ContactIcon className="w-10 h-10" />
                    </div>
                    <h1 className={`text-4xl font-bold mb-4 ${getFontFamily()}`}>
                        {t('messages.contact_us')}
                    </h1>
                    <p className={`text-xl text-amber-100 max-w-2xl mx-auto ${getFontFamily()}`}>
                        {t('messages.contact_subtitle')}
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
                                <h3 className={`text-xl font-bold text-gray-800 mb-2 ${getFontFamily()}`}>
                                    {info.title}
                                </h3>
                                <p className={`text-amber-600 font-medium mb-2 ${getFontFamily()}`}>
                                    {info.details}
                                </p>
                                <p className={`text-gray-600 text-sm ${getFontFamily()}`}>
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
                            <h2 className={`text-2xl font-bold text-gray-800 mb-6 ${getFontFamily()}`}>
                                {t('messages.send_message')}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className={`block text-sm font-medium text-gray-700 mb-2 ${getFontFamily()}`}>
                                        {t('messages.full_name')}
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${getFontFamily()}`}
                                        placeholder={t('messages.name_placeholder')}
                                        required
                                    />
                                    {errors.name && (
                                        <p className={`mt-1 text-sm text-red-600 ${getFontFamily()}`}>
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className={`block text-sm font-medium text-gray-700 mb-2 ${getFontFamily()}`}>
                                        {t('messages.email')}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${getFontFamily()}`}
                                        placeholder={t('messages.email_placeholder')}
                                        required
                                    />
                                    {errors.email && (
                                        <p className={`mt-1 text-sm text-red-600 ${getFontFamily()}`}>
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="subject" className={`block text-sm font-medium text-gray-700 mb-2 ${getFontFamily()}`}>
                                        {t('messages.subject')}
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${getFontFamily()}`}
                                        placeholder={t('messages.subject_placeholder')}
                                        required
                                    />
                                    {errors.subject && (
                                        <p className={`mt-1 text-sm text-red-600 ${getFontFamily()}`}>
                                            {errors.subject}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="message" className={`block text-sm font-medium text-gray-700 mb-2 ${getFontFamily()}`}>
                                        {t('messages.message')}
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${getFontFamily()}`}
                                        placeholder={t('messages.message_placeholder')}
                                        required
                                    />
                                    {errors.message && (
                                        <p className={`mt-1 text-sm text-red-600 ${getFontFamily()}`}>
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-6 rounded-xl font-bold text-lg hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${getFontFamily()}`}
                                >
                                    {processing ? t('messages.sending') : t('messages.send_message_button')}
                                </button>
                            </form>
                        </div>

                        {/* Social Media */}
                        <div className="space-y-8">
                            <div className="bg-white p-8 rounded-2xl shadow-lg">
                                <h2 className={`text-2xl font-bold text-gray-800 mb-6 ${getFontFamily()}`}>
                                    {t('messages.follow_us')}
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
                                                <h3 className={`font-bold text-gray-800 ${getFontFamily()}`}>
                                                    {social.name}
                                                </h3>
                                                <p className={`text-gray-600 text-sm ${getFontFamily()}`}>
                                                    {social.username}
                                                </p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-lg">
                                <h2 className={`text-2xl font-bold text-gray-800 mb-6 ${getFontFamily()}`}>
                                    {t('messages.working_hours')}
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className={`font-medium text-gray-800 ${getFontFamily()}`}>{t('messages.saturday_to_wednesday')}</span>
                                        <span className={`text-gray-600 ${getFontFamily()}`}>9:00 - 18:00</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className={`font-medium text-gray-800 ${getFontFamily()}`}>{t('messages.thursday')}</span>
                                        <span className={`text-gray-600 ${getFontFamily()}`}>9:00 - 14:00</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className={`font-medium text-gray-800 ${getFontFamily()}`}>{t('messages.friday')}</span>
                                        <span className={`text-gray-600 ${getFontFamily()}`}>{t('messages.closed')}</span>
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
                    <h2 className={`text-3xl font-bold text-center text-gray-800 mb-12 ${getFontFamily()}`}>
                        {t('messages.faq_title')}
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                                <h3 className={`text-lg font-bold text-gray-800 mb-3 ${getFontFamily()}`}>
                                    {faq.question}
                                </h3>
                                <p className={`text-gray-600 leading-relaxed ${getFontFamily()}`}>
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
