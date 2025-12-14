import { Sermon, Event, Message, Donation, User } from '../types';

// NOTE: In a real production app, this service would import the 'supabaseClient'
// and make actual async calls to the database. For this demo, we use
// localStorage and mock data to ensure the UI is fully functional.

const MOCK_DELAY = 600;

const INITIAL_SERMONS: Sermon[] = [
  {
    id: '1',
    title: 'Walking in Faith',
    description: 'Understanding how to trust God in difficult times.',
    preacher: 'Pastor John Doe',
    date: '2023-10-15',
    thumbnail: 'https://picsum.photos/seed/sermon1/800/600',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: '2',
    title: 'The Power of Prayer',
    description: 'Learning to communicate effectively with the Father.',
    preacher: 'Pastor Jane Smith',
    date: '2023-10-22',
    thumbnail: 'https://picsum.photos/seed/sermon2/800/600',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: '3',
    title: 'Grace Abounds',
    description: 'Exploring the limitless grace available to us.',
    preacher: 'Pastor John Doe',
    date: '2023-10-29',
    thumbnail: 'https://picsum.photos/seed/sermon3/800/600',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

const INITIAL_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Community Picnic',
    description: 'Join us for a day of fun, food, and fellowship at the park.',
    location: 'Central City Park',
    event_date: '2023-11-20',
    time: '12:00 PM'
  },
  {
    id: '2',
    title: 'Christmas Eve Service',
    description: 'A candlelight service celebrating the birth of Christ.',
    location: 'Main Sanctuary',
    event_date: '2023-12-24',
    time: '06:00 PM'
  }
];

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class DataService {
  // --- Auth ---
  async login(email: string): Promise<User> {
    await delay(MOCK_DELAY);
    if (email.includes('admin')) {
      return { id: 'admin-123', email, role: 'admin' };
    }
    return { id: 'user-123', email, role: 'user' };
  }

  // --- Sermons ---
  async getSermons(): Promise<Sermon[]> {
    await delay(MOCK_DELAY);
    const stored = localStorage.getItem('sermons');
    if (!stored) {
      localStorage.setItem('sermons', JSON.stringify(INITIAL_SERMONS));
      return INITIAL_SERMONS;
    }
    return JSON.parse(stored);
  }

  async addSermon(sermon: Omit<Sermon, 'id'>): Promise<Sermon> {
    await delay(MOCK_DELAY);
    const sermons = await this.getSermons();
    const newSermon = { ...sermon, id: crypto.randomUUID() };
    localStorage.setItem('sermons', JSON.stringify([newSermon, ...sermons]));
    return newSermon;
  }

  async deleteSermon(id: string): Promise<void> {
    await delay(MOCK_DELAY);
    const sermons = await this.getSermons();
    const filtered = sermons.filter(s => s.id !== id);
    localStorage.setItem('sermons', JSON.stringify(filtered));
  }

  // --- Events ---
  async getEvents(): Promise<Event[]> {
    await delay(MOCK_DELAY);
    const stored = localStorage.getItem('events');
    if (!stored) {
      localStorage.setItem('events', JSON.stringify(INITIAL_EVENTS));
      return INITIAL_EVENTS;
    }
    return JSON.parse(stored);
  }

  async addEvent(event: Omit<Event, 'id'>): Promise<Event> {
    await delay(MOCK_DELAY);
    const events = await this.getEvents();
    const newEvent = { ...event, id: crypto.randomUUID() };
    localStorage.setItem('events', JSON.stringify([newEvent, ...events]));
    return newEvent;
  }

  async deleteEvent(id: string): Promise<void> {
    await delay(MOCK_DELAY);
    const events = await this.getEvents();
    const filtered = events.filter(e => e.id !== id);
    localStorage.setItem('events', JSON.stringify(filtered));
  }

  // --- Messages ---
  async getMessages(): Promise<Message[]> {
    await delay(MOCK_DELAY);
    const stored = localStorage.getItem('messages');
    return stored ? JSON.parse(stored) : [];
  }

  async sendMessage(msg: Omit<Message, 'id' | 'created_at' | 'read'>): Promise<void> {
    await delay(MOCK_DELAY);
    const messages = await this.getMessages();
    const newMessage: Message = { 
      ...msg, 
      id: crypto.randomUUID(), 
      created_at: new Date().toISOString(),
      read: false
    };
    localStorage.setItem('messages', JSON.stringify([newMessage, ...messages]));
  }

  async markMessageRead(id: string): Promise<void> {
     await delay(MOCK_DELAY);
     const messages = await this.getMessages();
     const updated = messages.map(m => m.id === id ? { ...m, read: true } : m);
     localStorage.setItem('messages', JSON.stringify(updated));
  }

  // --- Giving / Paystack Simulation ---
  async getDonations(): Promise<Donation[]> {
    await delay(MOCK_DELAY);
    const stored = localStorage.getItem('donations');
    return stored ? JSON.parse(stored) : [];
  }

  async processDonation(donation: Omit<Donation, 'id' | 'created_at' | 'reference'>): Promise<Donation> {
    await delay(1500); // Simulate Paystack processing
    const donations = await this.getDonations();
    const newDonation: Donation = {
      ...donation,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      reference: 'PAY-' + Math.random().toString(36).substring(2, 9).toUpperCase()
    };
    localStorage.setItem('donations', JSON.stringify([newDonation, ...donations]));
    return newDonation;
  }
}

export const dataService = new DataService();