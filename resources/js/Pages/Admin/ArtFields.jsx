import React, { useMemo, useState, useEffect } from 'react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';

function buildMetadataTemplate(metadata = {}) {
    const defaults = {
        headline: '',
        submission_deadline: '',
        guidelines: '',
        notes: '',
    };

    const fa = metadata.fa ?? metadata ?? {};
    const en = metadata.en ?? {};

    return {
        fa: { ...defaults, ...(Array.isArray(fa) ? {} : fa) },
        en: { ...defaults, ...(Array.isArray(en) ? {} : en) },
    };
}

export default function ArtFields({ artFields: initialFields = [] }) {
    const { auth } = usePage().props;
    const [artFields, setArtFields] = useState(initialFields);
    const [selectedFieldId, setSelectedFieldId] = useState(initialFields[0]?.id || null);
    const selectedField = useMemo(
        () => artFields.find((field) => field.id === selectedFieldId),
        [artFields, selectedFieldId],
    );

    const [formData, setFormData] = useState({
        name: '',
        name_en: '',
        icon_name: '',
        description: '',
        description_en: '',
        is_active: true,
        metadata: buildMetadataTemplate(),
    });
    const [errors, setErrors] = useState({});
    const [statusMessage, setStatusMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [createFormData, setCreateFormData] = useState({
        name: '',
        name_en: '',
        icon_name: '',
        description: '',
        description_en: '',
        is_active: true,
        metadata: buildMetadataTemplate(),
    });
    const [createErrors, setCreateErrors] = useState({});
    const [createStatusMessage, setCreateStatusMessage] = useState(null);
    const [createLoading, setCreateLoading] = useState(false);

    useEffect(() => {
        if (selectedField) {
            setFormData({
                name: selectedField.name || '',
                name_en: selectedField.name_en || '',
                icon_name: selectedField.icon_name || '',
                description: selectedField.description || '',
                description_en: selectedField.description_en || '',
                is_active: selectedField.is_active ?? true,
                metadata: buildMetadataTemplate(selectedField.metadata || {}),
            });
            setErrors({});
            setStatusMessage(null);
        }
    }, [selectedField]);

    useEffect(() => {
        const fetchArtFields = async () => {
            try {
                const response = await fetch('/api/admin/art-fields', {
                    headers: {
                        Authorization: `Bearer ${auth.access_token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data.data)) {
                        setArtFields(data.data);
                        if (!selectedFieldId && data.data.length > 0) {
                            setSelectedFieldId(data.data[0].id);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching art fields:', error);
            }
        };

        if (auth?.access_token) {
            fetchArtFields();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleInputChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleMetadataChange = (lang, key, value) => {
        setFormData((prev) => ({
            ...prev,
            metadata: {
                ...prev.metadata,
                [lang]: {
                    ...prev.metadata[lang],
                    [key]: value,
                },
            },
        }));
    };

    const handleCreateInputChange = (key, value) => {
        setCreateFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleCreateMetadataChange = (lang, key, value) => {
        setCreateFormData((prev) => ({
            ...prev,
            metadata: {
                ...prev.metadata,
                [lang]: {
                    ...prev.metadata[lang],
                    [key]: value,
                },
            },
        }));
    };

    const resetCreateForm = () => {
        setCreateFormData({
            name: '',
            name_en: '',
            icon_name: '',
            description: '',
            description_en: '',
            is_active: true,
            metadata: buildMetadataTemplate(),
        });
        setCreateErrors({});
        setCreateStatusMessage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedField) {
            return;
        }

        setLoading(true);
        setErrors({});
        setStatusMessage(null);

        try {
            const response = await fetch(`/api/admin/art-fields/${selectedField.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${auth.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setStatusMessage('اطلاعات با موفقیت ذخیره شد');
                setArtFields((prev) =>
                    prev.map((field) => (field.id === selectedField.id ? data.data : field)),
                );
            } else {
                setErrors(data.errors || {});
                setStatusMessage(data.message || 'خطا در ذخیره اطلاعات');
            }
        } catch (error) {
            console.error('Error updating art field:', error);
            setStatusMessage('خطایی رخ داد. لطفاً مجدداً تلاش کنید.');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        setCreateErrors({});
        setCreateStatusMessage(null);
        setCreateLoading(true);

        try {
            const response = await fetch('/api/admin/art-fields', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${auth.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(createFormData),
            });

            const data = await response.json();
            if (response.ok) {
                const newField = data.data;
                setArtFields((prev) => [...prev, newField]);
                setSelectedFieldId(newField.id);
                setStatusMessage('رشته جدید با موفقیت ایجاد شد');
                setShowCreateModal(false);
                resetCreateForm();
            } else {
                setCreateErrors(data.errors || {});
                setCreateStatusMessage(data.message || 'خطا در ایجاد رشته جدید');
            }
        } catch (error) {
            console.error('Error creating art field:', error);
            setCreateStatusMessage('خطایی رخ داد. لطفاً مجدداً تلاش کنید.');
        } finally {
            setCreateLoading(false);
        }
    };

    const resetForm = () => {
        if (!selectedField) return;
        setFormData({
            name: selectedField.name || '',
            name_en: selectedField.name_en || '',
            icon_name: selectedField.icon_name || '',
            description: selectedField.description || '',
            description_en: selectedField.description_en || '',
            is_active: selectedField.is_active ?? true,
            metadata: buildMetadataTemplate(selectedField.metadata || {}),
        });
        setErrors({});
        setStatusMessage(null);
    };

    const renderMetadataEditors = (metadataState, onChange, fieldErrors = {}) => (
        ['fa', 'en'].map((lang) => (
            <div key={lang} className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800 font-['iransansX']">
                        {lang === 'fa' ? 'متن فارسی' : 'English Content'}
                    </h3>
                    <span className="text-sm text-gray-500 font-['iransansX']">
                        {lang === 'fa' ? 'Persian' : 'English'}
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor={`headline_${lang}`} value={lang === 'fa' ? 'عنوان راهنما' : 'Headline'} />
                        <TextInput
                            id={`headline_${lang}`}
                            type="text"
                            value={metadataState[lang].headline}
                            onChange={(e) => onChange(lang, 'headline', e.target.value)}
                            className={`mt-1 block w-full ${lang === 'fa' ? "font-['iransansX']" : "font-['iransansX']"}`}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor={`submission_deadline_${lang}`} value={lang === 'fa' ? 'مهلت ارسال آثار' : 'Submission Deadline'} />
                        <TextInput
                            id={`submission_deadline_${lang}`}
                            type="text"
                            value={metadataState[lang].submission_deadline}
                            onChange={(e) => onChange(lang, 'submission_deadline', e.target.value)}
                            className={`mt-1 block w-full ${lang === 'fa' ? "font-['iransansX']" : "font-['iransansX']"}`}
                        />
                    </div>
                </div>
                <div>
                    <InputLabel htmlFor={`guidelines_${lang}`} value={lang === 'fa' ? 'راهنمای ارسال اثر' : 'Submission Guidelines'} />
                    <textarea
                        id={`guidelines_${lang}`}
                        value={metadataState[lang].guidelines}
                        onChange={(e) => onChange(lang, 'guidelines', e.target.value)}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 ${lang === 'fa' ? "font-['iransansX']" : "font-['iransansX']"} leading-7`}
                        rows={12}
                    />
                </div>
                <div>
                    <InputLabel htmlFor={`notes_${lang}`} value={lang === 'fa' ? 'یادداشت‌های تکمیلی' : 'Additional Notes'} />
                    <textarea
                        id={`notes_${lang}`}
                        value={metadataState[lang].notes}
                        onChange={(e) => onChange(lang, 'notes', e.target.value)}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 ${lang === 'fa' ? "font-['iransansX']" : "font-['iransansX']"} leading-7`}
                        rows={6}
                    />
                </div>
                {lang === 'fa' ? <div className="border-b border-gray-200" /> : null}
            </div>
        ))
    );

    return (
        <FestivalLayout title="مدیریت رشته‌های هنری جشنواره">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['iransansX']">
                            مدیریت رشته‌های هنری
                        </h1>
                        <p className="text-gray-600 font-['iransansX']">
                            در این صفحه می‌توانید اطلاعات هر رشته و راهنمای ارسال آثار را مدیریت کنید.
                        </p>
                    </div>
                    <PrimaryButton onClick={() => { resetCreateForm(); setShowCreateModal(true); }}>
                        ایجاد رشته جدید
                    </PrimaryButton>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 font-['iransansX']">
                        انتخاب رشته هنری
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {artFields.map((field) => (
                            <button
                                key={field.id}
                                onClick={() => setSelectedFieldId(field.id)}
                                className={`p-4 border-2 rounded-lg transition-all font-['iransansX'] ${
                                    selectedFieldId === field.id
                                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                                }`}
                            >
                                <div className="font-bold text-lg">{field.name}</div>
                                <div className="text-sm text-gray-500 mt-2 font-['iransansX']">
                                    {field.name_en || '—'}
                                </div>
                                <div className="text-xs text-gray-400 mt-2">
                                    وضعیت: {field.is_active ? 'فعال' : 'غیرفعال'}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {selectedField && (
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 font-['iransansX']">
                                    اطلاعات پایه رشته
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel htmlFor="name" value="نام (فارسی)" />
                                        <TextInput
                                            id="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="mt-1 block w-full font-['iransansX']"
                                            required
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="name_en" value="Name (English)" />
                                        <TextInput
                                            id="name_en"
                                            type="text"
                                            value={formData.name_en}
                                            onChange={(e) => handleInputChange('name_en', e.target.value)}
                                            className="mt-1 block w-full font-['iransansX']"
                                        />
                                        <InputError message={errors.name_en} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="icon_name" value="نام آیکون" />
                                        <TextInput
                                            id="icon_name"
                                            type="text"
                                            value={formData.icon_name}
                                            onChange={(e) => handleInputChange('icon_name', e.target.value)}
                                            className="mt-1 block w-full"
                                        />
                                        <InputError message={errors.icon_name} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="is_active" value="وضعیت" />
                                        <select
                                            id="is_active"
                                            value={formData.is_active ? '1' : '0'}
                                            onChange={(e) => handleInputChange('is_active', e.target.value === '1')}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 font-['iransansX']"
                                        >
                                            <option value="1">فعال</option>
                                            <option value="0">غیرفعال</option>
                                        </select>
                                        <InputError message={errors.is_active} className="mt-2" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <InputLabel htmlFor="description" value="توضیحات (فارسی)" />
                                        <textarea
                                            id="description"
                                            value={formData.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 font-['iransansX']"
                                            rows={3}
                                        />
                                        <InputError message={errors.description} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="description_en" value="Description (English)" />
                                        <textarea
                                            id="description_en"
                                            value={formData.description_en}
                                            onChange={(e) => handleInputChange('description_en', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 font-['iransansX']"
                                            rows={3}
                                        />
                                        <InputError message={errors.description_en} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-6 space-y-6">
                                <h2 className="text-xl font-semibold text-gray-800 font-['iransansX']">
                                    تنظیمات راهنمای ارسال اثر
                                </h2>
                                {renderMetadataEditors(formData.metadata, handleMetadataChange)}
                            </div>

                            {statusMessage && (
                                <div
                                    className={`rounded-lg px-4 py-3 font-['iransansX'] ${
                                        errors && Object.keys(errors).length > 0
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-green-100 text-green-800'
                                    }`}
                                >
                                    {statusMessage}
                                </div>
                            )}

                            <div className="flex justify-end gap-3">
                                <SecondaryButton type="button" onClick={resetForm} className="font-['iransansX']">
                                    بازنشانی
                                </SecondaryButton>
                                <PrimaryButton disabled={loading} className="font-['iransansX']">
                                    {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                )}
            </div>

            <Modal show={showCreateModal} onClose={() => { setShowCreateModal(false); resetCreateForm(); }}>
                <div className="p-6 space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2 font-['iransansX']">ایجاد رشته هنری جدید</h2>
                        <p className="text-sm text-gray-600 font-['iransansX']">
                            اطلاعات لازم برای معرفی رشته را وارد کنید. می‌توانید بعداً فیلدهای اختصاصی را اضافه نمایید.
                        </p>
                    </div>

                    <form onSubmit={handleCreateSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="create_name" value="نام (فارسی)" />
                                <TextInput
                                    id="create_name"
                                    type="text"
                                    value={createFormData.name}
                                    onChange={(e) => handleCreateInputChange('name', e.target.value)}
                                    className="mt-1 block w-full font-['iransansX']"
                                    required
                                />
                                <InputError message={createErrors.name} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="create_name_en" value="Name (English)" />
                                <TextInput
                                    id="create_name_en"
                                    type="text"
                                    value={createFormData.name_en}
                                    onChange={(e) => handleCreateInputChange('name_en', e.target.value)}
                                    className="mt-1 block w-full font-['iransansX']"
                                />
                                <InputError message={createErrors.name_en} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="create_icon_name" value="نام آیکون" />
                                <TextInput
                                    id="create_icon_name"
                                    type="text"
                                    value={createFormData.icon_name}
                                    onChange={(e) => handleCreateInputChange('icon_name', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={createErrors.icon_name} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="create_is_active" value="وضعیت" />
                                <select
                                    id="create_is_active"
                                    value={createFormData.is_active ? '1' : '0'}
                                    onChange={(e) => handleCreateInputChange('is_active', e.target.value === '1')}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 font-['iransansX']"
                                >
                                    <option value="1">فعال</option>
                                    <option value="0">غیرفعال</option>
                                </select>
                                <InputError message={createErrors.is_active} className="mt-2" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="create_description" value="توضیحات (فارسی)" />
                                <textarea
                                    id="create_description"
                                    value={createFormData.description}
                                    onChange={(e) => handleCreateInputChange('description', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 font-['iransansX']"
                                    rows={3}
                                    required
                                />
                                <InputError message={createErrors.description} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="create_description_en" value="Description (English)" />
                                <textarea
                                    id="create_description_en"
                                    value={createFormData.description_en}
                                    onChange={(e) => handleCreateInputChange('description_en', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 font-['iransansX']"
                                    rows={3}
                                />
                                <InputError message={createErrors.description_en} className="mt-2" />
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4 space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 font-['iransansX']">
                                تنظیمات راهنمای ارسال اثر
                            </h3>
                            {renderMetadataEditors(createFormData.metadata, handleCreateMetadataChange, createErrors)}
                        </div>

                        {createStatusMessage && (
                            <div
                                className={`rounded-lg px-4 py-3 font-['iransansX'] ${
                                    createErrors && Object.keys(createErrors).length > 0
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-blue-100 text-blue-800'
                                }`}
                            >
                                {createStatusMessage}
                            </div>
                        )}

                        <div className="flex justify-end gap-3">
                            <SecondaryButton type="button" onClick={() => { setShowCreateModal(false); resetCreateForm(); }} className="font-['iransansX']">
                                انصراف
                            </SecondaryButton>
                            <PrimaryButton disabled={createLoading} className="font-['iransansX']">
                                {createLoading ? 'در حال ایجاد...' : 'ایجاد رشته'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </FestivalLayout>
    );
}


