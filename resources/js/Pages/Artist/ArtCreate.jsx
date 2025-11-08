import React, { useState, useEffect, useMemo } from 'react';
import { Link, useForm } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { route } from '@/Utils/route';

export default function ArtCreate({ artFields = [] }) {
    const [selectedArtField, setSelectedArtField] = useState(null);
    const [fieldRequirements, setFieldRequirements] = useState([]);

    // Initialize form data dynamically based on field requirements
    const initialFormData = useMemo(() => {
        const data = { art_field_id: '' };
        // We'll populate this dynamically when field requirements are loaded
        return data;
    }, []);

    const { data, setData, post, processing, errors } = useForm(initialFormData);

    // Load field requirements when art field is selected
    useEffect(() => {
        if (selectedArtField && selectedArtField.requirements) {
            const requirements = selectedArtField.requirements
                .filter(req => req.requirement_type !== 'disabled')
                .sort((a, b) => (a.order || 0) - (b.order || 0));
            
            setFieldRequirements(requirements);

            // Initialize form data for each requirement
            const newData = { art_field_id: selectedArtField.id };
            requirements.forEach(req => {
                if (['file', 'image', 'audio', 'video'].includes(req.field_type)) {
                    newData[req.field_name] = null;
                } else {
                    newData[req.field_name] = '';
                }
            });
            setData(newData);
        }
    }, [selectedArtField, setData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('artist.arts.store'), {
            forceFormData: true,
        });
    };

    const handleFieldChange = (fieldName, fieldType, value) => {
        setData(fieldName, value);
    };

    const renderField = (requirement) => {
        const { field_name, display_name, field_type, requirement_type, description, validation_rules } = requirement;
        const isRequired = requirement_type === 'required';
        const error = errors[field_name];

        const commonProps = {
            id: field_name,
            name: field_name,
            required: isRequired,
            className: `w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn'] ${error ? 'border-red-500' : ''}`,
        };

        const label = (
            <InputLabel htmlFor={field_name} value={display_name || field_name}>
                {isRequired && <span className="text-red-500">*</span>}
            </InputLabel>
        );

        const descriptionText = description && (
            <p className="text-sm text-gray-500 mt-1 font-['Vazirmatn']">{description}</p>
        );

        const validationInfo = validation_rules && (
            <p className="text-sm text-gray-500 mt-2 font-['Vazirmatn']">
                {validation_rules.allowed_formats && `فرمت‌های مجاز: ${validation_rules.allowed_formats.join(', ')}`}
                {validation_rules.max_size && ` - حداکثر حجم: ${formatFileSize(validation_rules.max_size)}`}
                {validation_rules.max_length && ` - حداکثر طول: ${validation_rules.max_length} کاراکتر`}
            </p>
        );

        switch (field_type) {
            case 'textarea':
                return (
                    <div key={field_name} className="col-span-full">
                        {label}
                        <textarea
                            {...commonProps}
                            value={data[field_name] || ''}
                            onChange={(e) => handleFieldChange(field_name, field_type, e.target.value)}
                            rows={validation_rules?.rows || 4}
                            maxLength={validation_rules?.max_length}
                        />
                        {descriptionText}
                        {validationInfo}
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        {validation_rules?.max_length && (
                            <p className="text-sm text-gray-500 mt-2 font-['Vazirmatn']">
                                {(data[field_name] || '').length}/{validation_rules.max_length} کاراکتر
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
                
                const acceptValue = validation_rules?.allowed_formats ? 
                    validation_rules.allowed_formats.map(f => getMimeType(f)).join(',') :
                    acceptMap[field_type] || '*/*';
                
                return (
                    <div key={field_name} className="col-span-full">
                        {label}
                        <input
                            {...commonProps}
                            type="file"
                            accept={acceptValue}
                            onChange={(e) => handleFieldChange(field_name, field_type, e.target.files[0])}
                        />
                        {descriptionText}
                        {validationInfo}
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
                            onChange={(e) => handleFieldChange(field_name, field_type, e.target.value)}
                            min={validation_rules?.min}
                            max={validation_rules?.max}
                        />
                        {descriptionText}
                        {validationInfo}
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
                            onChange={(e) => handleFieldChange(field_name, field_type, e.target.value)}
                        />
                        {descriptionText}
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
                            onChange={(e) => handleFieldChange(field_name, field_type, e.target.value)}
                        />
                        {descriptionText}
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                );

            default: // text
                return (
                    <div key={field_name}>
                        {label}
                        <input
                            {...commonProps}
                            type="text"
                            value={data[field_name] || ''}
                            onChange={(e) => handleFieldChange(field_name, field_type, e.target.value)}
                            maxLength={validation_rules?.max_length}
                        />
                        {descriptionText}
                        {validationInfo}
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                );
        }
    };

    // Helper functions
    function formatFileSize(bytes) {
        if (!bytes) return '';
        if (bytes < 1024) return bytes + ' بایت';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' کیلوبایت';
        if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' مگابایت';
        return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' گیگابایت';
    }

    function getMimeType(format) {
        const mimeTypes = {
            'jpeg': 'image/jpeg',
            'jpg': 'image/jpeg',
            'png': 'image/png',
            'pdf': 'application/pdf',
            'mp3': 'audio/mpeg',
            'wav': 'audio/wav',
            'mp4': 'video/mp4',
            'mov': 'video/quicktime',
        };
        return mimeTypes[format.toLowerCase()] || `*/*`;
    }

    // Group requirements into sections
    const requiredFields = fieldRequirements.filter(req => req.requirement_type === 'required');
    const optionalFields = fieldRequirements.filter(req => req.requirement_type === 'optional');

    return (
        <FestivalLayout title="ثبت اثر هنری - جشنواره بین‌المللی مسیر ایران">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 font-['Vazirmatn']">
                        ثبت اثر هنری
                    </h1>
                    <p className="text-xl text-gray-600 font-['Vazirmatn']">
                        جشنواره بین‌المللی مسیر ایران - مهلت ارسال: نوروز ۱۴۰۵
                    </p>
                    <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <p className="text-blue-800 font-['Vazirmatn']">
                            <strong>موضوع جشنواره:</strong> ایران است. فرهنگ و هنر ایران
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* انتخاب رشته هنری */}
                        <div className="border-b border-gray-200 pb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                                انتخاب رشته هنری <span className="text-red-500">*</span>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                                        }`}
                                    >
                                        <h3 className="font-bold text-gray-800 mb-2 font-['Vazirmatn']">{field.name}</h3>
                                        <p className="text-sm text-gray-600 font-['Vazirmatn']">
                                            {field.description || 'توضیحات رشته هنری'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            {errors.art_field_id && <p className="text-red-500 text-sm mt-2">{errors.art_field_id}</p>}
                        </div>

                        {/* فیلدهای الزامی */}
                        {selectedArtField && requiredFields.length > 0 && (
                            <div className="border-b border-gray-200 pb-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                                    اطلاعات اصلی اثر <span className="text-red-500">*</span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {requiredFields.map(requirement => renderField(requirement))}
                                </div>
                            </div>
                        )}

                        {/* فیلدهای اختیاری */}
                        {selectedArtField && optionalFields.length > 0 && (
                            <div className="border-b border-gray-200 pb-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                                    اطلاعات اختیاری
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {optionalFields.map(requirement => renderField(requirement))}
                                </div>
                            </div>
                        )}

                        {/* نکات مهم */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-yellow-800 mb-4 font-['Vazirmatn']">
                                نکات مهم
                            </h3>
                            <ul className="space-y-2 text-yellow-700 font-['Vazirmatn']">
                                <li>• فایل‌ها نباید شامل نام هنرمند، واترمارک یا هرگونه علامت شناسایی باشند</li>
                                <li>• تمام آثار باید حاصل خلاقیت و مالکیت هنرمند باشند</li>
                                <li>• هرگونه کپی‌برداری یا سرقت هنری منجر به حذف قطعی اثر خواهد شد</li>
                                <li>• آثار باید مختص جشنواره تولید شده و پیش از این در فضای مجازی منتشر نشده باشند</li>
                            </ul>
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-end space-x-4 space-x-reverse">
                            <Link
                                href="/artist/arts"
                                className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-['Vazirmatn']"
                            >
                                انصراف
                            </Link>
                            <PrimaryButton disabled={processing || !data.art_field_id}>
                                {processing ? 'در حال ثبت...' : 'ثبت اثر'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </FestivalLayout>
    );
}
