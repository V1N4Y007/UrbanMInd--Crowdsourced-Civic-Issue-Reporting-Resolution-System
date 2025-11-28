import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Clock } from 'lucide-react';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import { issueService } from '../../api/services/issueService';

const CompletedTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await issueService.getMyIssues();
                // Filter for resolved tasks
                const completed = data.filter(task => task.status === 'resolved');
                setTasks(completed);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
                setTasks([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader size="lg" color="blue" />
            </div>
        );
    }

    return (
        <div className="p-8 w-full min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Completed Tasks</h1>
                    <p className="text-gray-400">History of your resolved issues.</p>
                </div>

                <div className="grid gap-6">
                    {tasks.length > 0 ? (
                        tasks.map((task, index) => (
                            <motion.div
                                key={task.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="flex items-center justify-between p-6 border-l-4 border-green-500">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">{task.title}</h3>
                                        <div className="flex gap-4 text-sm text-gray-400">
                                            <div className="flex items-center">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                {task.location || task.gps?.address || 'Location N/A'}
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="w-4 h-4 mr-2" />
                                                {new Date(task.updatedAt || Date.now()).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-green-500 font-bold">
                                        <CheckCircle className="w-6 h-6 mr-2" />
                                        Resolved
                                    </div>
                                </Card>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-gray-800/50 rounded-2xl border border-gray-700">
                            <CheckCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-medium text-white">No completed tasks yet</h3>
                            <p className="text-gray-400 mt-2">Finish some work to see it here!</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default CompletedTasks;
