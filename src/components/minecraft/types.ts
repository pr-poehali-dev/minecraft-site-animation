export type Tab = 'home' | 'interesting' | 'auth' | 'support' | 'community' | 'admin';

export interface User {
  username: string;
  email: string;
  isAdmin?: boolean;
}

export interface Comment {
  id: number;
  username: string;
  text: string;
  timestamp: string;
}

export interface OnlineUser {
  id: string;
  username: string;
  lastSeen: number;
  isAdmin?: boolean;
  isBanned?: boolean;
  isMuted?: boolean;
}

export const ADMIN_USERNAME = 'ilyadrak7244';
export const ADMIN_PASSWORD = '5555';
