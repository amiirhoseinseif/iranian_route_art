export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    variant = 'default', // 'default', 'subtle', 'ghost'
    ...props
}) {
    const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 font-["Vazirmatn"]';
    
    const variantClasses = {
        default: 'rounded-xl border-2 border-secondary-300 bg-white px-6 py-3 text-primary-700 shadow-md hover:bg-secondary-50 hover:border-secondary-400 active:scale-95 hover:shadow-lg',
        subtle: 'rounded-xl border border-gray-200 bg-gray-50 px-6 py-3 text-gray-700 hover:bg-gray-100 hover:border-gray-300 active:scale-95',
        ghost: 'rounded-xl border border-transparent bg-transparent px-6 py-3 text-gray-600 hover:bg-gray-50 active:scale-95'
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
