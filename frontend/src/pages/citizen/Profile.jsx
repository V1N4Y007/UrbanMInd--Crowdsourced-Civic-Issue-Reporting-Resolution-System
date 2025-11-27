import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { User, Mail, Phone, MapPin, Award } from 'lucide-react';
import { userService } from '../../api/services';

const Profile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await userService.getProfile();
                setProfile(data);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                // Fallback to auth context user if API fails
                setProfile(user);
            } finally {
                setLoading(false);
            }
        };
        if (user) {
            fetchProfile();
        }
    }, [user]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader size="lg" color="blue" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
                <p className="text-gray-400">Manage your account settings and view your impact.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <Card className="md:col-span-1 flex flex-col items-center text-center p-8">
                    <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mb-6 border-4 border-gray-800 shadow-xl">
                        <User className="w-16 h-16 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-1">{profile?.name}</h2>
                    <p className="text-blue-400 font-medium capitalize mb-6">{profile?.role}</p>

                    <div className="w-full space-y-3">
                        <Button variant="secondary" className="w-full">Edit Profile</Button>
                        <Button variant="ghost" className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10">Delete Account</Button>
                    </div>
                </Card>

                {/* Details & Stats */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <h3 className="text-xl font-bold text-white mb-6">Personal Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-center p-4 bg-gray-800/50 rounded-xl">
                                <Mail className="w-5 h-5 text-gray-400 mr-4" />
                                <div>
                                    <p className="text-sm text-gray-500">Email Address</p>
                                    <p className="text-white">{profile?.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center p-4 bg-gray-800/50 rounded-xl">
                                <Phone className="w-5 h-5 text-gray-400 mr-4" />
                                <div>
                                    <p className="text-sm text-gray-500">Phone Number</p>
                                    <p className="text-white">{profile?.phone || 'Not provided'}</p>
                                </div>
                            </div>
                            <div className="flex items-center p-4 bg-gray-800/50 rounded-xl">
                                <MapPin className="w-5 h-5 text-gray-400 mr-4" />
                                <div>
                                    <p className="text-sm text-gray-500">Location</p>
                                    <p className="text-white">New York, USA</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-xl font-bold text-white mb-6">Impact Score</h3>
                        <div className="flex items-center gap-6">
                            <div className="flex-1">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-400">Level 5 Citizen</span>
                                    <span className="text-blue-400 font-bold">450 Points</span>
                                </div>
                                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 w-[75%]" />
                                </div>
                                <p className="text-sm text-gray-500 mt-2">50 points to next level</p>
                            </div>
                            <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/20">
                                <Award className="w-8 h-8 text-yellow-500" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;
