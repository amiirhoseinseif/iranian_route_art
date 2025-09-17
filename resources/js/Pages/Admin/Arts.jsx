import React, { useState, useEffect } from 'react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { 
    MusicIcon, 
    PaintingIcon, 
    FilmIcon, 
    SculptureIcon, 
    GraphicIcon, 
    CalligraphyIcon, 
    PhotographyIcon, 
    ArchitectureIcon,
    CheckIcon,
    ClockIcon,
    CloseIcon,
    SearchIcon,
    FilterIcon,
    EyeIcon,
    EditIcon,
    TrashIcon,
    DownloadIcon
} from '@/Components/SvgIcons';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';

export default function AdminArts({ auth }) {
    const [arts, setArts] = useState([]);
    const [filteredArts, setFilteredArts] = useState([]);
    const [selectedField, setSelectedField] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showArtModal, setShowArtModal] = useState(false);
    const [selectedArt, setSelectedArt] = useState(null);
    const [loading, setLoading] = useState(true);

    const artFields = [
        { value: 'all', name: 'همه رشته‌ها', icon: MusicIcon },
        { value: 'music', name: 'موسیقی', icon: MusicIcon },
        { value: 'painting', name: 'نقاشی', icon: PaintingIcon },
        { value: 'film', name: 'فیلم‌سازی', icon: FilmIcon },
        { value: 'sculpture', name: 'مجسمه‌سازی', icon: SculptureIcon },
        { value: 'graphic', name: 'گرافیک', icon: GraphicIcon },
        { value: 'calligraphy', name: 'خوشنویسی', icon: CalligraphyIcon },
        { value: 'photography', name: 'عکاسی', icon: PhotographyIcon },
        { value: 'architecture', name: 'معماری', icon: ArchitectureIcon },
    ];

    const statuses = [
        { value: 'all', name: 'همه وضعیت‌ها', icon: CheckIcon },
        { value: 'approved', name: 'تایید شده', icon: CheckIcon },
        { value: 'pending', name: 'در انتظار', icon: ClockIcon },
        { value: 'rejected', name: 'رد شده', icon: CloseIcon },
    ];

    useEffect(() => {
        fetchArts();
    }, []);

    useEffect(() => {
        filterArts();
    }, [arts, selectedField, selectedStatus, searchTerm]);

    const fetchArts = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/admin/arts', {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setArts(data.data || []);
            }
        } catch (error) {
            console.error('Error fetching arts:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterArts = () => {
        let filtered = arts;

        // Filter by field
        if (selectedField !== 'all') {
            filtered = filtered.filter(art => art.art_field?.slug === selectedField);
        }

        // Filter by status
        if (selectedStatus !== 'all') {
            filtered = filtered.filter(art => art.status === selectedStatus);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(art => 
                art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                art.artist?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                art.artist?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                art.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredArts(filtered);
    };

    const handleArtStatusChange = async (artId, newStatus, rejectionReason = '') => {
        try {
            const response = await fetch(`/api/admin/arts/${artId}/status`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: newStatus,
                    rejection_reason: rejectionReason
                })
            });

            if (response.ok) {
                fetchArts();
            }
        } catch (error) {
            console.error('Error updating art status:', error);
        }
    };

    const handleDeleteArt = async (artId) => {
        if (window.confirm('آیا مطمئن هستید که می‌خواهید این اثر را حذف کنید؟')) {
            try {
                const response = await fetch(`/api/admin/arts/${artId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${auth.access_token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    fetchArts();
                }
            } catch (error) {
                console.error('Error deleting art:', error);
            }
        }
    };

    const openArtModal = (art) => {
        setSelectedArt(art);
        setShowArtModal(true);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'approved': return 'تایید شده';
            case 'pending': return 'در انتظار';
            case 'rejected': return 'رد شده';
            default: return 'نامشخص';
        }
    };

    const getFieldIcon = (fieldSlug) => {
        const field = artFields.find(f => f.value === fieldSlug);
        return field ? field.icon : MusicIcon;
    };

    if (loading) {
        return (
            <FestivalLayout title="مدیریت آثار - پنل مدیریت">
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 font-['Vazirmatn']">در حال بارگذاری...</p>
                    </div>
                </div>
            </FestivalLayout>
        );
    }

    return (
        <FestivalLayout title="مدیریت آثار - پنل مدیریت">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                        مدیریت آثار هنری
                    </h1>
                    <p className="text-gray-600 font-['Vazirmatn']">
                        مدیریت و بررسی آثار ارسالی هنرمندان
                    </p>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <MusicIcon className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">کل آثار</p>
                                <p className="text-2xl font-bold text-gray-800">{arts.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <CheckIcon className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">تایید شده</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {arts.filter(art => art.status === 'approved').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <ClockIcon className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">در انتظار</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {arts.filter(art => art.status === 'pending').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                <CloseIcon className="w-6 h-6 text-red-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">رد شده</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {arts.filter(art => art.status === 'rejected').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <SearchIcon className="w-5 h-5 text-gray-400" />
                            <TextInput
                                type="text"
                                placeholder="جستجو در آثار..."
                                className="w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <FilterIcon className="w-5 h-5 text-gray-400" />
                            <select
                                value={selectedField}
                                onChange={(e) => setSelectedField(e.target.value)}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            >
                                {artFields.map((field) => (
                                    <option key={field.value} value={field.value}>
                                        {field.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            >
                                {statuses.map((status) => (
                                    <option key={status.value} value={status.value}>
                                        {status.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="text-sm text-gray-600 font-['Vazirmatn']">
                        نمایش {filteredArts.length} اثر از {arts.length} اثر کل
                    </div>
                </div>

                {/* Arts Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-right py-4 px-6 font-semibold text-gray-800 font-['Vazirmatn']">اثر</th>
                                    <th className="text-right py-4 px-6 font-semibold text-gray-800 font-['Vazirmatn']">هنرمند</th>
                                    <th className="text-right py-4 px-6 font-semibold text-gray-800 font-['Vazirmatn']">رشته</th>
                                    <th className="text-right py-4 px-6 font-semibold text-gray-800 font-['Vazirmatn']">وضعیت</th>
                                    <th className="text-right py-4 px-6 font-semibold text-gray-800 font-['Vazirmatn']">تاریخ ارسال</th>
                                    <th className="text-right py-4 px-6 font-semibold text-gray-800 font-['Vazirmatn']">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredArts.map((art) => {
                                    const FieldIcon = getFieldIcon(art.art_field?.slug);
                                    return (
                                        <tr key={art.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center ml-3">
                                                        <FieldIcon className="w-6 h-6 text-amber-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-800 font-['Vazirmatn']">
                                                            {art.title}
                                                        </div>
                                                        <div className="text-sm text-gray-600 font-['Vazirmatn']">
                                                            {art.description?.substring(0, 50)}...
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 font-['Vazirmatn']">
                                                {art.artist?.first_name} {art.artist?.last_name}
                                            </td>
                                            <td className="py-4 px-6 font-['Vazirmatn']">
                                                {art.art_field?.name || 'نامشخص'}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(art.status)}`}>
                                                    {getStatusText(art.status)}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 font-['Vazirmatn']">
                                                {new Date(art.created_at).toLocaleDateString('fa-IR')}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => openArtModal(art)}
                                                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                        title="مشاهده جزئیات"
                                                    >
                                                        <EyeIcon className="w-4 h-4" />
                                                    </button>
                                                    
                                                    {art.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleArtStatusChange(art.id, 'approved')}
                                                                className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                                                                title="تایید اثر"
                                                            >
                                                                <CheckIcon className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    const reason = prompt('دلیل رد شدن:');
                                                                    if (reason) {
                                                                        handleArtStatusChange(art.id, 'rejected', reason);
                                                                    }
                                                                }}
                                                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                                title="رد اثر"
                                                            >
                                                                <CloseIcon className="w-4 h-4" />
                                                            </button>
                                                        </>
                                                    )}
                                                    
                                                    <button
                                                        onClick={() => handleDeleteArt(art.id)}
                                                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                        title="حذف اثر"
                                                    >
                                                        <TrashIcon className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {filteredArts.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MusicIcon className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-600 mb-2 font-['Vazirmatn']">
                                اثری یافت نشد
                            </h3>
                            <p className="text-gray-500 font-['Vazirmatn']">
                                با فیلترهای انتخاب شده اثری وجود ندارد
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Art Details Modal */}
            <Modal show={showArtModal} onClose={() => setShowArtModal(false)}>
                {selectedArt && (
                    <div className="p-6 max-w-4xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                            جزئیات اثر: {selectedArt.title}
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 font-['Vazirmatn']">
                                    اطلاعات اثر
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 font-['Vazirmatn']">عنوان:</label>
                                        <p className="text-gray-800 font-['Vazirmatn']">{selectedArt.title}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 font-['Vazirmatn']">توضیحات:</label>
                                        <p className="text-gray-800 font-['Vazirmatn']">{selectedArt.description}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 font-['Vazirmatn']">رشته هنری:</label>
                                        <p className="text-gray-800 font-['Vazirmatn']">{selectedArt.art_field?.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 font-['Vazirmatn']">وضعیت:</label>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedArt.status)}`}>
                                            {getStatusText(selectedArt.status)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 font-['Vazirmatn']">
                                    اطلاعات هنرمند
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 font-['Vazirmatn']">نام:</label>
                                        <p className="text-gray-800 font-['Vazirmatn']">
                                            {selectedArt.artist?.first_name} {selectedArt.artist?.last_name}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 font-['Vazirmatn']">ایمیل:</label>
                                        <p className="text-gray-800 font-['Vazirmatn']">{selectedArt.artist?.email}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 font-['Vazirmatn']">تاریخ ارسال:</label>
                                        <p className="text-gray-800 font-['Vazirmatn']">
                                            {new Date(selectedArt.created_at).toLocaleDateString('fa-IR')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {selectedArt.rejection_reason && (
                            <div className="mt-6 p-4 bg-red-50 rounded-lg">
                                <h4 className="font-semibold text-red-800 mb-2 font-['Vazirmatn']">دلیل رد شدن:</h4>
                                <p className="text-red-700 font-['Vazirmatn']">{selectedArt.rejection_reason}</p>
                            </div>
                        )}

                        <div className="flex justify-end mt-6 space-x-3">
                            <SecondaryButton onClick={() => setShowArtModal(false)}>
                                بستن
                            </SecondaryButton>
                            {selectedArt.status === 'pending' && (
                                <>
                                    <PrimaryButton 
                                        onClick={() => {
                                            handleArtStatusChange(selectedArt.id, 'approved');
                                            setShowArtModal(false);
                                        }}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        تایید اثر
                                    </PrimaryButton>
                                    <button
                                        onClick={() => {
                                            const reason = prompt('دلیل رد شدن:');
                                            if (reason) {
                                                handleArtStatusChange(selectedArt.id, 'rejected', reason);
                                                setShowArtModal(false);
                                            }
                                        }}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-['Vazirmatn']"
                                    >
                                        رد اثر
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </FestivalLayout>
    );
}
