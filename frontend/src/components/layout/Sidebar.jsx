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
    // Mobile check not strictly needed for dock if we use it on all screens, 
    // but let's keep it responsive: Dock on desktop, maybe bottom bar on mobile?
    // Actually, a bottom dock works great on mobile too if scaled down.

    const links = {
        citizen: [
            { to: '/citizen/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { to: '/citizen/report', icon: PlusCircle, label: 'Report' },
            { to: '/citizen/history', icon: History, label: 'History' },
            { to: '/citizen/map', icon: Map, label: 'Map' },
            { to: '/citizen/profile', icon: User, label: 'Profile' },
        ],
        admin: [
            { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { to: '/admin/issues', icon: List, label: 'Issues' },
            { to: '/admin/contractors', icon: Users, label: 'Contractors' },
            { to: '/admin/analytics', icon: BarChart, label: 'Analytics' },
        ],
        contractor: [
            { to: '/contractor/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { to: '/contractor/tasks', icon: CheckSquare, label: 'Tasks' },
            { to: '/contractor/completed', icon: Upload, label: 'Done' },
        ],
    };

    const roleLinks = user ? links[user.role] || [] : [];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[90vw]">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center gap-2 px-4 py-3 bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl shadow-black/50"
            >
                {roleLinks.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            clsx(
                                "relative group p-3 rounded-full transition-all duration-300",
                                isActive
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 scale-110"
                                    : "text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110"
                            )
                        }
                    >
                        {({ isActive }) => (
                            <div className="relative flex flex-col items-center">
                                <link.icon className="w-6 h-6" />
                                {/* Tooltip */}
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                                    {link.label}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeDot"
                                        className="absolute -bottom-1 w-1 h-1 bg-white rounded-full"
                                    />
                                )}
                            </div>
                        )}
                    </NavLink>
                ))}

                <div className="w-px h-8 bg-white/10 mx-2" />

                <button
                    onClick={logout}
                    className="p-3 rounded-full text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 hover:scale-110 group relative"
                >
                    <LogOut className="w-6 h-6" />
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                        Sign Out
                    </span>
                </button>
            </motion.div>
        </div>
    );
};

export default Sidebar;
