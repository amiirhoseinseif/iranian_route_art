import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PersianDatePicker from '@/Components/PersianDatePicker';
import PersianDateInput from '@/Components/PersianDateInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import moment from 'moment-jalaali';
import { CalendarIcon, PaletteIcon, MobileIcon, SparkleIcon } from '@/Components/SvgIcons';

export default function DatePickerDemo({ auth }) {
    const [selectedDate1, setSelectedDate1] = useState('');
    const [selectedDate2, setSelectedDate2] = useState('');
    const [selectedDate3, setSelectedDate3] = useState(moment().format('jYYYY/jMM/jDD'));

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`تاریخ‌های انتخاب شده:\n${selectedDate1}\n${selectedDate2}\n${selectedDate3}`);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">نمایشگر تاریخ شمسی</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                    <CalendarIcon className="w-8 h-8 ml-2 text-blue-600" />
                                    انتخابگر تاریخ شمسی (جلالی)
                                </h3>
                                <p className="text-lg text-gray-600 mb-6">
                                    کامپوننت‌های مدرن و زیبا برای انتخاب تاریخ به صورت شمسی (جلالی) با UI پیشرفته
                                </p>
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                                    <p className="text-sm text-blue-800">
                                        <SparkleIcon className="w-4 h-4 inline ml-1" /> <strong>ویژگی‌های جدید:</strong> طراحی مدرن، انیمیشن‌های نرم، responsive design، hover effects، و تجربه کاربری بهتر
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* PersianDatePicker Example */}
                                <div>
                                    <InputLabel htmlFor="date1" value="انتخابگر تاریخ ساده" />
                                    <div className="mt-2">
                                        <PersianDatePicker
                                            id="date1"
                                            value={selectedDate1}
                                            onChange={setSelectedDate1}
                                            placeholder="یک تاریخ انتخاب کنید"
                                            className="w-full"
                                        />
                                    </div>
                                    {selectedDate1 && (
                                        <p className="mt-2 text-sm text-gray-600">
                                            تاریخ انتخاب شده: {selectedDate1}
                                        </p>
                                    )}
                                </div>

                                {/* PersianDateInput Example */}
                                <div>
                                    <InputLabel htmlFor="date2" value="ورودی تاریخ با قابلیت تایپ" />
                                    <div className="mt-2">
                                        <PersianDateInput
                                            id="date2"
                                            value={selectedDate2}
                                            onChange={setSelectedDate2}
                                            placeholder="تاریخ را وارد کنید یا انتخاب کنید"
                                            className="w-full"
                                        />
                                    </div>
                                    {selectedDate2 && (
                                        <p className="mt-2 text-sm text-gray-600">
                                            تاریخ انتخاب شده: {selectedDate2}
                                        </p>
                                    )}
                                </div>

                                {/* Pre-filled Date Example */}
                                <div>
                                    <InputLabel htmlFor="date3" value="تاریخ از پیش پر شده" />
                                    <div className="mt-2">
                                        <PersianDatePicker
                                            id="date3"
                                            value={selectedDate3}
                                            onChange={setSelectedDate3}
                                            placeholder="تاریخ امروز"
                                            className="w-full"
                                        />
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600">
                                        این فیلد با تاریخ امروز پر شده است: {selectedDate3}
                                    </p>
                                </div>

                                {/* Disabled Example */}
                                <div>
                                    <InputLabel htmlFor="date4" value="انتخابگر غیرفعال" />
                                    <div className="mt-2">
                                        <PersianDatePicker
                                            id="date4"
                                            disabled={true}
                                            placeholder="این فیلد غیرفعال است"
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end space-x-4 space-x-reverse">
                                    <PrimaryButton type="submit">
                                        ارسال فرم
                                    </PrimaryButton>
                                </div>
                            </form>

                            {/* Usage Examples */}
                            <div className="mt-12 border-t pt-8">
                                <h4 className="text-lg font-medium text-gray-900 mb-4">
                                    نحوه استفاده
                                </h4>
                                
                                <div className="space-y-4">
                                    <div>
                                        <h5 className="font-medium text-gray-800 mb-2">PersianDatePicker:</h5>
                                        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`import PersianDatePicker from '@/Components/PersianDatePicker';

<PersianDatePicker
    value={selectedDate}
    onChange={setSelectedDate}
    placeholder="انتخاب تاریخ"
    className="w-full"
/>`}
                                        </pre>
                                    </div>

                                    <div>
                                        <h5 className="font-medium text-gray-800 mb-2">PersianDateInput:</h5>
                                        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`import PersianDateInput from '@/Components/PersianDateInput';

<PersianDateInput
    value={selectedDate}
    onChange={setSelectedDate}
    placeholder="تاریخ را وارد کنید"
    className="w-full"
/>`}
                                        </pre>
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="mt-8 border-t pt-8">
                                <h4 className="text-lg font-medium text-gray-900 mb-4">
                                    ویژگی‌ها
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <h5 className="font-semibold text-gray-800 text-sm flex items-center">
                                            <PaletteIcon className="w-4 h-4 ml-1" /> طراحی و UI
                                        </h5>
                                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                                            <li>طراحی مدرن و زیبا</li>
                                            <li>انیمیشن‌های نرم و طبیعی</li>
                                            <li>Gradient backgrounds</li>
                                            <li>Shadow effects و depth</li>
                                            <li>Rounded corners و modern styling</li>
                                        </ul>
                                    </div>
                                    <div className="space-y-3">
                                        <h5 className="font-semibold text-gray-800 text-sm">⚡ عملکرد</h5>
                                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                                            <li>انتخاب دستی ماه و سال</li>
                                            <li>ناوبری با فلش‌ها</li>
                                            <li>دکمه "امروز" سریع</li>
                                            <li>دکمه پاک کردن تاریخ</li>
                                            <li>Hover effects و visual feedback</li>
                                        </ul>
                                    </div>
                                    <div className="space-y-3">
                                        <h5 className="font-semibold text-gray-800 text-sm flex items-center">
                                            <MobileIcon className="w-4 h-4 ml-1" /> Responsive
                                        </h5>
                                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                                            <li>سازگار با موبایل</li>
                                            <li>سایزهای مختلف صفحه</li>
                                            <li>Touch-friendly buttons</li>
                                            <li>Adaptive spacing</li>
                                        </ul>
                                    </div>
                                    <div className="space-y-3">
                                        <h5 className="font-semibold text-gray-800 text-sm">🌍 چندزبانه</h5>
                                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                                            <li>نمایش شمسی (جلالی)</li>
                                            <li>نام ماه‌های فارسی</li>
                                            <li>روزهای هفته فارسی</li>
                                            <li>پشتیبانی از RTL</li>
                                            <li>فونت Vazirmatn</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
