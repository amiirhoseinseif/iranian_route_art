import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-primary-500 bg-primary-50 text-primary-800 focus:border-primary-700 focus:bg-primary-100 focus:text-primary-900'
                    : 'border-transparent text-primary-700 hover:border-secondary-300 hover:bg-secondary-100 hover:text-primary-900 focus:border-secondary-300 focus:bg-secondary-100 focus:text-primary-900'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
