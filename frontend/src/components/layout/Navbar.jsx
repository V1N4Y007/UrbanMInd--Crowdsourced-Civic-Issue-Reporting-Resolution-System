import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Menu } from 'lucide-react';
import Button from '../common/Button';

const Navbar = ({ toggleSidebar }) => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-gray-800 border-b border-gray-700 h-16 flex items-center justify-between px-4 lg:px-6 fixed top-0 w-full z-40">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden text-gray-400 hover:text-white"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">U</span>
                    </div>
                    <span className="hidden sm:block">Urban Mind</span>
                </Link>
            </div>

            <div className="flex items-center gap-4">
                {user && (
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-white">{user.name}</p>
                            <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                        </div>
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-300" />
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={logout}
                            className="text-gray-400 hover:text-red-400"
                            icon={LogOut}
                        >
                            <span className="sr-only">Logout</span>
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
