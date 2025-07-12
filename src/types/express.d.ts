import { User } from '../user';

declare global {
  namespace Express {
    interface User extends User {
      id: string;
      email: string;
      name: string;
      picture?: string;
      createdAt?: Date;
      updatedAt?: Date;
    }
  }
}
