import React from 'react';
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
    MusicIcon,
    PaintingIcon,
    FilmIcon
} from '@/Components/SvgIcons';

export default function JudgeDashboard({ judge, statistics, assigned_art_fields, pending_evaluations, recent_evaluations }) {
    const { trans } = useTranslation();
    const isVerified = judge?.verification_status === 'approved';

    if (!isVerified) {
        return (
            <FestivalLayout title={trans('judge_panel_title')}>
                <div className="max-w-4xl mx-auto">
                    <div className="bg-secondary-50 border border-secondary-200 rounded-2xl p-6 sm:p-8 text-center animate-fadeIn">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounceIn">
                            <ClockIcon className="w-7 h-7 sm:w-8 sm:h-8 text-secondary-600" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 font-['iransansX']">
                            {trans('not_verified_title')}
                        </h2>
                        <p className="text-gray-600 mb-6 font-['iransansX'] text-sm sm:text-base">
                            {trans('not_verified_message')}
                        </p>
                        {judge?.rejection_reason && (
                            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
                                <p className="text-primary-800 font-['iransansX']">
                                    <strong>{trans('rejection_reason_label')}</strong> {judge.rejection_reason}
                                </p>
                            </div>
                        )}
                        <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-['iransansX']">
                            {trans('contact_admin')}
                        </button>
                    </div>
                </div>
            </FestivalLayout>
        );
    }

    return (
        <FestivalLayout title={trans('judge_panel_title')}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 font-['iransansX']">
                        {trans('judge_panel_title')}
                    </h1>
                    <p className="text-gray-600 font-['iransansX'] text-sm sm:text-base">
                        {trans('judge_panel_subtitle')}
                    </p>
                </div>

                {/* Judge Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fadeIn">
                        <div className="flex items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110">
                                <ListIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                            </div>
                            <div className="mr-3 sm:mr-4">
                                <p className="text-xs sm:text-sm text-gray-600 font-['iransansX']">{trans('total_assignments')}</p>
                                <p className="text-xl sm:text-2xl font-bold text-gray-800">{statistics.total_assignments}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fadeIn">
                        <div className="flex items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary-100 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110">
                                <ClockIcon className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-600" />
                            </div>
                            <div className="mr-3 sm:mr-4">
                                <p className="text-xs sm:text-sm text-gray-600 font-['iransansX']">{trans('pending_evaluations')}</p>
                                <p className="text-xl sm:text-2xl font-bold text-gray-800">{statistics.pending_evaluations}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fadeIn">
                        <div className="flex items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary-200 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110">
                                <CheckIcon className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-700" />
                            </div>
                            <div className="mr-3 sm:mr-4">
                                <p className="text-xs sm:text-sm text-gray-600 font-['iransansX']">{trans('completed_evaluations')}</p>
                                <p className="text-xl sm:text-2xl font-bold text-gray-800">{statistics.completed_evaluations}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fadeIn">
                        <div className="flex items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-200 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110">
                                <TrophyIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-700" />
                            </div>
                            <div className="mr-3 sm:mr-4">
                                <p className="text-xs sm:text-sm text-gray-600 font-['iransansX']">{trans('average_score')}</p>
                                <p className="text-xl sm:text-2xl font-bold text-gray-800">{statistics.average_score}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Assigned Art Fields */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 animate-slideDown">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 font-['iransansX']">{trans('assigned_art_fields')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {assigned_art_fields.length === 0 ? (
                            <div className="col-span-full text-center py-8">
                                <p className="text-gray-500 font-['iransansX']">
                                    {trans('no_field_assigned')}
                                </p>
                            </div>
                        ) : (
                            assigned_art_fields.map((field, index) => {
                                const getIcon = (fieldName) => {
                                    if (fieldName.includes('موسیقی')) return MusicIcon;
                                    if (fieldName.includes('نقاشی')) return PaintingIcon;
                                    if (fieldName.includes('فیلم')) return FilmIcon;
                                    return TrophyIcon;
                                };
                                
                                const IconComponent = getIcon(field.name);
                                
                                return (
                                    <div key={index} className="p-4 border border-gray-200 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 bg-primary-100 text-primary-600 transition-transform duration-300 hover:scale-110">
                                                    <IconComponent className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-800 font-['iransansX'] text-sm sm:text-base">{field.name}</h4>
                                                    <p className="text-xs sm:text-sm text-gray-600 font-['iransansX']">
                                                        {field.count} {trans('artworks_count_label')} ({field.pending} {trans('pending_label')})
                                                    </p>
                                                </div>
                                            </div>
                                            <button className="bg-primary-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-primary-700 transition-colors font-['iransansX']">
                                                {trans('view')}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Pending Evaluations */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 animate-slideDown">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 font-['iransansX']">{trans('evaluations_pending')}</h3>
                    <div className="space-y-4">
                        {pending_evaluations.length === 0 ? (
                            <p className="text-gray-500 text-center py-8 font-['iransansX']">
                                {trans('no_pending_evaluations')}
                            </p>
                        ) : (
                            pending_evaluations.map((art, index) => (
                                <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100 animate-fadeIn" style={{ animationDelay: `${index * 0.05}s` }}>
                                    <div className="flex items-center">
                                        <div className={`w-3 h-3 rounded-full mr-3 ${
                                            art.priority === 'high' ? 'bg-primary-700' :
                                            art.priority === 'medium' ? 'bg-secondary-500' : 'bg-secondary-700'
                                        }`}></div>
                                        <div>
                                            <h4 className="font-medium text-gray-800 font-['iransansX'] text-sm sm:text-base">{art.title}</h4>
                                            <p className="text-xs sm:text-sm text-gray-600 font-['iransansX']">
                                                {trans('artist_label')} {art.artist} | {trans('field_label')} {art.field}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 sm:space-x-3 space-x-reverse">
                                        <span className="text-xs sm:text-sm text-gray-500 font-['iransansX'] hidden sm:inline">
                                            {new Date(art.submitted_at).toLocaleDateString('fa-IR')}
                                        </span>
                                        <button className="bg-primary-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-primary-700 transition-colors font-['iransansX']">
                                            {trans('evaluate')}
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Recent Evaluations */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 animate-slideDown">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 font-['iransansX']">{trans('recent_evaluations')}</h3>
                    <div className="space-y-4">
                        {recent_evaluations.length === 0 ? (
                            <p className="text-gray-500 text-center py-8 font-['iransansX']">
                                {trans('no_evaluations_done')}
                            </p>
                        ) : (
                            recent_evaluations.map((evaluation, index) => (
                                <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100 animate-fadeIn" style={{ animationDelay: `${index * 0.05}s` }}>
                                    <div>
                                        <h4 className="font-medium text-gray-800 font-['iransansX'] text-sm sm:text-base">{evaluation.art_title}</h4>
                                        <p className="text-xs sm:text-sm text-gray-600 font-['iransansX']">{trans('artist_label')} {evaluation.artist}</p>
                                    </div>
                                    <div className="flex items-center space-x-2 sm:space-x-4 space-x-reverse">
                                        <div className="text-center">
                                            <p className="text-xs sm:text-sm text-gray-600 font-['iransansX']">{trans('score_label')}</p>
                                            <p className="text-lg sm:text-xl font-bold text-primary-600">{evaluation.score}</p>
                                        </div>
                                        <span className="text-xs sm:text-sm text-gray-500 font-['iransansX'] hidden sm:inline">
                                            {new Date(evaluation.evaluated_at).toLocaleDateString('fa-IR')}
                                        </span>
                                        <button className="bg-primary-600 text-white px-3 py-1 rounded-lg text-xs sm:text-sm hover:bg-primary-700 transition-colors font-['iransansX']">
                                            {trans('view')}
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Evaluation Guidelines */}
                <div className="bg-gradient-to-r from-primary-50 to-secondary-100 rounded-2xl p-4 sm:p-6 animate-fadeIn">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 font-['iransansX']">{trans('evaluation_guidelines')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-700 font-['iransansX']">
                        <div>
                            <h4 className="font-semibold mb-2">{trans('evaluation_criteria')}</h4>
                            <ul className="space-y-1 list-disc list-inside">
                                <li>{trans('criteria_creativity')}</li>
                                <li>{trans('criteria_technique')}</li>
                                <li>{trans('criteria_concept')}</li>
                                <li>{trans('criteria_execution')}</li>
                                <li>{trans('criteria_originality')}</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">{trans('important_notes')}</h4>
                            <ul className="space-y-1 list-disc list-inside">
                                <li>{trans('note_scoring')}</li>
                                <li>{trans('note_low_scores')}</li>
                                <li>{trans('note_fairness')}</li>
                                <li>{trans('note_culture')}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </FestivalLayout>
    );
}
