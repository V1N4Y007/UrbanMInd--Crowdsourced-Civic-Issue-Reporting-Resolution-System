import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className = '', hover = false, ...props }) => {
    return (
        <motion.div
            whileHover={hover ? { y: -5 } : {}}
            className={twMerge(
                'bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-xl',
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
