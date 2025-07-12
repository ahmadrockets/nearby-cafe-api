import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProduction,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true,
    // sameSite: isProduction ? 'none' : 'lax',
  },
};

export default sessionConfig;
