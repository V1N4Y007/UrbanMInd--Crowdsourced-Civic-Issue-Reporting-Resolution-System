const Loader = ({ size = 'md', color = 'white' }) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    };

    const colorClasses = {
        white: 'border-white',
        blue: 'border-blue-500',
        gray: 'border-gray-500',
    };

    return (
        <div
            className={`animate-spin rounded-full border-b-2 ${sizeClasses[size]} ${colorClasses[color]}`}
        />
    );
};

export default Loader;
