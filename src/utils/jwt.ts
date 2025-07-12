import jwt from "jsonwebtoken";
import { IUser } from "../models/user";
import {JWTPayload} from "../types/jwt";

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const JWT_EXPIRE = Number(process.env.JWT_EXPIRE) || 8640;

export function generateToken(user: IUser): string {
    return jwt.sign({
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.photo,
    }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
}

export const verifyToken = (token: string): JWTPayload => {
    return jwt.verify(token, JWT_SECRET!) as JWTPayload;
};