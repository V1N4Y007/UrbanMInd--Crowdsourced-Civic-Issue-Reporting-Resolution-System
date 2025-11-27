import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Shield, HardHat } from 'lucide-react';
import Card from '../../components/common/Card';

const RoleSelect = () => {
    const navigate = useNavigate();

    const roles = [
        {
            id: 'citizen',
            title: 'Citizen',
            description: 'Report issues and track their status in your neighborhood.',
            icon: User,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
            border: 'hover:border-blue-500',
        },
        {
            id: 'contractor',
            title: 'Contractor',
            description: 'View assigned tasks, update status, and upload proof.',
            icon: HardHat,
            color: 'text-orange-500',
            bg: 'bg-orange-500/10',
            border: 'hover:border-orange-500',
        },
        {
            id: 'admin',
            title: 'Admin',
            description: 'Manage issues, assign contractors, and view analytics.',
            icon: Shield,
            color: 'text-purple-500',
            bg: 'bg-purple-500/10',
            border: 'hover:border-purple-500',
        },
    ];

    const handleRoleSelect = (roleId) => {
        // For now, we just navigate to login. 
        // In a real app, we might pass the selected role to the login page or store it.
        // Here we'll pass it as state to the login page.
        navigate('/login', { state: { role: roleId } });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Welcome to <span className="text-blue-500">Urban Mind</span>
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Connecting citizens, contractors, and administrators for a better urban environment.
                    Select your role to continue.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
                {roles.map((role, index) => (
                    <motion.div
                        key={role.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card
                            hover
                            onClick={() => handleRoleSelect(role.id)}
                            className={`cursor-pointer h-full flex flex-col items-center text-center p-8 transition-colors border-gray-700 ${role.border}`}
                        >
                            <div className={`p-4 rounded-full mb-6 ${role.bg}`}>
                                <role.icon className={`w-12 h-12 ${role.color}`} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">{role.title}</h3>
                            <p className="text-gray-400">{role.description}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default RoleSelect;
