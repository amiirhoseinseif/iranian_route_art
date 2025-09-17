import React, { useState, useEffect } from 'react';
import FestivalLayout from '@/Layouts/FestivalLayout';
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
        <FestivalLayout title="پنل مدیریت - جشنواره هنری مسیر ایران">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['Vazirmatn']">
                        پنل مدیریت
                    </h1>
                    <p className="text-gray-600 font-['Vazirmatn']">
                        مدیریت جشنواره هنری مسیر ایران
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <ProfileIcon className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">کل هنرمندان</p>
                                <p className="text-2xl font-bold text-gray-800">{stats.total_artists}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <TrophyIcon className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">کل آثار</p>
                                <p className="text-2xl font-bold text-gray-800">{stats.total_arts}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <GlobalIcon className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">کل داوران</p>
                                <p className="text-2xl font-bold text-gray-800">{stats.total_judges}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <ClockIcon className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm text-gray-600 font-['Vazirmatn']">در انتظار تایید</p>
                                <p className="text-2xl font-bold text-gray-800">{stats.pending_judges}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 font-['Vazirmatn']">مدیریت هنرمندان</h3>
                        <div className="space-y-3">
                            <button 
                                onClick={() => {
                                    fetchArtists();
                                    setShowArtistsModal(true);
                                }}
                                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-['Vazirmatn']"
                            >
                                مشاهده همه هنرمندان
                            </button>
                            <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-['Vazirmatn']">
                                تایید هنرمندان جدید
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 font-['Vazirmatn']">مدیریت آثار</h3>
                        <div className="space-y-3">
                            <button 
                                onClick={() => {
                                    fetchArts();
                                    setShowArtsModal(true);
                                }}
                                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-['Vazirmatn']"
                            >
                                مشاهده همه آثار
                            </button>
                            <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors font-['Vazirmatn']">
                                آثار در انتظار تایید
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 font-['Vazirmatn']">مدیریت داوران</h3>
                        <div className="space-y-3">
                            <button 
                                onClick={() => {
                                    fetchAllJudges();
                                    setShowJudgesModal(true);
                                }}
                                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-['Vazirmatn']"
                            >
                                مشاهده همه داوران
                            </button>
                            <button 
                                onClick={() => setShowPendingJudgesModal(true)}
                                className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-['Vazirmatn']"
                            >
                                تایید داوران ({stats.pending_judges})
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 font-['Vazirmatn']">مدیریت مدیران</h3>
                        <div className="space-y-3">
                            <button 
                                onClick={() => {
                                    fetchAllAdmins();
                                    setShowAdminsModal(true);
                                }}
                                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-['Vazirmatn']"
                            >
                                مشاهده همه مدیران
                            </button>
                            <button 
                                onClick={() => setShowAddAdminModal(true)}
                                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-['Vazirmatn'] flex items-center justify-center"
                            >
                                <AddIcon className="w-4 h-4 ml-2" />
                                اضافه کردن مدیر جدید
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">فعالیت‌های اخیر</h3>
                    <div className="space-y-4">
                        {(recentActivities || []).length === 0 ? (
                            <p className="text-gray-500 text-center py-8 font-['Vazirmatn']">
                                هیچ فعالیتی یافت نشد
                            </p>
                        ) : (
                            (recentActivities || []).map((activity, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                        <div className={`w-3 h-3 rounded-full mr-3 ${
                                            activity.status === 'success' ? 'bg-green-500' :
                                            activity.status === 'info' ? 'bg-blue-500' :
                                            activity.status === 'warning' ? 'bg-yellow-500' : 'bg-gray-500'
                                        }`}></div>
                                        <div>
                                            <p className="font-medium text-gray-800 font-['Vazirmatn']">
                                                {activity.message}
                                                {activity.art_title && (
                                                    <span className="text-gray-600">: {activity.art_title}</span>
                                                )}
                                                {activity.score && (
                                                    <span className="text-amber-600 font-bold"> (امتیاز: {activity.score})</span>
                                                )}
                                            </p>
                                            <p className="text-sm text-gray-600 font-['Vazirmatn']">
                                                توسط {activity.user}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500 font-['Vazirmatn']">
                                        {new Date(activity.time).toLocaleDateString('fa-IR')} - {new Date(activity.time).toLocaleTimeString('fa-IR')}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* System Status */}
                <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">وضعیت سیستم</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-3 font-['Vazirmatn']">سرور</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600 font-['Vazirmatn']">CPU</span>
                                    <span className="text-sm font-medium">23%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-3 font-['Vazirmatn']">حافظه</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600 font-['Vazirmatn']">RAM</span>
                                    <span className="text-sm font-medium">67%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Admin Modal */}
            <Modal show={showAddAdminModal} onClose={() => setShowAddAdminModal(false)}>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                        اضافه کردن مدیر جدید
                    </h2>
                    
                    <form onSubmit={handleAddAdmin}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <InputLabel htmlFor="first_name" value="نام" />
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
                                <InputLabel htmlFor="last_name" value="نام خانوادگی" />
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
                                <InputLabel htmlFor="email" value="ایمیل" />
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
                                <InputLabel htmlFor="phone" value="شماره تماس" />
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
                                <InputLabel htmlFor="password" value="رمز عبور" />
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
                                <InputLabel htmlFor="role" value="نقش" />
                                <select
                                    id="role"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    value={formData.role}
                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    required
                                >
                                    <option value="admin">مدیر</option>
                                    <option value="moderator">ناظر</option>
                                </select>
                                <InputError message={errors.role} className="mt-2" />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <SecondaryButton onClick={() => setShowAddAdminModal(false)}>
                                انصراف
                            </SecondaryButton>
                            <PrimaryButton type="submit">
                                اضافه کردن مدیر
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Pending Judges Modal */}
            <Modal show={showPendingJudgesModal} onClose={() => setShowPendingJudgesModal(false)}>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                        داوران در انتظار تایید
                    </h2>
                    
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                        {(pendingJudges || []).length === 0 ? (
                            <p className="text-gray-500 text-center py-8 font-['Vazirmatn']">
                                هیچ داور در انتظار تایید وجود ندارد
                            </p>
                        ) : (
                            (pendingJudges || []).map((judge) => (
                                <div key={judge.id} className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-gray-800 font-['Vazirmatn']">
                                                {judge.first_name} {judge.last_name}
                                            </h3>
                                            <p className="text-sm text-gray-600 font-['Vazirmatn']">
                                                {judge.email}
                                            </p>
                                            <p className="text-sm text-gray-600 font-['Vazirmatn']">
                                                {judge.qualification}
                                            </p>
                                            {judge.organization && (
                                                <p className="text-sm text-gray-600 font-['Vazirmatn']">
                                                    {judge.organization}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleJudgeApproval(judge.id, 'approved')}
                                                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors font-['Vazirmatn'] flex items-center"
                                            >
                                                <ShieldCheckIcon className="w-4 h-4 ml-1" />
                                                تایید
                                            </button>
                                            <button
                                                onClick={() => {
                                                    const reason = prompt('دلیل رد شدن:');
                                                    if (reason) {
                                                        handleJudgeApproval(judge.id, 'rejected', reason);
                                                    }
                                                }}
                                                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors font-['Vazirmatn'] flex items-center"
                                            >
                                                <ShieldXIcon className="w-4 h-4 ml-1" />
                                                رد
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="flex justify-end mt-6">
                        <SecondaryButton onClick={() => setShowPendingJudgesModal(false)}>
                            بستن
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>

            {/* Artists Management Modal */}
            <Modal show={showArtistsModal} onClose={() => setShowArtistsModal(false)}>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                        لیست هنرمندان
                    </h2>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['Vazirmatn']">نام</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['Vazirmatn']">ایمیل</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['Vazirmatn']">رشته هنری</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['Vazirmatn']">تاریخ ثبت نام</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(artists || []).map((artist) => (
                                    <tr key={artist.id} className="border-b border-gray-100">
                                        <td className="py-3 px-4 font-['Vazirmatn']">
                                            {artist.first_name} {artist.last_name}
                                        </td>
                                        <td className="py-3 px-4 font-['Vazirmatn']">{artist.email}</td>
                                        <td className="py-3 px-4 font-['Vazirmatn']">
                                            {artist.art_field?.name || 'نامشخص'}
                                        </td>
                                        <td className="py-3 px-4 font-['Vazirmatn']">
                                            {new Date(artist.created_at).toLocaleDateString('fa-IR')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end mt-6">
                        <SecondaryButton onClick={() => setShowArtistsModal(false)}>
                            بستن
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>

            {/* Arts Management Modal */}
            <Modal show={showArtsModal} onClose={() => setShowArtsModal(false)}>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                        لیست آثار
                    </h2>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['Vazirmatn']">عنوان</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['Vazirmatn']">هنرمند</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['Vazirmatn']">رشته</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['Vazirmatn']">وضعیت</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['Vazirmatn']">تاریخ ارسال</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(arts || []).map((art) => (
                                    <tr key={art.id} className="border-b border-gray-100">
                                        <td className="py-3 px-4 font-['Vazirmatn']">{art.title}</td>
                                        <td className="py-3 px-4 font-['Vazirmatn']">
                                            {art.artist?.first_name} {art.artist?.last_name}
                                        </td>
                                        <td className="py-3 px-4 font-['Vazirmatn']">
                                            {art.art_field?.name || 'نامشخص'}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                art.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                art.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {art.status === 'approved' ? 'تایید شده' :
                                                 art.status === 'pending' ? 'در انتظار' : 'رد شده'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 font-['Vazirmatn']">
                                            {new Date(art.created_at).toLocaleDateString('fa-IR')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end mt-6">
                        <SecondaryButton onClick={() => setShowArtsModal(false)}>
                            بستن
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>

            {/* Judges Management Modal */}
            <Modal show={showJudgesModal} onClose={() => setShowJudgesModal(false)}>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                        لیست داوران
                    </h2>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['Vazirmatn']">نام</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['Vazirmatn']">ایمیل</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['Vazirmatn']">تخصص</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['Vazirmatn']">وضعیت تایید</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['Vazirmatn']">تاریخ ثبت نام</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(allJudges || []).map((judge) => (
                                    <tr key={judge.id} className="border-b border-gray-100">
                                        <td className="py-3 px-4 font-['Vazirmatn']">
                                            {judge.first_name} {judge.last_name}
                                        </td>
                                        <td className="py-3 px-4 font-['Vazirmatn']">{judge.email}</td>
                                        <td className="py-3 px-4 font-['Vazirmatn']">{judge.qualification}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                judge.verification_status === 'approved' ? 'bg-green-100 text-green-800' :
                                                judge.verification_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {judge.verification_status === 'approved' ? 'تایید شده' :
                                                 judge.verification_status === 'pending' ? 'در انتظار' : 'رد شده'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 font-['Vazirmatn']">
                                            {new Date(judge.created_at).toLocaleDateString('fa-IR')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end mt-6">
                        <SecondaryButton onClick={() => setShowJudgesModal(false)}>
                            بستن
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>

            {/* Admins Management Modal */}
            <Modal show={showAdminsModal} onClose={() => setShowAdminsModal(false)}>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 font-['Vazirmatn']">
                        لیست مدیران
                    </h2>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['Vazirmatn']">نام</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['Vazirmatn']">ایمیل</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['Vazirmatn']">نقش</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['Vazirmatn']">وضعیت</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['Vazirmatn']">تاریخ ایجاد</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(allAdmins || []).map((admin) => (
                                    <tr key={admin.id} className="border-b border-gray-100">
                                        <td className="py-3 px-4 font-['Vazirmatn']">
                                            {admin.first_name} {admin.last_name}
                                        </td>
                                        <td className="py-3 px-4 font-['Vazirmatn']">{admin.email}</td>
                                        <td className="py-3 px-4 font-['Vazirmatn']">
                                            {admin.role === 'super_admin' ? 'مدیر اصلی' : 
                                             admin.role === 'admin' ? 'مدیر' : 'ناظر'}
                                        </td>
                                        <td className="py-3 px-4">
                                            {admin.is_active ? 
                                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    فعال
                                                </span> :
                                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                    غیرفعال
                                                </span>
                                            }
                                        </td>
                                        <td className="py-3 px-4 font-['Vazirmatn']">
                                            {new Date(admin.created_at).toLocaleDateString('fa-IR')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end mt-6">
                        <SecondaryButton onClick={() => setShowAdminsModal(false)}>
                            بستن
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>
        </FestivalLayout>
    );
}
