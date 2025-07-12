import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';
import logger from '../utils/logger';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    logger.debug('User authenticated', { userId: req.user?.id });
    return next();
  }

  logger.warn('Unauthorized access attempt', {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });

  return sendError(res, 'Unauthorized. Please login first.', undefined, 401);
};

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    return sendError(res, 'Authentication required', undefined, 401);
  }
  return next();
};
