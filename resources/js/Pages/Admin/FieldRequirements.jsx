import React, { useState, useEffect } from 'react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { usePage } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function FieldRequirements({ artFields }) {
    const { auth } = usePage().props;
    const [selectedArtField, setSelectedArtField] = useState(null);
    const [requirements, setRequirements] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingRequirement, setEditingRequirement] = useState(null);
    const [formData, setFormData] = useState({
        art_field_id: '',
        field_name: '',
        display_name: '',
        display_name_en: '',
        requirement_type: 'required',
        field_type: 'text',
        description: '',
        description_en: '',
        validation_rules: {},
        order: 0,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [validationRulesText, setValidationRulesText] = useState('{}');

    useEffect(() => {
        if (selectedArtField) {
            fetchRequirements(selectedArtField);
        }
    }, [selectedArtField]);

    const fetchRequirements = async (artFieldId) => {
        try {
            const response = await fetch(`/api/admin/art-fields/${artFieldId}/field-requirements`, {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setRequirements(data);
            }
        } catch (error) {
            console.error('Error fetching requirements:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            let parsedValidationRules = {};
            if (validationRulesText && validationRulesText.trim().length > 0) {
                try {
                    parsedValidationRules = JSON.parse(validationRulesText);
                } catch (jsonError) {
                    setErrors({
                        validation_rules: 'قالب JSON وارد شده معتبر نیست',
                    });
                    setLoading(false);
                    return;
                }
            }

            const url = editingRequirement 
                ? `/api/admin/field-requirements/${editingRequirement.id}`
                : '/api/admin/field-requirements';
            
            const method = editingRequirement ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    validation_rules: parsedValidationRules,
                })
            });

            const data = await response.json();

            if (response.ok) {
                setShowModal(false);
                setEditingRequirement(null);
                resetForm();
                fetchRequirements(selectedArtField);
            } else {
                setErrors(data.errors || {});
            }
        } catch (error) {
            console.error('Error saving requirement:', error);
            setErrors({ general: 'خطا در ذخیره اطلاعات' });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (requirement) => {
        setEditingRequirement(requirement);
        setFormData({
            art_field_id: requirement.art_field_id,
            field_name: requirement.field_name,
            display_name: requirement.display_name || requirement.field_name,
            display_name_en: requirement.display_name_en || '',
            requirement_type: requirement.requirement_type,
            field_type: requirement.field_type,
            description: requirement.description || '',
            description_en: requirement.description_en || '',
            validation_rules: requirement.validation_rules || {},
            order: requirement.order || 0,
        });
        setValidationRulesText(
            requirement.validation_rules && Object.keys(requirement.validation_rules).length > 0
                ? JSON.stringify(requirement.validation_rules, null, 2)
                : '{}'
        );
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('آیا مطمئن هستید که می‌خواهید این فیلد را حذف کنید؟')) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/field-requirements/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                fetchRequirements(selectedArtField);
            }
        } catch (error) {
            console.error('Error deleting requirement:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            art_field_id: selectedArtField || '',
            field_name: '',
            display_name: '',
            display_name_en: '',
            requirement_type: 'required',
            field_type: 'text',
            description: '',
            description_en: '',
            validation_rules: {},
            order: 0,
        });
        setValidationRulesText('{}');
        setEditingRequirement(null);
        setErrors({});
    };

    const openAddModal = () => {
        resetForm();
        setFormData(prev => ({ ...prev, art_field_id: selectedArtField }));
        setShowModal(true);
    };

    const getFieldTypeOptions = [
        { value: 'text', label: 'متن' },
        { value: 'textarea', label: 'متن چندخطی' },
        { value: 'file', label: 'فایل' },
        { value: 'image', label: 'تصویر' },
        { value: 'audio', label: 'فایل صوتی' },
        { value: 'video', label: 'فایل ویدیویی' },
        { value: 'number', label: 'عدد' },
        { value: 'email', label: 'ایمیل' },
        { value: 'date', label: 'تاریخ' },
        { value: 'select', label: 'انتخاب تکی' },
        { value: 'multi_select', label: 'انتخاب چندگانه' },
    ];

    const getRequirementTypeBadge = (type) => {
        const badges = {
            required: 'bg-red-100 text-red-800',
            optional: 'bg-blue-100 text-blue-800',
            disabled: 'bg-gray-100 text-gray-800',
        };
        return badges[type] || badges.optional;
    };

    const getRequirementTypeLabel = (type) => {
        const labels = {
            required: 'الزامی',
            optional: 'اختیاری',
            disabled: 'غیرفعال',
        };
        return labels[type] || type;
    };

    return (
        <FestivalLayout title="مدیریت فیلدهای ثبت اثر">
            <div className="max-w-7xl mx-auto p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['iransansX']">
                        مدیریت فیلدهای ثبت اثر
                    </h1>
                    <p className="text-gray-600 font-['iransansX']">
                        در این بخش می‌توانید فیلدهای فرم ثبت اثر را برای هر رشته هنری مدیریت کنید
                    </p>
                </div>

                {/* انتخاب رشته هنری */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 font-['iransansX']">
                        انتخاب رشته هنری
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {artFields.map((field) => (
                            <button
                                key={field.id}
                                onClick={() => setSelectedArtField(field.id)}
                                className={`p-4 rounded-lg border-2 transition-all font-['iransansX'] ${
                                    selectedArtField === field.id
                                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <div className="font-bold text-lg">{field.name}</div>
                                <div className="text-xs text-gray-400 mt-2">
                                    وضعیت: {field.is_active ? 'فعال' : 'غیرفعال'}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* لیست فیلدهای موجود */}
                {selectedArtField && (
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800 font-['iransansX']">
                                فیلدهای ثبت اثر برای {artFields.find(f => f.id === selectedArtField)?.name}
                            </h2>
                            <PrimaryButton onClick={openAddModal} className="font-['iransansX']">
                                افزودن فیلد جدید
                            </PrimaryButton>
                        </div>

                        {requirements.length === 0 ? (
                            <div className="text-center py-12 text-gray-500 font-['iransansX']">
                                هیچ فیلدی تعریف نشده است. برای شروع یک فیلد جدید اضافه کنید.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {requirements.map((requirement) => (
                                    <div
                                        key={requirement.id}
                                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1 space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-lg font-bold text-gray-800 font-['iransansX']">
                                                        {requirement.display_name}
                                                    </h3>
                                                    <span className={`px-2 py-1 rounded text-xs font-['iransansX'] ${getRequirementTypeBadge(requirement.requirement_type)}`}>
                                                        {getRequirementTypeLabel(requirement.requirement_type)}
                                                    </span>
                                                    <span className="text-sm text-gray-500 font-['iransansX']">
                                                        ({requirement.field_type})
                                                    </span>
                                                </div>
                                                {requirement.display_name_en && (
                                                    <p className="text-sm text-gray-500 font-['iransansX']">
                                                        {requirement.display_name_en}
                                                    </p>
                                                )}
                                                {requirement.description && (
                                                    <p className="text-gray-600 text-sm font-['iransansX']">
                                                        {requirement.description}
                                                    </p>
                                                )}
                                                {requirement.description_en && (
                                                    <p className="text-gray-500 text-sm font-['iransansX']">
                                                        {requirement.description_en}
                                                    </p>
                                                )}
                                                <div className="text-xs text-gray-500 font-['iransansX'] flex flex-wrap gap-x-2">
                                                    <span>نام فیلد: <code className="bg-gray-100 px-2 py-1 rounded">{requirement.field_name}</code></span>
                                                    <span>ترتیب: {requirement.order || 0}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(requirement)}
                                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-['iransansX']"
                                                >
                                                    ویرایش
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(requirement.id)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-['iransansX']"
                                                >
                                                    حذف
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Modal برای افزودن/ویرایش فیلد */}
                <Modal show={showModal} onClose={() => { setShowModal(false); resetForm(); }}>
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['iransansX']">
                            {editingRequirement ? 'ویرایش فیلد' : 'افزودن فیلد جدید'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <InputLabel htmlFor="field_name" value="نام فیلد (انگلیسی - یکتا)" />
                                <TextInput
                                    id="field_name"
                                    type="text"
                                    value={formData.field_name}
                                    onChange={e => setFormData({ ...formData, field_name: e.target.value })}
                                    className="mt-1 block w-full font-['iransansX']"
                                    disabled={!!editingRequirement}
                                    required
                                />
                                <InputError message={errors.field_name} className="mt-2" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="display_name" value="نام نمایشی (فارسی)" />
                                    <TextInput
                                        id="display_name"
                                        type="text"
                                        value={formData.display_name}
                                        onChange={e => setFormData({ ...formData, display_name: e.target.value })}
                                        className="mt-1 block w-full font-['iransansX']"
                                        required
                                    />
                                    <InputError message={errors.display_name} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="display_name_en" value="Display Name (English)" />
                                    <TextInput
                                        id="display_name_en"
                                        type="text"
                                        value={formData.display_name_en}
                                        onChange={e => setFormData({ ...formData, display_name_en: e.target.value })}
                                        className="mt-1 block w-full font-['iransansX']"
                                    />
                                    <InputError message={errors.display_name_en} className="mt-2" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="field_type" value="نوع فیلد" />
                                    <select
                                        id="field_type"
                                        value={formData.field_type}
                                        onChange={e => setFormData({ ...formData, field_type: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 font-['iransansX']"
                                        required
                                    >
                                        {getFieldTypeOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.field_type} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="requirement_type" value="نوع الزام" />
                                    <select
                                        id="requirement_type"
                                        value={formData.requirement_type}
                                        onChange={e => setFormData({ ...formData, requirement_type: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 font-['iransansX']"
                                        required
                                    >
                                        <option value="required">الزامی</option>
                                        <option value="optional">اختیاری</option>
                                        <option value="disabled">غیرفعال</option>
                                    </select>
                                    <InputError message={errors.requirement_type} className="mt-2" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="description" value="توضیحات (فارسی)" />
                                    <textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 font-['iransansX']"
                                        rows="3"
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="description_en" value="Description (English)" />
                                    <textarea
                                        id="description_en"
                                        value={formData.description_en}
                                        onChange={e => setFormData({ ...formData, description_en: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 font-['iransansX']"
                                        rows="3"
                                    />
                                    <InputError message={errors.description_en} className="mt-2" />
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="validation_rules" value="قوانین اعتبارسنجی (JSON)" />
                                <textarea
                                    id="validation_rules"
                                    value={validationRulesText}
                                    onChange={(e) => setValidationRulesText(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 font-['iransansX']"
                                    rows="6"
                                />
                                <p className="text-xs text-gray-500 mt-1 font-['iransansX']">
                                    مثال: {"{ \"allowed_formats\": [\"jpeg\", \"png\"], \"max_size\": 15360 }"}
                                </p>
                                <InputError message={errors.validation_rules} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="order" value="ترتیب نمایش" />
                                <TextInput
                                    id="order"
                                    type="number"
                                    value={formData.order}
                                    onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                    className="mt-1 block w-full font-['iransansX']"
                                    min="0"
                                />
                                <InputError message={errors.order} className="mt-2" />
                            </div>

                            {errors.general && (
                                <div className="text-red-500 text-sm font-['iransansX']">{errors.general}</div>
                            )}

                            <div className="flex justify-end gap-3 pt-4">
                                <SecondaryButton
                                    type="button"
                                    onClick={() => { setShowModal(false); resetForm(); }}
                                    className="font-['iransansX']"
                                >
                                    انصراف
                                </SecondaryButton>
                                <PrimaryButton disabled={loading} className="font-['iransansX']">
                                    {loading ? 'در حال ذخیره...' : editingRequirement ? 'بروزرسانی' : 'افزودن'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        </FestivalLayout>
    );
}

