import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/response";
import jwt from "jsonwebtoken";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return sendError(res, 'Access token is required', undefined, 401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
        (req as any).user = decoded;
        return next();
    } catch (err) {
        return sendError(res, 'Invalid token', undefined, 403);
    }
}