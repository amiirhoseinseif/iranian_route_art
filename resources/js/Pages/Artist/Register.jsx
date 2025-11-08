import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import PersianDateInput from '@/Components/PersianDateInput';
import { route } from '@/Utils/route';
import { 
    MusicIcon,
    PaintingIcon,
    ShortFilmIcon,
    SculptureIcon,
    IllustrationIcon,
    CalligraphyIcon,
    PhotographyIcon,
    ArchitectureIcon,
    HandicraftsIcon,
    IndustrialDesignIcon,
    LiteratureIcon,
    CarpetIcon,
    TheaterIcon,
    FashionDesignIcon,
    AnimationIcon,
    NewMediaArtsIcon
} from '@/Components/SvgIcons';

export default function ArtistRegister({ artFields = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        birth_date: '',
        password: '',
        password_confirmation: '',
        telegram_id: '',
        whatsapp_id: '',
        instagram_id: '',
        linkedin_id: '',
        art_field_id: '',
        bio: '',
    });

    const [selectedArtField, setSelectedArtField] = useState(null);
    
    // Map icon names to icon components
    const iconMap = {
        'music': MusicIcon,
        'painting': PaintingIcon,
        'short_film': ShortFilmIcon,
        'sculpture': SculptureIcon,
        'illustration': IllustrationIcon,
        'calligraphy': CalligraphyIcon,
        'photography': PhotographyIcon,
        'architecture': ArchitectureIcon,
        'handicrafts': HandicraftsIcon,
        'industrial_design': IndustrialDesignIcon,
        'literature': LiteratureIcon,
        'carpet': CarpetIcon,
        'theater': TheaterIcon,
        'fashion_design': FashionDesignIcon,
        'animation': AnimationIcon,
        'new_media_arts': NewMediaArtsIcon,
    };
    
    // Map art fields with icons
    const artFieldsWithIcons = artFields.map(field => ({
        ...field,
        icon: iconMap[field.icon_name] || MusicIcon
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Register form submitted!');
        console.log('Route result:', route('artist.register.store'));
        console.log('Form data:', data);
        post(route('artist.register.store'));
    };

    return (
        <FestivalLayout title="ثبت نام هنرمند - جشنواره بین الملی مسیر ایران">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 font-['Vazirmatn']">
                        ثبت نام هنرمند
                    </h1>
                    <p className="text-xl text-gray-600 font-['Vazirmatn']">
                        برای شرکت در جشنواره بین الملی مسیر ایران، لطفاً اطلاعات خود را تکمیل کنید
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
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                        تاریخ تولد (شمسی) <span className="text-red-500">*</span>
                                    </label>
                                    <PersianDateInput
                                        value={data.birth_date}
                                        onChange={(value) => setData('birth_date', value)}
                                        placeholder="تاریخ تولد خود را انتخاب کنید"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                    />
                                    {errors.birth_date && <p className="text-red-500 text-sm mt-1">{errors.birth_date}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Art Field Selection */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                                انتخاب رشته هنری <span className="text-red-500">*</span>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {artFieldsWithIcons.map((field) => (
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
                                        <div className="text-3xl mb-2 flex justify-center">
                                            <field.icon className="w-8 h-8 text-primary-600" />
                                        </div>
                                        <h3 className="font-bold text-gray-800 mb-1 font-['Vazirmatn']">{field.name}</h3>
                                        <p className="text-xs text-gray-600 font-['Vazirmatn']">{field.description}</p>
                                    </div>
                                ))}
                            </div>
                            {errors.art_field_id && <p className="text-red-500 text-sm mt-2">{errors.art_field_id}</p>}
                        </div>

                        {/* Social Media (Optional) */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                                شبکه‌های اجتماعی (اختیاری)
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                        آیدی تلگرام
                                    </label>
                                    <input
                                        type="text"
                                        value={data.telegram_id}
                                        onChange={e => setData('telegram_id', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                        placeholder="@username"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                        آیدی واتساپ
                                    </label>
                                    <input
                                        type="text"
                                        value={data.whatsapp_id}
                                        onChange={e => setData('whatsapp_id', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                        placeholder="+989123456789"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                        آیدی اینستاگرام
                                    </label>
                                    <input
                                        type="text"
                                        value={data.instagram_id}
                                        onChange={e => setData('instagram_id', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                        placeholder="@username"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                        آیدی لینکدین
                                    </label>
                                    <input
                                        type="text"
                                        value={data.linkedin_id}
                                        onChange={e => setData('linkedin_id', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                        placeholder="username"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                                بیوگرافی (اختیاری)
                            </h2>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 font-['Vazirmatn']">
                                    درباره خودتان بنویسید
                                </label>
                                <textarea
                                    value={data.bio}
                                    onChange={e => setData('bio', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['Vazirmatn']"
                                    placeholder="تجربیات هنری، سبک کاری، افتخارات و..."
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
                                onClick={(e) => {
                                    console.log('Register button clicked!', e);
                                }}
                                className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 shadow-lg font-['Vazirmatn'] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'در حال ثبت نام...' : 'ثبت نام'}
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
