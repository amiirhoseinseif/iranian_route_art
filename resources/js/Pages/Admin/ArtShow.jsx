import React, { useMemo, useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useTranslation } from '@/Utils/translation';

const STATUS_LABELS = {
    approved: 'تایید شده',
    pending: 'در انتظار',
    rejected: 'رد شده',
};

export default function ArtShow({ art: initialArt }) {
    const { auth } = usePage().props;
    const { getLocale, isRTL } = useTranslation();
    const locale = getLocale();
    const rtl = isRTL();

    const [art, setArt] = useState(initialArt);
    const [processing, setProcessing] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const statusBadgeClass = useMemo(() => {
        switch (art.status) {
            case 'approved':
                return 'bg-secondary-200 text-secondary-800';
            case 'pending':
                return 'bg-secondary-100 text-secondary-700';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }, [art.status]);

    const resolveLabel = (field) => {
        if (!field) return '';
        if (locale === 'fa') {
            return field.display_name_fa || field.display_name || field.display_name_en || field.field_name;
        }
        return field.display_name_en || field.display_name || field.display_name_fa || field.field_name;
    };

    const renderFieldValue = (field) => {
        if (!field) {
            return <span className="text-gray-400 font-['iransansX']">—</span>;
        }

        const { value, files = [] } = field;

        if (files.length > 0) {
            return (
                <div className="flex flex-col gap-2">
                    {files.map((fileUrl, index) => (
                        <a
                            key={`${field.id || field.field_requirement_id}-${index}`}
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:underline font-['iransansX']"
                        >
                            {locale === 'fa' ? `دانلود فایل ${files.length > 1 ? index + 1 : ''}` : `Download file ${files.length > 1 ? index + 1 : ''}`}
                        </a>
                    ))}
                </div>
            );
        }

        if (Array.isArray(value)) {
            return (
                <ul className="list-disc pr-5 space-y-1 text-gray-700 font-['iransansX']">
                    {value.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            );
        }

        if (value && typeof value === 'object') {
            return (
                <pre className="whitespace-pre-wrap bg-gray-100 rounded-lg p-3 text-sm text-gray-700 font-['iransansX']">
                    {JSON.stringify(value, null, 2)}
                </pre>
            );
        }

        if (value) {
            return <span className="text-gray-800 font-['iransansX']">{value}</span>;
        }

        return <span className="text-gray-400 font-['iransansX']">—</span>;
    };

    const handleStatusChange = async (newStatus) => {
        let payload = { status: newStatus };
        if (newStatus === 'rejected') {
            const reason = window.prompt(locale === 'fa' ? 'دلیل رد شدن را وارد کنید:' : 'Enter rejection reason:');
            if (reason === null) {
                return;
            }
            payload.rejection_reason = reason;
        }

        setProcessing(true);
        setMessage(null);
        setError(null);

        try {
            const response = await fetch(`/api/admin/arts/${art.id}/status`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${auth?.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || (locale === 'fa' ? 'خطا در بروزرسانی وضعیت' : 'Failed to update status'));
                return;
            }

            const data = await response.json();
            setArt(data.data);
            setMessage(locale === 'fa' ? 'وضعیت اثر بروزرسانی شد.' : 'Art status updated.');
        } catch (err) {
            setError(locale === 'fa' ? 'خطا در ارتباط با سرور' : 'Server communication error');
        } finally {
            setProcessing(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm(locale === 'fa' ? 'آیا از حذف این اثر مطمئن هستید؟' : 'Are you sure you want to delete this art?')) {
            return;
        }

        setProcessing(true);
        setMessage(null);
        setError(null);

        try {
            const response = await fetch(`/api/admin/arts/${art.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${auth?.access_token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || (locale === 'fa' ? 'حذف اثر ناموفق بود' : 'Failed to delete art'));
                return;
            }

            router.visit('/admin/arts');
        } catch (err) {
            setError(locale === 'fa' ? 'خطا در ارتباط با سرور' : 'Server communication error');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <FestivalLayout title={locale === 'fa' ? `جزئیات اثر - ${art.title}` : `Artwork Details - ${art.title}`}>
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className={`text-3xl font-bold text-gray-900 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                            {locale === 'fa' ? 'جزئیات اثر هنری' : 'Artwork Details'}
                        </h1>
                        <p className={`mt-2 text-gray-600 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                            {locale === 'fa' ? 'اطلاعات کامل اثر ارسال شده توسط هنرمند' : 'Full submission details submitted by the artist'}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/arts"
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-['iransansX']"
                        >
                            {locale === 'fa' ? 'بازگشت به لیست' : 'Back to list'}
                        </Link>
                        <SecondaryButton onClick={handleDelete} disabled={processing}>
                            {locale === 'fa' ? 'حذف اثر' : 'Delete'}
                        </SecondaryButton>
                    </div>
                </div>

                {(message || error) && (
                    <div
                        className={`rounded-xl px-4 py-3 ${rtl ? "font-['iransansX']" : "font-['iransansX']"} ${
                            error ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}
                    >
                        {error || message}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <article className="bg-white rounded-2xl shadow-md p-6 lg:col-span-2 space-y-4">
                        <header className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className={`text-2xl font-semibold text-gray-900 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                                    {art.title}
                                </h2>
                                <p className={`text-sm text-gray-500 mt-1 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                                    {locale === 'fa' ? 'ارسال شده در' : 'Submitted on'} {new Date(art.created_at).toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US')}
                                </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadgeClass}`}>
                                {STATUS_LABELS[art.status] || art.status}
                            </span>
                        </header>

                        <section className="space-y-4">
                            <div>
                                <h3 className={`text-lg font-semibold text-gray-800 mb-2 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                                    {locale === 'fa' ? 'رشته هنری' : 'Discipline'}
                                </h3>
                                <p className={`text-gray-700 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                                    {locale === 'fa'
                                        ? art.art_field?.name || 'نامشخص'
                                        : art.art_field?.name_en || art.art_field?.name || 'Unknown'}
                                </p>
                            </div>

                            <div>
                                <h3 className={`text-lg font-semibold text-gray-800 mb-2 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                                    {locale === 'fa' ? 'توضیحات' : 'Description'}
                                </h3>
                                <p className={`text-gray-700 leading-7 whitespace-pre-wrap ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                                    {art.description || (locale === 'fa' ? 'بدون توضیحات' : 'No description provided')}
                                </p>
                            </div>

                            {art.rejection_reason && (
                                <div className="border border-red-200 bg-red-50 rounded-xl p-4">
                                    <h4 className={`text-sm font-semibold text-red-800 mb-2 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                                        {locale === 'fa' ? 'دلیل رد شدن' : 'Rejection Reason'}
                                    </h4>
                                    <p className={`text-red-700 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                                        {art.rejection_reason}
                                    </p>
                                </div>
                            )}
                        </section>
                    </article>

                    <aside className="bg-white rounded-2xl shadow-md p-6 space-y-4">
                        <h3 className={`text-xl font-semibold text-gray-900 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                            {locale === 'fa' ? 'اطلاعات هنرمند' : 'Artist Information'}
                        </h3>
                        <div className="space-y-3 text-sm text-gray-700">
                            <div>
                                <span className="block text-gray-500 font-['iransansX']">
                                    {locale === 'fa' ? 'نام کامل' : 'Full Name'}
                                </span>
                                <span className="block font-['iransansX']">
                                    {art.artist ? `${art.artist.first_name || ''} ${art.artist.last_name || ''}`.trim() : (locale === 'fa' ? 'نامشخص' : 'Unknown')}
                                </span>
                            </div>
                            <div>
                                <span className="block text-gray-500 font-['iransansX']">
                                    {locale === 'fa' ? 'ایمیل' : 'Email'}
                                </span>
                                <span className="block font-['iransansX']">{art.artist?.email || '—'}</span>
                            </div>
                            <div>
                                <span className="block text-gray-500 font-['iransansX']">
                                    {locale === 'fa' ? 'شماره تماس' : 'Phone'}
                                </span>
                                <span className="block font-['iransansX']">{art.artist?.phone || '—'}</span>
                            </div>
                            <div>
                                <span className="block text-gray-500 font-['iransansX']">
                                    {locale === 'fa' ? 'محل زندگی' : 'Location'}
                                </span>
                                <span className="block font-['iransansX']">
                                    {art.artist?.country || art.artist?.city ? `${art.artist?.country || ''}${art.artist?.country && art.artist?.city ? '، ' : ''}${art.artist?.city || ''}` : '—'}
                                </span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4 space-y-3">
                            <h4 className={`text-sm font-semibold text-gray-900 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                                {locale === 'fa' ? 'مدیریت وضعیت اثر' : 'Manage Status'}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                <PrimaryButton
                                    type="button"
                                    disabled={processing || art.status === 'approved'}
                                    onClick={() => handleStatusChange('approved')}
                                    className="bg-secondary-600 hover:bg-secondary-700"
                                >
                                    {locale === 'fa' ? 'تایید اثر' : 'Approve'}
                                </PrimaryButton>
                                <SecondaryButton
                                    type="button"
                                    disabled={processing || art.status === 'pending'}
                                    onClick={() => handleStatusChange('pending')}
                                >
                                    {locale === 'fa' ? 'در انتظار' : 'Mark Pending'}
                                </SecondaryButton>
                                <button
                                    type="button"
                                    disabled={processing || art.status === 'rejected'}
                                    onClick={() => handleStatusChange('rejected')}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-['iransansX'] disabled:bg-red-300"
                                >
                                    {locale === 'fa' ? 'رد اثر' : 'Reject'}
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>

                <section className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className={`text-2xl font-semibold text-gray-900 mb-4 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                        {locale === 'fa' ? 'اطلاعات تکمیلی فرم' : 'Submission Details'}
                    </h2>
                    {art.field_details && art.field_details.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                            {art.field_details.map((field) => (
                                <div key={`${field.field_requirement_id || field.field_name}`} className="py-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className={`text-sm font-semibold text-gray-800 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                                                {resolveLabel(field)}
                                                {field.requirement_type === 'required' && <span className="text-red-500 mr-1">*</span>}
                                            </h3>
                                            {field.field_type && (
                                                <span className="text-xs text-gray-400 font-['iransansX']">
                                                    {locale === 'fa' ? `نوع فیلد: ${field.field_type}` : `Field type: ${field.field_type}`}
                                                </span>
                                            )}
                                        </div>
                                        <div className={`text-sm text-gray-700 leading-7 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                                            {renderFieldValue(field)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className={`text-gray-500 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                            {locale === 'fa' ? 'هیچ داده‌ای برای این اثر ثبت نشده است.' : 'No additional data submitted for this artwork.'}
                        </p>
                    )}
                </section>
            </div>
        </FestivalLayout>
    );
}
