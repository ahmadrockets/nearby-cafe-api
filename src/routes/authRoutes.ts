import { Router } from 'express';
import passport from '../config/passport';
import { authController } from '../controllers/authController';
import { authenticateJWT } from '../middleware/jwt';

const router = Router();

// Google OAuth routes
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  authController.handleGoogleCallback
);

// Protected routes
router.get('/profile', authenticateJWT, authController.getProfile);

// Logout routes
router.post('/logout', authenticateJWT, authController.logout);
router.get('/logout', authController.logout);

// Status and failure routes
router.get('/status', authController.getStatus);
router.get('/failure', authController.handleAuthFailure);

export default router;
