export type Tab = 'home' | 'interesting' | 'auth' | 'support' | 'community' | 'admin' | 'friends';

export interface User {
  username: string;
  email: string;
  isAdmin?: boolean;
  friends?: string[];
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

export interface PrivateMessage {
  id: number;
  from: string;
  to: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface FriendRequest {
  id: number;
  from: string;
  to: string;
  timestamp: string;
}

export interface SiteSettings {
  siteName: string;
  welcomeMessage: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
}

export const ADMIN_USERNAME = 'ilyadrak7244';
export const ADMIN_PASSWORD = '5555';