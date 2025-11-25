import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { 
    PaletteIcon,
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
import { useTranslation } from '@/Utils/translation';

export default function AdminArts({ auth }) {
    const { trans } = useTranslation();
    const [arts, setArts] = useState([]);
    const [filteredArts, setFilteredArts] = useState([]);
    const [selectedField, setSelectedField] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const artFields = [
        { value: 'all', name: trans('all_fields') },
        { value: 'music', name: trans('music') },
        { value: 'calligraphy', name: trans('calligraphy') },
        { value: 'painting', name: trans('painting') },
        { value: 'sculpture', name: trans('sculpture') },
        { value: 'handicrafts', name: trans('handicrafts') },
        { value: 'architecture', name: trans('architecture') },
        { value: 'industrial_design', name: trans('industrial_design') },
        { value: 'graphic', name: trans('graphic') },
        { value: 'literature', name: trans('literature') },
        { value: 'carpet', name: trans('carpet') },
        { value: 'short_film', name: trans('short_film') },
        { value: 'theater', name: trans('theater') },
        { value: 'fashion_design', name: trans('fashion_design') },
        { value: 'animation', name: trans('animation') },
        { value: 'photography', name: trans('photography') },
        { value: 'new_media_arts', name: trans('new_media_arts') },
    ];

    const statuses = [
        { value: 'all', name: trans('all_statuses'), icon: CheckIcon },
        { value: 'approved', name: trans('status_approved'), icon: CheckIcon },
        { value: 'pending', name: trans('status_pending'), icon: ClockIcon },
        { value: 'rejected', name: trans('status_rejected'), icon: CloseIcon },
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
        if (window.confirm(trans('confirm_delete'))) {
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
            case 'approved': return trans('status_approved');
            case 'pending': return trans('status_pending');
            case 'rejected': return trans('status_rejected');
            default: return trans('unknown');
        }
    };


    if (loading) {
        return (
            <FestivalLayout title={`${trans('admin_arts_title')} - ${trans('admin_panel_title')}`}>
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 font-['iransansX']">{trans('loading')}</p>
                    </div>
                </div>
            </FestivalLayout>
        );
    }

    return (
        <FestivalLayout title={`${trans('admin_arts_title')} - ${trans('admin_panel_title')}`}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['iransansX']">
                        {trans('admin_arts_title')}
                    </h1>
                    <p className="text-gray-600 font-['iransansX']">
                        {trans('admin_arts_description')}
                    </p>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                                <PaletteIcon className="w-6 h-6 text-primary-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['iransansX']">{trans('total_arts')}</p>
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
                                <p className="text-sm text-gray-600 font-['iransansX']">{trans('status_approved')}</p>
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
                                <p className="text-sm text-gray-600 font-['iransansX']">{trans('status_pending')}</p>
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
                                <p className="text-sm text-gray-600 font-['iransansX']">{trans('status_rejected')}</p>
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
                                placeholder={trans('search_arts')}
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
                        {trans('showing_arts').replace('{count}', filteredArts.length).replace('{total}', arts.length)}
                    </div>
                </div>

                {/* Arts Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-right py-4 px-6 font-semibold text-gray-800 font-['iransansX']">{trans('artwork')}</th>
                                    <th className="text-right py-4 px-6 font-semibold text-gray-800 font-['iransansX']">{trans('artist_name')}</th>
                                    <th className="text-right py-4 px-6 font-semibold text-gray-800 font-['iransansX']">{trans('art_field_name')}</th>
                                    <th className="text-right py-4 px-6 font-semibold text-gray-800 font-['iransansX']">{trans('status')}</th>
                                    <th className="text-right py-4 px-6 font-semibold text-gray-800 font-['iransansX']">{trans('submission_date')}</th>
                                    <th className="text-right py-4 px-6 font-semibold text-gray-800 font-['iransansX']">{trans('edit')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredArts.map((art) => {
                                    return (
                                        <tr key={art.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center ml-3">
                                                        <PaletteIcon className="w-6 h-6 text-primary-600" />
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
                                                {art.art_field?.name || trans('unknown')}
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
                                                        title={trans('view_details')}
                                                    >
                                                        <EyeIcon className="w-4 h-4" />
                                                    </Link>
                                                    
                                                    {art.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleArtStatusChange(art.id, 'approved')}
                                                                className="p-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors"
                                                                title={trans('approve_artwork')}
                                                            >
                                                                <CheckIcon className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    const reason = prompt(trans('reject_reason_prompt'));
                                                                    if (reason) {
                                                                        handleArtStatusChange(art.id, 'rejected', reason);
                                                                    }
                                                                }}
                                                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                                title={trans('reject_artwork')}
                                                            >
                                                                <CloseIcon className="w-4 h-4" />
                                                            </button>
                                                        </>
                                                    )}
                                                    
                                                    <button
                                                        onClick={() => handleDeleteArt(art.id)}
                                                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                        title={trans('delete_artwork')}
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
                                <PaletteIcon className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-600 mb-2 font-['iransansX']">
                                {trans('no_artwork_found')}
                            </h3>
                            <p className="text-gray-500 font-['iransansX']">
                                {trans('no_artwork_with_filters')}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </FestivalLayout>
    );
}
