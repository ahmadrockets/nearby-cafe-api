import jwt from "jsonwebtoken";
import { User } from "../types/user";

const SECRET = process.env.JWT_SECRET || 'default_secret';

export function generateToken(user: User): string {
    return jwt.sign({
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
    }, SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string) {
    return jwt.verify(token, SECRET);
}