import { createClient } from "redis";
import logger from "../utils/logger";

const REDIS_URI = process.env.REDIS_URI || "redis://localhost:6380";

export const redisClient = createClient({
    url: REDIS_URI,
});

redisClient.on('error', (err) => {
    logger.error('Redis Client Error', err)
});

redisClient.on('connect', () => {
    logger.info('Redis Client Connected');
});

export const connectRedis = async (): Promise<void> => {
    try {
        await redisClient.connect();
    } catch (error) {
        console.error('Redis connection error:', error);
        process.exit(1);
    }
};