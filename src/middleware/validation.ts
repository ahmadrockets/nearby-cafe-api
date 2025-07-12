import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';

export const validateEnvironment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requiredEnvVars = [
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'SESSION_SECRET',
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    return sendError(
      res,
      'Server configuration error',
      `Missing environment variables: ${missingVars.join(', ')}`,
      500
    );
  }

  return next();
};
