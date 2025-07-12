import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User, GoogleProfile } from '../types/user';
import { userService } from '../services/userService';
import logger from '../utils/logger';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        logger.info('Google OAuth callback received', {
          profileId: profile.id,
        });

        const googleProfile: GoogleProfile = {
          id: profile.id,
          displayName: profile.displayName,
          emails: profile.emails || [],
          photos: profile.photos || [],
        };

        const user = await userService.findOrCreateUser(googleProfile);
        return done(null, user);
      } catch (error) {
        logger.error('Error in Google OAuth strategy', error);
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await userService.findById(id);
    done(null, user);
  } catch (error) {
    logger.error('Error deserializing user', error);
    done(error, null);
  }
});

export default passport;
