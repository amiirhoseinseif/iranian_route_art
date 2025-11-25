import React, { useState, useEffect, useMemo } from 'react';
import { Link, useForm } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { WarningIcon } from '@/Components/SvgIcons';
import { route } from '@/Utils/route';
import { useTranslation } from '@/Utils/translation';

export default function ArtCreate({ artFields = [], selectedArtFieldId = null, artist = null, isAuthenticated = false }) {
    const { trans, getLocale, isRTL } = useTranslation();
    const locale = getLocale();
    const rtl = isRTL();
    const [selectedArtField, setSelectedArtField] = useState(null);
    const [fieldRequirements, setFieldRequirements] = useState([]);

    const initialFormData = useMemo(() => {
        return { art_field_id: '' };
    }, []);

    const { data, setData, post, processing, errors } = useForm(initialFormData);

    // Pre-select art field if selectedArtFieldId is provided
    useEffect(() => {
        if (selectedArtFieldId && artFields.length > 0 && !selectedArtField) {
            const field = artFields.find(f => f.id === selectedArtFieldId);
            if (field) {
                setSelectedArtField(field);
            }
        }
    }, [selectedArtFieldId, artFields, selectedArtField]);

    useEffect(() => {
        if (selectedArtField && selectedArtField.requirements) {
            const requirements = selectedArtField.requirements
                .filter(req => req.requirement_type !== 'disabled')
                .sort((a, b) => (a.order || 0) - (b.order || 0));
            
            setFieldRequirements(requirements);

            const newData = { art_field_id: selectedArtField.id };
            requirements.forEach(req => {
                if (['file', 'image', 'audio', 'video'].includes(req.field_type)) {
                    newData[req.field_name] = req.validation_rules?.allow_multiple ? [] : null;
                } else if (req.field_type === 'multi_select') {
                    newData[req.field_name] = [];
                } else {
                    newData[req.field_name] = '';
                }
            });
            setData(newData);
        }
    }, [selectedArtField, setData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            return;
        }
        post(route('artist.arts.store'), {
            forceFormData: true,
        });
    };

    const handleFieldChange = (requirement, eventOrValue) => {
        const { field_name, field_type, validation_rules } = requirement;
        if (['file', 'image', 'audio', 'video'].includes(field_type)) {
            if (validation_rules?.allow_multiple) {
                const files = Array.from(eventOrValue.target.files || []);
                setData(field_name, files);
            } else {
                const file = eventOrValue.target.files?.[0] || null;
                setData(field_name, file);
            }
        } else if (field_type === 'multi_select') {
            const selectedValues = Array.from(eventOrValue.target.selectedOptions || []).map(option => option.value);
            setData(field_name, selectedValues);
        } else if (field_type === 'select') {
            setData(field_name, eventOrValue.target.value);
        } else {
            setData(field_name, typeof eventOrValue === 'string' ? eventOrValue : eventOrValue.target.value);
        }
    };

    const renderField = (requirement) => {
        const {
            field_name,
            field_type,
            requirement_type,
            validation_rules,
            display_name_translated,
            description_translated,
            display_name,
        } = requirement;
        const isRequired = requirement_type === 'required';
        const error = errors[field_name];

        const labelText = locale === 'fa'
            ? display_name_translated || display_name || field_name
            : display_name_translated || display_name || field_name;

        const descriptionTextContent = description_translated || '';

        const commonProps = {
            id: field_name,
            name: validation_rules?.allow_multiple && ['file', 'image', 'audio', 'video'].includes(field_type)
                ? `${field_name}[]`
                : field_name,
            required: isRequired,
            className: `w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${rtl ? "font-['iransansX']" : "font-['iransansX']"} ${error ? 'border-red-500' : ''}`,
        };

        const label = (
            <InputLabel htmlFor={field_name} value={labelText}>
                {isRequired && <span className="text-red-500">*</span>}
            </InputLabel>
        );

        const descriptionBlock = descriptionTextContent && (
            <p className={`text-sm text-gray-500 mt-1 ${locale === 'fa' ? "font-['iransansX']" : "font-['iransansX']"}`}>
                {descriptionTextContent}
            </p>
        );

        const formatValidationInfo = () => {
            if (!validation_rules) return null;
            const lines = [];
            if (validation_rules.allowed_formats) {
                const formats = validation_rules.allowed_formats.join(', ');
                lines.push(
                    locale === 'fa'
                        ? `فرمت‌های مجاز: ${formats}`
                        : `Allowed formats: ${formats}`
                );
            }
            if (validation_rules.max_size) {
                lines.push(
                    locale === 'fa'
                        ? `حداکثر حجم هر فایل: ${formatFileSize(validation_rules.max_size, locale)}`
                        : `Max file size: ${formatFileSize(validation_rules.max_size, locale)}`
                );
            }
            if (validation_rules.min_items) {
                lines.push(
                    locale === 'fa'
                        ? `حداقل تعداد: ${validation_rules.min_items}`
                        : `Minimum items: ${validation_rules.min_items}`
                );
            }
            if (validation_rules.max_items) {
                lines.push(
                    locale === 'fa'
                        ? `حداکثر تعداد: ${validation_rules.max_items}`
                        : `Maximum items: ${validation_rules.max_items}`
                );
            }
            if (validation_rules.max_length) {
                lines.push(
                    locale === 'fa'
                        ? `حداکثر طول متن: ${validation_rules.max_length} کاراکتر`
                        : `Max length: ${validation_rules.max_length} characters`
                );
            }
            if (!lines.length) return null;
            return (
                <div className={`text-sm text-gray-500 mt-2 space-y-1 ${locale === 'fa' ? "font-['iransansX']" : "font-['iransansX']"}`}>
                    {lines.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            );
        };

        switch (field_type) {
            case 'textarea':
                return (
                    <div key={field_name} className="col-span-full">
                        {label}
                        <textarea
                            {...commonProps}
                            value={data[field_name] || ''}
                            onChange={(e) => handleFieldChange(requirement, e)}
                            rows={validation_rules?.rows || 4}
                            maxLength={validation_rules?.max_length}
                        />
                        {descriptionBlock}
                        {formatValidationInfo()}
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        {validation_rules?.max_length && (
                            <p className={`text-sm text-gray-500 mt-2 ${locale === 'fa' ? "font-['iransansX']" : "font-['iransansX']"}`}>
                                {(data[field_name] || '').length}/{validation_rules.max_length}
                            </p>
                        )}
                    </div>
                );

            case 'file':
            case 'image':
            case 'audio':
            case 'video':
                const acceptMap = {
                    image: 'image/*',
                    audio: 'audio/*',
                    video: 'video/*',
                    file: '*/*',
                };
                const acceptValue = validation_rules?.allowed_formats
                    ? validation_rules.allowed_formats.map(f => getMimeType(f)).join(',')
                    : acceptMap[field_type] || '*/*';
                return (
                    <div key={field_name} className="col-span-full">
                        {label}
                        <input
                            {...commonProps}
                            type="file"
                            multiple={validation_rules?.allow_multiple}
                            accept={acceptValue}
                            onChange={(e) => handleFieldChange(requirement, e)}
                        />
                        {descriptionBlock}
                        {formatValidationInfo()}
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                );

            case 'select': {
                let options = validation_rules?.options || [];
                if (validation_rules?.options_by_country) {
                    const dependentValue = data[validation_rules.dependent_on] || '';
                    options = dependentValue
                        ? validation_rules.options_by_country[dependentValue] || []
                        : [];
                }
                return (
                    <div key={field_name}>
                        {label}
                        <select
                            {...commonProps}
                            value={data[field_name] || ''}
                            onChange={(e) => handleFieldChange(requirement, e)}
                            className={`${commonProps.className} appearance-none`}
                        >
                            <option value="">
                                {isRequired
                                    ? locale === 'fa' ? 'انتخاب کنید' : 'Select an option'
                                    : locale === 'fa' ? 'اختیاری' : 'Optional'}
                            </option>
                            {options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        {descriptionBlock}
                        {formatValidationInfo()}
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                );
            }

            case 'multi_select':
                return (
                    <div key={field_name}>
                        {label}
                        <select
                            {...commonProps}
                            multiple
                            value={data[field_name] || []}
                            onChange={(e) => handleFieldChange(requirement, e)}
                            className={`${commonProps.className} min-h-[160px]`}
                        >
                            {(validation_rules?.options || []).map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        {descriptionBlock}
                        {formatValidationInfo()}
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                );

            case 'number':
                return (
                    <div key={field_name}>
                        {label}
                        <input
                            {...commonProps}
                            type="number"
                            value={data[field_name] || ''}
                            onChange={(e) => handleFieldChange(requirement, e)}
                            min={validation_rules?.min}
                            max={validation_rules?.max}
                        />
                        {descriptionBlock}
                        {formatValidationInfo()}
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                );

            case 'email':
                return (
                    <div key={field_name}>
                        {label}
                        <input
                            {...commonProps}
                            type="email"
                            value={data[field_name] || ''}
                            onChange={(e) => handleFieldChange(requirement, e)}
                        />
                        {descriptionBlock}
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                );

            case 'date':
                return (
                    <div key={field_name}>
                        {label}
                        <input
                            {...commonProps}
                            type="date"
                            value={data[field_name] || ''}
                            onChange={(e) => handleFieldChange(requirement, e)}
                        />
                        {descriptionBlock}
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                );

            default:
                return (
                    <div key={field_name}>
                        {label}
                        <input
                            {...commonProps}
                            type="text"
                            value={data[field_name] || ''}
                            onChange={(e) => handleFieldChange(requirement, e)}
                            maxLength={validation_rules?.max_length}
                        />
                        {descriptionBlock}
                        {formatValidationInfo()}
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                );
        }
    };

    function formatFileSize(kilobytes, currentLocale) {
        if (!kilobytes) return '';
        const kb = Number(kilobytes);
        if (Number.isNaN(kb)) return '';
        if (kb < 1024) {
            return currentLocale === 'fa' ? `${kb} کیلوبایت` : `${kb} KB`;
        }
        const mb = kb / 1024;
        if (mb < 1024) {
            return currentLocale === 'fa' ? `${mb.toFixed(2)} مگابایت` : `${mb.toFixed(2)} MB`;
        }
        const gb = mb / 1024;
        return currentLocale === 'fa' ? `${gb.toFixed(2)} گیگابایت` : `${gb.toFixed(2)} GB`;
    }

    function getMimeType(format) {
        const mimeTypes = {
            jpeg: 'image/jpeg',
            jpg: 'image/jpeg',
            png: 'image/png',
            pdf: 'application/pdf',
            mp3: 'audio/mpeg',
            wav: 'audio/wav',
            mp4: 'video/mp4',
            mov: 'video/quicktime',
        };
        return mimeTypes[format.toLowerCase()] || '*/*';
    }

    const requiredFields = fieldRequirements.filter(req => req.requirement_type === 'required');
    const optionalFields = fieldRequirements.filter(req => req.requirement_type === 'optional');

    const metadataTranslated = selectedArtField?.metadata_translated || {};
    const submissionDeadline = metadataTranslated.submission_deadline;
    const guidelinesText = metadataTranslated.guidelines;
    const notesText = metadataTranslated.notes;

    return (
        <FestivalLayout title={`${trans('submit_artwork')} - ${trans('site_title')}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="mb-6 sm:mb-8 text-center">
                    <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                        {trans('submit_artwork_title')}
                    </h1>
                    <p className={`text-base sm:text-lg lg:text-xl text-gray-600 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                        {trans('festival_subtitle')}
                    </p>
                    <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <p className={`text-sm sm:text-base text-blue-800 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                            <strong>{trans('festival_theme')}:</strong>{' '}
                            {trans('festival_theme_description')}
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                        <div className="border-b border-gray-200 pb-6 sm:pb-8">
                            <h2 className={`text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                                {trans('choose_discipline')} <span className="text-red-500">*</span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                                {artFields.map((field) => (
                                    <div
                                        key={field.id}
                                        onClick={() => {
                                            setSelectedArtField(field);
                                            setData('art_field_id', field.id);
                                        }}
                                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                                            selectedArtField?.id === field.id
                                                ? 'border-primary-500 bg-primary-50'
                                                : 'border-gray-200 hover:border-secondary-300'
                                        } ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}
                                    >
                                        <h3 className="font-bold text-gray-800 mb-2">{locale === 'fa' ? field.name : field.name_en || field.name}</h3>
                                        <p className="text-sm text-gray-600">
                                            {locale === 'fa'
                                                ? field.description_translated || 'توضیحات رشته هنری'
                                                : field.description_translated || 'Discipline description'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            {errors.art_field_id && <p className="text-red-500 text-sm mt-2">{errors.art_field_id}</p>}
                        </div>

                        {selectedArtField?.metadata_translated && (
                            <div className="border-b border-gray-200 pb-6 sm:pb-8">
                                <h2 className={`text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                                    {trans('submission_guide')} - {metadataTranslated.headline || (locale === 'fa' ? selectedArtField.name : selectedArtField.name_en || selectedArtField.name)}
                                </h2>
                                {submissionDeadline && (
                                    <div className={`${rtl ? "font-['iransansX']" : "font-['iransansX']"} text-base sm:text-lg text-primary-700 font-semibold mb-3 sm:mb-4`}>
                                        {trans('submission_deadline')}: {submissionDeadline}
                                    </div>
                                )}
                                {guidelinesText && (
                                    <pre className={`${rtl ? "font-['iransansX']" : "font-['iransansX']"} whitespace-pre-wrap text-gray-700 leading-8 bg-primary-50/40 border border-primary-100 rounded-2xl p-6`}> 
                                        {guidelinesText}
                                    </pre>
                                )}
                                {notesText && (
                                    <pre className={`${rtl ? "font-['iransansX']" : "font-['iransansX']"} whitespace-pre-wrap text-gray-600 leading-7 bg-yellow-50 border border-yellow-100 rounded-2xl p-4 mt-4`}>
                                        {notesText}
                                    </pre>
                                )}
                            </div>
                        )}

                        {!isAuthenticated && selectedArtField && (
                            <div className="border-b border-gray-200 pb-6 sm:pb-8">
                                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 sm:p-6">
                                    <h3 className={`text-lg sm:text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                                        <WarningIcon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 flex-shrink-0" />
                                        <span>{trans('registration_required_message')}</span>
                                    </h3>
                                    <p className={`text-sm sm:text-base text-yellow-700 mb-4 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                                        {trans('registration_required_description')}
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                        <Link
                                            href="/artist/register"
                                            className={`flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors text-center text-sm sm:text-base ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}
                                        >
                                            {trans('register')}
                                        </Link>
                                        <Link
                                            href="/login"
                                            className={`flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors text-center text-sm sm:text-base ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}
                                        >
                                            {trans('login')}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isAuthenticated && selectedArtField && requiredFields.length > 0 && (
                            <div className="border-b border-gray-200 pb-6 sm:pb-8">
                                <h2 className={`text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                                    {trans('required_information')} <span className="text-red-500">*</span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    {requiredFields.map(requirement => renderField(requirement))}
                                </div>
                            </div>
                        )}

                        {isAuthenticated && selectedArtField && optionalFields.length > 0 && (
                            <div className="border-b border-gray-200 pb-6 sm:pb-8">
                                <h2 className={`text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                                    {trans('optional_information')}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    {optionalFields.map(requirement => renderField(requirement))}
                                </div>
                            </div>
                        )}

                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 sm:p-6">
                            <h3 className={`text-base sm:text-lg font-bold text-yellow-800 mb-3 sm:mb-4 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                                {trans('important_notes')}
                            </h3>
                            <ul className={`space-y-2 text-yellow-700 ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}>
                                <li>{locale === 'fa' ? '• فایل‌ها نباید شامل نام هنرمند، واترمارک یا هرگونه علامت شناسایی باشند' : '• Files must not contain your name, watermarks, or any identifying marks.'}</li>
                                <li>{locale === 'fa' ? '• تمام آثار باید حاصل خلاقیت و مالکیت هنرمند باشند' : '• All artworks must be original and owned by the artist.'}</li>
                                <li>{locale === 'fa' ? '• هرگونه کپی‌برداری یا سرقت هنری منجر به حذف قطعی اثر خواهد شد' : '• Any plagiarism leads to immediate disqualification.'}</li>
                                <li>{locale === 'fa' ? '• آثار باید مختص جشنواره تولید شده و پیش از این منتشر نشده باشند' : '• Works must be created exclusively for this festival and remain unpublished online.'}</li>
                            </ul>
                        </div>

                        {isAuthenticated && (
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4 space-x-0 sm:space-x-4 space-x-reverse">
                                <Link
                                    href="/artist/arts"
                                    className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors text-center text-sm sm:text-base ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}
                                >
                                    {trans('cancel')}
                                </Link>
                                <PrimaryButton disabled={processing || !data.art_field_id} className="w-full sm:w-auto">
                                    {processing ? trans('submitting') : trans('submit_artwork_button')}
                                </PrimaryButton>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </FestivalLayout>
    );
}
