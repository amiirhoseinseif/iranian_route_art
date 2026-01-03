import React, { useMemo } from 'react';
import { Link } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { useTranslation } from '@/Utils/translation';
import { route } from '@/Utils/route';

const STATUS_LABELS = {
    approved: 'تایید شده',
    pending: 'در انتظار',
    rejected: 'رد شده',
};

export default function ArtShow({ art }) {
    const { getLocale, isRTL, trans } = useTranslation();
    const locale = getLocale();
    const rtl = isRTL();

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
                            download
                            className="text-primary-600 hover:underline font-['iransansX'] flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
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

    return (
        <FestivalLayout title={`${art.title} - ${trans('site_title')}`}>
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className={`text-3xl font-bold text-gray-900 font-['iransansX']`}>
                            {trans('artwork')}
                        </h1>
                        <p className={`mt-2 text-gray-600 font-['iransansX']`}>
                            {trans('artwork_description')}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('artist.arts')}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-['iransansX']"
                        >
                            {trans('view_all_artworks')}
                        </Link>
                        <Link
                            href={route('artist.arts.edit', art.id)}
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-['iransansX']"
                        >
                            {trans('edit')}
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <article className="bg-white rounded-2xl shadow-md p-6 lg:col-span-2 space-y-4">
                        <header className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className={`text-2xl font-semibold text-gray-900 font-['iransansX']`}>
                                    {art.title}
                                </h2>
                                <p className={`text-sm text-gray-500 mt-1 font-['iransansX']`}>
                                    {trans('upload_date')}: {new Date(art.created_at).toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US')}
                                </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium font-['iransansX'] ${statusBadgeClass}`}>
                                {STATUS_LABELS[art.status] || art.status}
                            </span>
                        </header>

                        {art.image && (
                            <div className="rounded-xl overflow-hidden">
                                <img
                                    src={art.image}
                                    alt={art.title}
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        )}

                        <section className="space-y-4">
                            <div>
                                <h3 className={`text-lg font-semibold text-gray-800 mb-2 font-['iransansX']`}>
                                    {trans('art_field_label')}
                                </h3>
                                <p className={`text-gray-700 font-['iransansX']`}>
                                    {locale === 'fa'
                                        ? art.art_field?.name || trans('unknown')
                                        : art.art_field?.name_en || art.art_field?.name || trans('unknown')}
                                </p>
                            </div>

                            <div>
                                <h3 className={`text-lg font-semibold text-gray-800 mb-2 font-['iransansX']`}>
                                    {trans('artwork_description_label')}
                                </h3>
                                <p className={`text-gray-700 leading-7 whitespace-pre-wrap font-['iransansX']`}>
                                    {art.description || trans('description')}
                                </p>
                            </div>

                            {art.year_created && (
                                <div>
                                    <h3 className={`text-lg font-semibold text-gray-800 mb-2 font-['iransansX']`}>
                                        {trans('year_created_label')}
                                    </h3>
                                    <p className={`text-gray-700 font-['iransansX']`}>
                                        {art.year_created}
                                    </p>
                                </div>
                            )}

                            {art.tags && (
                                <div>
                                    <h3 className={`text-lg font-semibold text-gray-800 mb-2 font-['iransansX']`}>
                                        {trans('tags_label')}
                                    </h3>
                                    <p className={`text-gray-700 font-['iransansX']`}>
                                        {art.tags}
                                    </p>
                                </div>
                            )}

                            {art.video_url && (
                                <div>
                                    <h3 className={`text-lg font-semibold text-gray-800 mb-2 font-['iransansX']`}>
                                        {trans('video_url_label')}
                                    </h3>
                                    <a
                                        href={art.video_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary-600 hover:underline font-['iransansX']"
                                    >
                                        {art.video_url}
                                    </a>
                                </div>
                            )}

                            {art.audio_url && (
                                <div>
                                    <h3 className={`text-lg font-semibold text-gray-800 mb-2 font-['iransansX']`}>
                                        {trans('audio_url_label')}
                                    </h3>
                                    <a
                                        href={art.audio_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary-600 hover:underline font-['iransansX']"
                                    >
                                        {art.audio_url}
                                    </a>
                                </div>
                            )}

                            {art.rejection_reason && (
                                <div className="border border-red-200 bg-red-50 rounded-xl p-4">
                                    <h4 className={`text-sm font-semibold text-red-800 mb-2 font-['iransansX']`}>
                                        {trans('rejection_reason_label')}
                                    </h4>
                                    <p className={`text-red-700 font-['iransansX']`}>
                                        {art.rejection_reason}
                                    </p>
                                </div>
                            )}
                        </section>
                    </article>

                    <aside className="bg-white rounded-2xl shadow-md p-6 space-y-4">
                        <h3 className={`text-xl font-semibold text-gray-900 font-['iransansX']`}>
                            {trans('artwork')} {trans('status')}
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <span className={`block text-gray-500 text-sm font-['iransansX'] mb-1`}>
                                    {trans('status')}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium inline-block font-['iransansX'] ${statusBadgeClass}`}>
                                    {STATUS_LABELS[art.status] || art.status}
                                </span>
                            </div>
                            <div>
                                <span className={`block text-gray-500 text-sm font-['iransansX'] mb-1`}>
                                    {trans('upload_date')}
                                </span>
                                <span className={`block text-gray-800 font-['iransansX']`}>
                                    {new Date(art.created_at).toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US')}
                                </span>
                            </div>
                            {art.updated_at && art.updated_at !== art.created_at && (
                                <div>
                                    <span className={`block text-gray-500 text-sm font-['iransansX'] mb-1`}>
                                        {trans('updated_at') || 'آخرین بروزرسانی'}
                                    </span>
                                    <span className={`block text-gray-800 font-['iransansX']`}>
                                        {new Date(art.updated_at).toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US')}
                                    </span>
                                </div>
                            )}
                        </div>

                        {art.evaluations && art.evaluations.length > 0 && (
                            <div className="border-t border-gray-200 pt-4">
                                <h4 className={`text-sm font-semibold text-gray-900 mb-3 font-['iransansX']`}>
                                    {trans('evaluations')}
                                </h4>
                                <div className="space-y-3">
                                    {art.evaluations.map((evaluation) => (
                                        <div key={evaluation.id} className="bg-gray-50 rounded-lg p-3">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className={`text-sm font-medium text-gray-800 font-['iransansX']`}>
                                                    {evaluation.judge ? `${evaluation.judge.first_name} ${evaluation.judge.last_name}` : trans('judge')}
                                                </span>
                                                <span className={`text-sm font-bold text-primary-600 font-['iransansX']`}>
                                                    {evaluation.score}/10
                                                </span>
                                            </div>
                                            {evaluation.comment && (
                                                <p className={`text-xs text-gray-600 font-['iransansX']`}>
                                                    {evaluation.comment}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>
                </div>

                {art.field_values && art.field_values.length > 0 && (
                    <section className="bg-white rounded-2xl shadow-md p-6">
                        <h2 className={`text-2xl font-semibold text-gray-900 mb-4 font-['iransansX']`}>
                            {trans('submission_details') || 'اطلاعات تکمیلی فرم'}
                        </h2>
                        <div className="divide-y divide-gray-200">
                            {art.field_values.map((field) => (
                                <div key={`${field.field_requirement_id || field.field_name}`} className="py-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className={`text-sm font-semibold text-gray-800 font-['iransansX']`}>
                                                {resolveLabel(field)}
                                                {field.requirement_type === 'required' && <span className="text-red-500 mr-1">*</span>}
                                            </h3>
                                            {field.field_type && (
                                                <span className="text-xs text-gray-400 font-['iransansX']">
                                                    {locale === 'fa' ? `نوع فیلد: ${field.field_type}` : `Field type: ${field.field_type}`}
                                                </span>
                                            )}
                                        </div>
                                        <div className={`text-sm text-gray-700 leading-7 font-['iransansX']`}>
                                            {renderFieldValue(field)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </FestivalLayout>
    );
}
