import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { dashboardService } from '../../api/services/dashboardService';
import { issueService } from '../../api/services/issueService';

const CitizenDashboard = () => {
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        resolved: 0,
    });

    const [recentIssues, setRecentIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsData, issuesData] = await Promise.all([
                    dashboardService.getStats(),
                    issueService.getMyIssues({ limit: 5 })
                ]);

                setStats(statsData);
                setRecentIssues(issuesData);
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="p-8 w-full h-full flex items-center justify-center min-h-[500px]">
                <Loader size="lg" color="blue" />
            </div>
        );
    }

    return (
        <div className="p-8 w-full min-h-screen">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                        <p className="text-gray-400">Welcome back, Citizen</p>
                    </div>
                    <Link to="/citizen/report">
                        <Button icon={Plus}>Report Issue</Button>
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-blue-600/10 border-blue-600/20">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-600/20 rounded-lg text-blue-500">
                                <Plus className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Total Reports</p>
                                <h3 className="text-2xl font-bold text-white">{stats.total}</h3>
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-orange-600/10 border-orange-600/20">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-600/20 rounded-lg text-orange-500">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Pending</p>
                                <h3 className="text-2xl font-bold text-white">{stats.pending}</h3>
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-green-600/10 border-green-600/20">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-600/20 rounded-lg text-green-500">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Resolved</p>
                                <h3 className="text-2xl font-bold text-white">{stats.resolved}</h3>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Recent Reports */}
                <h2 className="text-xl font-bold text-white mb-4">Recent Reports</h2>
                <div className="grid gap-4">
                    {recentIssues.length === 0 && (
                        <p className="text-gray-400">No recent reports found.</p>
                    )}

                    {recentIssues.map((issue, index) => (
                        <motion.div
                            key={issue._id}  // FIXED KEY
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card hover className="flex items-center justify-between p-4">
                                <div>
                                    <h4 className="font-medium text-white mb-1">{issue.title}</h4>
                                    <p className="text-sm text-gray-400">
                                        {new Date(issue.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                                        issue.status === 'resolved'
                                            ? 'bg-green-500/10 text-green-500'
                                            : issue.status === 'pending'
                                            ? 'bg-orange-500/10 text-orange-500'
                                            : 'bg-blue-500/10 text-blue-500'
                                    }`}
                                >
                                    {issue.status.replace('_', ' ')}
                                </span>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default CitizenDashboard;
