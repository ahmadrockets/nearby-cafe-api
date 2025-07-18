import { User, GoogleProfile } from '../types/user';
import logger from '../utils/logger';

const users: Map<string, User> = new Map();

class UserService {
  async findById(id: string): Promise<User | null> {
    logger.debug('Finding user by ID', { id });
    return users.get(id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    logger.debug('Finding user by email', { email });
    for (const user of users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async findOrCreateUser(profile: GoogleProfile): Promise<User> {
    const email = profile.emails?.[0]?.value || '';

    // Check if user already exists
    let user = await this.findByEmail(email);

    if (!user) {
      // Create new user
      user = {
        id: profile.id,
        email,
        name: profile.displayName,
        picture: profile.photos?.[0]?.value ?? '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      users.set(user.id, user);
      logger.info('New user created', { userId: user.id, email: user.email });
    } else {
      // Update existing user
      user.name = profile.displayName;
      user.picture = profile.photos?.[0]?.value || '';
      user.updatedAt = new Date();

      users.set(user.id, user);
      logger.info('User updated', { userId: user.id, email: user.email });
    }

    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const user = users.get(id);
    if (!user) return null;

    const updatedUser = { ...user, ...updates, updatedAt: new Date() };
    users.set(id, updatedUser);

    logger.info('User updated', { userId: id });
    return updatedUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    const deleted = users.delete(id);
    if (deleted) {
      logger.info('User deleted', { userId: id });
    }
    return deleted;
  }
}

export const userService = new UserService();
