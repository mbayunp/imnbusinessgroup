import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/authorizeMiddleware.js';
import {
    getCareers,
    getCareerById,
    createCareer,
    updateCareer,
    deleteCareer,
    getCareerStats
} from '../controllers/careerController.js';

const router = express.Router();

router.get('/stats', protect, authorizeRoles('admin', 'hr'), getCareerStats);

router.get('/', getCareers);
router.get('/:id', getCareerById);

router.post('/', protect, authorizeRoles('admin', 'hr'), createCareer);
router.put('/:id', protect, authorizeRoles('admin', 'hr'), updateCareer);
router.delete('/:id', protect, authorizeRoles('admin', 'hr'), deleteCareer);

export default router;
