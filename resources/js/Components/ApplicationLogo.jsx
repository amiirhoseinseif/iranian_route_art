export default function ApplicationLogo({ className = "h-20 w-auto", ...props }) {
    return (
        <img
            src="/logo.png2.png"
            alt="Iranian Route International Festival Logo"
            className={className}
            style={{
                objectFit: 'contain',
                background: 'transparent'
            }}
            {...props}
        />
    );
}
