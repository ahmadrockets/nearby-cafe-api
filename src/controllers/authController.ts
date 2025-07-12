import { Request, Response, NextFunction } from 'express';
import { sendSuccess, sendError } from '../utils/response';
import logger from '../utils/logger';
import { generateToken } from "../utils/jwt";
import { setTokenRedis, deleteTokenFromRedis } from "../utils/redis";
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
    const userId = req.user?.id;

    return new Promise((resolve) => {
      req.logout(async (err) => {
        if (err) {
          logger.error('Error during logout', err);
          return resolve(sendError(res, 'Error during logout'));
        }

        try {
          await new Promise<void>((destroyResolve, destroyReject) => {
            req.session.destroy(async (err) => {
              if (err) {
                logger.error('Error destroying session', err);
                return destroyReject(err);
              }

              await deleteTokenFromRedis(userId!);
              destroyResolve();
            });
          });

          logger.info('User logged out successfully', { userId });
          resolve(sendSuccess(res, 'Logout successful'));
        } catch (error) {
          logger.error('Error destroying session or deleting token', error);
          resolve(sendError(res, 'Logout failed'));
        }
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
    try {
      logger.info('Google OAuth callback successful', { userId: req.user?.id });
      //  Generate token jwt
      const user = req.user as any;
      const token = generateToken(user);

      // Insert Token to Redis
      await setTokenRedis(user.id, token);

      // check user is already inserted to mongodb
      let userMongo = await User.findOne({ googleId: user.id });
      // save user if user doesn't exist
      if (!userMongo) {
        const newUser = new User({
          googleId: user.id,
          email: user.email,
          name: user.name,
          photo: user.picture,
        });
        await newUser.save();
      }

      // TODO: Redirect to frontend after successful login
      // For now, we will just return the user information
      // const redirectUrl = `${process.env.FRONTEND_URL}?token=${token}`;
      // res.redirect(redirectUrl)
      return sendSuccess(res, 'Login successful', {user: req.user, token: token});
    } catch (error){
      // redirect to frontend failed
      // const redirectUrl = `${process.env.FRONTEND_URL}?token=${token}`;
      // res.redirect(redirectUrl)
      return sendSuccess(res, 'Login Failed', error);
    }
  }

  async handleAuthFailure(req: Request, res: Response): Promise<Response> {
    logger.warn('Authentication failed');
    return sendError(res, 'Authentication failed', undefined, 401);
  }
}

export const authController = new AuthController();
