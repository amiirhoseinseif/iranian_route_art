import React from 'react';

// Art Field Icons
export const MusicIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
    </svg>
);

export const PaintingIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 4l-1.5 3M4 4l1.5 3M10 5h4M7 9h10M5 14h14M3 20h18M12 3v17"/>
        <circle cx="12" cy="11" r="2" fill="currentColor"/>
        <path strokeLinecap="round" strokeWidth={1.5} d="M9 11l1 1M15 11l-1 1"/>
    </svg>
);

export const FilmIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
    </svg>
);

export const SculptureIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4c-2.5 0-5 1-5 3v10c0 2 2.5 3 5 3s5-1 5-3V7c0-2-2.5-3-5-3zM7 7h10M7 10h10M7 13h10"/>
        <circle cx="9" cy="9" r="1.5" fill="currentColor"/>
        <circle cx="15" cy="9" r="1.5" fill="currentColor"/>
        <path strokeLinecap="round" strokeWidth={1.5} d="M5 17l2 3M19 17l-2 3"/>
    </svg>
);

export const GraphicIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M3 3v18h18V3H3zm16 16H5V5h14v14z"/>
        <path d="M7 7h4v4H7zm6 0h4v4h-4zM7 13h4v4H7zm6 0h4v4h-4z"/>
    </svg>
);

export const CalligraphyIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3h6v4H9V3z"/>
        <ellipse cx="5" cy="9" rx="3" ry="8" fill="currentColor"/>
        <ellipse cx="19" cy="9" rx="3" ry="8" fill="currentColor"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5h14M3 17h18M12 3v14"/>
    </svg>
);

export const PhotographyIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 12m-3.2 0a3.2 3.2 0 1 1 6.4 0a3.2 3.2 0 1 1 -6.4 0"/>
        <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
    </svg>
);

export const ArchitectureIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10z"/>
    </svg>
);

export const HandicraftsIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3h6v3H9V3zM5 7h14l-1 12H6L5 7zM8 12h8M8 16h4M6 8v1M18 8v1M10 5h4"/>
    </svg>
);

export const IndustrialDesignIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <rect x="3" y="8" width="18" height="12" rx="2"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h2M7 12h2M11 12h2M15 12h2M19 12h2M3 16h2M7 16h2M11 16h2M15 16h2M6 8V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3"/>
    </svg>
);

export const IllustrationIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12c0-1.657 4.03-3 9-3s9 1.343 9 3M3 12v6c0 1.657 4.03 3 9 3s9-1.343 9-3v-6M3 12c0-1.657 4.03-3 9-3s9 1.343 9 3"/>
        <circle cx="7" cy="12" r="1.5" fill="currentColor"/>
        <circle cx="17" cy="12" r="1.5" fill="currentColor"/>
        <path strokeLinecap="round" strokeWidth={2} d="M8 9l2 3M16 9l-2 3"/>
    </svg>
);

export const LiteratureIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h10"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 21c-1-2-1.5-3.5-2-5M15 21c1-2 1.5-3.5 2-5M17 8c-.5 1-1 1.5-1 2.5s.5 2 1 3"/>
    </svg>
);

export const CarpetIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <rect x="3" y="5" width="18" height="14" rx="1" strokeWidth={2}/>
        <path strokeLinecap="round" strokeWidth={1.5} d="M3 9h18M3 13h18M3 17h18M7 5v14M11 5v14M15 5v14M19 5v14"/>
        <circle cx="7" cy="9" r="1" fill="currentColor"/>
        <circle cx="11" cy="13" r="1" fill="currentColor"/>
        <circle cx="15" cy="9" r="1" fill="currentColor"/>
        <circle cx="19" cy="13" r="1" fill="currentColor"/>
        <circle cx="7" cy="17" r="1" fill="currentColor"/>
        <circle cx="15" cy="17" r="1" fill="currentColor"/>
    </svg>
);

export const ShortFilmIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M8 5v14l11-7z"/>
    </svg>
);

export const TheaterIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8h18v8H3z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8L12 2l9 6M3 16L12 22l9-6"/>
        <circle cx="6" cy="12" r="1.5" fill="currentColor"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
        <circle cx="18" cy="12" r="1.5" fill="currentColor"/>
        <path strokeLinecap="round" strokeWidth={1.5} d="M3 8v8M21 8v8"/>
    </svg>
);

export const FashionDesignIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3h6v3H9V3zM5 7h14M8 12h8M8 16h4M6 9v10h12V9M12 3v4"/>
        <circle cx="10" cy="12" r="1" fill="currentColor"/>
        <circle cx="14" cy="12" r="1" fill="currentColor"/>
        <path strokeLinecap="round" strokeWidth={1.5} d="M7 11h2M15 11h2"/>
    </svg>
);

export const AnimationIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <circle cx="8" cy="8" r="3" strokeWidth={2}/>
        <circle cx="16" cy="8" r="3" strokeWidth={2}/>
        <circle cx="8" cy="16" r="3" strokeWidth={2}/>
        <circle cx="16" cy="16" r="3" strokeWidth={2}/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 8l8 8M8 16l8-8"/>
        <circle cx="8" cy="8" r="1" fill="currentColor"/>
        <circle cx="16" cy="8" r="1" fill="currentColor"/>
        <circle cx="8" cy="16" r="1" fill="currentColor"/>
        <circle cx="16" cy="16" r="1" fill="currentColor"/>
    </svg>
);

export const NewMediaArtsIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <rect x="3" y="5" width="8" height="8" rx="1"/>
        <rect x="13" y="5" width="8" height="8" rx="1"/>
        <rect x="3" y="15" width="8" height="4" rx="1"/>
        <rect x="13" y="15" width="8" height="4" rx="1"/>
        <circle cx="7" cy="9" r="1" fill="currentColor"/>
        <circle cx="17" cy="9" r="1" fill="currentColor"/>
        <path strokeLinecap="round" strokeWidth={1.5} d="M5 7h2M15 7h2M5 11h2M15 11h2M5 17h2M15 17h2"/>
    </svg>
);

// Feature Icons
export const CreativityIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
);

export const TrophyIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5V7C21 7.55 20.55 8 20 8H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V8H4C3.45 8 3 7.55 3 7V5C3 4.45 3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V7H17V6H7ZM7 9V19H17V9H7Z"/>
    </svg>
);

export const GlobalIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
);

// Action Icons
export const AddIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </svg>
);

export const ProfileIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
);

export const ListIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
    </svg>
);

// Status Icons
export const CheckIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
);

export const ClockIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
    </svg>
);

export const CloseIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
);

// Navigation Icons
export const HomeIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
);

export const AboutIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
    </svg>
);

export const ContactIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
);

// Social Media Icons
export const TelegramIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.75-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06-.01.13-.02.2z"/>
    </svg>
);

export const WhatsAppIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
    </svg>
);

export const InstagramIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
);

export const LinkedInIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
);

// Admin Management Icons
export const AdminIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z"/>
    </svg>
);

export const UserCheckIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"/>
    </svg>
);

export const UserXIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M16 8L8 16M8 8L16 16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"/>
    </svg>
);

export const SettingsIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.6 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
    </svg>
);

export const ShieldCheckIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"/>
    </svg>
);

export const ShieldXIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M15.5 8L12 11.5L8.5 8L7.5 9L11 12.5L7.5 16L8.5 17L12 13.5L15.5 17L16.5 16L13 12.5L16.5 9L15.5 8Z"/>
    </svg>
);

// Additional Navigation Icons
export const UploadIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z M12,12L16,16H13.5V19H10.5V16H8L12,12Z"/>
    </svg>
);

export const BellIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12,22A2,2 0 0,0 14,20H10A2,2 0 0,0 12,22M18,16V11C18,7.93 16.36,5.36 13.5,4.68V4A1.5,1.5 0 0,0 12,2.5A1.5,1.5 0 0,0 10.5,4V4.68C7.63,5.36 6,7.92 6,11V16L4,18V19H20V18L18,16Z"/>
    </svg>
);

export const UsersIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.996 2.996 0 0 0 17.04 7H15.5c-.8 0-1.54.5-1.84 1.26L12.1 13H13v9h7zm-12.5 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S6 19.67 6 20.5 6.67 22 7.5 22zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9.5l-2.54-7.63A2.996 2.996 0 0 0 4.54 7H3c-.8 0-1.54.5-1.84 1.26L-.9 13H0v9h7.5z"/>
    </svg>
);

export const ScaleIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
    </svg>
);

export const ClipboardIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7Z"/>
    </svg>
);

export const StarIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.46,13.97L5.82,21L12,17.27Z"/>
    </svg>
);

export const ExitIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z"/>
    </svg>
);

export const ChartBarIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M22,21H2V3H4V19H6V17H10V19H12V16H16V19H18V13H22V21Z"/>
    </svg>
);

// Contact and Communication Icons
export const EmailIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M20,8L12,13L4,8V6L12,11L20,6V8Z"/>
    </svg>
);

export const PhoneIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
    </svg>
);

export const LocationIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22S19,14.25 19,9A7,7 0 0,0 12,2Z"/>
    </svg>
);

// Art and Media Icons
export const PaletteIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 17.42,3 12,3M6.5,12C5.67,12 5,11.33 5,10.5S5.67,9 6.5,9 8,9.67 8,10.5 7.33,12 6.5,12M9.5,8C8.67,8 8,7.33 8,6.5S8.67,5 9.5,5 11,5.67 11,6.5 10.33,8 9.5,8M14.5,8C13.67,8 13,7.33 13,6.5S13.67,5 14.5,5 16,5.67 16,6.5 15.33,8 14.5,8M17.5,12C16.67,12 16,11.33 16,10.5S16.67,9 17.5,9 19,9.67 19,10.5 18.33,12 17.5,12Z"/>
    </svg>
);

export const NoteIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z M12,11L14,13L10.5,16.5L8.5,14.5L12,11Z"/>
    </svg>
);

export const ImageIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z"/>
    </svg>
);

export const CalendarIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,19H5V8H19V19M19,6H5V5H19V6Z"/>
    </svg>
);

export const TimerIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M15,1H9V3H15V1M11,14H13V8H11V14M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22A9,9 0 0,0 21,13C21,10.88 20.26,8.93 19.03,7.39M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20Z"/>
    </svg>
);

export const MobileIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21C5,22.11 5.89,23 7,23H17C18.11,23 19,22.11 19,21V3C19,1.89 18.11,1 17,1Z"/>
    </svg>
);

// Decorative Icons
export const SparkleIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M9.5,6.5L12,2L14.5,6.5L19,9L14.5,11.5L12,16L9.5,11.5L5,9L9.5,6.5M12,8A2,2 0 0,0 10,10A2,2 0 0,0 12,12A2,2 0 0,0 14,10A2,2 0 0,0 12,8Z"/>
    </svg>
);

// Search and Filter Icons
export const SearchIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
);

export const FilterIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
    </svg>
);

export const EyeIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    </svg>
);

export const EditIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
    </svg>
);

export const TrashIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
    </svg>
);

export const DownloadIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
    </svg>
);

// Logo Icon - Compact version for headers
export const LogoIcon = ({ className = "w-8 h-8 mix-blend-multiply", ...props }) => (
    <img
        src="/logo.png"
        alt="Iranian Route International Festival Logo"
        className={className}
        style={{
            objectFit: 'contain',
            background: 'transparent'
        }}
        {...props}
    />
);

// Additional Utility Icons
export const CloudIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"/>
    </svg>
);

export const BookIcon = ({ className = "w-6 h-6", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
    </svg>
);
