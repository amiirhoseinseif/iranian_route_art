import React from 'react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { useTranslation } from '@/Utils/translation';
import {
    previousEdition,
    currentEdition,
    currentEditionStats,
    festivalMilestones,
    highlightMoments,
    venueInfo,
} from '@/Data/festivalHistory';

export default function FestivalHistory() {
    const { trans } = useTranslation();

    const pageTitle = 'دورۀ دوم جشنواره مسیر ایران | Iranian Art Route Festival – Second Edition';

    return (
        <FestivalLayout title={pageTitle}>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-secondary-700 text-white py-16 lg:py-24">
                <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle at top, rgba(255,255,255,0.35), transparent 55%)' }}></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <div className="space-y-6">
                            <span className="inline-flex items-center px-6 py-2 bg-white/15 backdrop-blur-md rounded-full text-sm font-semibold tracking-[0.25em] uppercase">
                                {trans('festival_history')}
                            </span>
                            <div className="bg-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl backdrop-blur-md border border-white/20">
                                <h1 className="text-3xl lg:text-4xl font-black font-['iransansX'] leading-tight mb-4">
                                    {currentEdition.titleFa}
                                </h1>
                                <p className="text-sm lg:text-base text-white/90 leading-relaxed font-['iransansX']">
                                    {currentEdition.descriptionFa}
                                </p>
                            </div>
                        </div>
                        <div className="bg-white text-primary-800 rounded-3xl p-6 lg:p-8 shadow-2xl border border-white/60">
                            <h2 className="text-2xl lg:text-3xl font-black mb-4 font-['iransansX']">
                                {currentEdition.titleEn}
                            </h2>
                            <p className="text-base lg:text-lg leading-relaxed text-gray-700">
                                {currentEdition.descriptionEn}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Previous Edition Recap */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                        <div className="bg-gray-50 rounded-3xl shadow-lg border border-gray-200 p-6 lg:p-8 space-y-4">
                            <h2 className="text-2xl lg:text-3xl font-black text-gray-900 font-['iransansX']">
                                {previousEdition.titleFa}
                            </h2>
                            <p className="text-sm lg:text-base text-gray-600 leading-relaxed font-['iransansX']">
                                {previousEdition.descriptionFa}
                            </p>
                        </div>
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 lg:p-8 space-y-4">
                            <h3 className="text-xl lg:text-2xl font-black text-primary-700 font-['iransansX']">
                                {previousEdition.titleEn}
                            </h3>
                            <p className="text-base text-gray-600 leading-relaxed">
                                {previousEdition.descriptionEn}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                                {previousEdition.stats.map((item, index) => (
                                    <div key={index} className="rounded-2xl bg-primary-50 p-4 text-center shadow-inner">
                                        <p className="text-2xl font-black text-primary-700 font-['iransansX']">{item.valueFa}</p>
                                        <p className="text-xs text-primary-500 font-['iransansX']">{item.labelFa}</p>
                                        <div className="mt-2 border-t border-primary-100 pt-2 text-[11px] uppercase tracking-[0.15em] text-primary-400">
                                            {item.labelEn}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Edition Statistics */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {currentEditionStats.map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                                <div key={index} className="group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 p-8 transition-all duration-500 hover:-translate-y-3">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary-100/0 via-primary-100/20 to-secondary-100/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="relative z-10 flex flex-col gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-lg">
                                            <IconComponent className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <p className="text-xl font-black text-gray-900 font-['iransansX']">
                                                {item.valueFa}
                                            </p>
                                            <p className="text-sm text-gray-500 font-['iransansX']">
                                                {item.descFa}
                                            </p>
                                        </div>
                                        <div className="border-t border-gray-200 pt-4">
                                            <p className="text-sm font-semibold text-primary-700">
                                                {item.valueEn}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {item.descEn}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Milestones Timeline */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-black text-gray-900 font-['iransansX'] mb-3">
                            مسیر برگزاری / Festival Timeline
                        </h2>
                        <p className="text-base lg:text-lg text-gray-600 font-['iransansX']">
                            مسیر برنامه‌ریزی و اجرا از جمع‌بندی دورۀ نخست تا برگزاری دورۀ دوم
                        </p>
                    </div>
                    <div className="relative">
                        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-secondary-200 to-primary-200 transform -translate-y-1/2"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10 relative z-10">
                            {festivalMilestones.map((milestone, index) => (
                                <div key={index} className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 lg:p-7 flex flex-col gap-4 transition-all duration-500 hover:-translate-y-3">
                                    <div className="font-bold text-primary-600 font-['iransansX'] text-sm lg:text-base">
                                        {milestone.periodFa}
                                    </div>
                                    <div className="text-xs text-gray-500 uppercase tracking-[0.2em]">
                                        {milestone.periodEn}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-gray-900 font-['iransansX'] mb-2">
                                            {milestone.titleFa}
                                        </h3>
                                        <p className="text-sm text-gray-600 font-['iransansX'] leading-relaxed">
                                            {milestone.descriptionFa}
                                        </p>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3">
                                        <h4 className="text-sm font-semibold text-primary-700">
                                            {milestone.titleEn}
                                        </h4>
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            {milestone.descriptionEn}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlight Moments */}
            <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-black font-['iransansX'] mb-3">
                            لحظات ماندگار / Signature Moments
                        </h2>
                        <p className="text-base lg:text-lg text-white/80 font-['iransansX']">
                            روایت کوتاهی از صحنه‌های محبوب دورۀ نخست در دو زبان
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {highlightMoments.map((moment, index) => (
                            <div key={index} className="relative bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-7 shadow-lg backdrop-blur-md transition-all duration-500 hover:-translate-y-4">
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-white/0 opacity-0 hover:opacity-100 transition-opacity"></div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-black font-['iransansX'] mb-3">
                                        {moment.titleFa}
                                    </h3>
                                    <p className="text-sm text-white/85 font-['iransansX'] leading-relaxed mb-4">
                                        {moment.descriptionFa}
                                    </p>
                                    <div className="border-t border-white/10 pt-3">
                                        <h4 className="text-sm font-semibold text-secondary-200 uppercase tracking-[0.18em]">
                                            {moment.titleEn}
                                        </h4>
                                        <p className="text-xs text-white/70 leading-relaxed">
                                            {moment.descriptionEn}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Venue & Focus Info */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 lg:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                            {venueInfo.map((info, index) => {
                                const IconComponent = info.icon;
                                return (
                                    <div key={index} className="flex flex-col gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-lg">
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <p className="text-base font-['iransansX'] text-gray-800 leading-relaxed">
                                            {info.fa}
                                        </p>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            {info.en}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </FestivalLayout>
    );
}
