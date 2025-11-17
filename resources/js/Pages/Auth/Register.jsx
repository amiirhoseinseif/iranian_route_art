import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import FestivalLayout from '@/Layouts/FestivalLayout';
import { 
    LogoIcon, 
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
    NewMediaArtsIcon
} from '@/Components/SvgIcons';
import { useTranslation } from '@/Utils/translation';

export default function Register({ artFields = [] }) {
    const { trans } = useTranslation();
    const [selectedUserType, setSelectedUserType] = useState('artist');

    const userTypes = [
        { 
            value: 'artist', 
            label: trans('artist'), 
            description: trans('artist_description'),
            icon: MusicIcon,
            features: [trans('upload_artworks'), trans('participate_festival'), trans('receive_feedback')]
        },
        { 
            value: 'judge', 
            label: trans('judge'), 
            description: trans('judge_description'),
            icon: PaintingIcon,
            features: [trans('evaluate_artworks'), trans('scoring'), trans('provide_expert_opinion')]
        }
    ];
    
    // Map icon names to icon components
    const iconMap = {
        'music': MusicIcon,
        'painting': PaintingIcon,
        'short_film': ShortFilmIcon,
        'sculpture': SculptureIcon,
        'illustration': IllustrationIcon,
        'calligraphy': CalligraphyIcon,
        'photography': PhotographyIcon,
        'architecture': ArchitectureIcon,
        'handicrafts': HandicraftsIcon,
        'industrial_design': IndustrialDesignIcon,
        'literature': LiteratureIcon,
        'carpet': CarpetIcon,
        'theater': TheaterIcon,
        'fashion_design': FashionDesignIcon,
        'animation': AnimationIcon,
        'new_media_arts': NewMediaArtsIcon,
    };
    
    // Map art fields with icons
    const artFieldsWithIcons = [
        { icon: MusicIcon, name: trans('music'), desc: trans('music_desc'), color: 'from-primary-400 to-primary-600' },
        { icon: CalligraphyIcon, name: trans('calligraphy'), desc: trans('calligraphy_desc'), color: 'from-secondary-500 to-secondary-700' },
        { icon: PaintingIcon, name: trans('painting'), desc: trans('painting_desc'), color: 'from-primary-500 to-primary-700' },
        { icon: SculptureIcon, name: trans('sculpture'), desc: trans('sculpture_desc'), color: 'from-primary-700 to-primary-900' },
        { icon: HandicraftsIcon, name: trans('handicrafts'), desc: trans('handicrafts_desc'), color: 'from-secondary-400 to-secondary-600' },
        { icon: ArchitectureIcon, name: trans('architecture'), desc: trans('architecture_desc'), color: 'from-primary-500 to-secondary-600' },
        { icon: IndustrialDesignIcon, name: trans('industrial_design'), desc: trans('industrial_design_desc'), color: 'from-primary-400 to-primary-600' },
        { icon: IllustrationIcon, name: trans('graphic'), desc: trans('graphic_desc'), color: 'from-secondary-400 to-secondary-600' },
        { icon: LiteratureIcon, name: trans('literature'), desc: trans('literature_desc'), color: 'from-primary-600 to-primary-800' },
        { icon: CarpetIcon, name: trans('carpet'), desc: trans('carpet_desc'), color: 'from-primary-700 to-primary-900' },
        { icon: ShortFilmIcon, name: trans('short_film'), desc: trans('short_film_desc'), color: 'from-primary-500 to-primary-700' },
        { icon: TheaterIcon, name: trans('theater'), desc: trans('theater_desc'), color: 'from-secondary-500 to-secondary-700' },
        { icon: FashionDesignIcon, name: trans('fashion_design'), desc: trans('fashion_design_desc'), color: 'from-primary-400 to-secondary-500' },
        { icon: AnimationIcon, name: trans('animation'), desc: trans('animation_desc'), color: 'from-primary-600 to-secondary-600' },
        { icon: PhotographyIcon, name: trans('photography'), desc: trans('photography_desc'), color: 'from-primary-300 to-secondary-400' },
        { icon: NewMediaArtsIcon, name: trans('new_media_arts'), desc: trans('new_media_arts_desc'), color: 'from-primary-500 to-primary-800' },
    ]

    return (
        <FestivalLayout title={trans('register_title')}>
            <div className="min-h-screen bg-gradient-to-br from-light-100 via-secondary-100 to-secondary-200 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <div className="w-20 h-20 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                <LogoIcon className="w-12 h-12 text-white" />
                            </div>
                            <h1 className="text-4xl font-bold text-gray-800 mb-4 font-['iransansX']">
                                {trans('register_title')}
                            </h1>
                            <p className="text-xl text-gray-600 font-['iransansX']">
                                {trans('register_subtitle')}
                            </p>
                        </div>

                        {/* User Type Selection */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center font-['iransansX']">
                                {trans('select_user_type')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {userTypes.map((type) => (
                                    <div
                                        key={type.value}
                                        onClick={() => setSelectedUserType(type.value)}
                                        className={`p-6 border-2 rounded-2xl cursor-pointer transition-all ${
                                            selectedUserType === type.value
                                                ? 'border-primary-500 bg-primary-50'
                                                : 'border-gray-200 hover:border-secondary-300'
                                        }`}
                                    >
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center ml-4">
                                                <type.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800 font-['iransansX']">
                                                    {type.label}
                                                </h3>
                                                <p className="text-gray-600 text-sm font-['iransansX']">
                                                    {type.description}
                                                </p>
                                            </div>
                                        </div>
                                        <ul className="space-y-2">
                                            {type.features.map((feature, index) => (
                                                <li key={index} className="flex items-center text-sm text-gray-600 font-['iransansX']">
                                                    <div className="w-2 h-2 bg-primary-500 rounded-full ml-2"></div>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Art Fields Preview */}
                        {selectedUserType === 'artist' && (
                            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center font-['iransansX']">
                                    {trans('festival_art_fields')}
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {artFieldsWithIcons.map((field) => (
                                        <div key={field.id} className="text-center p-4 border border-gray-200 rounded-xl hover:border-secondary-300 transition-colors">
                                            {/* <field.icon className="w-8 h-8 text-primary-600 mx-auto mb-2" /> */}
                                            <p className="text-sm font-medium text-gray-800 font-['iransansX']">
                                                {field.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Registration Steps */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center font-['iransansX']">
                                {trans('registration_steps')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {[
                                    { step: '1', title: trans('step_choose_field'), desc: trans('step_choose_art_field_desc') },
                                    { step: '2', title: trans('step_register'), desc: trans('step_register_desc') },
                                    { step: '3', title: trans('step_verify_email'), desc: trans('step_verify_email_desc') },
                                    { step: '4', title: trans('step_upload'), desc: trans('step_upload_desc') },
                                ].map((item, index) => (
                                    <div key={index} className="text-center">
                                        <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="text-2xl font-bold text-white">{item.step}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-2 font-['iransansX']">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm font-['iransansX']">
                                            {item.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="text-center">
                            <Link
                                href={selectedUserType === 'artist' ? '/artist/register' : '/judge/register'}
                                className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-12 py-4 rounded-xl font-bold text-xl hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 shadow-lg font-['iransansX'] inline-block"
                            >
                                {trans('start_registration')}
                            </Link>
                            <div className="mt-4 text-gray-600 font-['iransansX']">
                                {trans('already_registered')}{' '}
                                <Link
                                    href="/login"
                                    className="text-primary-600 hover:text-primary-700 font-bold"
                                >
                                    {trans('login_here')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FestivalLayout>
    );
}