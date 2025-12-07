import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { useTranslation } from '@/Utils/translation';

const CheckCircleIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export default function ArtRegistrationSuccessModal() {
    const { flash, locale } = usePage().props;
    const { trans } = useTranslation();
    const [show, setShow] = useState(false);
    const [messages, setMessages] = useState([]);
    const isRTL = locale === 'fa';

    useEffect(() => {
        // Check if we have art registration success messages
        if (flash?.art_registration_success) {
            setMessages(flash.art_registration_success);
            setShow(true);
        }
    }, [flash?.art_registration_success]);

    if (!show || !messages || messages.length === 0) {
        return null;
    }

    const title = isRTL ? 'ثبت موفقیت‌آمیز اثر' : 'Artwork Successfully Registered';
    const buttonText = isRTL ? 'متوجه شدم' : 'Got it';

    return (
        <Modal show={show} onClose={() => setShow(false)} maxWidth="lg">
            <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                        <CheckCircleIcon className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 font-['iransansX']">
                        {title}
                    </h3>
                </div>

                {/* Messages */}
                <div className="space-y-4 mb-6">
                    {messages.map((message, index) => (
                        <div 
                            key={index}
                            className={`flex items-start space-x-3 ${isRTL ? 'space-x-reverse' : ''} p-4 bg-gray-50 rounded-xl ${isRTL ? 'border-r-4' : 'border-l-4'} border-primary-500`}
                        >
                            <div className="flex-shrink-0 mt-1">
                                <div className="h-2 w-2 rounded-full bg-primary-500"></div>
                            </div>
                            <p className="text-gray-700 text-base leading-relaxed font-['iransansX'] flex-1">
                                {message}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Close Button */}
                <div className="flex justify-center">
                    <button
                        onClick={() => setShow(false)}
                        className="px-8 py-3 bg-primary-600 text-white rounded-xl font-semibold font-['iransansX'] hover:bg-primary-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </Modal>
    );
}

