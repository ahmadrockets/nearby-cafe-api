import { Request, Response } from 'express';
import logger from '../utils/logger';
import { sendError } from '../utils/response';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // next: NextFunction
) => {
  logger.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
  });

  // Don't leak error details in production
  const message =
    process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message;

  return sendError(res, message, err.message, 500);
};

export const notFoundHandler = (req: Request, res: Response) => {
  logger.warn('Route not found', { url: req.url, method: req.method });
  return sendError(res, 'Route not found', undefined, 404);
};
