import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { route } from '@/Utils/route';
import { 
    MusicIcon,
    PaintingIcon,
    FilmIcon,
    SculptureIcon,
    GraphicIcon,
    CalligraphyIcon,
    PhotographyIcon,
    ArchitectureIcon
} from '@/Components/SvgIcons';

export default function JudgeRegister() {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: '',
        bio: '',
        expertise_areas: [],
        qualification: '',
        organization: '',
    });

    const [selectedExpertiseAreas, setSelectedExpertiseAreas] = useState([]);

    const artFields = [
        { id: 1, name: 'موسیقی', icon: MusicIcon, description: 'آهنگسازی، نوازندگی، خوانندگی و تولید موسیقی' },
        { id: 2, name: 'نقاشی', icon: PaintingIcon, description: 'نقاشی با رنگ روغن، آبرنگ، گواش و سایر تکنیک‌ها' },
        { id: 3, name: 'فیلم‌سازی', icon: FilmIcon, description: 'کارگردانی، فیلمنامه‌نویسی، تدوین و تولید فیلم' },
        { id: 4, name: 'مجسمه‌سازی', icon: SculptureIcon, description: 'مجسمه‌سازی با گچ، سنگ، فلز و سایر مواد' },
        { id: 5, name: 'گرافیک', icon: GraphicIcon, description: 'طراحی گرافیک، پوستر، لوگو و تصویرسازی دیجیتال' },
        { id: 6, name: 'خوشنویسی', icon: CalligraphyIcon, description: 'خوشنویسی فارسی، عربی و ترکیبی' },
        { id: 7, name: 'عکاسی', icon: PhotographyIcon, description: 'عکاسی هنری، مستند و تجربی' },
        { id: 8, name: 'معماری', icon: ArchitectureIcon, description: 'طراحی معماری، نقشه‌کشی و طراحی داخلی' },
    ];

    const handleExpertiseToggle = (fieldId) => {
        let newAreas;
        if (selectedExpertiseAreas.includes(fieldId)) {
            newAreas = selectedExpertiseAreas.filter(id => id !== fieldId);
        } else {
            newAreas = [...selectedExpertiseAreas, fieldId];
        }
        setSelectedExpertiseAreas(newAreas);
        setData('expertise_areas', newAreas);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('judge.register.store'));
    };

    return (
        <FestivalLayout title="ثبت نام داور - جشنواره بین الملی مسیر ایران">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 font-['Vazirmatn']">
                        ثبت نام داور
                    </h1>
                    <p className="text-xl text-gray-600 font-['Vazirmatn']">
                        برای داوری آثار هنری در جشنواره بین الملی مسیر ایران، لطفاً اطلاعات خود را تکمیل کنید
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                                اطلاعات شخصی
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                        نام <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.first_name}
                                        onChange={e => setData('first_name', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                        required
                                    />
                                    {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                        نام خانوادگی <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.last_name}
                                        onChange={e => setData('last_name', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                        required
                                    />
                                    {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                        شماره تماس <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                        placeholder="09123456789"
                                        required
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                        ایمیل <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                        required
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Professional Information */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                                اطلاعات حرفه‌ای
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                        مدرک تحصیلی / صلاحیت
                                    </label>
                                    <input
                                        type="text"
                                        value={data.qualification}
                                        onChange={e => setData('qualification', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                        placeholder="مثال: دکترای هنر، کارشناسی ارشد موسیقی"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                        سازمان / موسسه
                                    </label>
                                    <input
                                        type="text"
                                        value={data.organization}
                                        onChange={e => setData('organization', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                        placeholder="مثال: دانشگاه هنر تهران"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Expertise Areas */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                                حوزه‌های تخصصی داوری
                            </h2>
                            <p className="text-gray-600 mb-4 font-['Vazirmatn']">
                                حوزه‌هایی که در آن‌ها تجربه داوری دارید را انتخاب کنید:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {artFields.map((field) => (
                                    <div
                                        key={field.id}
                                        onClick={() => handleExpertiseToggle(field.id)}
                                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                                            selectedExpertiseAreas.includes(field.id)
                                                ? 'border-primary-500 bg-primary-50'
                                                : 'border-gray-200 hover:border-secondary-300'
                                        }`}
                                    >
                                        <div className="text-3xl mb-2 flex justify-center">
                                            <field.icon className="w-8 h-8 text-primary-600" />
                                        </div>
                                        <h3 className="font-bold text-gray-800 mb-1 font-['Vazirmatn']">{field.name}</h3>
                                        <p className="text-xs text-gray-600 font-['Vazirmatn']">{field.description}</p>
                                    </div>
                                ))}
                            </div>
                            {errors.expertise_areas && <p className="text-red-500 text-sm mt-2">{errors.expertise_areas}</p>}
                        </div>

                        {/* Bio */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                                بیوگرافی و تجربیات
                            </h2>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                    درباره تجربیات داوری و هنری خود بنویسید
                                </label>
                                <textarea
                                    value={data.bio}
                                    onChange={e => setData('bio', e.target.value)}
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                    placeholder="تجربیات داوری، سوابق هنری، افتخارات، مقالات و..."
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                                رمز عبور
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                        رمز عبور <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                        required
                                    />
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                        تکرار رمز عبور <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={e => setData('password_confirmation', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                        required
                                    />
                                    {errors.password_confirmation && <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center pt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 shadow-lg font-['Vazirmatn'] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'در حال ثبت نام...' : 'ثبت نام به عنوان داور'}
                            </button>
                        </div>

                        {/* Login Link */}
                        <div className="text-center pt-4">
                            <p className="text-gray-600 font-['Vazirmatn']">
                                قبلاً ثبت نام کرده‌اید؟{' '}
                                <Link href="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
                                    وارد شوید
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </FestivalLayout>
    );
}
