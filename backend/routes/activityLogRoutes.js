import express from 'express';
import { getRecentActivityLogs } from '../controllers/activityLogController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/authorizeMiddleware.js';

const router = express.Router();

router.get('/recent', protect, authorizeRoles('admin', 'hr'), getRecentActivityLogs);

export default router;