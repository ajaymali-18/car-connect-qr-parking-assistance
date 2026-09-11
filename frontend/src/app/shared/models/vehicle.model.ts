export interface Vehicle {
  id: number;
  vehicleNumber: string;
  brand: string;
  model: string;
  color: string;
  qrToken?: string;
  scansCount?: number;
  lastPing?: string;
  status?: 'AVAILABLE' | 'BUSY' | 'BLOCKED';
  imageUrl?: string;
  maskPhoneNumber?: boolean;
}
