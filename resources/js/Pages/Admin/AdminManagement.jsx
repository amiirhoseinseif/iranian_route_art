import React, { useState, useEffect } from 'react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { 
    AdminIcon,
    AddIcon,
    CheckIcon,
    CloseIcon,
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

export default function AdminManagement({ auth }) {
    const [admins, setAdmins] = useState([]);
    const [judges, setJudges] = useState([]);
    const [pendingJudges, setPendingJudges] = useState([]);
    const [showAddAdminModal, setShowAddAdminModal] = useState(false);
    const [showPendingJudgesModal, setShowPendingJudgesModal] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        role: 'admin'
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAdmins();
        fetchJudges();
        fetchPendingJudges();
    }, []);

    const fetchAdmins = async () => {
        try {
            const response = await fetch('/api/admin/admins', {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setAdmins(data.data || []);
            }
        } catch (error) {
            console.error('Error fetching admins:', error);
        }
    };

    const fetchJudges = async () => {
        try {
            const response = await fetch('/api/admin/judges', {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setJudges(data.data || []);
            }
        } catch (error) {
            console.error('Error fetching judges:', error);
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

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

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
                fetchAdmins();
            } else {
                setErrors(data.errors || {});
            }
        } catch (error) {
            console.error('Error adding admin:', error);
        } finally {
            setLoading(false);
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
                fetchJudges();
            }
        } catch (error) {
            console.error('Error approving judge:', error);
        }
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            approved: { text: 'تایید شده', class: 'bg-green-100 text-green-800' },
            pending: { text: 'در انتظار', class: 'bg-yellow-100 text-yellow-800' },
            rejected: { text: 'رد شده', class: 'bg-red-100 text-red-800' }
        };
        
        const config = statusConfig[status] || statusConfig.pending;
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
                {config.text}
            </span>
        );
    };

    return (
        <FestivalLayout title="مدیریت مدیران و داوران - جشنواره بین المللی مسیر ایران">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['iransansX']">
                        مدیریت مدیران و داوران
                    </h1>
                    <p className="text-gray-600 font-['iransansX']">
                        مدیریت دسترسی‌ها و تایید داوران
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <button
                        onClick={() => setShowAddAdminModal(true)}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-['iransansX'] flex items-center"
                    >
                        <AddIcon className="w-5 h-5 ml-2" />
                        اضافه کردن مدیر جدید
                    </button>
                    <button
                        onClick={() => setShowPendingJudgesModal(true)}
                        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-['iransansX'] flex items-center"
                    >
                        <UserCheckIcon className="w-5 h-5 ml-2" />
                        تایید داوران ({pendingJudges.length})
                    </button>
                </div>

                {/* Admins Table */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 font-['iransansX'] flex items-center">
                        <AdminIcon className="w-6 h-6 ml-2" />
                        لیست مدیران
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">نام</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">ایمیل</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">نقش</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">وضعیت</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">تاریخ ایجاد</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins.map((admin) => (
                                    <tr key={admin.id} className="border-b border-gray-100">
                                        <td className="py-3 px-4 font-['iransansX']">
                                            {admin.first_name} {admin.last_name}
                                        </td>
                                        <td className="py-3 px-4 font-['iransansX']">{admin.email}</td>
                                        <td className="py-3 px-4 font-['iransansX']">
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
                                        <td className="py-3 px-4 font-['iransansX']">
                                            {new Date(admin.created_at).toLocaleDateString('fa-IR')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Judges Table */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 font-['iransansX'] flex items-center">
                        <UserCheckIcon className="w-6 h-6 ml-2" />
                        لیست داوران
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">نام</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">ایمیل</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">تخصص</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">وضعیت تایید</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-800 font-['iransansX']">تاریخ ثبت نام</th>
                                </tr>
                            </thead>
                            <tbody>
                                {judges.map((judge) => (
                                    <tr key={judge.id} className="border-b border-gray-100">
                                        <td className="py-3 px-4 font-['iransansX']">
                                            {judge.first_name} {judge.last_name}
                                        </td>
                                        <td className="py-3 px-4 font-['iransansX']">{judge.email}</td>
                                        <td className="py-3 px-4 font-['iransansX']">{judge.qualification}</td>
                                        <td className="py-3 px-4">
                                            {getStatusBadge(judge.verification_status)}
                                        </td>
                                        <td className="py-3 px-4 font-['iransansX']">
                                            {new Date(judge.created_at).toLocaleDateString('fa-IR')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add Admin Modal */}
                <Modal show={showAddAdminModal} onClose={() => setShowAddAdminModal(false)}>
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 font-['iransansX']">
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
                                <PrimaryButton type="submit" disabled={loading}>
                                    {loading ? 'در حال اضافه کردن...' : 'اضافه کردن مدیر'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </Modal>

                {/* Pending Judges Modal */}
                <Modal show={showPendingJudgesModal} onClose={() => setShowPendingJudgesModal(false)}>
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 font-['iransansX']">
                            داوران در انتظار تایید
                        </h2>
                        
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {pendingJudges.length === 0 ? (
                                <p className="text-gray-500 text-center py-8 font-['iransansX']">
                                    هیچ داور در انتظار تایید وجود ندارد
                                </p>
                            ) : (
                                pendingJudges.map((judge) => (
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
                                                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors font-['iransansX'] flex items-center"
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
                                                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors font-['iransansX'] flex items-center"
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
            </div>
        </FestivalLayout>
    );
}
