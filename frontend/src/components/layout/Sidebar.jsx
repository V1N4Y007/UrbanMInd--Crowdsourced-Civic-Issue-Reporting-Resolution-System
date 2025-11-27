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
    Upload,
    LogOut,
    ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { clsx } from 'clsx';
import { useState, useEffect } from 'react';

const Sidebar = ({ isOpen, onClose }) => {
    const { user, logout } = useAuth();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    const sidebarVariants = {
        open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
        closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
    };

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && isMobile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={isMobile ? (isOpen ? "open" : "closed") : "open"}
                variants={sidebarVariants}
                className={clsx(
                    "fixed top-0 left-0 h-full w-72 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 z-50 lg:block",
                    "fixed top-16 left-0 h-[calc(100vh-4rem)]"
                )}
            >
                <div className="h-full flex flex-col py-6 px-4">

                    {/* Navigation Links */}
                    <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
                        <div className="mb-6 px-2">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                                Menu
                            </p>
                            {roleLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => onClose()}
                                    className={({ isActive }) =>
                                        clsx(
                                            "group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 mb-1",
                                            isActive
                                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                                : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                        )
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <div className="flex items-center gap-3.5">
                                                <link.icon className={clsx("w-5 h-5", isActive ? "text-white" : "text-gray-500 group-hover:text-white transition-colors")} />
                                                <span className="font-medium text-sm tracking-wide">{link.label}</span>
                                            </div>
                                            {isActive && (
                                                <motion.div layoutId="activeIndicator" className="bg-white rounded-full p-0.5">
                                                    <ChevronRight className="w-3 h-3 text-blue-600" />
                                                </motion.div>
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* User Profile / Logout Section */}
                    <div className="pt-4 border-t border-gray-800">
                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
                        >
                            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </div>
                </div>
            </motion.aside>
        </>
    );
};

export default Sidebar;
