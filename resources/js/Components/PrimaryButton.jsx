export default function PrimaryButton({
    className = '',
    disabled,
    children,
    type = 'submit',
    variant = 'default', // 'default', 'gradient', 'outline'
    ...props
}) {
    const baseClasses = 'inline-flex items-center justify-center font-semibold text-white transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 font-["Vazirmatn"] shadow-lg';
    
    const variantClasses = {
        default: 'rounded-xl border border-transparent bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-3 hover:from-primary-700 hover:to-primary-800 active:scale-95 hover:shadow-xl',
        gradient: 'rounded-xl border border-transparent bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 px-6 py-3 hover:from-primary-600 hover:via-primary-700 hover:to-primary-800 active:scale-95 hover:shadow-xl',
        outline: 'rounded-xl border-2 border-primary-600 bg-transparent text-primary-600 px-6 py-3 hover:bg-primary-600 hover:text-white active:scale-95'
    };
    
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed transform-none' : '';
    
    return (
        <button
            {...props}
            type={type}
            className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
