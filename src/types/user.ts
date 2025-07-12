export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GoogleProfile {
  id: string;
  displayName: string;
  emails?: Array<{ value: string; verified: boolean }>;
  photos?: Array<{ value: string }>;
}
