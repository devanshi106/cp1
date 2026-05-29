import { Router } from 'express';
import * as ctrl from '../controllers/adminController.js';
import { auth, admin } from '../middleware/auth.js';

// Governance actions (admin only). The admin dashboard UI arrives in Milestone 6.
const router = Router();

router.post('/users/:id/ban', auth, admin, ctrl.banUser);
router.post('/users/:id/unban', auth, admin, ctrl.unbanUser);
router.post('/users/:id/badge', auth, admin, ctrl.issueNegativeBadge);

export default router;
