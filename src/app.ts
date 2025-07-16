import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import sessionConfig from './config/session';
import passport from './config/passport';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { validateEnvironment } from './middleware/validation';
import logger from './utils/logger';
import { connectMongo } from './config/mongodb';
import { connectRedis } from "./config/redis";

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(helmet());


// Request logging
app.use(morgan('combined', {
    stream: { write: (message) => logger.info(message.trim()) }
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Session middleware
app.use(session(sessionConfig));

// Passport middleware
app.use(passport.initialize());
// app.use(passport.session());

// Environment validation
app.use(validateEnvironment);

// Routes
app.use('/', routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const startServer = async (): Promise<void> => {
    try {
        await connectMongo();
        await connectRedis();

        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
            logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();