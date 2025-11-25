import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { route } from '@/Utils/route';
import { useTranslation } from '@/Utils/translation';

export default function ArtEdit({ art, artFields = [] }) {
    const { trans } = useTranslation();
    const { data, setData, patch, processing, errors } = useForm({
        title: art?.title || '',
        description: art?.description || '',
        art_field_id: art?.art_field_id || '',
        image: null,
        video_url: art?.video_url || '',
        audio_url: art?.audio_url || '',
        tags: art?.tags || '',
        year_created: art?.year_created || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('artist.arts.update', art.id));
    };

    const handleImageChange = (e) => {
        setData('image', e.target.files[0]);
    };

    return (
        <FestivalLayout title={`${trans('edit_artwork_title')} - ${trans('site_title')}`}>
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['iransansX']">
                        {trans('edit_artwork_title')}
                    </h1>
                    <p className="text-gray-600 font-['iransansX']">
                        {trans('edit_artwork_description')}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['iransansX']">
                                {trans('basic_information')}
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="title" value={trans('artwork_title_label')} />
                                    <input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['iransansX']"
                                        placeholder={trans('artwork_title_placeholder')}
                                        required
                                    />
                                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="description" value={trans('artwork_description_label')} />
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['iransansX']"
                                        placeholder={trans('artwork_description_placeholder')}
                                        required
                                    />
                                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="art_field_id" value={trans('art_field_label')} />
                                    <select
                                        id="art_field_id"
                                        value={data.art_field_id}
                                        onChange={e => setData('art_field_id', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['iransansX']"
                                        required
                                    >
                                        <option value="">{trans('select_art_field')}</option>
                                        {artFields.map((field) => (
                                            <option key={field.id} value={field.id}>
                                                {field.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.art_field_id && <p className="text-red-500 text-sm mt-1">{errors.art_field_id}</p>}
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="year_created" value={trans('year_created_label')} />
                                    <input
                                        id="year_created"
                                        type="number"
                                        value={data.year_created}
                                        onChange={e => setData('year_created', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['iransansX']"
                                        placeholder="1400"
                                        min="1300"
                                        max="1450"
                                    />
                                    {errors.year_created && <p className="text-red-500 text-sm mt-1">{errors.year_created}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Media Files */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['iransansX']">
                                {trans('media_files')}
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="image" value={trans('new_image_optional')} />
                                    <input
                                        id="image"
                                        type="file"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['iransansX']"
                                    />
                                    <p className="text-sm text-gray-500 mt-2 font-['iransansX']">
                                        {trans('image_keep_previous')}
                                    </p>
                                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="video_url" value={trans('video_url_label')} />
                                    <input
                                        id="video_url"
                                        type="url"
                                        value={data.video_url}
                                        onChange={e => setData('video_url', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['iransansX']"
                                        placeholder="https://youtube.com/watch?v=..."
                                    />
                                    {errors.video_url && <p className="text-red-500 text-sm mt-1">{errors.video_url}</p>}
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="audio_url" value={trans('audio_url_label')} />
                                    <input
                                        id="audio_url"
                                        type="url"
                                        value={data.audio_url}
                                        onChange={e => setData('audio_url', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['iransansX']"
                                        placeholder="https://soundcloud.com/..."
                                    />
                                    {errors.audio_url && <p className="text-red-500 text-sm mt-1">{errors.audio_url}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['iransansX']">
                                {trans('additional_information')}
                            </h2>
                            <div>
                                <InputLabel htmlFor="tags" value={trans('tags_label')} />
                                <input
                                    id="tags"
                                    type="text"
                                    value={data.tags}
                                    onChange={e => setData('tags', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-['iransansX']"
                                    placeholder={trans('tags_placeholder')}
                                />
                                <p className="text-sm text-gray-500 mt-2 font-['iransansX']">
                                    {trans('tags_hint')}
                                </p>
                                {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags}</p>}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-end space-x-4 space-x-reverse">
                            <Link
                                href="/artist/arts"
                                className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-['iransansX']"
                            >
                                {trans('cancel')}
                            </Link>
                            <PrimaryButton disabled={processing}>
                                {processing ? trans('saving') : trans('save_changes')}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </FestivalLayout>
    );
}
