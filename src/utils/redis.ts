import { redisClient } from "../config/redis";

const JWT_EXPIRE = Number(process.env.JWT_EXPIRE) || 900;

export const setTokenRedis = async (userId: string, token:string): Promise<void> => {
    const key = `user:${userId}:token`;
    await redisClient.setEx(key, JWT_EXPIRE, token);
}

export const getTokenFromRedis = async (userId: string): Promise<string | null> => {
    const key = `user:${userId}:token`;
    return await redisClient.get(key);
}

export const deleteTokenFromRedis = async (userId: string): Promise<void> => {
    const key = `user:${userId}:token`;
    await redisClient.del(key);
}

export const isTokenValidInRedis = async (userId:string, token:string): Promise<boolean> => {
    const storedToken = await getTokenFromRedis(userId);
    return storedToken === token;
}