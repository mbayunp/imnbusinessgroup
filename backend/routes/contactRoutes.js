import express from 'express';
import { submitContactMessage, getAllContactMessages, deleteContactMessage } from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js'; 
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

router.post('/', submitContactMessage);

router.get('/', protect, authorizeRoles('admin'), getAllContactMessages);

router.delete('/:id', protect, authorizeRoles('admin'), deleteContactMessage);

export default router;
