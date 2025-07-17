import { Router } from 'express';
import { agentController } from '../controllers/agentController';
import { authenticateJWT } from '../middleware/jwt';

const router = Router();
// Chat routes
router.post('/agent', authenticateJWT, agentController.handleChat);

export default router;