import { Router } from 'express';
import { placeController } from '../controllers/placeController';
import { authenticateJWT } from '../middleware/jwt';

const router = Router();
// Nearby routes
router.get('/nearby', authenticateJWT, placeController.getNearbyPlaces);

export default router;