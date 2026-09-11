export interface ContactRequest {
  id: number;
  vehicleId: number;
  vehicleName?: string;
  vehicleNumber?: string;
  message: string;
  callbackLocation?: string;
  status: 'SENT' | 'READ' | 'RESOLVED';
  createdAt?: string;
  isUrgent?: boolean;
}
