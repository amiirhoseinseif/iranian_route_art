import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
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
import TextInput from '@/Components/TextInput';

export default function AdminArts({ auth }) {
    const [arts, setArts] = useState([]);
    const [filteredArts, setFilteredArts] = useState([]);
    const [selectedField, setSelectedField] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const artFields = [
        { value: 'all', name: 'همه رشته‌ها', icon: MusicIcon },
        { value: 'music', name: 'موسیقی', icon: MusicIcon },
        { value: 'calligraphy', name: 'خوشنویسی', icon: CalligraphyIcon },
        { value: 'painting', name: 'نقاشی', icon: PaintingIcon },
        { value: 'sculpture', name: 'مجسمه‌سازی', icon: SculptureIcon },
        { value: 'handicrafts', name: 'صنایع دستی', icon: HandicraftsIcon },
        { value: 'architecture', name: 'معماری', icon: ArchitectureIcon },
        { value: 'industrial_design', name: 'طراحی صنعتی', icon: IndustrialDesignIcon },
        { value: 'graphic', name: 'گرافیک و تصویرسازی', icon: IllustrationIcon },
        { value: 'literature', name: 'ادبیات', icon: LiteratureIcon },
        { value: 'carpet', name: 'فرش', icon: CarpetIcon },
        { value: 'short_film', name: 'سینما', icon: ShortFilmIcon },
        { value: 'theater', name: 'نمایش', icon: TheaterIcon },
        { value: 'fashion_design', name: 'طراحی پارچه و طراحی لباس', icon: FashionDesignIcon },
        { value: 'animation', name: 'انیمیشن', icon: AnimationIcon },
        { value: 'photography', name: 'عکاسی', icon: PhotographyIcon },
        { value: 'new_media_arts', name: 'هنرهای جدید', icon: NewMediaArtsIcon },
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
            filtered = filtered.filter(art => art.art_field?.icon_name === selectedField);
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

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'bg-secondary-200 text-secondary-800';
            case 'pending': return 'bg-secondary-100 text-secondary-700';
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
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 font-['iransansX']">در حال بارگذاری...</p>
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
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['iransansX']">
                        مدیریت آثار هنری
                    </h1>
                    <p className="text-gray-600 font-['iransansX']">
                        مدیریت و بررسی آثار ارسالی هنرمندان
                    </p>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                                <MusicIcon className="w-6 h-6 text-primary-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['iransansX']">کل آثار</p>
                                <p className="text-2xl font-bold text-gray-800">{arts.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-secondary-200 rounded-xl flex items-center justify-center">
                                <CheckIcon className="w-6 h-6 text-secondary-700" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['iransansX']">تایید شده</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {arts.filter(art => art.status === 'approved').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                                <ClockIcon className="w-6 h-6 text-secondary-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['iransansX']">در انتظار</p>
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
                                <p className="text-sm text-gray-600 font-['iransansX']">رد شده</p>
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

                    <div className="text-sm text-gray-600 font-['iransansX']">
                        نمایش {filteredArts.length} اثر از {arts.length} اثر کل
                    </div>
                </div>

                {/* Arts Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-right py-4 px-6 font-semibold text-gray-800 font-['iransansX']">اثر</th>
                                    <th className="text-right py-4 px-6 font-semibold text-gray-800 font-['iransansX']">هنرمند</th>
                                    <th className="text-right py-4 px-6 font-semibold text-gray-800 font-['iransansX']">رشته</th>
                                    <th className="text-right py-4 px-6 font-semibold text-gray-800 font-['iransansX']">وضعیت</th>
                                    <th className="text-right py-4 px-6 font-semibold text-gray-800 font-['iransansX']">تاریخ ارسال</th>
                                    <th className="text-right py-4 px-6 font-semibold text-gray-800 font-['iransansX']">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredArts.map((art) => {
                                    const FieldIcon = getFieldIcon(art.art_field?.icon_name);
                                    return (
                                        <tr key={art.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center ml-3">
                                                        <FieldIcon className="w-6 h-6 text-primary-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-800 font-['iransansX']">
                                                            {art.title}
                                                        </div>
                                                        <div className="text-sm text-gray-600 font-['iransansX']">
                                                            {art.description?.substring(0, 50)}...
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 font-['iransansX']">
                                                {art.artist?.first_name} {art.artist?.last_name}
                                            </td>
                                            <td className="py-4 px-6 font-['iransansX']">
                                                {art.art_field?.name || 'نامشخص'}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(art.status)}`}>
                                                    {getStatusText(art.status)}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 font-['iransansX']">
                                                {new Date(art.created_at).toLocaleDateString('fa-IR')}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/admin/arts/${art.id}`}
                                                        className="p-2 text-primary-600 hover:bg-primary-100 rounded-lg transition-colors"
                                                        title="مشاهده جزئیات"
                                                    >
                                                        <EyeIcon className="w-4 h-4" />
                                                    </Link>
                                                    
                                                    {art.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleArtStatusChange(art.id, 'approved')}
                                                                className="p-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors"
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
                            <h3 className="text-xl font-bold text-gray-600 mb-2 font-['iransansX']">
                                اثری یافت نشد
                            </h3>
                            <p className="text-gray-500 font-['iransansX']">
                                با فیلترهای انتخاب شده اثری وجود ندارد
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </FestivalLayout>
    );
}
