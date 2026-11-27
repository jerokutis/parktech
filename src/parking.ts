export type Status = 'free' | 'occupied' | 'reserved' | 'blocked';

export type Spot = {
  id: string;
  status: Status;
  type: 'regular' | 'ev' | 'accessible';
};

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
