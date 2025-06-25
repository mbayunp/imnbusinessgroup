import express from 'express';
import {
    getPressReleases,
    getPressReleaseById,
    createPressRelease,
    updatePressRelease,
    deletePressRelease,
    getPressReleaseStats
}
from '../controllers/pressReleaseController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

router.get('/stats', protect, authorizeRoles('admin', 'hr'), getPressReleaseStats);

router.get('/', getPressReleases);
router.get('/:id', getPressReleaseById);

router.post('/', protect, authorizeRoles('admin'), createPressRelease);
router.put('/:id', protect, authorizeRoles('admin'), updatePressRelease);
router.delete('/:id', protect, authorizeRoles('admin'), deletePressRelease);

export default router;
