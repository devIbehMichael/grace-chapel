export interface Sermon {
  id: string;
  title: string;
  description: string;
  video_url: string; // YouTube or generic URL
  thumbnail: string;
  date: string;
  preacher: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  event_date: string;
  time: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface Donation {
  id: string;
  user_email: string;
  amount: number;
  purpose: string;
  reference: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export interface PaystackConfig {
  publicKey: string;
  email: string;
  amount: number; // in kobo
  currency: string;
}