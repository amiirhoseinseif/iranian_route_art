import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

const CheckCircleIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const XMarkIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export default function Toast() {
    const { flash } = usePage().props;
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (flash?.success) {
            setMessage(flash.success);
            setShow(true);
            
            // Auto hide after 5 seconds
            const timer = setTimeout(() => {
                setShow(false);
            }, 5000);
            
            return () => clearTimeout(timer);
        }
    }, [flash?.success]);

    if (!show || !message) {
        return null;
    }

    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 sm:px-0">
            <div className="bg-green-50 border-l-4 border-green-500 rounded-lg shadow-lg p-4 animate-slide-down">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <CheckCircleIcon className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="ml-3 flex-1">
                        <p className="text-sm sm:text-base font-medium text-green-800 font-['iransansX']">
                            {message}
                        </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                        <button
                            onClick={() => setShow(false)}
                            className="inline-flex text-green-500 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md p-1"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

