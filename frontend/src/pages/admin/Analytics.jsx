import Card from '../../components/common/Card';

const Analytics = () => {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
                <p className="text-gray-400">Detailed insights and heatmaps.</p>
            </div>

            <Card className="h-96 flex items-center justify-center mb-6">
                <p className="text-gray-500 text-xl">Heatmap Visualization (Coming Soon)</p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="h-64 flex items-center justify-center">
                    <p className="text-gray-500">Resolution Time Analysis</p>
                </Card>
                <Card className="h-64 flex items-center justify-center">
                    <p className="text-gray-500">Category Breakdown</p>
                </Card>
            </div>
        </div>
    );
};

export default Analytics;
