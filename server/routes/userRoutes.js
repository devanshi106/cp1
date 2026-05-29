import { Router } from 'express';
import * as ctrl from '../controllers/userController.js';

const router = Router();

// /leaderboard must precede /:id so it isn't captured as a user id.
router.get('/leaderboard', ctrl.leaderboard);
router.get('/:id', ctrl.profile);

export default router;
