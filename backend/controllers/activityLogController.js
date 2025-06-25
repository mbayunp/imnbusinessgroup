import ActivityLog from '../models/activityLog.js';
const getRecentActivityLogs = async (req, res) => {
    try {
        const logs = await ActivityLog.find({})
                                    .sort({ timestamp: -1 })
                                    .limit(10)
                                    .select('-__v -updatedAt -user');
        res.status(200).json(logs);
    } catch (error) {
        console.error("Error fetching activity logs:", error);
        res.status(500).json({ message: 'Server error fetching activity logs' });
    }
};

export { getRecentActivityLogs };
