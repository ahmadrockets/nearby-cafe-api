import { Request, Response, NextFunction } from 'express';
import { sendSuccess, sendError } from '../utils/response';
import logger from '../utils/logger';
import { generateToken } from "../utils/jwt";
import User from "../models/user";

export class AuthController {
  async getProfile(req: Request, res: Response): Promise<Response> {
    try {
      logger.info('Profile requested', { userId: req.user?.id });
      return sendSuccess(res, 'Profile retrieved successfully', req.user);
    } catch (error) {
      logger.error('Error getting profile', error);
      return sendError(res, 'Failed to get profile');
    }
  }

  async logout(req: Request, res: Response): Promise<Response> {
    return new Promise(resolve => {
      const userId = req.user?.id;
      
      req.logout(err => {
        if (err) {
          logger.error('Error during logout', err);
          return resolve(sendError(res, 'Error during logout'));
        }

        req.session.destroy(err => {
          if (err) {
            logger.error('Error destroying session', err);
            return resolve(sendError(res, 'Error destroying session'));
          }

          logger.info('User logged out successfully', { userId });
          return resolve(sendSuccess(res, 'Logout successful'));
        });
      });
    });
  }

  async getStatus(req: Request, res: Response): Promise<Response> {
    const isAuthenticated = req.isAuthenticated();
    const user = isAuthenticated ? req.user : null;

    return sendSuccess(res, 'Status retrieved', {
      authenticated: isAuthenticated,
      user,
    });
  }

  async handleGoogleCallback(req: Request, res: Response): Promise<Response> {
    logger.info('Google OAuth callback successful', { userId: req.user?.id });
    
    //  Generate token jwt
    const user = req.user as any;
    const token = generateToken(user);

    // check user is already inserted to mongodb
    let userMongo = await User.findOne({ googleId: user.id });
   
    if (!userMongo) {
      // save user if user doesn't exist
      const newUser = new User({
        googleId: user.id,
        email: user.email,
        name: user.name,
        photo: user.picture,
      });
      logger.debug(newUser);
      await newUser.save();
    }

    // TODO: Redirect to frontend after successful login
    // For now, we will just return the user information
    // const redirectUrl = `${process.env.FRONTEND_URL}?token=${token}`;
    // res.redirect(redirectUrl)
    return sendSuccess(res, 'Login successful', req.user);
  }

  async handleAuthFailure(req: Request, res: Response): Promise<Response> {
    logger.warn('Authentication failed');
    return sendError(res, 'Authentication failed', undefined, 401);
  }
}

export const authController = new AuthController();
