import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from './Loader';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-900">
                <Loader />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard if role doesn't match
        switch (user.role) {
            case 'citizen':
                return <Navigate to="/citizen/dashboard" replace />;
            case 'admin':
                return <Navigate to="/admin/dashboard" replace />;
            case 'contractor':
                return <Navigate to="/contractor/dashboard" replace />;
            default:
                return <Navigate to="/login" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
