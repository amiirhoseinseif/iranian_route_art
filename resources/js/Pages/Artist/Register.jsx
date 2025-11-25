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
    NewMediaArtsIcon,
    PaletteIcon
} from '@/Components/SvgIcons';
import { useTranslation } from '@/Utils/translation';

export default function ArtistRegister({ artFields = [] }) {
    const { trans, getLocale, isRTL } = useTranslation();
    const locale = getLocale();
    const rtl = isRTL();
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
        art_field_id: null,
        bio: '',
    });

    const [selectedFieldId, setSelectedFieldId] = useState(null);

    const iconMap = {
        موسیقی: MusicIcon,
        نقاشی: PaintingIcon,
        'فیلم کوتاه': ShortFilmIcon,
        'مجسمه‌سازی': SculptureIcon,
        'گرافیک و تصویرسازی': IllustrationIcon,
        خوشنویسی: CalligraphyIcon,
        عکاسی: PhotographyIcon,
        معماری: ArchitectureIcon,
        'صنایع دستی': HandicraftsIcon,
        'طراحی صنعتی': IndustrialDesignIcon,
        ادبیات: LiteratureIcon,
        فرش: CarpetIcon,
        سینما: ShortFilmIcon,
        نمایش: TheaterIcon,
        'طراحی پارچه و طراحی لباس': FashionDesignIcon,
        انیمیشن: AnimationIcon,
        'هنرهای جدید': NewMediaArtsIcon,
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('artist.register.store'));
    };

    return (
        <FestivalLayout title={trans('register_title')}>
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 font-['iransansX']">
                        ثبت نام هنرمند
                    </h1>
                    <p className="text-xl text-gray-600 font-['iransansX']">
                        برای شرکت در جشنواره بین المللی مسیر ایران، لطفاً اطلاعات خود را تکمیل کنید
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['iransansX']">
                                اطلاعات شخصی
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['iransansX']">
                                        نام <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.first_name}
                                        onChange={e => setData('first_name', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['iransansX']"
                                        required
                                    />
                                    {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['iransansX']">
                                        نام خانوادگی <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.last_name}
                                        onChange={e => setData('last_name', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['iransansX']"
                                        required
                                    />
                                    {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['iransansX']">
                                        شماره تماس <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['iransansX']"
                                        placeholder="09123456789"
                                        required
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['iransansX']">
                                        ایمیل <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['iransansX']"
                                        required
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['iransansX']">
                                        تاریخ تولد (شمسی) <span className="text-red-500">*</span>
                                    </label>
                                    <PersianDateInput
                                        value={data.birth_date}
                                        onChange={(value) => setData('birth_date', value)}
                                        placeholder="تاریخ تولد خود را انتخاب کنید"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['iransansX']"
                                    />
                                    {errors.birth_date && <p className="text-red-500 text-sm mt-1">{errors.birth_date}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Art Field Selection */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['iransansX']">
                                انتخاب رشته هنری <span className="text-red-500">*</span>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {artFields.map((field) => {
                                    const Icon = iconMap[field.name] || MusicIcon;
                                    const description = field.description_translated || field.description || '';
                                    return (
                                        <button
                                            type="button"
                                            key={field.id}
                                            onClick={() => {
                                                setSelectedFieldId(field.id);
                                                setData('art_field_id', field.id);
                                            }}
                                            className={`p-4 border-2 rounded-xl transition-all text-right ${
                                                selectedFieldId === field.id
                                                    ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-md'
                                                    : 'border-gray-200 hover:border-primary-200'
                                            } ${rtl ? "font-['iransansX']" : "font-['iransansX']"}`}
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <div>
                                                    <h4 className="text-lg font-bold text-gray-800">
                                                        {locale === 'fa' ? field.name : field.name_en || field.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 mt-2">
                                                        {description}
                                                    </p>
                                                </div>
                                                {/* <Icon className="w-10 h-10 text-primary-500" /> */}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                            {errors.art_field_id && <p className="text-red-500 text-sm mt-2">{errors.art_field_id}</p>}
                        </div>

                        {/* Social Media (Optional) */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['iransansX']">
                                شبکه‌های اجتماعی (اختیاری)
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['iransansX']">
                                        آیدی تلگرام
                                    </label>
                                    <input
                                        type="text"
                                        value={data.telegram_id}
                                        onChange={e => setData('telegram_id', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['iransansX']"
                                        placeholder="@username"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['iransansX']">
                                        آیدی واتساپ
                                    </label>
                                    <input
                                        type="text"
                                        value={data.whatsapp_id}
                                        onChange={e => setData('whatsapp_id', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['iransansX']"
                                        placeholder="+989123456789"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['iransansX']">
                                        آیدی اینستاگرام
                                    </label>
                                    <input
                                        type="text"
                                        value={data.instagram_id}
                                        onChange={e => setData('instagram_id', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['iransansX']"
                                        placeholder="@username"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['iransansX']">
                                        آیدی لینکدین
                                    </label>
                                    <input
                                        type="text"
                                        value={data.linkedin_id}
                                        onChange={e => setData('linkedin_id', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['iransansX']"
                                        placeholder="username"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['iransansX']">
                                بیوگرافی (اختیاری)
                            </h2>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 font-['iransansX']">
                                    درباره خودتان بنویسید
                                </label>
                                <textarea
                                    value={data.bio}
                                    onChange={e => setData('bio', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['iransansX']"
                                    placeholder="تجربیات هنری، سبک کاری، افتخارات و..."
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['iransansX']">
                                رمز عبور
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['iransansX']">
                                        رمز عبور <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['iransansX']"
                                        required
                                    />
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-['iransansX']">
                                        تکرار رمز عبور <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={e => setData('password_confirmation', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['iransansX']"
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
                                className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 shadow-lg font-['iransansX'] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'در حال ثبت نام...' : 'ثبت نام'}
                            </button>
                        </div>

                        {/* Login Link */}
                        <div className="text-center pt-4">
                            <p className="text-gray-600 font-['iransansX']">
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
