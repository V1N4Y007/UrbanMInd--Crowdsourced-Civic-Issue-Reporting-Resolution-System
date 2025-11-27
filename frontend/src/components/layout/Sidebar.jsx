import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    PlusCircle,
    History,
    User,
    Map,
    List,
    Users,
    BarChart,
    CheckSquare,
    Upload
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { clsx } from 'clsx';

const Sidebar = ({ isOpen, onClose }) => {
    const { user } = useAuth();

    const links = {
        citizen: [
            { to: '/citizen/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { to: '/citizen/report', icon: PlusCircle, label: 'Report Issue' },
            { to: '/citizen/history', icon: History, label: 'My Reports' },
            { to: '/citizen/map', icon: Map, label: 'Map View' },
            { to: '/citizen/profile', icon: User, label: 'Profile' },
        ],
        admin: [
            { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { to: '/admin/issues', icon: List, label: 'All Issues' },
            { to: '/admin/contractors', icon: Users, label: 'Contractors' },
            { to: '/admin/analytics', icon: BarChart, label: 'Analytics' },
        ],
        contractor: [
            { to: '/contractor/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { to: '/contractor/tasks', icon: CheckSquare, label: 'My Tasks' },
            { to: '/contractor/completed', icon: Upload, label: 'Completed' },
        ],
    };

    const roleLinks = user ? links[user.role] || [] : [];

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                className={clsx(
                    "fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-gray-800 border-r border-gray-700 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="p-4 space-y-2">
                    {roleLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => onClose()} // Close on mobile when clicked
                            className={({ isActive }) =>
                                clsx(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                                    isActive
                                        ? "bg-blue-600/10 text-blue-400 border border-blue-600/20"
                                        : "text-gray-400 hover:bg-gray-700/50 hover:text-white"
                                )
                            }
                        >
                            <link.icon className="w-5 h-5" />
                            <span className="font-medium">{link.label}</span>
                        </NavLink>
                    ))}
                </div>
            </motion.aside>
        </>
    );
};

export default Sidebar;
