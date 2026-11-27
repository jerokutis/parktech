export type Status = 'free' | 'occupied' | 'reserved' | 'blocked';

export type Spot = {
  id: string;
  status: Status;
  type: 'regular' | 'ev' | 'accessible';
};

export type Booking = {
  id: string;
  lot: number;
  spot: string;
  plate: string;
  created: number;
  duration: number;
  started?: number;
  ended?: number;
  status: 'reserved' | 'parking' | 'completed' | 'cancelled';
};

export type Activity = {
  id: string;
  at: number;
  role: 'student' | 'admin' | 'system';
  message: string;
  lot: number;
  spot: string;
  plate?: string;
};

export function recordActivity(events: Activity[], event: Omit<Activity, 'id' | 'at'>): Activity[] {
  return [{ ...event, id: crypto.randomUUID(), at: Date.now() }, ...events];
}

export const statusNames: Record<Status, string> = {
  free: 'Laisva',
  occupied: 'Užimta',
  reserved: 'Rezervuota',
  blocked: 'Neprieinama',
};

export function matchesSpotFilter(spot: Spot, filter: string): boolean {
  return filter === 'all'
    || (filter === 'free' && spot.status === 'free')
    || (filter === 'ev' && spot.type === 'ev')
    || (filter === 'accessible' && spot.type === 'accessible');
}
