import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/response";
import { verifyToken } from "../utils/jwt";
import { isTokenValidInRedis } from "../utils/redis";
import { User } from '../types/user';
import logger from "../utils/logger";

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            sendError(res, 'Access token is required', undefined, 401);
        }

        // verify jwt token
        const decoded = verifyToken(token!);
        const user: User = decoded
        req.user=user;

        // Check if token is valid in Redis
        const isValidInRedis = await isTokenValidInRedis(decoded.id, token!);

        if (!isValidInRedis) {
            sendError(res, 'Token is not valid or expired', undefined, 401);
            return;
        }

        next();
    } catch (err) {
        logger.error("Invalid token", err)
        sendError(res, 'Invalid token', undefined, 403);
    }
}