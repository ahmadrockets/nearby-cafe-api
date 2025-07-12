import mongoose from "mongoose";
import  dotenv from "dotenv";
import logger from "../utils/logger";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/nearby-cafe";

export const connectMongo = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            maxPoolSize: 10,
            minPoolSize: 0,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000,
        })
        logger.info("MongoDB connected successfully");
    } catch (error) {
        logger.error("MongoDB connected error", error);
        process.exit(1);
    }
}