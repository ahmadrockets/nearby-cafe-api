import { redisClient } from "../config/redis";

export const setTokenRedis = async (userId: string, token:string): Promise<void> => {
    const key = `user:${userId}:token`;
    await redisClient.setEx(key, 7 * 24 * 60 * 60, token);
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