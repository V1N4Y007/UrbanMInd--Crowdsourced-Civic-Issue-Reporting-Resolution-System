import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, User, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import { issueService } from '../../api/services';

const IssueDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [issue, setIssue] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIssue = async () => {
            try {
                const data = await issueService.getById(id);
                setIssue(data);
            } catch (error) {
                console.error('Failed to fetch issue details:', error);
                // Mock fallback
                setIssue({
                    id,
                    title: 'Deep Pothole on 5th Avenue',
                    description: 'Large pothole causing traffic slowdowns and potential vehicle damage. Located near the crosswalk.',
                    category: 'pothole',
                    status: 'in_progress',
                    date: '2023-10-25',
                    location: 'New York, NY',
                    coordinates: { lat: 40.7128, lng: -74.0060 },
                    image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800',
                    reporter: 'John Doe',
                    assignedTo: 'City Works Dept.',
                    updates: [
                        { date: '2023-10-25 10:00 AM', status: 'reported', message: 'Issue reported by citizen.' },
                        { date: '2023-10-26 09:30 AM', status: 'assigned', message: 'Assigned to City Works Dept.' },
                        { date: '2023-10-27 02:15 PM', status: 'in_progress', message: 'Crew dispatched to location.' },
                    ],
                });
            } finally {
                setLoading(false);
            }
        };
        fetchIssue();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader size="lg" color="blue" />
            </div>
        );
    }

    if (!issue) return <div>Issue not found</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <Button
                variant="ghost"
                size="sm"
                className="mb-6 pl-0 hover:bg-transparent hover:text-blue-400"
                onClick={() => navigate(-1)}
                icon={ArrowLeft}
            >
                Back
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="rounded-2xl overflow-hidden mb-6 shadow-2xl">
                            <img
                                src={issue.image}
                                alt={issue.title}
                                className="w-full h-64 md:h-80 object-cover"
                            />
                        </div>

                        <h1 className="text-3xl font-bold text-white mb-4">{issue.title}</h1>

                        <Card className="mb-6">
                            <h3 className="text-lg font-bold text-white mb-3">Description</h3>
                            <p className="text-gray-300 leading-relaxed">{issue.description}</p>
                        </Card>

                        <Card>
                            <h3 className="text-lg font-bold text-white mb-4">Timeline</h3>
                            <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-700">
                                {issue.updates && issue.updates.map((update, index) => (
                                    <div key={index} className="relative pl-8">
                                        <div className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-gray-900 ${index === issue.updates.length - 1 ? 'bg-blue-500' : 'bg-gray-600'
                                            }`} />
                                        <p className="text-sm text-gray-400 mb-1">{update.date}</p>
                                        <h4 className="text-white font-medium capitalize mb-1">{update.status.replace('_', ' ')}</h4>
                                        <p className="text-gray-400 text-sm">{update.message}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <Card>
                        <div className="mb-6">
                            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${issue.status === 'resolved'
                                    ? 'bg-green-500/20 text-green-400'
                                    : issue.status === 'pending'
                                        ? 'bg-orange-500/20 text-orange-400'
                                        : 'bg-blue-500/20 text-blue-400'
                                }`}>
                                {issue.status === 'resolved' && <CheckCircle className="w-4 h-4 mr-2" />}
                                {issue.status === 'pending' && <AlertTriangle className="w-4 h-4 mr-2" />}
                                {issue.status === 'in_progress' && <Clock className="w-4 h-4 mr-2" />}
                                {issue.status.replace('_', ' ')}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start">
                                <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Reported On</p>
                                    <p className="text-white font-medium">{issue.date}</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Location</p>
                                    <p className="text-white font-medium">{issue.location}</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <User className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Assigned To</p>
                                    <p className="text-white font-medium">{issue.assignedTo || 'Unassigned'}</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Map Placeholder */}
                    <Card className="h-64 bg-gray-800 flex items-center justify-center relative overflow-hidden group cursor-pointer">
                        <div className="absolute inset-0 bg-[url('https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif')] bg-cover opacity-20 group-hover:opacity-30 transition-opacity" />
                        <div className="relative z-10 text-center">
                            <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                            <p className="text-white font-medium">View on Map</p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default IssueDetails;
