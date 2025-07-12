import { Router } from 'express';
import authRoutes from './authRoutes';
import { sendSuccess } from '../utils/response';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  sendSuccess(res, 'Server is healthy', {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API info
router.get('/', (req, res) => {
  sendSuccess(res, 'Nearby Cafe API', {
    version: '1.0.0'
  });
});

// Auth routes
router.use('/auth', authRoutes);

export default router;
