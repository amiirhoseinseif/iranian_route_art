import React, { useState, useEffect } from 'react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { useTranslation } from '@/Utils/translation';
import { 
    CheckIcon,
    ClockIcon,
    CloseIcon,
    AddIcon,
    ProfileIcon,
    ListIcon,
    TrophyIcon,
    GlobalIcon,
    AdminIcon,
    UserCheckIcon,
    UserXIcon,
    ShieldCheckIcon,
    ShieldXIcon
} from '@/Components/SvgIcons';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function AdminDashboard({ auth }) {
    const { trans } = useTranslation();
    const [stats, setStats] = useState({
        total_artists: 0,
        total_arts: 0,
        total_judges: 0,
        pending_judges: 0,
        verified_judges: 0,
        rejected_judges: 0,
        total_admins: 0
    });
    const [showAddAdminModal, setShowAddAdminModal] = useState(false);
    const [showPendingJudgesModal, setShowPendingJudgesModal] = useState(false);
    const [showArtistsModal, setShowArtistsModal] = useState(false);
    const [showArtsModal, setShowArtsModal] = useState(false);
    const [showJudgesModal, setShowJudgesModal] = useState(false);
    const [showAdminsModal, setShowAdminsModal] = useState(false);
    const [pendingJudges, setPendingJudges] = useState([]);
    const [artists, setArtists] = useState([]);
    const [arts, setArts] = useState([]);
    const [allJudges, setAllJudges] = useState([]);
    const [allAdmins, setAllAdmins] = useState([]);
    const [recentActivities, setRecentActivities] = useState([]);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        role: 'admin'
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchDashboardStats();
        fetchPendingJudges();
        fetchRecentActivities();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const response = await fetch('/api/admin/dashboard-stats', {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        }
    };

    const fetchRecentActivities = async () => {
        try {
            const response = await fetch('/api/admin/recent-activities', {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setRecentActivities(data);
            }
        } catch (error) {
            console.error('Error fetching recent activities:', error);
        }
    };

    const fetchPendingJudges = async () => {
        try {
            const response = await fetch('/api/admin/judges/pending', {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setPendingJudges(data.data || []);
            }
        } catch (error) {
            console.error('Error fetching pending judges:', error);
        }
    };

    const fetchArtists = async () => {
        try {
            const response = await fetch('/api/admin/artists', {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setArtists(data.data || []);
            }
        } catch (error) {
            console.error('Error fetching artists:', error);
        }
    };

    const fetchArts = async () => {
        try {
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
        }
    };

    const fetchAllJudges = async () => {
        try {
            const response = await fetch('/api/admin/judges', {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setAllJudges(data.data || []);
            }
        } catch (error) {
            console.error('Error fetching judges:', error);
        }
    };

    const fetchAllAdmins = async () => {
        try {
            const response = await fetch('/api/admin/admins', {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setAllAdmins(data.data || []);
            }
        } catch (error) {
            console.error('Error fetching admins:', error);
        }
    };

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            const response = await fetch('/api/admin/admins', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setShowAddAdminModal(false);
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    password: '',
                    role: 'admin'
                });
                fetchDashboardStats();
            } else {
                setErrors(data.errors || {});
            }
        } catch (error) {
            console.error('Error adding admin:', error);
        }
    };

    const handleJudgeApproval = async (judgeId, status, rejectionReason = '') => {
        try {
            const response = await fetch(`/api/admin/judges/${judgeId}/approve`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    verification_status: status,
                    rejection_reason: rejectionReason
                })
            });

            if (response.ok) {
                fetchPendingJudges();
                fetchDashboardStats();
            }
        } catch (error) {
            console.error('Error approving judge:', error);
        }
    };

    return (
        <FestivalLayout title={trans('admin_panel_title')}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 font-['iransansX']">
                        {trans('admin_panel_title')}
                    </h1>
                    <p className="text-gray-600 font-['iransansX'] text-sm sm:text-base">
                        {trans('admin_panel_subtitle')}
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fadeIn">
                        <div className="flex items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110">
                                <ProfileIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                            </div>
                            <div className="mr-3 sm:mr-4">
                                <p className="text-xs sm:text-sm text-gray-600 font-['iransansX']">{trans('total_artists_admin')}</p>
                                <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.total_artists}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fadeIn">
                        <div className="flex items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary-200 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110">
                                <TrophyIcon className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-700" />
                            </div>
                            <div className="mr-3 sm:mr-4">
                                <p className="text-xs sm:text-sm text-gray-600 font-['iransansX']">{trans('total_artworks')}</p>
                                <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.total_arts}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fadeIn">
                        <div className="flex items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary-100 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110">
                                <GlobalIcon className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-600" />
                            </div>
                            <div className="mr-3 sm:mr-4">
                                <p className="text-xs sm:text-sm text-gray-600 font-['iransansX']">{trans('total_judges_admin')}</p>
                                <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.total_judges}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fadeIn">
                        <div className="flex items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-200 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110">
                                <ClockIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-700" />
                            </div>
                            <div className="mr-3 sm:mr-4">
                                <p className="text-xs sm:text-sm text-gray-600 font-['iransansX']">{trans('pending_judges_admin')}</p>
                                <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.pending_judges}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 sm:mb-8">
                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fadeIn">
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 font-['iransansX']">{trans('artists_management')}</h3>
                        <div className="space-y-3">
                            <button 
                                onClick={() => {
                                    fetchArtists();
                                    setShowArtistsModal(true);
                                }}
                                className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-['iransansX'] transform hover:scale-105"
                            >
                                {trans('view_all_artists')}
                            </button>
                            <button className="w-full bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors font-['iransansX'] transform hover:scale-105">
                                {trans('approve_new_artists')}
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fadeIn">
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 font-['iransansX']">{trans('arts_management')}</h3>
                        <div className="space-y-3">
                            <button 
                                onClick={() => {
                                    fetchArts();
                                    setShowArtsModal(true);
                                }}
                                className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-['iransansX'] transform hover:scale-105"
                            >
                                {trans('view_all_arts')}
                            </button>
                            <button className="w-full bg-secondary-500 text-white px-4 py-2 rounded-lg hover:bg-secondary-600 transition-colors font-['iransansX'] transform hover:scale-105">
                                {trans('pending_arts_approval')}
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fadeIn">
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 font-['iransansX']">{trans('judges_management')}</h3>
                        <div className="space-y-3">
                            <button 
                                onClick={() => {
                                    fetchAllJudges();
                                    setShowJudgesModal(true);
                                }}
                                className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-['iransansX'] transform hover:scale-105"
                            >
                                {trans('view_all_judges')}
                            </button>
                            <button 
                                onClick={() => setShowPendingJudgesModal(true)}
                                className="w-full bg-primary-700 text-white px-4 py-2 rounded-lg hover:bg-primary-800 transition-colors font-['iransansX'] transform hover:scale-105"
                            >
                                {trans('approve_judges')} ({stats.pending_judges})
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fadeIn">
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 font-['iransansX']">{trans('admins_management')}</h3>
                        <div className="space-y-3">
                            <button 
                                onClick={() => {
                                    fetchAllAdmins();
                                    setShowAdminsModal(true);
                                }}
                                className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-['iransansX'] transform hover:scale-105"
                            >
                                {trans('view_all_admins')}
                            </button>
                            <button 
                                onClick={() => setShowAddAdminModal(true)}
                                className="w-full bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors font-['iransansX'] flex items-center justify-center transform hover:scale-105"
                            >
                                <AddIcon className="w-4 h-4 ml-2" />
                                {trans('add_new_admin')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 animate-slideDown">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 font-['iransansX']">{trans('recent_activities')}</h3>
                    <div className="space-y-4">
                        {(recentActivities || []).length === 0 ? (
                            <p className="text-gray-500 text-center py-8 font-['iransansX']">
                                {trans('no_activities')}
                            </p>
                        ) : (
                            (recentActivities || []).map((activity, index) => (
                                <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100 animate-fadeIn" style={{ animationDelay: `${index * 0.05}s` }}>
                                    <div className="flex items-center">
                                        <div className={`w-3 h-3 rounded-full mr-3 ${
                                            activity.status === 'success' ? 'bg-secondary-600' :
                                            activity.status === 'info' ? 'bg-primary-500' :
                                            activity.status === 'warning' ? 'bg-secondary-500' : 'bg-primary-600'
                                        }`}></div>
                                        <div>
                                            <p className="font-medium text-gray-800 font-['iransansX'] text-sm sm:text-base">
                                                {activity.message}
                                                {activity.art_title && (
                                                    <span className="text-gray-600">: {activity.art_title}</span>
                                                )}
                                                {activity.score && (
                                                    <span className="text-primary-600 font-bold"> ({trans('score_label')}: {activity.score})</span>
                                                )}
                                            </p>
                                            <p className="text-xs sm:text-sm text-gray-600 font-['iransansX']">
                                                {trans('by')} {activity.user}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xs sm:text-sm text-gray-500 font-['iransansX'] hidden sm:inline">
                                        {new Date(activity.time).toLocaleDateString('fa-IR')} - {new Date(activity.time).toLocaleTimeString('fa-IR')}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* System Status */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 animate-fadeIn">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 font-['iransansX']">{trans('system_status')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-3 font-['iransansX']">{trans('server')}</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-xs sm:text-sm text-gray-600 font-['iransansX']">{trans('cpu')}</span>
                                    <span className="text-xs sm:text-sm font-medium">23%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-secondary-600 h-2 rounded-full transition-all duration-300" style={{ width: '23%' }}></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-3 font-['iransansX']">{trans('memory')}</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-xs sm:text-sm text-gray-600 font-['iransansX']">{trans('ram')}</span>
                                    <span className="text-xs sm:text-sm font-medium">67%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-secondary-500 h-2 rounded-full transition-all duration-300" style={{ width: '67%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Admin Modal */}
            <Modal show={showAddAdminModal} onClose={() => setShowAddAdminModal(false)}>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 font-['iransansX']">
                        {trans('add_admin_title')}
                    </h2>
                    
                    <form onSubmit={handleAddAdmin}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <InputLabel htmlFor="first_name" value={trans('first_name')} />
                                <TextInput
                                    id="first_name"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={formData.first_name}
                                    onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                                    required
                                />
                                <InputError message={errors.first_name} className="mt-2" />
                            </div>
                            
                            <div>
                                <InputLabel htmlFor="last_name" value={trans('last_name')} />
                                <TextInput
                                    id="last_name"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={formData.last_name}
                                    onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                                    required
                                />
                                <InputError message={errors.last_name} className="mt-2" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <InputLabel htmlFor="email" value={trans('email')} />
                                <TextInput
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            
                            <div>
                                <InputLabel htmlFor="phone" value={trans('phone')} />
                                <TextInput
                                    id="phone"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    required
                                />
                                <InputError message={errors.phone} className="mt-2" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <InputLabel htmlFor="password" value={trans('password')} />
                                <TextInput
                                    id="password"
                                    type="password"
                                    className="mt-1 block w-full"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            
                            <div>
                                <InputLabel htmlFor="role" value={trans('role')} />
                                <select
                                    id="role"
                                    className="mt-1 block w-full border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-md shadow-sm font-['iransansX']"
                                    value={formData.role}
                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    required
                                >
                                    <option value="admin">{trans('admin')}</option>
                                    <option value="moderator">{trans('moderator')}</option>
                                </select>
                                <InputError message={errors.role} className="mt-2" />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <SecondaryButton onClick={() => setShowAddAdminModal(false)}>
                                {trans('cancel')}
                            </SecondaryButton>
                            <PrimaryButton type="submit">
                                {trans('add_new_admin')}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Pending Judges Modal */}
            <Modal show={showPendingJudgesModal} onClose={() => setShowPendingJudgesModal(false)}>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 font-['iransansX']">
                        {trans('pending_judges_title')}
                    </h2>
                    
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                        {(pendingJudges || []).length === 0 ? (
                            <p className="text-gray-500 text-center py-8 font-['iransansX']">
                                {trans('no_pending_judges')}
                            </p>
                        ) : (
                            (pendingJudges || []).map((judge) => (
                                <div key={judge.id} className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-gray-800 font-['iransansX']">
                                                {judge.first_name} {judge.last_name}
                                            </h3>
                                            <p className="text-sm text-gray-600 font-['iransansX']">
                                                {judge.email}
                                            </p>
                                            <p className="text-sm text-gray-600 font-['iransansX']">
                                                {judge.qualification}
                                            </p>
                                            {judge.organization && (
                                                <p className="text-sm text-gray-600 font-['iransansX']">
                                                    {judge.organization}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleJudgeApproval(judge.id, 'approved')}
                                                className="bg-secondary-600 text-white px-3 py-1 rounded text-sm hover:bg-secondary-700 transition-colors font-['iransansX'] flex items-center transform hover:scale-105"
                                            >
                                                <ShieldCheckIcon className="w-4 h-4 ml-1" />
                                                {trans('approve')}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    const reason = prompt(trans('reject_reason_prompt'));
                                                    if (reason) {
                                                        handleJudgeApproval(judge.id, 'rejected', reason);
                                                    }
                                                }}
                                                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors font-['iransansX'] flex items-center transform hover:scale-105"
                                            >
                                                <ShieldXIcon className="w-4 h-4 ml-1" />
                                                {trans('reject')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="flex justify-end mt-6">
                        <SecondaryButton onClick={() => setShowPendingJudgesModal(false)}>
                            {trans('close')}
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>

            {/* Artists Management Modal */}
            <Modal show={showArtistsModal} onClose={() => setShowArtistsModal(false)}>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 font-['iransansX']">
                        {trans('artists_list')}
                    </h2>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">{trans('artists_list_name')}</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">{trans('artists_list_email')}</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">{trans('artists_list_field')}</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">{trans('artists_list_registration')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(artists || []).map((artist) => (
                                    <tr key={artist.id} className="border-b border-gray-100">
                                        <td className="py-3 px-4 font-['iransansX']">
                                            {artist.first_name} {artist.last_name}
                                        </td>
                                        <td className="py-3 px-4 font-['iransansX']">{artist.email}</td>
                                        <td className="py-3 px-4 font-['iransansX']">
                                            {artist.art_field?.name || trans('unknown')}
                                        </td>
                                        <td className="py-3 px-4 font-['iransansX']">
                                            {new Date(artist.created_at).toLocaleDateString('fa-IR')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end mt-6">
                        <SecondaryButton onClick={() => setShowArtistsModal(false)}>
                            {trans('close')}
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>

            {/* Arts Management Modal */}
            <Modal show={showArtsModal} onClose={() => setShowArtsModal(false)}>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 font-['iransansX']">
                        {trans('arts_list')}
                    </h2>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">{trans('arts_list_title')}</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">{trans('arts_list_artist')}</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">{trans('arts_list_field')}</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">{trans('arts_list_status')}</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">{trans('arts_list_submission')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(arts || []).map((art) => (
                                    <tr key={art.id} className="border-b border-gray-100">
                                        <td className="py-3 px-4 font-['iransansX']">{art.title}</td>
                                        <td className="py-3 px-4 font-['iransansX']">
                                            {art.artist?.first_name} {art.artist?.last_name}
                                        </td>
                                        <td className="py-3 px-4 font-['iransansX']">
                                            {art.art_field?.name || trans('unknown')}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                art.status === 'approved' ? 'bg-secondary-200 text-secondary-800' :
                                                art.status === 'pending' ? 'bg-secondary-100 text-secondary-700' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {art.status === 'approved' ? trans('approved_status') :
                                                 art.status === 'pending' ? trans('pending_status') : trans('rejected_status')}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 font-['iransansX']">
                                            {new Date(art.created_at).toLocaleDateString('fa-IR')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end mt-6">
                        <SecondaryButton onClick={() => setShowArtsModal(false)}>
                            {trans('close')}
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>

            {/* Judges Management Modal */}
            <Modal show={showJudgesModal} onClose={() => setShowJudgesModal(false)}>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 font-['iransansX']">
                        {trans('judges_list')}
                    </h2>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">{trans('artists_list_name')}</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">{trans('artists_list_email')}</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">{trans('judges_list_qualification')}</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">{trans('judges_list_verification')}</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">{trans('artists_list_registration')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(allJudges || []).map((judge) => (
                                    <tr key={judge.id} className="border-b border-gray-100">
                                        <td className="py-3 px-4 font-['iransansX']">
                                            {judge.first_name} {judge.last_name}
                                        </td>
                                        <td className="py-3 px-4 font-['iransansX']">{judge.email}</td>
                                        <td className="py-3 px-4 font-['iransansX']">{judge.qualification}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                judge.verification_status === 'approved' ? 'bg-secondary-200 text-secondary-800' :
                                                judge.verification_status === 'pending' ? 'bg-secondary-100 text-secondary-700' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {judge.verification_status === 'approved' ? trans('approved_status') :
                                                 judge.verification_status === 'pending' ? trans('pending_status') : trans('rejected_status')}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 font-['iransansX']">
                                            {new Date(judge.created_at).toLocaleDateString('fa-IR')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end mt-6">
                        <SecondaryButton onClick={() => setShowJudgesModal(false)}>
                            {trans('close')}
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>

            {/* Admins Management Modal */}
            <Modal show={showAdminsModal} onClose={() => setShowAdminsModal(false)}>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 font-['iransansX']">
                        {trans('admins_list')}
                    </h2>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">{trans('artists_list_name')}</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">{trans('artists_list_email')}</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">{trans('admins_list_role')}</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">{trans('admins_list_status')}</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">{trans('admins_list_created')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(allAdmins || []).map((admin) => (
                                    <tr key={admin.id} className="border-b border-gray-100">
                                        <td className="py-3 px-4 font-['iransansX']">
                                            {admin.first_name} {admin.last_name}
                                        </td>
                                        <td className="py-3 px-4 font-['iransansX']">{admin.email}</td>
                                        <td className="py-3 px-4 font-['iransansX']">
                                            {admin.role === 'super_admin' ? trans('super_admin') : 
                                             admin.role === 'admin' ? trans('admin') : trans('moderator')}
                                        </td>
                                        <td className="py-3 px-4">
                                            {admin.is_active ? 
                                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-secondary-200 text-secondary-800">
                                                    {trans('active')}
                                                </span> :
                                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                    {trans('inactive')}
                                                </span>
                                            }
                                        </td>
                                        <td className="py-3 px-4 font-['iransansX']">
                                            {new Date(admin.created_at).toLocaleDateString('fa-IR')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end mt-6">
                        <SecondaryButton onClick={() => setShowAdminsModal(false)}>
                            {trans('close')}
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>
        </FestivalLayout>
    );
}
