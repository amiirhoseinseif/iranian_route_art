import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, variant = 'default', ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    const baseClasses = 'w-full transition-all duration-200 font-["Vazirmatn"] placeholder:text-gray-400';
    
    const variantClasses = {
        default: 'rounded-xl border-2 border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 hover:border-gray-300',
        filled: 'rounded-xl border-2 border-transparent bg-gray-50 px-4 py-3 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500 hover:bg-gray-100',
        outlined: 'rounded-xl border-2 border-gray-300 bg-transparent px-4 py-3 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 hover:border-gray-400'
    };

    return (
        <input
            {...props}
            type={type}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            ref={localRef}
        />
    );
});
